(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const waLink = (text) =>
    "https://wa.me/" + SITE.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");

  // ---- Fill in business details from config.js ----
  $$("[data-site]").forEach((el) => { el.textContent = SITE[el.dataset.site] || ""; });
  $$("[data-site-email]").forEach((el) => { el.textContent = SITE.email; el.href = "mailto:" + SITE.email; });
  // ---- Email: let the visitor pick their email service ----
  const subject = "Shipping enquiry";
  const body = "Hello Mr. Smile,\n\nI'd like to ship some goods to Ghana.\n\n";
  const q = (o) => Object.entries(o).map(([k, v]) => k + "=" + encodeURIComponent(v)).join("&");
  const mailLinks = {
    gmail: "https://mail.google.com/mail/?view=cm&fs=1&" + q({ to: SITE.email, su: subject, body }),
    outlook: "https://outlook.live.com/mail/0/deeplink/compose?" + q({ to: SITE.email, subject, body }),
    yahoo: "https://compose.mail.yahoo.com/?" + q({ to: SITE.email, subject, body }),
    app: "mailto:" + SITE.email + "?" + q({ subject, body })
  };
  const picker = document.createElement("dialog");
  picker.className = "mail-picker";
  picker.setAttribute("aria-label", "Choose your email");
  picker.innerHTML = `
    <div class="mp-inner">
      <button class="mp-close" type="button" aria-label="Close">&times;</button>
      <h3>Email us</h3>
      <p class="small">Choose your email. A new message to <b>${SITE.email}</b> will open, ready to write.</p>
      <div class="mp-list">
        <a class="mp-opt" href="${mailLinks.gmail}" target="_blank" rel="noopener">
          <span class="mp-ico"><svg viewBox="52 42 88 66"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg></span>
          <span><strong>Gmail</strong><small>Opens Gmail with our address filled in</small></span>
        </a>
        <a class="mp-opt" href="${mailLinks.outlook}" target="_blank" rel="noopener">
          <span class="mp-ico" style="background:#0a64d6;color:#fff;font-weight:800">O</span>
          <span><strong>Outlook / Hotmail</strong><small>Outlook.com, Hotmail and Live accounts</small></span>
        </a>
        <a class="mp-opt" href="${mailLinks.yahoo}" target="_blank" rel="noopener">
          <span class="mp-ico" style="background:#6001d2;color:#fff;font-weight:800">Y!</span>
          <span><strong>Yahoo Mail</strong><small>Opens Yahoo Mail compose</small></span>
        </a>
        <a class="mp-opt" href="${mailLinks.app}">
          <span class="mp-ico" style="background:var(--bg-soft)">✉️</span>
          <span><strong>Phone or computer mail app</strong><small>Apple Mail, Gmail app, Outlook app…</small></span>
        </a>
        <button class="mp-opt mp-copy" type="button">
          <span class="mp-ico" style="background:var(--bg-soft)">📋</span>
          <span><strong>Copy email address</strong><small>${SITE.email}</small></span>
        </button>
      </div>
    </div>`;
  document.body.appendChild(picker);
  const closePicker = () => picker.close();
  picker.querySelector(".mp-close").addEventListener("click", closePicker);
  picker.addEventListener("click", (e) => { if (e.target === picker) closePicker(); });
  $$("a.mp-opt", picker).forEach((a) => a.addEventListener("click", () => setTimeout(closePicker, 150)));
  picker.querySelector(".mp-copy").addEventListener("click", async (e) => {
    const label = e.currentTarget.querySelector("strong");
    try {
      await navigator.clipboard.writeText(SITE.email);
      label.textContent = "Copied! Paste it into your email";
    } catch (err) {
      label.textContent = SITE.email;
    }
    setTimeout(() => { label.textContent = "Copy email address"; }, 2500);
  });
  $$("[data-email-link]").forEach((el) => {
    el.href = mailLinks.gmail;          // works even if the pop-up can't open
    el.target = "_blank"; el.rel = "noopener";
    el.addEventListener("click", (e) => {
      if (typeof picker.showModal !== "function") return;
      e.preventDefault();
      picker.showModal();
    });
  });
  $$("[data-wa]").forEach((el) => { el.href = waLink("Hello Mr. Smile, I'd like to ship some goods to Ghana."); });

  // ---- WhatsApp: let the visitor pick how to open it ----
  const isPhone = window.matchMedia("(pointer: coarse)").matches;
  const waPicker = document.createElement("dialog");
  waPicker.className = "mail-picker wa-picker";
  waPicker.setAttribute("aria-label", "Choose how to open WhatsApp");
  document.body.appendChild(waPicker);
  const waIcon = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>';
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const openWa = (text) => {
    const t = text ? "&text=" + encodeURIComponent(text) : "";
    const opts = {
      app: `<a class="mp-opt" href="${waLink(text)}" target="_blank" rel="noopener">
          <span class="mp-ico" style="background:#25d366">${waIcon}</span>
          <span><strong>WhatsApp app</strong><small>${isPhone ? "Opens WhatsApp on this phone" : "Best on phones and tablets"}</small></span></a>`,
      web: `<a class="mp-opt" href="https://web.whatsapp.com/send?phone=${SITE.whatsapp}${t}" target="_blank" rel="noopener">
          <span class="mp-ico" style="background:#128c7e">${waIcon}</span>
          <span><strong>WhatsApp Web</strong><small>Use WhatsApp in this browser on a computer</small></span></a>`,
      desktop: `<a class="mp-opt" href="whatsapp://send?phone=${SITE.whatsapp}${t}">
          <span class="mp-ico" style="background:#075e54">${waIcon}</span>
          <span><strong>WhatsApp Desktop</strong><small>If WhatsApp is installed on this computer</small></span></a>`
    };
    const order = isPhone ? ["app", "web"] : ["web", "desktop", "app"];
    waPicker.innerHTML = `
      <div class="mp-inner">
        <button class="mp-close" type="button" aria-label="Close">&times;</button>
        <h3>Chat with us</h3>
        <p class="small">WhatsApp <b>${SITE.whatsappDisplay}</b>. Choose how you'd like to open it.</p>
        ${text ? `<p class="wa-preview"><span>Your message</span>${esc(text).replace(/\n/g, "<br>")}</p>` : ""}
        <div class="mp-list">
          ${order.map((k) => opts[k]).join("")}
          <a class="mp-opt" href="${waLink()}" target="_blank" rel="noopener">
            <span class="mp-ico" style="background:var(--bg-soft)">📞</span>
            <span><strong>Call us on WhatsApp</strong><small>Opens our chat. Tap the 📞 call button at the top.</small></span></a>
          <button class="mp-opt mp-copy" type="button">
            <span class="mp-ico" style="background:var(--bg-soft)">📋</span>
            <span><strong>Copy our number</strong><small>${SITE.whatsappDisplay}</small></span></button>
        </div>
        ${isPhone ? "" : `<div class="wa-qr"><img src="images/whatsapp-qr.jpg" alt="WhatsApp QR code"><p class="small">Or scan this with your phone's camera to chat on your phone.</p></div>`}
      </div>`;
    waPicker.querySelector(".mp-close").addEventListener("click", () => waPicker.close());
    $$("a.mp-opt", waPicker).forEach((a) => a.addEventListener("click", () => setTimeout(() => waPicker.close(), 150)));
    waPicker.querySelector(".mp-copy").addEventListener("click", async (e) => {
      const label = e.currentTarget.querySelector("strong");
      try { await navigator.clipboard.writeText(SITE.whatsappDisplay); label.textContent = "Copied!"; }
      catch (err) { label.textContent = SITE.whatsappDisplay; }
      setTimeout(() => { label.textContent = "Copy our number"; }, 2500);
    });
    if (typeof waPicker.showModal === "function") waPicker.showModal();
    else window.open(waLink(text), "_blank", "noopener");
  };
  waPicker.addEventListener("click", (e) => { if (e.target === waPicker) waPicker.close(); });

  // Every WhatsApp link on the page (including ones created later) opens the picker
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="https://wa.me/"]');
    if (!a || a.closest(".wa-picker") || typeof waPicker.showModal !== "function") return;
    e.preventDefault();
    const text = new URL(a.href).searchParams.get("text") || "";
    openWa(text);
  });
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();

  // Phone numbers + optional cards
  const phones = $("#phones");
  if (phones) {
    if (SITE.phones && SITE.phones.length) {
      phones.innerHTML = SITE.phones
        .map((p) => `<a href="tel:${p.replace(/\s/g, "")}">${p}</a>`).join("<br>");
    } else {
      $("#phones-card").remove();
    }
  }
  if ($("#ghana-card") && !SITE.ghanaAddress) $("#ghana-card").remove();
  if ($("#hours-card") && !SITE.hours) $("#hours-card").remove();

  // Social links
  const socials = $("#socials");
  if (socials) {
    Object.entries(SITE.social).forEach(([name, url]) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = name[0].toUpperCase() + name.slice(1);
      socials.appendChild(a);
    });
  }

  // ---- Mobile menu ----
  const menuBtn = $(".menu-btn"), links = $(".links");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
    $$(".links a").forEach((a) => a.addEventListener("click", () => {
      links.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  // ---- Shipping rates + calculator ----
  const fmt = (n) => SITE.currency + " " + n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const rateText = (r) => (r.price != null ? `${fmt(r.price)} / ${r.unit}` : "Ask us");
  const ratesBody = $("#rates-body");
  const routeSel = $("#calc-route");
  if (ratesBody && routeSel) {
    Object.entries(SITE.routes).forEach(([route, m]) => {
      ratesBody.insertAdjacentHTML("beforeend",
        `<tr><td><strong>${route}</strong></td>
          <td>${rateText(m.air)}<small>${m.air.days}</small></td>
          <td>${rateText(m.sea)}<small>${m.sea.days}</small></td>
          <td>${m.car ? rateText(m.car) + `<small>${m.car.days}</small>` : "–"}</td></tr>`);
      routeSel.insertAdjacentHTML("beforeend", `<option>${route}</option>`);
    });
    const methodSel = $("#calc-method"), qty = $("#calc-qty"),
          out = $("#calc-result"), unitLabel = $("#calc-unit-label");
    const upd = $("#rates-updated");
    if (upd && SITE.ratesUpdated) upd.textContent = "Estimates last updated: " + SITE.ratesUpdated + ".";
    const labels = { kg: "Weight (kg)", CBM: "Volume (CBM, cubic metres)", car: "Number of cars" };
    const methodName = { air: "Air cargo", sea: "Sea freight", car: "Car shipping" };
    const update = () => {
      const r = SITE.routes[routeSel.value][methodSel.value];
      unitLabel.textContent = labels[r.unit];
      const n = parseFloat(qty.value);
      const amount = qty.value ? `${qty.value} ${r.unit === "car" ? "car(s)" : r.unit}` : "";
      const estimate = r.price != null && n > 0 ? fmt(n * r.price) : "";
      const msg = [
        "Hello Mr. Smile, please send me an exact quote.",
        "Route: " + routeSel.value,
        "Method: " + methodName[methodSel.value],
        amount && "Amount: " + amount,
        estimate && "Website estimate: " + estimate
      ].filter(Boolean).join("\n");
      const button = `<a class="btn btn-sm" href="${waLink(msg)}" target="_blank" rel="noopener">Request my exact quote</a>`;
      if (estimate) {
        out.innerHTML = `<small class="tag">Estimate only</small><strong>≈ ${estimate}</strong>
          <span>Delivery time: ${r.days}. The actual price may be higher or lower depending on current market rates.</span>${button}`;
      } else if (r.price == null) {
        out.innerHTML = `<span>Delivery time: <b>${r.days}</b></span>
          <span>Prices for this route change often, so we give you the current price directly.</span>${button}`;
      } else {
        out.innerHTML = `<span>Enter the ${labels[r.unit].toLowerCase()} to see an estimate.</span>`;
      }
    };
    [routeSel, methodSel].forEach((el) => el.addEventListener("change", update));
    qty.addEventListener("input", update);
    $("#calc").addEventListener("submit", (e) => e.preventDefault());
    update();
  }

  // ---- Tracking ----
  const trackForm = $("#track-form");
  if (trackForm) {
    trackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = $("#track-code").value.trim().toUpperCase();
      const s = SHIPMENTS[code];
      const box = $("#track-result");
      if (!s) {
        box.innerHTML = `<div class="track-card empty">No shipment found for <strong></strong>. Check the code or
          <a href="${waLink("Hello, I need an update on shipment " + code)}" target="_blank" rel="noopener">ask us on WhatsApp</a>.</div>`;
        box.querySelector("strong").textContent = code;
        return;
      }
      const steps = STEPS.map((label, i) =>
        `<li class="${i < s.step ? "done" : i === s.step ? "active" : ""}">${label}</li>`).join("");
      box.innerHTML = `
        <div class="track-card">
          <div class="track-head">
            <div><small>Tracking code</small><strong>${code}</strong></div>
            <div><small>Route</small><strong>${s.route}</strong></div>
            <div><small>Method</small><strong>${s.method}</strong></div>
            <div><small>Last update</small><strong>${s.updated}</strong></div>
          </div>
          <p class="track-status">${STEPS[s.step]}</p>
          ${s.note ? `<p class="small">${s.note}</p>` : ""}
          <ol class="timeline">${steps}</ol>
        </div>`;
    });
  }

  // ---- Popular items gallery ----
  const tiles = $("#tiles");
  if (tiles && typeof GALLERY !== "undefined") {
    const url = (p, w) => p.src || `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=${w}&q=75`;
    GALLERY.forEach((cat, i) => {
      const b = document.createElement("button");
      b.className = "tile"; b.type = "button";
      b.innerHTML = `<img src="${url(cat.photos[0], 480)}" alt="" loading="lazy">
        <span class="tile-label">${cat.title}<small>${cat.photos.length} photos</small></span>`;
      b.addEventListener("click", () => openGallery(i));
      tiles.appendChild(b);
    });

    const lb = $("#lightbox"), img = $("#lb-img"), thumbs = $("#lb-thumbs");
    let cat = null, idx = 0;
    const show = (n) => {
      idx = (n + cat.photos.length) % cat.photos.length;
      const p = cat.photos[idx];
      img.src = url(p, 1200); img.alt = p.alt;
      $("#lb-count").textContent = `${idx + 1} / ${cat.photos.length}`;
      $$("button", thumbs).forEach((t, k) => t.classList.toggle("on", k === idx));
    };
    const openGallery = (i) => {
      cat = GALLERY[i];
      $("#lb-title").textContent = cat.title;
      $("#lb-blurb").textContent = cat.blurb;
      $("#lb-quote").href = waLink(`Hello Mr. Smile, I'd like a quote for ${cat.title.replace("…", "")}.`);
      thumbs.innerHTML = "";
      cat.photos.forEach((p, k) => {
        const t = document.createElement("button");
        t.type = "button"; t.setAttribute("aria-label", p.alt);
        t.innerHTML = `<img src="${url(p, 200)}" alt="">`;
        t.addEventListener("click", () => show(k));
        thumbs.appendChild(t);
      });
      show(0);
      lb.showModal();
    };
    $("#lb-prev").addEventListener("click", () => show(idx - 1));
    $("#lb-next").addEventListener("click", () => show(idx + 1));
    $("#lb-close").addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    // swipe on phones
    let x0 = null;
    img.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    img.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  // ---- Next shipments board ----
  const sched = $("#sched");
  if (sched && typeof SCHEDULE !== "undefined") {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const fmtDate = (d) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });
    const upcoming = SCHEDULE
      .map((s) => ({ ...s, date: new Date(s.closes + "T00:00:00") }))
      .filter((s) => !isNaN(s.date) && s.date >= today)
      .sort((a, b) => a.date - b.date);
    if (!upcoming.length) {
      sched.innerHTML = `
        <div class="sched-empty reveal">
          <div><h3>New closing dates coming soon</h3>
          <p>Ask us on WhatsApp for the next air and sea shipments from China, Germany and the USA.</p></div>
          <a class="btn" href="${waLink("Hello Mr. Smile, when is your next shipment to Ghana closing?")}" target="_blank" rel="noopener">Ask for the next date <span class="arrow">→</span></a>
        </div>`;
    } else {
      sched.innerHTML = upcoming.map((s) => {
        const days = Math.round((s.date - today) / 86400000);
        const left = days === 0 ? "Closes today" : days === 1 ? "1 day left" : `${days} days left`;
        const urgent = days <= 3;
        const msg = `Hello Mr. Smile, I want to book space on the ${s.method} from ${s.from}, closing ${fmtDate(s.date)}.`;
        return `
          <article class="sched-card reveal${urgent ? " urgent" : ""}">
            <div class="sched-top">
              <span class="sched-method">${s.method}</span>
              <span class="sched-left">${urgent ? "🔥 " : ""}${left}</span>
            </div>
            <h3>${s.from} <span>→ Ghana</span></h3>
            <dl>
              <div><dt>Closes</dt><dd>${fmtDate(s.date)}</dd></div>
              ${s.arrives ? `<div><dt>Arrives (est.)</dt><dd>${s.arrives}</dd></div>` : ""}
            </dl>
            ${s.note ? `<p class="sched-note">${s.note}</p>` : ""}
            <a class="btn btn-block" href="${waLink(msg)}" target="_blank" rel="noopener">Book space <span class="arrow">→</span></a>
          </article>`;
      }).join("");
    }
  }

  // ---- Fade sections in as they scroll into view ----
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const sibs = [...en.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
        en.target.style.transitionDelay = Math.min(sibs.indexOf(en.target), 5) * 70 + "ms";
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  // ---- Quote form -> WhatsApp ----
  const originSel = $("#quote-origin");
  if (originSel) {
    originSel.innerHTML = `<option value="">Choose…</option>` +
      SITE.origins.map((c) => `<option>${c}</option>`).join("");
  }
  const quoteType = $("#quote-type");
  if (quoteType) {
    quoteType.addEventListener("change", () => {
      $("#quote-product").placeholder = quoteType.value.startsWith("Car")
        ? "e.g. 2018 Toyota Camry, bought at Copart auction"
        : "e.g. 200 pairs of sneakers, a laptop, car parts";
    });
  }
  const quoteForm = $("#quote-form");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(quoteForm));
      const lines = [
        "*New quote request*",
        "Name: " + d.name,
        "Type: " + d.type,
        "From: " + d.origin + " → Ghana",
        "Item: " + d.product,
        d.link && "Link: " + d.link,
        d.qty && "Quantity/weight: " + d.qty,
        d.city && "Delivery city: " + d.city,
        "Shipping: " + d.method,
        d.notes && "Notes: " + d.notes
      ].filter(Boolean);
      openWa(lines.join("\n"));
    });
  }
})();
