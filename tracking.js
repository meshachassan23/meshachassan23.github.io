// =====================================================================
//  SHIPMENT TRACKING
//  Add or update one entry per shipment, then save (and upload to GitHub).
//
//  IMPORTANT: once the site is on GitHub this file is PUBLIC.
//  Do NOT put customer names, phone numbers or addresses here —
//  only the tracking code, route and status.
//
//  "step" is a number from the STEPS list below (0 = first step).
// =====================================================================

const STEPS = [
  "Order received",
  "Purchased from supplier",
  "Arrived at our China warehouse",
  "Inspected & packed",
  "Shipped from China",
  "Arrived at destination port / airport",
  "Customs cleared",
  "Ready for pickup / out for delivery",
  "Delivered"
];

const SHIPMENTS = {
  "DEMO123": {
    route: "China → Accra",
    method: "Sea freight",
    step: 4,
    updated: "2026-09-28",
    note: "Container loaded on vessel. Estimated arrival in 5 weeks."
  },
  "DEMO456": {
    route: "USA → Kumasi",
    method: "Air cargo",
    step: 8,
    updated: "2026-09-20",
    note: "Delivered. Thank you for your business!"
  }
};
