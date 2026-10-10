// =====================================================================
//  MR. SMILE HELP BOT — answers common questions on the website.
//  To change an answer, edit the text in BOT_ANSWERS below and publish.
//  "keywords" are words customers might type that lead to that answer.
// =====================================================================

const BOT_ANSWERS = [
  { id: "ship-time", label: "How long does shipping take?",
    keywords: ["how long", "time", "days", "weeks", "arrive", "duration", "when will", "fast"],
    answer: "Delivery times to Ghana are roughly:\n• **Air cargo:** 1–2 weeks\n• **Sea freight:** 5–8 weeks\n• **Cars:** 4–8 weeks\nTimes depend on the route (China, Germany or USA) and customs." },

  { id: "price", label: "How much does shipping cost?",
    keywords: ["price", "cost", "how much", "rate", "charge", "fee", "cbm", "per kg", "cheap", "expensive"],
    answer: "Air is priced **per kg**, sea **per CBM** (cubic metre) and cars **per vehicle**.\nPrices change with the market (fuel, shipping lines, exchange rates), so the website only shows estimates. For your **exact price**, send us a quote request and we'll reply quickly.",
    action: "quote" },

  { id: "cars", label: "Do you ship cars?",
    keywords: ["car", "cars", "vehicle", "auction", "copart", "iaai", "truck", "suv", "toyota", "benz"],
    answer: "Yes! We ship cars from the **USA, Germany and China** to Ghana: from auctions or dealers to Tema port, with clearing guidance.\nSend us the car details or auction link for a full quote.",
    action: "quote" },

  { id: "sourcing", label: "Can you buy goods for me in China?",
    keywords: ["buy", "source", "sourcing", "supplier", "alibaba", "1688", "taobao", "factory", "order for me", "purchase"],
    answer: "Yes. Send us a **photo, link or description** of what you want. We find a reliable supplier, buy it, check it, send you photos and ship it to Ghana." },

  { id: "already-bought", label: "I already bought online. Can you ship it?",
    keywords: ["already bought", "already ordered", "warehouse", "address", "amazon", "ebay", "ship my", "forward"],
    answer: "Yes. Message us for our **warehouse address** in China, Germany or the USA. Have your seller deliver there and send us the order details, and we'll handle the rest." },

  { id: "pay", label: "How do I pay?",
    keywords: ["pay", "payment", "momo", "mobile money", "bank", "deposit", "transfer", "cash"],
    answer: "Contact us on WhatsApp for our current payment options. Orders usually start after an agreed deposit, and the balance is paid before your goods are released." },

  { id: "customs", label: "Do you help with customs?",
    keywords: ["customs", "duty", "duties", "tax", "gra", "clearing", "clearance", "port", "tema"],
    answer: "Yes, we guide you through customs clearance in Ghana. Import duties and taxes set by the **Ghana Revenue Authority (GRA)** are paid by the customer, unless your quote says otherwise." },

  { id: "track", label: "Track my shipment",
    keywords: ["track", "tracking", "where is", "status", "my shipment", "my goods", "my order", "code"],
    answer: "Sure! Type your **tracking code** below (we send it to you on WhatsApp).",
    action: "track" },

  { id: "items", label: "What items do you ship?",
    keywords: ["what can", "items", "products", "goods", "phone", "iphone", "furniture", "tiles", "shoes", "bags", "solar", "electronics"],
    answer: "Almost anything legal: **iPhones & electronics, furniture, tiles, shoes, bags, machinery, solar equipment, auto parts, home goods, cars** and more.\nTap **What we ship** on the menu to see photos.",
    action: "items" },

  { id: "banned", label: "What can't you ship?",
    keywords: ["can't ship", "cannot", "prohibited", "banned", "not allowed", "illegal", "fake", "weapon"],
    answer: "We can't ship weapons, illegal drugs, **counterfeit or fake branded goods**, flammable or hazardous materials, or anything banned in the origin country or Ghana. Ask us if you're unsure." },

  { id: "location", label: "Where is your office?",
    keywords: ["where", "office", "location", "address", "tesano", "accra", "visit", "pickup", "pick up"],
    answer: "Our Ghana office is in **Tesano, behind Lakeside Clinic, Accra**. We also have an office in **Nanchong, Sichuan, China**.",
    action: "map" },

  { id: "next", label: "When is the next shipment?",
    keywords: ["next shipment", "next container", "closing", "cut off", "cutoff", "next ship", "schedule"],
    answer: "See our **Next shipments** board for closing dates, or ask us for the next air and sea departures.",
    action: "schedule" },

  { id: "human", label: "Talk to a person",
    keywords: ["person", "human", "agent", "call", "talk", "speak", "whatsapp", "contact", "phone number"],
    answer: "Of course! Tap below to chat or call us on WhatsApp. A real person replies.",
    action: "whatsapp" }
];

(function () {
  if (typeof SITE === "undefined") return;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
  const wa = (text) => "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(text);
  let mode = null;            // "track" when waiting for a tracking code
  let lastQuestion = "";

  // ---- UI ----
  const launcher = document.createElement("button");
  launcher.className = "bot-launch";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open help chat");
  launcher.innerHTML = `<img src="images/logo.svg" alt=""><span>Ask Mr. Smile</span>`;

  const panel = document.createElement("section");
  panel.className = "bot";
  panel.setAttribute("aria-label", "Mr. Smile help chat");
  panel.hidden = true;
  panel.innerHTML = `
    <header class="bot-head">
      <img src="images/logo.svg" alt="">
      <div><strong>Mr. Smile assistant</strong><small><i></i>Instant answers · real people on WhatsApp</small></div>
      <button type="button" class="bot-x" aria-label="Close chat">&times;</button>
    </header>
    <div class="bot-log" aria-live="polite"></div>
    <div class="bot-chips"></div>
    <form class="bot-input">
      <input type="text" placeholder="Type your question…" aria-label="Type your question" maxlength="200" autocomplete="off">
      <button type="submit" aria-label="Send">➤</button>
    </form>`;
  document.body.append(launcher, panel);
  const log = $(".bot-log", panel), chips = $(".bot-chips", panel), input = $("input", panel);

  const scroll = () => { log.scrollTop = log.scrollHeight; };
  const say = (html, who = "from-bot") => {
    const m = document.createElement("div");
    m.className = "bot-msg " + who;
    m.innerHTML = html;
    log.appendChild(m); scroll();
    return m;
  };
  const typing = (then) => {
    const t = say('<span class="dots"><i></i><i></i><i></i></span>', "from-bot typing");
    setTimeout(() => { t.remove(); then(); }, 550);
  };
  const setChips = (list) => {
    chips.innerHTML = "";
    list.forEach(([label, fn]) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = label;
      b.addEventListener("click", () => { say(esc(label), "me"); fn(); });
      chips.appendChild(b);
    });
  };
  const mainChips = () => setChips(BOT_ANSWERS.filter((a) => a.id !== "human").slice(0, 8)
    .map((a) => [a.label, () => answer(a)]).concat([["💬 Talk to a person", () => answer(BOT_ANSWERS.find((a) => a.id === "human"))]]));

  const actionHtml = (a) => {
    switch (a.action) {
      case "quote": return `<a class="bot-btn" href="#quote">Request exact quote</a>`;
      case "items": return `<a class="bot-btn" href="#items">See what we ship</a>`;
      case "schedule": return `<a class="bot-btn" href="#schedule">See next shipments</a>`;
      case "map": return `<a class="bot-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Lakeside+Clinic+Tesano+Accra">Open in Google Maps</a>`;
      case "whatsapp": return `<a class="bot-btn wa" href="${wa("Hello Mr. Smile, I have a question.")}" target="_blank" rel="noopener">Chat on WhatsApp</a>`;
      default: return "";
    }
  };

  const feedback = (topic) => {
    const f = say(`<span class="bot-fb">Was this helpful? <button type="button" data-v="yes">👍</button><button type="button" data-v="no">👎</button></span>`, "from-bot fb");
    f.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      f.innerHTML = b.dataset.v === "yes" ? "Glad I could help! 😊" : "Sorry about that.";
      if (b.dataset.v === "yes") {
        say(`If you've shipped with us, we'd love a review! <a class="bot-btn" href="#reviews">⭐ Rate us</a>`);
      } else {
        say(`Let a real person help you on WhatsApp: <a class="bot-btn wa" href="${wa("Hello Mr. Smile, I asked your website assistant: \"" + (lastQuestion || topic) + "\" but need more help.")}" target="_blank" rel="noopener">Ask on WhatsApp</a>`);
      }
    }));
  };

  const answer = (a) => {
    mode = a.action === "track" ? "track" : null;
    typing(() => {
      say(fmt(a.answer) + (a.action && a.action !== "track" ? "<br>" + actionHtml(a) : ""));
      if (a.action === "track") { input.placeholder = "Enter tracking code, e.g. DEMO123"; input.focus(); }
      else feedback(a.label);
      mainChips();
    });
  };

  const track = (code) => {
    mode = null; input.placeholder = "Type your question…";
    const c = code.trim().toUpperCase();
    const s = typeof SHIPMENTS !== "undefined" ? SHIPMENTS[c] : null;
    typing(() => {
      if (!s) {
        say(`I couldn't find a shipment with code <b>${esc(c)}</b>. Please check the code, or ask us directly. <a class="bot-btn wa" href="${wa("Hello, I need an update on shipment " + c)}" target="_blank" rel="noopener">Ask on WhatsApp</a>`);
      } else {
        const step = (typeof STEPS !== "undefined" && STEPS[s.step]) || "";
        say(`📦 <b>${esc(c)}</b>: ${esc(s.route)} · ${esc(s.method)}<br>Status: <b>${esc(step)}</b>${s.note ? "<br>" + esc(s.note) : ""}<br><small>Last update: ${esc(s.updated)}</small><br><a class="bot-btn" href="#track">See full timeline</a>`);
        feedback("tracking");
      }
      mainChips();
    });
  };

  const match = (text) => {
    const t = " " + text.toLowerCase().replace(/[^a-z0-9' ]+/g, " ") + " ";
    let best = null, bestScore = 0;
    BOT_ANSWERS.forEach((a) => {
      let score = 0;
      a.keywords.forEach((k) => { if (t.includes(k.includes(" ") ? k : " " + k)) score += k.split(" ").length + 1; });
      if (score > bestScore) { bestScore = score; best = a; }
    });
    return best;
  };

  $(".bot-input", panel).addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    say(esc(text), "me");
    lastQuestion = text;
    if (mode === "track" || /^[a-z]{2,}\d{2,}$/i.test(text.replace(/\s/g, ""))) return track(text.replace(/\s/g, ""));
    const a = match(text);
    if (a) return answer(a);
    typing(() => {
      say(`I'm not sure about that one, but our team can answer it. 🙂<br><a class="bot-btn wa" href="${wa("Hello Mr. Smile, " + text)}" target="_blank" rel="noopener">Ask on WhatsApp</a>`);
      mainChips();
    });
  });

  // links inside the chat close it on small screens so the page is visible
  log.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a && window.innerWidth < 720) toggle(false);
  });

  let started = false;
  const toggle = (open) => {
    panel.hidden = !open;
    launcher.classList.toggle("open", open);
    document.body.classList.toggle("bot-open", open);
    if (open && !started) {
      started = true;
      say(`Hi! 👋 I'm the Mr. Smile assistant. I can answer questions about shipping to Ghana, prices, cars, tracking and more.<br>Tap a question or type your own.`);
      mainChips();
    }
    if (open && window.innerWidth >= 720) input.focus();
  };
  launcher.addEventListener("click", () => toggle(panel.hidden));
  $(".bot-x", panel).addEventListener("click", () => toggle(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) toggle(false); });
})();
