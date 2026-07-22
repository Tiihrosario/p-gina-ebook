(function () {
  const params = new URLSearchParams(location.search),
    names = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
    ];
  const campaign = {};
  names.forEach((n) => {
    const v = params.get(n);
    if (v) {
      sessionStorage.setItem("raem_" + n, v);
      campaign[n] = v;
    } else {
      const old = sessionStorage.getItem("raem_" + n);
      if (old) campaign[n] = old;
    }
  });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "landing_view", campaign });
  document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href*="pay.kiwify.com.br"]');
    if (!link) return;
    const url = new URL(link.href);
    Object.entries(campaign).forEach(([k, v]) => {
      if (!url.searchParams.has(k)) url.searchParams.set(k, v);
    });
    link.href = url.toString();
    window.dataLayer.push({
      event: "begin_checkout",
      currency: "BRL",
      value: 147,
      checkout_provider: "kiwify",
      cta_location: link.dataset.cta || "nao_identificado",
    });
    if (typeof window.gtag === "function") {
      window.gtag("event", "begin_checkout", {
        currency: "BRL",
        value: 147,
        cta_location: link.dataset.cta || "nao_identificado",
        items: [{ item_name: "Método RAEM", price: 147, quantity: 1 }],
      });
    }
  });
})();

// GA4: rastreamento de rolagem e de visualização de seções.
// Mostra onde as pessoas param de rolar e quais seções elas realmente veem.
// Respeita o consentimento: o gtag envia sinais sem cookies quando negado.
(function () {
  function track(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, params));
    }
  }

  // Seções-chave do funil (id no HTML -> nome legível no relatório)
  const secoes = [
    ["inicio", "hero"],
    ["conteudo", "o_que_recebe"],
    ["metodo", "metodo"],
    ["depoimentos", "depoimentos"],
    ["oferta", "oferta"],
  ];
  if ("IntersectionObserver" in window) {
    const vistas = new Set();
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !vistas.has(e.target.id)) {
            vistas.add(e.target.id);
            const par = secoes.find(function (s) { return s[0] === e.target.id; });
            track("view_section", { section: par ? par[1] : e.target.id });
          }
        });
      },
      { threshold: 0.4 },
    );
    secoes.forEach(function (s) {
      const el = document.getElementById(s[0]);
      if (el) obs.observe(el);
    });
  }

  // Profundidade de rolagem: 25% / 50% / 75% / 100%
  const marcos = [25, 50, 75, 100];
  const disparados = new Set();
  function aoRolar() {
    const doc = document.documentElement;
    const alturaRolavel = doc.scrollHeight - window.innerHeight;
    if (alturaRolavel <= 0) return;
    const pct = ((doc.scrollTop || window.pageYOffset) / alturaRolavel) * 100;
    marcos.forEach(function (m) {
      if (pct >= m && !disparados.has(m)) {
        disparados.add(m);
        track("scroll_depth", { percent: m });
      }
    });
    if (disparados.size === marcos.length) {
      window.removeEventListener("scroll", aoRolar);
    }
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
})();
