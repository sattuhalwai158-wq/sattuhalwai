export function validateUpload(file:Pick<File,'type'|'size'>,video=false):string|undefined{
 const allowed=video?['video/mp4','video/webm']:['image/jpeg','image/png','image/webp','image/avif'];
 if(!allowed.includes(file.type))return video?'Choose an MP4 or WebM video.':'Choose a JPG, PNG, WebP or AVIF photo.';
 if(file.size===0||file.size>(video?25:10)*1024*1024)return video?'Choose a video smaller than 25 MB.':'Choose a photo smaller than 10 MB.';
 return undefined;
}
