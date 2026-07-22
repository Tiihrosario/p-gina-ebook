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
