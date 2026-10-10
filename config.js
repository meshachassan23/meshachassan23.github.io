// =====================================================================
//  YOUR BUSINESS DETAILS — edit this file to update the whole website.
//  Everything in "quotes" is text. Save the file, then refresh the page.
// =====================================================================

const SITE = {
  name: "Mr. Smile Logistics & Delivery Services",
  shortName: "Mr. Smile",
  subName: "Logistics & Delivery Services",
  tagline: "Your trusted delivery partner. We buy, ship and deliver your goods from China, Germany and the USA to Ghana, safely, affordably and on time.",

  // WhatsApp number in international format, digits only, no "+" or spaces.
  whatsapp: "233247501144",
  whatsappDisplay: "+233 24 750 1144",
  // Other call numbers (leave the list empty [] to hide)
  phones: [],
  email: "meshachassan23@gmail.com",

  chinaAddress: "Nanchong, Sichuan, China",
  ghanaAddress: "Tesano, behind Lakeside Clinic, Accra, Ghana",
  hours: "",          // e.g. "Mon – Sat, 8:00 – 18:00" — leave "" to hide

  // Where you ship FROM (all go to Ghana)
  origins: ["China", "Germany", "USA"],

  // ESTIMATED shipping rates for the table + calculator.
  // The site always labels these as estimates and asks customers to request an exact quote.
  // price: null  -> the site shows "Ask us" instead of a number.
  // Put a price as a number, e.g. price: 12   (air = per kg, sea = per CBM, car = per car)
  currency: "USD",
  ratesUpdated: "",   // e.g. "October 2026" — shown next to the rates. Leave "" to hide.
  routes: {
    "China → Ghana": {
      air: { price: null, unit: "kg",  days: "7 – 14 days" },
      sea: { price: null, unit: "CBM", days: "45 – 60 days" },
      car: { price: null, unit: "car", days: "45 – 60 days" }
    },
    "Germany → Ghana": {
      air: { price: null, unit: "kg",  days: "5 – 10 days" },
      sea: { price: null, unit: "CBM", days: "30 – 45 days" },
      car: { price: null, unit: "car", days: "30 – 45 days" }
    },
    "USA → Ghana": {
      air: { price: null, unit: "kg",  days: "7 – 14 days" },
      sea: { price: null, unit: "CBM", days: "35 – 50 days" },
      car: { price: null, unit: "car", days: "35 – 50 days" }
    }
  },

  // Google Sheet web-app link for customer reviews (see apps-script/README.md).
  // Leave "" to send reviews by WhatsApp instead.
  reviewsApi: "https://script.google.com/macros/s/AKfycbwp6E0Qn-B-jKONxpXzD4MQfyHzuYq2TLAZiM9JAE7PqRRaKabNuVEQWzKC6dToRNCApw/exec",

  // Leave "" to hide a social link
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: ""
  }
};
