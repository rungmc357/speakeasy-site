// Motion: videos play only while on screen; with Reduce Motion they stay on their poster frame.
document.documentElement.classList.add("js");
// On an iPhone or iPad, lead with the beta instead of the Mac download.
(() => {
  const ua = navigator.userAgent;
  const touchApple = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const mac = document.getElementById("cta-mac"), ios = document.getElementById("cta-ios");
  if (!touchApple || !mac || !ios) return;
  mac.classList.replace("primary", "ghost"); ios.classList.replace("ghost", "primary");
  mac.parentNode.insertBefore(ios, mac);
})();
(() => {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vids = document.querySelectorAll("video");
  if (still) vids.forEach(v => { v.removeAttribute("autoplay"); v.pause(); v.controls = true; });
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { reveals.forEach(el => el.classList.add("in")); return; }
  const vio = new IntersectionObserver(es => es.forEach(e => {
    if (still) return;
    if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause();
  }), { rootMargin: "200px 0px" });
  vids.forEach(v => vio.observe(v));
  const rio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); }
  }), { rootMargin: "0px 0px -6% 0px" });
  reveals.forEach(el => rio.observe(el));
})();
