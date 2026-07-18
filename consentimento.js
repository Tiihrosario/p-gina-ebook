(function(){
  const key='raem_consent_v1';
  window.dataLayer=window.dataLayer||[];
  function gtag(){window.dataLayer.push(arguments)}
  window.gtag=window.gtag||gtag;
  gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
  const saved=localStorage.getItem(key);
  function apply(choice){const granted=choice==='accepted'?'granted':'denied';gtag('consent','update',{ad_storage:granted,analytics_storage:granted,ad_user_data:granted,ad_personalization:granted});document.documentElement.dataset.consent=choice}
  if(saved) apply(saved);
  function mount(){
    if(saved||document.getElementById('privacy-banner'))return;
    const style=document.createElement('style');style.textContent='#privacy-banner{position:fixed;z-index:9999;left:18px;right:18px;bottom:18px;max-width:760px;margin:auto;background:#102b26;color:#f3ecdf;border:1px solid #c49a3866;border-radius:10px;padding:18px;box-shadow:0 14px 45px #0009;font:14px/1.5 Inter,Arial,sans-serif}#privacy-banner p{margin:0 0 14px}#privacy-banner a{color:#e7c565;text-decoration:underline}#privacy-banner .actions{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}#privacy-banner button{cursor:pointer;border:1px solid #c49a38;border-radius:4px;padding:10px 16px;color:#f3ecdf;background:transparent;font-weight:700}#privacy-banner .accept{background:#e16643;border-color:#e16643}@media(max-width:560px){#privacy-banner{left:10px;right:10px;bottom:78px}#privacy-banner .actions button{flex:1}}';document.head.appendChild(style);
    const el=document.createElement('aside');el.id='privacy-banner';el.setAttribute('aria-label','Preferências de privacidade');el.innerHTML='<p><strong>Você escolhe sobre seus dados.</strong><br>Usamos cookies opcionais para entender visitas e medir campanhas. Os essenciais continuam funcionando. <a href="privacidade.html">Saiba mais</a>.</p><div class="actions"><button type="button" data-choice="rejected">Usar só o essencial</button><button class="accept" type="button" data-choice="accepted">Aceitar e continuar</button></div>';document.body.appendChild(el);
    el.addEventListener('click',e=>{const choice=e.target.dataset.choice;if(!choice)return;localStorage.setItem(key,choice);apply(choice);el.remove()});
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mount):mount();
})();
