const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');
menuButton.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');
menuButton.setAttribute('aria-expanded','false')}))}

const modal=document.querySelector('.demo-modal');
const openButtons=document.querySelectorAll('.demo-action');
const closeButtons=document.querySelectorAll('.close,.close-secondary');
function openModal(){if(modal){modal.hidden=false;
document.body.style.overflow='hidden'}}

function closeModal(){if(modal){modal.hidden=true;
document.body.style.overflow=''}}openButtons.forEach(b=>b.addEventListener('click',openModal));
closeButtons.forEach(b=>b.addEventListener('click',closeModal));
if(modal)modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});


const clarityProjectId='yldb9qb9ib';
const consentKey='voltix-analytics-consent';

function loadClarity(){
  if(window.clarity||document.querySelector('script[data-clarity-project]'))return;
  window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
  const script=document.createElement('script');
  script.async=true;
  script.src='https://www.clarity.ms/tag/'+clarityProjectId;
  script.dataset.clarityProject=clarityProjectId;
  document.head.appendChild(script);
}

function applyAnalyticsConsent(choice){
  localStorage.setItem(consentKey,choice);
  if(choice==='accepted')loadClarity();
  document.querySelectorAll('.cookie-banner').forEach(banner=>{banner.hidden=true});
}

function showConsentBanner(){
  document.querySelectorAll('.cookie-banner').forEach(banner=>{banner.hidden=false});
}

const savedConsent=localStorage.getItem(consentKey);
if(savedConsent==='accepted')loadClarity();
else if(savedConsent!=='rejected')showConsentBanner();

document.querySelectorAll('.cookie-accept').forEach(button=>{
  button.addEventListener('click',()=>applyAnalyticsConsent('accepted'));
});
document.querySelectorAll('.cookie-reject').forEach(button=>{
  button.addEventListener('click',()=>applyAnalyticsConsent('rejected'));
});
document.querySelectorAll('.privacy-reset').forEach(button=>{
  button.addEventListener('click',()=>{
    localStorage.removeItem(consentKey);
    showConsentBanner();
  });
});
