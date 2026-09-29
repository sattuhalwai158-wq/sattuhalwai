create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users for each row execute function public.handle_first_admin();

create table public.site_media (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  media_type text not null default 'image',
  url text not null,
  storage_path text,
  title text not null default '',
  caption text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.site_media to anon, authenticated;
grant insert, update, delete on public.site_media to authenticated;
grant all on public.site_media to service_role;
alter table public.site_media enable row level security;
create policy "Anyone can view media" on public.site_media for select using (true);
create policy "Admins insert media" on public.site_media for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "Admins update media" on public.site_media for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins delete media" on public.site_media for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.page_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
grant select on public.page_content to anon, authenticated;
grant insert, update, delete on public.page_content to authenticated;
grant all on public.page_content to service_role;
alter table public.page_content enable row level security;
create policy "Anyone can view content" on public.page_content for select using (true);
create policy "Admins insert content" on public.page_content for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "Admins update content" on public.page_content for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "Admins delete content" on public.page_content for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create policy "Admins read site media files" on storage.objects for select to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(),'admin'));
create policy "Admins upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.has_role(auth.uid(),'admin'));
create policy "Admins update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(),'admin'));
create policy "Admins delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(),'admin'));

insert into public.site_media (section, media_type, url, title, caption, sort_order) values
('hero','image','/media/sweet-rose-platter.jpg','Signature rose platter','',1),
('hero','image','/media/rose-sweet-cups.jpg','Rose sweet cups','',2),
('hero','image','/media/rose-sweet-slices.jpg','Saffron sweet slices','',3),
('signatures','image','/media/sweet-rose-platter-2.jpg','Kesar Rose Platter','Saffron centred sweet rounds around a sugar rose',1),
('signatures','image','/media/rose-sweet-cups-3.jpg','Rose Mawa Cups','Delicate cups crowned with rose sweet pearls',2),
('signatures','image','/media/sweet-rose-platter-3.jpg','Royal Brass Thali','Signature mithai served on polished brass',3),
('signatures','image','/media/rose-sweet-cups-5.jpg','Gulab Bites','Hand-shaped rose bites for wedding tables',4),
('journey','image','/media/myra-breakfast.jpg','Myra Breakfast','',1),
('journey','image','/media/mehendi-lunch.jpg','Mehendi Lunch','',2),
('journey','image','/media/haldi-breakfast.jpg','Haldi Breakfast','',3),
('journey','image','/media/haldi-dinner.jpg','Haldi Dinner','',4),
('journey','image','/media/sangeet-dinner.jpg','Sangeet Dinner','',5),
('journey','image','/media/shadi-breakfast.jpg','Shadi Day Breakfast','',6),
('journey','image','/media/carnival-lunch.jpg','Carnival Lunch','',7),
('journey','image','/media/high-tea.jpg','High Tea','',8),
('journey','image','/media/vidai-breakfast.jpg','Vidai Breakfast','',9),
('gallery','image','/media/live-dosa-counter.jpg','Live Dosa Counter','Live Counters & Theatrics',1),
('gallery','image','/media/sweet-rose-platter.jpg','Rose Mithai Salon','Royal Serveware',2),
('gallery','image','/media/rose-sweet-cups-2.jpg','Brass Sweet Service','Royal Serveware',3),
('gallery','image','/media/rose-sweet-cups-4.jpg','Mithai Vault','Royal Serveware',4),
('gallery','image','/media/rose-sweet-slices.jpg','Sculpted Sweets','Fruit Carvings',5),
('videos','video','/media/video-1.mp4','Illuminated buffet staging','LED Buffet Staging',1),
('videos','video','/media/video-2.mp4','Live stalls & nashta','Live Counters & Theatrics',2);

insert into public.page_content (key, value) values
('home_eyebrow','Royal Wedding & Event Catering Specialist'),
('home_title','The Art of Royal Catering.'),
('home_subtitle','Where every bite becomes a memory—authentic Rajasthani feasts, artisanal sweets and interactive live stalls for grand celebrations across India.'),
('setups_title','The table becomes part of the palace.'),
('setups_copy','Sculptural brass, considered lighting and live culinary moments transform service into an experience guests gather around.');