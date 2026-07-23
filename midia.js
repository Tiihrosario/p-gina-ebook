(function () {
  const videos = [...document.querySelectorAll("video[data-src]")];
  if (!videos.length) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  function load(video) {
    if (video.src) return;
    video.src = video.dataset.src;
    video.load();
    if (!reduced && !saveData) video.play().catch(() => {});
  }
  if (!("IntersectionObserver" in window)) {
    videos.forEach(load);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          load(entry.target);
          if (!reduced && !saveData) entry.target.play().catch(() => {});
        } else if (!entry.target.paused) entry.target.pause();
      }),
    { rootMargin: "240px 0px", threshold: 0.08 },
  );
  videos.forEach((video) => observer.observe(video));
})();

(function () {
  const buy = document.querySelector(".mobile-buy");
  const offer = document.querySelector(".offer");
  const faq = document.querySelector(".faq-section");
  const footer = document.querySelector(".footer");
  if (!buy || !offer || !("IntersectionObserver" in window)) return;

  const visible = new Set();
  const sync = () => buy.classList.toggle("is-hidden", visible.size > 0);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      sync();
    },
    { threshold: 0.08, rootMargin: "-8% 0px -8% 0px" },
  );
  observer.observe(offer);
  if (faq) observer.observe(faq);
  if (footer) observer.observe(footer);
})();
