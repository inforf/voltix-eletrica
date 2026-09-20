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


const consentKey='voltix-analytics-consent';

function sendClarityConsent(choice){
  const granted=choice==='accepted'?'granted':'denied';
  window.clarity('consentv2',{
    ad_Storage:'denied',
    analytics_Storage:granted
  });
}

function applyAnalyticsConsent(choice){
  localStorage.setItem(consentKey,choice);
  sendClarityConsent(choice);
  document.querySelectorAll('.cookie-banner').forEach(banner=>{banner.hidden=true});
}

function showConsentBanner(){
  document.querySelectorAll('.cookie-banner').forEach(banner=>{banner.hidden=false});
}

const savedConsent=localStorage.getItem(consentKey);
sendClarityConsent(savedConsent==='accepted'?'accepted':'rejected');
if(savedConsent!=='accepted'&&savedConsent!=='rejected')showConsentBanner();

document.querySelectorAll('.cookie-accept').forEach(button=>{
  button.addEventListener('click',()=>applyAnalyticsConsent('accepted'));
});
document.querySelectorAll('.cookie-reject').forEach(button=>{
  button.addEventListener('click',()=>applyAnalyticsConsent('rejected'));
});
document.querySelectorAll('.privacy-reset').forEach(button=>{
  button.addEventListener('click',()=>{
    localStorage.removeItem(consentKey);
    sendClarityConsent('rejected');
    showConsentBanner();
  });
});
