// =====================================================================
//  POPULAR ITEMS GALLERY
//  Photos are free-licence images from Unsplash (unsplash.com/license).
//  To use your OWN photos later: put them in the "images" folder and
//  write  { src: "images/my-photo.jpg", alt: "description" }  instead of an id.
// =====================================================================

const GALLERY = [
  { title: "iPhones & iPads", blurb: "The latest iPhone Pro Max models, dual-SIM iPhones, iPads and other electronics.", photos: [
    { id: "photo-1758327059164-396c3602b8f5", alt: "Latest orange iPhone Pro with triple camera" },
    { id: "photo-1757710436034-f1d7372ec1be", alt: "Two orange iPhones, front and back" },
    { id: "photo-1763455466215-fe9465df4a23", alt: "Pair of iPhones in orange and black" },
    { id: "photo-1726587912121-ea21fcc57ff8", alt: "Two iPhone Pro models side by side" },
    { id: "photo-1770238586572-3f3887b0dfd6", alt: "Orange iPhone Pro with Apple logo" },
    { id: "photo-1757708944594-3c0838f945ce", alt: "Collection of iPhones in a circle" },
    { id: "photo-1759588071781-2c3ba9128497", alt: "Silver iPhone Pro, back view" },
    { id: "photo-1585790051609-09928c362a42", alt: "Two iPads" },
    { id: "photo-1544244015-0df4b3ffc6b0", alt: "iPad with stylus" },
    { id: "photo-1548874468-025d0edfdf8b", alt: "iPad Pro home screen" },
    { id: "photo-1570117858976-9490649cbf83", alt: "iPad and Apple Pencil" }
  ]},
  { title: "Fashion & shoes", blurb: "Clothing, shoes and bags in bulk or single orders.", photos: [
    { id: "photo-1633464129147-777bdcc97c1d", alt: "Wall display of shoes" },
    { id: "photo-1532453288672-3a27e9be9efd", alt: "Shirts hanging on a rack" },
    { id: "photo-1544441893-675973e31985", alt: "White sneakers" },
    { id: "photo-1490481651871-ab68de25d43d", alt: "Clothes on wooden hangers" }
  ]},
  { title: "Hair & beauty", blurb: "Wigs, hair extensions, cosmetics and salon products.", photos: [
    { id: "photo-1515172371186-85d50c9f1fc1", alt: "Three coloured wigs" },
    { id: "photo-1700219212623-77aebb917034", alt: "Display of wigs on mannequin heads" },
    { id: "photo-1701976857871-a46363644519", alt: "Hair care products" }
  ]},
  { title: "Furniture", blurb: "Sofas, chairs, beds, office and home furniture.", photos: [
    { id: "photo-1555041469-a586c61ea9bc", alt: "Green fabric sofa" },
    { id: "photo-1512212621149-107ffe572d2f", alt: "Beige leather sofa" },
    { id: "photo-1698936061086-2bf99c7b9fc5", alt: "Grey couch with pillows" },
    { id: "photo-1601392740426-907c7b028119", alt: "Floral armchair" }
  ]},
  { title: "Tiles & building materials", blurb: "Beautiful imported marble, porcelain and ceramic tiles for floors, walls and bathrooms, plus other building supplies.", photos: [
    { id: "photo-1744025098626-66c0b9cb1ba8", alt: "Elegant bathroom with marble wall tiles" },
    { id: "photo-1754359667692-34308056cf0e", alt: "Modern bathroom with green marble tiles" },
    { id: "photo-1706629503586-2731f65587ae", alt: "Polished white marble floor tiles" },
    { id: "photo-1767554261805-95185e9ecf87", alt: "Geometric marble and stone floor pattern" },
    { id: "photo-1790501028719-1c18dc4a895d", alt: "Circular marble floor inlay" },
    { id: "photo-1754788358645-d6e6cca12e25", alt: "Marble vanity countertop" },
    { id: "photo-1753605788101-04d1e653e74a", alt: "Luxury bathroom with stone tiles" },
    { id: "photo-1519122114654-d665e49b122e", alt: "Colourful floral ceramic tiles" },
    { id: "photo-1541471943749-e5976783f6c3", alt: "Decorative patterned ceramic tiles" }
  ]},
  { title: "Machinery & tools", blurb: "Industrial machines, power tools and equipment.", photos: [
    { id: "photo-1717386255773-1e3037c81788", alt: "Large industrial machine" },
    { id: "photo-1593106410288-caf65eca7c9d", alt: "Laser cutting machine" },
    { id: "photo-1592054286113-649ba108e968", alt: "Cordless power drill" },
    { id: "photo-1603138519910-9a3813cc0ca6", alt: "Metal machine" }
  ]},
  { title: "Solar & energy", blurb: "Solar panels, batteries, inverters and lighting.", photos: [
    { id: "photo-1509391366360-2e959784a276", alt: "Solar panels on a field" },
    { id: "photo-1508514177221-188b1cf16e9d", alt: "Solar panel under blue sky" },
    { id: "photo-1658298775754-5839ffd434cc", alt: "Solar panels on a roof" },
    { id: "photo-1655300256335-beef51a914fe", alt: "House with solar panels" }
  ]},
  { title: "Cars & vehicles", blurb: "Cars from auctions and dealers in the USA, Germany and China.", photos: [
    { id: "photo-1761917904658-2a9ecb84a169", alt: "Car carrier truck transporting vehicles" },
    { id: "photo-1568738009519-52d1bad47858", alt: "Assorted colour cars" },
    { id: "photo-1593280405106-e438ebe93f5b", alt: "Cars parked in a lot" },
    { id: "photo-1764200458388-65c4b0c19a95", alt: "Car on a flatbed truck" }
  ]},
  { title: "Auto parts", blurb: "Tyres, rims, engines and spare parts.", photos: [
    { id: "photo-1571335746824-742511d49bce", alt: "Four vehicle tyres" },
    { id: "photo-1601411101851-ea0e07766235", alt: "Car wheel" },
    { id: "photo-1527266258038-6ae3e089a609", alt: "Assorted tyres" },
    { id: "photo-1599082267768-4815b2ea6bd2", alt: "Mechanic holding a car part" }
  ]},
  { title: "Home & kitchen", blurb: "Cookware, appliances, dinnerware and home items.", photos: [
    { id: "photo-1584990347163-2b86b71390d6", alt: "Red and silver cooking pots" },
    { id: "photo-1556909212-d5b604d0c90d", alt: "Cooking pots and pepper mill" },
    { id: "photo-1580929753603-10519c6e480a", alt: "Stainless steel pots on a stove" },
    { id: "photo-1556910585-09baa3a3998e", alt: "Ceramic dinnerware on a rack" }
  ]},
  { title: "Baby & toys", blurb: "Toys, learning materials and baby products.", photos: [
    { id: "photo-1596461404969-9ae70f2830c1", alt: "Wooden train set" },
    { id: "photo-1545558014-8692077e9b5c", alt: "Colourful learning toys" },
    { id: "photo-1558060370-d644479cb6f7", alt: "Assorted toys on a table" },
    { id: "photo-1618842676088-c4d48a6a7c9d", alt: "Colourful plastic toy" }
  ]},
  { title: "…and much more", blurb: "If it's made or sold in China, Germany or the USA, we can ship it to Ghana.", photos: [
    { id: "photo-1605732562742-3023a888e56e", alt: "Stacked shipping containers" },
    { id: "photo-1578575437130-527eed3abbec", alt: "Cargo ships at the pier" },
    { id: "photo-1590497008432-598f04441de8", alt: "Busy shipping port with cranes" },
    { id: "photo-1493946740644-2d8a1f1a6aff", alt: "Colourful intermodal containers" }
  ]}
];
