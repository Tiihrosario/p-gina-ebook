(function () {
  const key = "raem_consent_v1";
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;
  const googleAdsId = "AW-18269319435";
  let googleLoaded = false;
  function loadGoogle() {
    if (googleLoaded) return;
    googleLoaded = true;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(googleAdsId);
    document.head.appendChild(script);
    gtag("js", new Date());
    gtag("config", googleAdsId);
  }
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  const saved = localStorage.getItem(key);
  function apply(choice) {
    const granted = choice === "accepted" ? "granted" : "denied";
    gtag("consent", "update", {
      ad_storage: granted,
      analytics_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
    });
    document.documentElement.dataset.consent = choice;
    if (choice === "accepted") loadGoogle();
  }
  if (saved) apply(saved);
  function mount() {
    if (saved || document.getElementById("privacy-banner")) return;
    const style = document.createElement("style");
    style.textContent =
      "#privacy-banner{position:fixed;z-index:9999;right:16px;bottom:16px;width:min(354px,calc(100vw - 32px));background:repeating-linear-gradient(118deg,transparent 0 22px,#efd27d0a 23px,transparent 24px 46px),linear-gradient(145deg,#14382f,#071f1a);color:#fffaf0;border:1px solid #d7b45e;border-radius:9px;padding:12px 13px;box-shadow:0 18px 42px #0008,inset 0 1px #fff2;font:11px/1.4 Inter,Arial,sans-serif}#privacy-banner:before{content:'';position:absolute;inset:4px;pointer-events:none;border:1px solid #e4c97720;border-radius:5px}#privacy-banner p{position:relative;margin:0 0 8px;padding-right:2px}#privacy-banner strong{font-family:Georgia,serif;font-size:14px;color:#fff}#privacy-banner a{color:#efd27d;text-decoration:underline}#privacy-banner .actions{position:relative;display:flex;gap:7px;justify-content:flex-end}#privacy-banner button{cursor:pointer;min-height:36px;border:1px solid #76988c;border-radius:4px;padding:6px 9px;color:#fffaf0;background:#ffffff08;font-size:10px;font-weight:750}#privacy-banner .accept{color:#122e26;background:linear-gradient(180deg,#f0d98d,#c79b42);border-color:#f4df9e;box-shadow:inset 0 1px #fff8,0 6px 14px #0004}@media(max-width:560px){#privacy-banner{left:8px;right:8px;bottom:8px;width:auto;padding:11px}#privacy-banner p{margin-bottom:7px;font-size:11px}#privacy-banner strong{font-size:14px}#privacy-banner .actions{gap:6px}#privacy-banner button{flex:1;min-height:42px;padding:6px;font-size:10px}}";
    document.head.appendChild(style);
    const el = document.createElement("aside");
    el.id = "privacy-banner";
    el.setAttribute("role", "region");
    el.setAttribute("aria-labelledby", "privacy-title");
    el.setAttribute("aria-describedby", "privacy-description");
    el.innerHTML =
      '<p id="privacy-description"><strong id="privacy-title">Sua privacidade.</strong> Cookies opcionais ajudam a medir o uso. <a href="privacidade.html">Detalhes</a>.</p><div class="actions"><button type="button" data-choice="rejected">Só essenciais</button><button class="accept" type="button" data-choice="accepted">Aceitar opcionais</button></div>';
    document.body.appendChild(el);
    document.documentElement.classList.add("privacy-open");
    el.addEventListener("click", (e) => {
      const choice = e.target.dataset.choice;
      if (!choice) return;
      localStorage.setItem(key, choice);
      apply(choice);
      document.documentElement.classList.remove("privacy-open");
      el.remove();
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
