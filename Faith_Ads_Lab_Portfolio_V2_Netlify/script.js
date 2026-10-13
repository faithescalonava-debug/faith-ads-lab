/* EDIT YOUR PORTFOLIO HERE.
   Replace video: "" with a YouTube/Vimeo embed URL or a local MP4 path.
   You can also change titles, copy, categories and project descriptions below.
   All projects are labeled as portfolio studies; avoid inventing results or clients.
*/
const projects = [
  {id:'wonderquest', num:'01', title:'A DIFFERENT KIND OF SCREEN TIME.', brand:'WONDERQUEST / DISCOVERY MICROSCOPE', category:'story', type:'EMOTIONAL STORYTELLING', tone:'wonder', accent:'#d2e99a', hook:'Two childhood habits. Two very different paths.', idea:'A parallel-story creative that contrasts passive scrolling with hands-on discovery — showing the product as an inviting alternative, not a lecture.', execution:'Character-consistent AI scenes, family moments, split-screen storytelling, product reveal, and emotional pacing.', video:'', poster:''},
  {id:'omelia', num:'02', title:'SKIN THAT STILL LOOKS LIKE SKIN.', brand:'OMELIA / SEMBRI TU', category:'ugc', type:'BEAUTY UGC / DEMO', tone:'beauty', accent:'#edbdb5', hook:'Sometimes less makeup makes all the difference.', idea:'An approachable beauty story that moves from a relatable makeup frustration into a natural in-car product recommendation.', execution:'AI UGC character continuity, Italian-language testimonial direction, close-up application sequence, and benefit-led framing.', video:'', poster:''},
  {id:'calmi', num:'03', title:'A CALMER EVERYDAY.', brand:'CALMI COLLAR / PET WELLNESS', category:'product', type:'PRODUCT-FIRST UGC', tone:'pet', accent:'#d3b18d', hook:'Show the solution in the moment it matters.', idea:'A pet-owner style concept centered on the everyday action of placing a collar on a golden retriever.', execution:'Natural smartphone-camera realism, clear product interaction, authentic owner-and-pet movement, and simple on-screen storytelling.', video:'', poster:''},
  {id:'everly', num:'04', title:'MAKE THE ROUTINE FEEL REAL.', brand:'EVERLY / WELLNESS CREATIVE', category:'product', type:'PRODUCT DEMO / B-ROLL', tone:'wellness', accent:'#b7d2be', hook:'A product moment your viewer can instantly understand.', idea:'A clear daily-routine product scene focused on the physical action and a credible, uncomplicated visual.', execution:'Realistic AI character movement, consistent product placement, controlled pacing, and straightforward product B-roll.', video:'', poster:''}
];
const grid = document.getElementById('project-grid');
const dialog = document.getElementById('project-dialog');
const dialogContent = document.getElementById('dialog-content');
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function artwork(p){return p.poster ? `<img src="${escapeHTML(p.poster)}" alt="${escapeHTML(p.brand)} video thumbnail" loading="lazy">` : `<div class="poster-art ${p.tone}" aria-hidden="true"><div class="art-orb"></div><div class="art-shape"></div><span class="poster-watermark">FE / CREATIVE STUDY ${p.num}</span><span class="poster-big">${p.tone==='wonder'?'DISCOVER':p.tone==='beauty'?'REAL SKIN':p.tone==='pet'?'STAY CLOSE':'THE RITUAL'}</span></div>`}
function draw(filter='all') {
  const selected = projects.filter(p => filter === 'all' || p.category===filter);
  grid.innerHTML = selected.map(p => `<article class="project-card" data-id="${p.id}"><button class="project-visual" type="button" aria-label="Explore ${escapeHTML(p.brand)} project" data-project="${p.id}">${artwork(p)}<span class="project-play">${p.video?'▶ WATCH THE AD':'↗ VIEW CASE STUDY'}</span><span class="project-ratio">9:16 / SOCIAL AD</span></button><div class="project-meta"><span>${p.num} / ${escapeHTML(p.type)}</span><span>CREATIVE STUDY ↗</span></div><button type="button" class="project-title" data-project="${p.id}">${escapeHTML(p.title)} <span>↗</span></button><p class="project-brand">${escapeHTML(p.brand)}</p></article>`).join('');
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
 if (embed) return `<iframe src="${escapeHTML(embed)}" title="Portfolio project video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
 // Only self-hosted video files are supported here. Third-party non-embed pages cannot play as MP4s.
 if (!/\.(mp4|webm|mov)$/i.test(parsed.pathname)) return '<div class="video-notice">VIDEO LINK NEEDS AN EMBED URL <span>↗</span></div>';
 return `<video controls playsinline preload="metadata" src="${escapeHTML(parsed.href)}"></video>`;
}
function openProject(id){const p=projects.find(x=>x.id===id);if(!p)return; dialogContent.innerHTML=`<div class="dialog-grid"><div class="dialog-video">${videoMarkup(p.video)}</div><div class="dialog-info"><span class="eyebrow">${escapeHTML(p.num)} / ${escapeHTML(p.type)}</span><h2 id="dialog-title">${escapeHTML(p.title)}</h2><p class="dialog-brand">${escapeHTML(p.brand)}</p><div class="dialog-detail"><b>THE HOOK</b><p>${escapeHTML(p.hook)}</p></div><div class="dialog-detail"><b>THE IDEA</b><p>${escapeHTML(p.idea)}</p></div><div class="dialog-detail"><b>THE EXECUTION</b><p>${escapeHTML(p.execution)}</p></div><span class="dialog-disclaimer">Portfolio creative study · Not a claim of paid campaign results</span></div></div>`;dialog.showModal();document.body.classList.add('dialog-open')}
draw();
document.addEventListener('click',e=>{const project=e.target.closest('[data-project]');if(project)openProject(project.dataset.project);const filter=e.target.closest('[data-filter]');if(filter){document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===filter);b.setAttribute('aria-pressed',String(b===filter))});draw(filter.dataset.filter);}});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');dialogContent.innerHTML=''});
const toggle=document.querySelector('.menu-toggle'),mobile=document.querySelector('.mobile-nav');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));mobile.classList.toggle('open',open);toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu')});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu')}));
window.addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('progress').style.transform=`scaleX(${h.scrollTop / Math.max(1,h.scrollHeight-h.clientHeight)})`},{passive:true});
document.getElementById('year').textContent=String(new Date().getFullYear());
