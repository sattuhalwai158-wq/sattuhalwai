-- Compatible additions only; preserve existing content and storage references.
alter table public.site_items add column published boolean not null default true;
alter table public.site_media add column published boolean not null default true;
alter table public.site_media add column alt_text text not null default '';
drop policy "Anyone can view items" on public.site_items;
create policy "Visitors read published items" on public.site_items for select to anon using (published);
create policy "Members read published or admin items" on public.site_items for select to authenticated using (published or public.has_role(auth.uid(),'admin'));
drop policy "Anyone can view media" on public.site_media;
create policy "Visitors read published media" on public.site_media for select to anon using (published);
create policy "Members read published or admin media" on public.site_media for select to authenticated using (published or public.has_role(auth.uid(),'admin'));

create or replace function public.protect_content_categories() returns trigger
language plpgsql security invoker set search_path = '' as $$
declare dependent_kind text;
begin
  if old.kind not in ('menu_category','setup_category') then return old; end if;
  dependent_kind := case old.kind when 'menu_category' then 'dish' else 'setup' end;
  if tg_op = 'DELETE' then
    if exists(select 1 from public.site_items where kind=dependent_kind and data->>'category'=old.data->>'name') then
      raise exception 'Move the items in this category before deleting it.';
    end if;
    return old;
  end if;
  if new.data->>'name' is distinct from old.data->>'name' then
    if nullif(btrim(new.data->>'name'),'') is null then raise exception 'A category needs a name.'; end if;
    update public.site_items set data=jsonb_set(data,'{category}',to_jsonb(new.data->>'name')) where kind=dependent_kind and data->>'category'=old.data->>'name';
  end if;
  return new;
end $$;
create trigger protect_content_categories before delete or update of data on public.site_items for each row execute function public.protect_content_categories();
revoke all on function public.protect_content_categories() from public, anon, authenticated;

-- Private submissions. No anonymous table privileges; no direct public inserts.
create table public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null check(char_length(customer_name) between 2 and 80),
  display_name boolean not null default false,
  rating integer not null check(rating between 1 and 5),
  title text not null default '' check(char_length(title)<=100),
  body text not null check(char_length(body) between 20 and 2000),
  event_type text not null default '',
  event_month text not null default '',
  publication_consent boolean not null check(publication_consent),
  consent_at timestamptz not null default now(),
  status text not null default 'pending' check(status in ('pending','published','rejected','hidden')),
  created_at timestamptz not null default now(),
  published_at timestamptz,
  moderated_at timestamptz,
  moderator_id uuid references auth.users(id) on delete set null,
  edited_title text check(char_length(edited_title)<=100),
  edited_body text check(char_length(edited_body) between 20 and 2000),
  moderation_note text not null default '' check(char_length(moderation_note)<=1000),
  featured boolean not null default false,
  sort_order integer not null default 0,
  fingerprint text not null,
  check(not featured or status='published')
);
create index customer_reviews_status_date on public.customer_reviews(status,created_at desc);
create index customer_reviews_fingerprint on public.customer_reviews(fingerprint,created_at desc);
alter table public.customer_reviews enable row level security;
revoke all on public.customer_reviews from anon,authenticated;
grant select on public.customer_reviews to authenticated;
create policy "Admins inspect customer reviews" on public.customer_reviews for select to authenticated using(public.has_role(auth.uid(),'admin'));

create table public.review_moderation_log (
 id uuid primary key default gen_random_uuid(),
 review_id uuid references public.customer_reviews(id) on delete set null,
 moderator_id uuid references auth.users(id) on delete set null,
 action text not null,
 previous_status text,
 next_status text,
 created_at timestamptz not null default now()
);
alter table public.review_moderation_log enable row level security;
revoke all on public.review_moderation_log from anon,authenticated;
grant select on public.review_moderation_log to authenticated;
create policy "Admins inspect moderation history" on public.review_moderation_log for select to authenticated using(public.has_role(auth.uid(),'admin'));

create table public.review_submission_challenges (
 token uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 used_at timestamptz,
 review_id uuid references public.customer_reviews(id) on delete set null
);
alter table public.review_submission_challenges enable row level security;
revoke all on public.review_submission_challenges from public,anon,authenticated;

create function public.begin_customer_review() returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
  perform pg_advisory_xact_lock(8472901);
  delete from public.review_submission_challenges where created_at<now()-interval '1 day';
  -- Global safety budget, intentionally not based on spoofable client headers.
  if (select count(*) from public.review_submission_challenges where created_at>now()-interval '1 hour')>=300 then
    raise exception 'Please try again later.';
  end if;
  insert into public.review_submission_challenges default values returning token into result;
  return result;
end $$;

create function public.submit_customer_review(
 _token uuid, _name text, _rating integer, _title text, _body text,
 _event_type text, _event_month text, _consent boolean, _display_name boolean, _website text default ''
) returns void language plpgsql security definer set search_path='' as $$
declare challenge public.review_submission_challenges; clean_name text; clean_body text; clean_title text; fp text; review uuid;
begin
  if _consent is distinct from true or nullif(btrim(_website),'') is not null then raise exception 'Please check your review details.'; end if;
  clean_name:=btrim(regexp_replace(coalesce(_name,''),'[[:cntrl:]]',' ','g'));
  clean_body:=btrim(regexp_replace(coalesce(_body,''),'[[:cntrl:]]',' ','g'));
  clean_title:=btrim(regexp_replace(coalesce(_title,''),'[[:cntrl:]]',' ','g'));
  if char_length(clean_name) not between 2 and 80 or _rating is null or _rating not between 1 and 5 or char_length(clean_body) not between 20 and 2000 or char_length(clean_title)>100 then raise exception 'Please check your review details.'; end if;
  if coalesce(_event_type,'') not in ('','Royal Wedding','Sangeet / Mehendi','Reception','Corporate Gala','Private Feast') then raise exception 'Invalid event type.'; end if;
  if coalesce(_event_month,'')<>'' then
    if _event_month !~ '^\d{4}-(0[1-9]|1[0-2])$' or _event_month>to_char(current_date,'YYYY-MM') then raise exception 'Invalid event month.'; end if;
  end if;
  select * into challenge from public.review_submission_challenges where token=_token for update;
  if not found then raise exception 'Please reopen the review form and try again.'; end if;
  if challenge.used_at is not null then return; end if; -- Idempotent retry after a lost response.
  if challenge.created_at>now()-interval '2 seconds' or challenge.created_at<now()-interval '30 minutes' then raise exception 'Please reopen the review form and try again.'; end if;
  fp:=md5(lower(clean_name)||'|'||lower(regexp_replace(clean_body,'\s+',' ','g')));
  perform pg_advisory_xact_lock(8472902);
  if exists(select 1 from public.customer_reviews where fingerprint=fp and created_at>now()-interval '1 day') then raise exception 'This review has already been received.'; end if;
  if (select count(*) from public.customer_reviews where created_at>now()-interval '1 hour')>=50 then raise exception 'Please try again later.'; end if;
  insert into public.customer_reviews(customer_name,display_name,rating,title,body,event_type,event_month,publication_consent,status,fingerprint)
    values(clean_name,coalesce(_display_name,false),_rating,clean_title,clean_body,coalesce(_event_type,''),coalesce(_event_month,''),true,'pending',fp) returning id into review;
  update public.review_submission_challenges set used_at=now(),review_id=review where token=_token;
end $$;

-- Deliberately narrow definer projection: no access to the private base table,
-- original names without permission, consent records, notes, or audit history.
create function public.list_published_reviews() returns table(
 id uuid, customer_name text, rating integer, title text, body text, event_type text,
 event_month text, published_at timestamptz, featured boolean, sort_order integer, edited boolean
) language sql stable security definer set search_path='' as $$
 select r.id,case when r.display_name then r.customer_name else 'A customer' end,r.rating,
 coalesce(r.edited_title,r.title),coalesce(r.edited_body,r.body),r.event_type,r.event_month,r.published_at,r.featured,r.sort_order,
 (r.edited_title is not null or r.edited_body is not null)
 from public.customer_reviews r where r.status='published' and r.publication_consent and r.published_at is not null
 order by r.sort_order,r.published_at desc
$$;

create function public.moderate_customer_review(
 _id uuid, _action text, _note text default '', _title text default null, _body text default null,
 _featured boolean default false, _sort_order integer default 0
) returns void language plpgsql security definer set search_path='' as $$
declare review public.customer_reviews; next_state text; uid uuid;
begin
 uid:=auth.uid();
 if uid is null or not public.has_role(uid,'admin') then raise exception 'Not authorized.' using errcode='42501'; end if;
 select * into review from public.customer_reviews where id=_id for update;
 if not found then raise exception 'Review not found.'; end if;
 if _action not in ('publish','reject','hide','edit','delete') or _action is null then raise exception 'Invalid action.'; end if;
 if char_length(coalesce(_note,''))>1000 or (_title is not null and char_length(btrim(_title))>100) or (_body is not null and char_length(btrim(_body)) not between 20 and 2000) then raise exception 'Please check the edited text.'; end if;
 next_state:=case _action when 'publish' then 'published' when 'reject' then 'rejected' when 'hide' then 'hidden' else review.status end;
 if next_state='published' and not review.publication_consent then raise exception 'Publication consent is required.'; end if;
 insert into public.review_moderation_log(review_id,moderator_id,action,previous_status,next_status) values(_id,uid,_action,review.status,case when _action='delete' then null else next_state end);
 if _action='delete' then delete from public.customer_reviews where id=_id;return; end if;
 update public.customer_reviews set status=next_state,moderated_at=now(),moderator_id=uid,
 published_at=case when next_state='published' then coalesce(published_at,now()) else null end,
 edited_title=case when _title is null then edited_title when btrim(_title)=title then null else btrim(_title) end,
 edited_body=case when _body is null then edited_body when btrim(_body)=body then null else btrim(_body) end,
 moderation_note=coalesce(_note,''),featured=(next_state='published' and coalesce(_featured,false)),sort_order=coalesce(_sort_order,0)
 where id=_id;
end $$;
revoke all on function public.begin_customer_review() from public,anon,authenticated;
revoke all on function public.submit_customer_review(uuid,text,integer,text,text,text,text,boolean,boolean,text) from public,anon,authenticated;
revoke all on function public.list_published_reviews() from public,anon,authenticated;
revoke all on function public.moderate_customer_review(uuid,text,text,text,text,boolean,integer) from public,anon,authenticated;
grant execute on function public.begin_customer_review(),public.submit_customer_review(uuid,text,integer,text,text,text,text,boolean,boolean,text),public.list_published_reviews() to anon,authenticated;
grant execute on function public.moderate_customer_review(uuid,text,text,text,text,boolean,integer) to authenticated;

-- Retain private storage and existing policies. Match the upload form's limits.
update storage.buckets set file_size_limit=26214400,allowed_mime_types=array['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm'] where id='site-media';
