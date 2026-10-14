/* EDIT YOUR PORTFOLIO HERE.
   Replace video: "" with a YouTube/Vimeo embed URL or a local MP4 path.
   You can also change titles, copy, categories and project descriptions below.
   All projects are labeled as portfolio studies; avoid inventing results or clients.
*/
const projects = [
  {
    "id": "aiugc",
    "num": "01",
    "title": "UGC THAT FEELS NATIVE.",
    "brand": "AI UGC AD",
    "category": "ugc",
    "type": "AI UGC AD",
    "tone": "beauty",
    "hook": "An attention-first, creator-style approach for the social feed.",
    "idea": "Bring product storytelling into a natural UGC format using AI-assisted production.",
    "execution": "AI-generated visuals, short-form pacing, editing and delivery for vertical viewing.",
    "video": "https://drive.google.com/file/d/1nn-9TnOpaEQYv-7SQ-ptn_SF-ocDP8at/preview",
    "poster": "https://drive.google.com/thumbnail?id=1nn-9TnOpaEQYv-7SQ-ptn_SF-ocDP8at&sz=w1200"
  },
  {
    "id": "organicugc",
    "num": "02",
    "title": "AI MEETS ORGANIC UGC.",
    "brand": "AI + ORGANIC UGC AD",
    "category": "ugc",
    "type": "UGC / SOCIAL AD",
    "tone": "pet",
    "hook": "Social-first creative that puts the message before the effects.",
    "idea": "Blend AI-assisted scenes with a more organic UGC presentation.",
    "execution": "Short-form editing and AI-supported visuals shaped for a familiar social viewing experience.",
    "video": "https://drive.google.com/file/d/1uK9Hd3AIoG1V0QcBncuMxaZSs5G8N2TB/preview",
    "poster": "https://drive.google.com/thumbnail?id=1uK9Hd3AIoG1V0QcBncuMxaZSs5G8N2TB&sz=w1200"
  },
  {
    "id": "pixar",
    "num": "03",
    "title": "ANIMATION WITH PERSONALITY.",
    "brand": "PIXAR-INSPIRED ANIMATED STYLE",
    "category": "story",
    "type": "AI ANIMATION",
    "tone": "wonder",
    "hook": "Stylized animation can make the opening seconds feel distinct.",
    "idea": "Use animated storytelling as a visual format for creative advertising.",
    "execution": "AI-assisted scene development, animation and editorial pacing.",
    "video": "https://drive.google.com/file/d/1jPgIV2_ZadB2_JU5e69V8wrwMmInVABA/preview",
    "poster": "https://drive.google.com/thumbnail?id=1jPgIV2_ZadB2_JU5e69V8wrwMmInVABA&sz=w1200"
  },
  {
    "id": "stopmotion",
    "num": "04",
    "title": "STOP THE SCROLL IN 3D.",
    "brand": "3D STOP-MOTION-STYLE ANIMATION",
    "category": "story",
    "type": "3D ANIMATION",
    "tone": "wellness",
    "hook": "An animated treatment offers a playful way to introduce a visual idea.",
    "idea": "Explore dimensional, stop-motion-inspired creative built with AI tools.",
    "execution": "AI-assisted visual generation and editing with emphasis on visual rhythm.",
    "video": "https://drive.google.com/file/d/1B-P6Tm9_Pv3X7i05ztQRyTJX1fYw4n8c/preview",
    "poster": "https://drive.google.com/thumbnail?id=1B-P6Tm9_Pv3X7i05ztQRyTJX1fYw4n8c&sz=w1200"
  }
];
const grid = document.getElementById('project-grid');
const dialog = document.getElementById('project-dialog');
const dialogContent = document.getElementById('dialog-content');
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function artwork(p){
  const fallback = `<div class="poster-art ${p.tone}" aria-hidden="true"><div class="art-orb"></div><div class="art-shape"></div><span class="poster-watermark">FAITH / ADS LAB ${p.num}</span><span class="poster-big">${p.id==='pixar'?'ANIMATED':p.id==='stopmotion'?'3D MOTION':p.id==='aiugc'?'AI UGC':'SOCIAL UGC'}</span></div>`;
  return fallback + (p.poster ? `<img class="project-thumbnail" src="${escapeHTML(p.poster)}" alt="${escapeHTML(p.brand)} video preview" loading="lazy" onerror="this.hidden=true">` : '');
}
function draw(filter='all') {
  const selected = projects.filter(p => filter === 'all' || p.category===filter);
  grid.innerHTML = selected.map(p => `<article class="project-card" data-id="${p.id}"><button class="project-visual" type="button" aria-label="Explore ${escapeHTML(p.brand)} project" data-project="${p.id}">${artwork(p)}<span class="project-play">${p.video?'▶ PLAY THE SAMPLE':'↗ VIEW SAMPLE'}</span><span class="project-ratio">WATCH ON SITE</span></button><div class="project-meta"><span>${p.num} / ${escapeHTML(p.type)}</span><span>VIDEO SAMPLE ↗</span></div><button type="button" class="project-title" data-project="${p.id}">${escapeHTML(p.title)} <span>↗</span></button><p class="project-brand">${escapeHTML(p.brand)}</p></article>`).join('');
}
function videoMarkup(url) {
 if (!url) return '<div class="video-notice">VIDEO PREVIEW COMING SOON <span>↗</span><small>Explore the creative concept and execution notes for this portfolio study.</small></div>';
 let parsed;
 try { parsed = new URL(url, window.location.href); } catch (_) { return '<div class="video-notice">PREVIEW UNAVAILABLE</div>'; }
 if (!['https:', 'http:'].includes(parsed.protocol)) return '<div class="video-notice">PREVIEW UNAVAILABLE</div>';
 const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
 let embed = '';
 if (host === 'youtu.be') embed = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(parsed.pathname.slice(1))}`;
 else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
   const id = parsed.pathname === '/watch' ? parsed.searchParams.get('v') : parsed.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1];
   if (id) embed = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
 } else if (host === 'vimeo.com' || host === 'player.vimeo.com') {
   const id = parsed.pathname.match(/\/(?:video\/)?(\d+)/)?.[1];
   if (id) embed = `https://player.vimeo.com/video/${id}`;
 }
 if (host === 'drive.google.com' && parsed.pathname.includes('/file/d/') && parsed.pathname.endsWith('/preview')) return `<iframe src="${escapeHTML(parsed.href)}" title="Portfolio video" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>`;
 if (embed) return `<iframe src="${escapeHTML(embed)}" title="Portfolio project video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
 // Only self-hosted video files are supported here. Third-party non-embed pages cannot play as MP4s.
 if (!/\.(mp4|webm|mov)$/i.test(parsed.pathname)) return '<div class="video-notice">VIDEO LINK NEEDS AN EMBED URL <span>↗</span></div>';
 return `<video controls playsinline preload="metadata" src="${escapeHTML(parsed.href)}"></video>`;
}
function openProject(id){const p=projects.find(x=>x.id===id);if(!p)return; dialogContent.innerHTML=`<div class="dialog-grid"><div class="dialog-video">${videoMarkup(p.video)}</div><div class="dialog-info"><span class="eyebrow">${escapeHTML(p.num)} / ${escapeHTML(p.type)}</span><h2 id="dialog-title">${escapeHTML(p.title)}</h2><p class="dialog-brand">${escapeHTML(p.brand)}</p><div class="dialog-detail"><b>THE HOOK</b><p>${escapeHTML(p.hook)}</p></div><div class="dialog-detail"><b>THE IDEA</b><p>${escapeHTML(p.idea)}</p></div><div class="dialog-detail"><b>THE EXECUTION</b><p>${escapeHTML(p.execution)}</p></div><span class="dialog-disclaimer">Creative sample · No ad performance results claimed</span></div></div>`;dialog.showModal();document.body.classList.add('dialog-open')}
draw();
document.addEventListener('click',e=>{const project=e.target.closest('[data-project]');if(project)openProject(project.dataset.project);const filter=e.target.closest('[data-filter]');if(filter){document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===filter);b.setAttribute('aria-pressed',String(b===filter))});draw(filter.dataset.filter);}});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');dialogContent.innerHTML=''});
const toggle=document.querySelector('.menu-toggle'),mobile=document.querySelector('.mobile-nav');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));mobile.classList.toggle('open',open);toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu')});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu')}));
window.addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('progress').style.transform=`scaleX(${h.scrollTop / Math.max(1,h.scrollHeight-h.clientHeight)})`},{passive:true});
document.getElementById('year').textContent=String(new Date().getFullYear());
