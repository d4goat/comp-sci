interface listItemType {
  id: number;
  background: string;
  title: string;
  description: string;
  additionalDesc: string;
  notes: string;
  latitude: number;
  longitude: number;
  street: string;
  thumbnail: string;
  image: string[];
  category: string;
  slug: string;
  openTime: { open: string; close: string };
  htm: { label: string; price: string }[];
  visitTips: string[];
  video: string;
  mapsUrl: string;
}

type NextItemResult = {
  item: listItemType;
  stayInCategory: boolean;
};

const listItem: listItemType[] = [
  {
    id: 1,
    background: "bg-volcanic",
    title: "Kawah Ijen",
    slug: "kawah-ijen",
    description: `Kawah Ijen adalah salah satu destinasi wisata alam paling memesona yang terletak di perbatasan Kabupaten Banyuwangi dan Kabupaten Bondowoso, Jawa Timur. Berada di ketinggian 2.386 meter di atas permukaan laut, kawah ini merupakan danau air asam terbesar di dunia yang memancarkan warna hijau toska yang sangat memukau.`,
    additionalDesc: `Daya tarik utama yang membuat Kawah Ijen mendunia adalah fenomena Api Biru (Blue Fire), sebuah keajaiban alam langka yang hanya ada dua di dunia. Api biru ini terbentuk dari gas belerang bertekanan tinggi yang keluar dari celah batuan dengan suhu mencapai 600°C, lalu menyala saat bersentuhan dengan udara. Fenomena magis ini hanya dapat dilihat pada dini hari sebelum matahari terbit.`,
    notes: `Selain keindahan alamnya, Kawah Ijen juga menjadi tempat mata pencaharian bagi para penambang belerang tradisional. Mereka dengan tangguh memikul puluhan kilogram bongkahan belerang kuning dari dasar kawah melintasi medan yang curam dan berasap tebal.`,
    latitude: -8.05856,
    longitude: 114.24246,
    street:
      "Desa Tamansari, Kecamatan Licin, Kabupaten Banyuwangi, Jawa Timur 68454",
    thumbnail: "kawah-2_djtlzq",
    image: ["kawah-1_mvex8l", "kawah-2_djtlzq", "kawah-3_vp3hqu"],
    category: "Volcanic",
    openTime: { open: "02:00", close: "12:00" },
    htm: [
      { label: "Domestik", price: "Rp5.000 - Rp7.500" },
      { label: "Asing", price: "Rp100.000 - Rp375.000" },
    ],
    visitTips: [
      "Wajib membawa masker gas",
      "Gunakan jaket tebal",
      "Pendakian dimulai pukul 01.00-02.00 WIB",
    ],
    video:
      "https://res.cloudinary.com/divkjbs7y/video/upload/v1782722169/KAWAH_IJEN_1_nxtrhr.mp4",
    mapsUrl: "https://maps.app.goo.gl/D9AmHmn2mujaQ1Ff6",
  },
  {
    id: 2,
    background: "bg-forest",
    title: "Taman Nasional Baluran",
    slug: "taman-nasional-baluran",
    description:
      "Taman Nasional Baluran, yang dijuluki 'Africa van Java', merupakan kawasan konservasi unik yang menyuguhkan padang savana luas, hutan musim, dan ekosistem pesisir. Di sini, pengunjung dapat menyaksikan bagaimana padang rumput keemasan bertemu dengan latar belakang Gunung Baluran yang gagah, memberikan sensasi petualangan safari layaknya di benua Afrika.",
    additionalDesc:
      "Savana Bekol seluas 10.000 hektar menjadi jantung dari taman nasional ini. Saat musim kemarau, savana ini berubah menjadi hamparan padang cokelat keemasan yang menawan. Kawasan ini menjadi habitat asli bagi kawanan banteng Jawa, kerbau liar, rusa, hingga burung merak yang sering menampakkan diri di pagi dan sore hari saat mereka keluar mencari makan.",
    notes:
      "Selain savana, pengunjung bisa mengunjungi Pantai Bama yang memiliki hutan mangrove indah dan spot snorkeling. Terdapat pula situs sejarah berupa Gua Jepang peninggalan Perang Dunia II di area Batangan. Perlu diingat bahwa seluruh kawasan ini dilindungi, sehingga dilarang keras menerbangkan drone tanpa izin khusus untuk menjaga ketenangan satwa liar.",
    latitude: -7.831066570475814,
    longitude: 114.3874517202389,
    street: "Jl. Raya Banyuwangi - Situbondo Km. 35, Banyuputih, Situbondo",
    thumbnail: "baluran-2_qzquoh",
    image: ["baluran-1_jys8fw", "baluran-2_qzquoh", "baluran-3_hhgizs"],
    category: "Forest",
    openTime: { open: "07:30", close: "16:00" },
    htm: [
      { label: "Domestik", price: "Rp16.500 - Rp18.500" },
      { label: "Asing", price: "Rp150.000 - Rp225.000" },
    ],
    visitTips: [
      "Gunakan kendaraan pribadi",
      "Datang pagi hari",
      "Drone dilarang keras",
    ],
    video:
      "https://res.cloudinary.com/divkjbs7y/video/upload/v1782721857/taman_nasional_baluran_domnfv.mp4",
    mapsUrl: "https://maps.app.goo.gl/jePP2GQ8G6HXzcDQ8",
  },
  {
    id: 3,
    background: "bg-forest",
    title: "De Djawatan Forest",
    slug: "de-djawatan-forest",
    description:
      "De Djawatan Forest adalah destinasi ekowisata yang menyuguhkan pemandangan deretan pohon Trembesi raksasa berusia ratusan tahun dengan dahan yang menjalar lebar membentuk kanopi alami. Dengan cahaya matahari yang menembus celah dedaunan, hutan ini menciptakan suasana magis yang tenang dan fotogenik, sering dijuluki sebagai destinasi bergaya negeri dongeng di Banyuwangi.",
    additionalDesc:
      "Terdapat lebih dari 800 pohon trembesi tua yang keliling batangnya mencapai beberapa meter. Awalnya kawasan ini merupakan tempat penimbunan kayu milik Perhutani, namun kini telah bertransformasi menjadi ruang terbuka hijau yang sangat teduh. Akar-akar pohon yang menonjol dan lumut yang menyelimuti batang memberikan kesan hutan purba yang sangat eksotis bagi para fotografer.",
    notes:
      "Kawasan ini menjadi favorit untuk wisata keluarga karena dilengkapi dengan fasilitas seperti delman, penyewaan ATV, dan kafe-kafe kecil di bawah pohon. Udara di sini terasa sangat segar karena pohon trembesi dikenal sebagai penyerap karbon yang sangat efektif. Pastikan untuk menjaga kebersihan dan tidak merusak kulit pohon selama berada di dalam kawasan.",
    latitude: -8.432737009830108,
    longitude: 114.22656196726852,
    street: "Desa Purwosari, Benculuk, Kec. Cluring, Banyuwangi",
    thumbnail: "djawatan-3_wtlefc",
    image: ["djawatan-1_wgvbba", "djawatan-2_g4rfhk", "djawatan-3_wtlefc"],
    category: "Forest",
    openTime: { open: "08:00", close: "16:30" },
    htm: [{ label: "Tiket Masuk", price: "Rp7.500" }],
    visitTips: [
      "Datang pagi hari untuk cahaya dramatis",
      "Tersedia wahana ATV dan delman",
    ],
    video:
      "https://res.cloudinary.com/divkjbs7y/video/upload/v1783007942/lv_0_20260702225440_a4vvmw.mp4",
    mapsUrl: "https://maps.app.goo.gl/NqdfMC2DMmVCF8149",
  },
  {
    id: 4,
    background: "bg-golden",
    title: "Pantai Pulau Merah",
    slug: "pantai-pulau-merah",
    description:
      "Pantai Pulau Merah adalah pesisir dengan pasir putih halus yang membentang luas di selatan Banyuwangi. Keunikan utamanya adalah bukit setinggi 200 meter dengan tanah berwarna merah bata yang berdiri kokoh di lepas pantai, menciptakan panorama ikonik yang tidak ditemukan di pantai lain di sepanjang pesisir selatan Jawa.",
    additionalDesc:
      "Nama 'Pulau Merah' diambil dari warna tanah bukit tersebut yang tampak kemerahan saat terkena cahaya matahari. Saat air laut surut, pengunjung bahkan bisa berjalan kaki menyeberangi jalur pasir menuju pulau kecil tersebut. Ombak di pantai ini memiliki karakteristik yang stabil, menjadikannya lokasi favorit bagi peselancar internasional maupun pemula untuk mengasah kemampuan surfing.",
    notes:
      "Selain sebagai spot olahraga air, pantai ini memiliki nilai spiritual dengan adanya Pura Tawang Alun di dekat area parkir. Waktu terbaik untuk menikmati keindahan maksimal adalah sore hari saat matahari terbenam (sunset), di mana langit akan memancarkan warna jingga kemerahan yang sangat kontras dengan perbukitan merah, memberikan pengalaman estetik yang tak terlupakan.",
    latitude: -8.59948199728053,
    longitude: 114.02942841384646,
    street: "Dusun Pancer, Desa Sumberagung, Kec. Pesanggaran, Banyuwangi",
    thumbnail: "images_3_hj37sp",
    image: ["images_3_hj37sp", "11-2_ybksrx", "images_4_prtoow"],
    category: "Sunset",
    openTime: { open: "07:00", close: "17:00" },
    htm: [{ label: "Tiket Masuk", price: "Rp10.000" }],
    visitTips: ["Sewa papan surfing tersedia", "Gunakan jalan utama nasional"],
    video:
      "https://res.cloudinary.com/divkjbs7y/video/upload/v1782721864/Pantai_Pulau_Merah_vdrmpz.mp4",
    mapsUrl: "https://maps.app.goo.gl/YzaBwxFey8zUTZHn8",
  },
  {
    id: 5,
    background: "bg-golden",
    title: "Taman Nasional Alas Purwo",
    slug: "taman-nasional-alas-purwo",
    description:
      "Taman Nasional Alas Purwo merupakan hutan tertua sekaligus salah satu kawasan konservasi paling krusial di Pulau Jawa. Dikenal memiliki keanekaragaman hayati yang sangat tinggi, taman nasional ini menyimpan kombinasi bentang alam mulai dari hutan bambu, karst, savana, hingga jejeran pantai eksotis yang berhadapan langsung dengan deburan ombak Samudra Hindia.",
    additionalDesc:
      "Alas Purwo memiliki Pantai Plengkung atau G-Land, salah satu pantai dengan ombak terbaik dunia untuk berselancar. Selain sisi bahari, terdapat Savana Sadengan yang menjadi pusat pengamatan satwa liar seperti banteng Jawa, merak, dan kawanan rusa di habitat asli mereka. Keseimbangan ekosistem di kawasan ini masih sangat terjaga berkat statusnya sebagai cagar biosfer dunia.",
    notes:
      "Masyarakat lokal meyakini kawasan ini sebagai hutan yang menyimpan nilai spiritual tinggi dan dulunya merupakan pelarian terakhir masyarakat Majapahit. Karena areanya sangat luas dan aksesnya cukup menantang, pengunjung sangat disarankan menggunakan kendaraan pribadi yang tangguh. Sinyal seluler di dalam area sangat minim, sehingga siapkan peta fisik atau unduh peta offline sebelum berangkat.",
    latitude: -8.681888265869429,
    longitude: 114.45305751687772,
    street: "Kec. Tegaldlimo & Purwoharjo, Banyuwangi",
    thumbnail: "images_xg4igo",
    image: ["images_xg4igo", "images_1_zjpp0i", "alas-purwo_yvznz6"],
    category: "Sunset",
    openTime: { open: "07:30", close: "16:00" },
    htm: [
      { label: "Domestik", price: "Rp15.000 - Rp17.500" },
      { label: "Asing", price: "Rp160.000 - Rp235.000" },
    ],
    visitTips: [
      "Wajib gunakan kendaraan pribadi",
      "Sinyal HP sulit",
      "Siapkan peta fisik",
    ],
    video:
      "https://res.cloudinary.com/divkjbs7y/video/upload/v1782721862/TamNas_Alas_Purwo_ev29dw.mp4",
    mapsUrl: "https://maps.app.goo.gl/ttCJ1LVuqf5tPqpXA",
  },
  {
    id: 6,
    background: "bg-ocean",
    title: "Teluk Hijau (Green Bay)",
    slug: "teluk-hijau",
    description:
      "Teluk Hijau atau Green Bay adalah surga tersembunyi yang menawarkan air laut dengan gradasi warna hijau toska yang menakjubkan akibat pantulan alga di dasar perairan dangkal. Dikelilingi oleh tebing-tebing tinggi dan pepohonan tropis yang rimbun, pantai ini menjadi destinasi idaman bagi mereka yang mencari ketenangan di tengah keasrian alam Taman Nasional Meru Betiri.",
    additionalDesc:
      "Warna hijau toska yang jernih ini menjadi daya tarik utama, menciptakan kontras yang indah dengan pasir putih bersih. Tidak jauh dari bibir pantai, terdapat Air Terjun Bidadari setinggi 8 meter. Air terjun ini memberikan sentuhan kesegaran tersendiri bagi pengunjung yang ingin membilas air asin setelah berenang, sekaligus menjadi latar belakang foto yang sangat alami.",
    notes:
      "Akses menuju lokasi membutuhkan sedikit petualangan; pengunjung dapat memilih jalur trekking hutan sejauh 1 km untuk menikmati pemandangan atau menyewa perahu dari Pantai Rajegwesi. Karena lokasinya di dalam kawasan lindung, tidak ada warung permanen di area pantai. Disarankan membawa bekal yang cukup dan selalu menjaga kebersihan demi kelestarian ekosistem sekitar.",
    latitude: -8.563429789959365,
    longitude: 113.9240106532442,
    street: "Dusun Krajan, Sarongan, Kec. Pesanggaran, Banyuwangi",
    thumbnail: "t_5d17417397ba7-960x636_iahuf4",
    image: [
      "t_5d17417397ba7-960x636_iahuf4",
      "images_2_zqposa",
      "plage-partie-ouest_hkdoyo",
    ],
    category: "Ocean",
    openTime: { open: "08:00", close: "16:00" },
    htm: [{ label: "Tiket Masuk", price: "Rp7.500" }],
    visitTips: ["Trekking hutan 1 km atau naik perahu", "Bawa bekal sendiri"],
    video:
      "https://res.cloudinary.com/divkjbs7y/video/upload/v1782721878/Teluk_Ijo_g3a14w.mp4",
    mapsUrl: "https://maps.app.goo.gl/JmFxzuwYjY5scZJE6",
  },
  {
    id: 7,
    background: "bg-ocean",
    title: "Bangsring Underwater",
    slug: "bangsring-underwater",
    description:
      "Bangsring Underwater adalah pelopor wisata bahari berbasis konservasi yang sukses mengubah kawasan yang dulunya bekas lokasi bom ikan menjadi surga bawah laut. Destinasi ini dikelola secara swadaya oleh masyarakat lokal yang kini sangat peduli pada kelestarian terumbu karang, menjadikannya salah satu ikon pariwisata edukatif terbaik di Banyuwangi.",
    additionalDesc:
      "Daya tarik utamanya adalah Rumah Apung, di mana pengunjung dapat menikmati pengalaman snorkeling dengan terumbu karang yang sangat sehat. Pengalaman yang paling dicari adalah berenang langsung bersama hiu jinak dalam keramba konservasi yang aman, didampingi oleh pemandu profesional. Tersedia juga kapal kaca bagi mereka yang ingin melihat keindahan bawah laut tanpa harus basah.",
    notes:
      "Kawasan ini menjadi gerbang utama untuk menyeberang ke Pulau Tabuhan atau Pulau Menjangan. Karena akses jalan masuk yang cukup sempit, rombongan dengan bus besar disarankan untuk berhenti di area parkir luar dan menggunakan shuttle atau kendaraan kecil. Dukungan Anda terhadap tiket masuk sangat berarti bagi keberlanjutan program pelestarian terumbu karang dan ekonomi nelayan setempat.",
    latitude: -8.054553293450311,
    longitude: 114.43097562859892,
    street: "Desa Bangsring, Kec. Wongsorejo, Banyuwangi",
    thumbnail: "bangsring-1_soky8j",
    image: [
      "bangsring-1_soky8j",
      "bangsring-5_iilzt4",
      "bangsring-2_tmoacg",
      "bangsring-3_saacdu",
      "bangsring-4_uivruj",
      "bangsring-6_byuwd4",
    ],
    category: "Ocean",
    openTime: { open: "08:30", close: "16:30" },
    htm: [
      { label: "Tiket Masuk", price: "Rp5.000" },
      { label: "Snorkeling", price: "Rp30.000" },
    ],
    visitTips: [
      "Kendaraan besar tidak bisa masuk area wisata",
      "Datang lebih awal",
    ],
    video:
      "https://res.cloudinary.com/divkjbs7y/video/upload/v1782464446/bangsring_ftas4h.mp4",
    mapsUrl: "https://maps.app.goo.gl/XFY3vTvWNSnuFoZm9",
  },
  {
    id: 8,
    background: "bg-ocean",
    title: "Pantai Boom Marina",
    slug: "pantai-boom-marina",
    description:
      "Pantai Boom Marina adalah ruang publik modern yang memadukan jejak sejarah pelabuhan penting era kolonial dengan wajah baru sebagai marina kapal pesiar yang elegan. Terletak sangat dekat dengan pusat kota, pantai ini menjadi titik temu antara sejarah, olahraga, dan gaya hidup masyarakat Banyuwangi, dengan pemandangan langsung ke Selat Bali.",
    additionalDesc:
      "Ikon utama di sini adalah Boom Bridge, jembatan melengkung bergaya spiral yang membentang di atas perairan dan menjadi lokasi favorit wisatawan untuk berswafoto. Kawasan ini sering menjadi panggung utama perhelatan besar Banyuwangi, seperti Festival Gandrung Sewu yang melibatkan ribuan penari, serta ajang internasional seperti Banyuwangi Beach Jazz Festival yang menarik banyak audiens.",
    notes:
      "Marina ini memiliki fasilitas yang sangat lengkap dan akses yang sangat ramah bagi semua kalangan. Anda bisa menikmati sunrise di pagi hari atau sunset yang dramatis saat senja tiba di satu lokasi yang sama. Karena lokasinya berada di tengah kota, pantai ini sangat mudah dijangkau dan menjadi pilihan tepat jika Anda hanya memiliki waktu singkat untuk berwisata di Banyuwangi.",
    latitude: -8.212158564312414,
    longitude: 114.38550416593793,
    street: "Jl. Ikan Cucut No. 27, Banyuwangi",
    thumbnail: "pantai-marina-2_owzuia",
    image: [
      "pantai-marina-1_cylglr",
      "pantai-marina-2_owzuia",
      "pantai-marina-3_yh8opx",
      "pantai-marina-4_eyldw3",
      "pantai-marina-5_wb8wub",
    ],
    category: "Ocean",
    openTime: { open: "05:00", close: "21:00" },
    htm: [{ label: "Tiket Masuk", price: "Rp5.000 - Rp7.500" }],
    visitTips: [
      "Cocok untuk menikmati sunrise dan sunset",
      "Lokasi sangat mudah dijangkau dari kota",
    ],
    video:
      "https://res.cloudinary.com/divkjbs7y/video/upload/v1782464356/pantai-boom_gi9tpn.mp4",
    mapsUrl: "https://maps.app.goo.gl/4W7LXuaDJ22kocgS7",
  },
];

const imageList = listItem.map((item) => item.thumbnail).toReversed();

const getItemBySlug = (slug: string) => {
  return listItem.find((item) => item.slug === slug);
};

const getItemByCategory = (category: string) =>
  listItem.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase(),
  );

const getNextListItem = (id: number): listItemType => {
  const index = listItem.findIndex((item) => item.id === id);
  if (index === listItem.length - 1) {
    return listItem[0];
  }
  return listItem[index + 1];
};

const getNextListItemByCategory = (
  id: number,
  category: string,
): NextItemResult => {
  const item = getItemByCategory(category);

  if (item.length <= 1) {
    return { item: getNextListItem(id), stayInCategory: false };
  }

  const index = item.findIndex((item) => item.id === id);
  const nextItem = index === item.length - 1 ? item[0] : item[index + 1];

  return { item: nextItem, stayInCategory: true };
};

const NAV_ITEMS = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "About", url: "/#about" },
  { id: 3, label: "List Destination", url: "/#list-destination" },
  { id: 4, label: "Trip Planner", url: "/#trip-planner" },
];

export {
  type listItemType,
  listItem,
  getNextListItem,
  getItemBySlug,
  imageList,
  getItemByCategory,
  getNextListItemByCategory,
  NAV_ITEMS,
};
