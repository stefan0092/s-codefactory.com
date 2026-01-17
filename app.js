(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Kleine KPI-Animation (optisch “alive”)
  const animate = (id, target, suffix = "", duration = 700) => {
    const el = document.getElementById(id);
    if (!el) return;
    const start = 0;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const val = Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      el.textContent = `${val}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  animate("kpi-ship", 24);
  animate("kpi-speed", 97, "%");
  animate("kpi-ux", 18);

  // Form: ohne Backend -> mailto fallback + Status
  window.scfSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById("formStatus");
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Anfrage über Website – ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}\n`);
    const to = "hello@s-codefactory.com";

    if (status) status.textContent = "Öffne E-Mail-App…";

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      if (status) status.textContent = "Wenn sich dein Mail-Programm nicht geöffnet hat, schreib direkt an hello@s-codefactory.com.";
    }, 600);

    return false;
  };
})();
