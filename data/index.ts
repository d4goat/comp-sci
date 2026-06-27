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
  category: string;
}

const listItem: listItemType[] = [
  {
    id: 1,
    background: "bg-volcanic",
    title: "Kawah Ijen",
    description: `Kawah Ijen adalah salah satu destinasi wisata alam paling memesona yang terletak di perbatasan Kabupaten Banyuwangi dan Kabupaten Bondowoso, Jawa Timur. Berada di ketinggian 2.386 meter di atas permukaan laut, kawah ini merupakan danau air asam terbesar di dunia yang memancarkan warna hijau toska yang sangat memukau.`,
    additionalDesc: `Daya tarik utama yang membuat Kawah Ijen mendunia adalah fenomena Api Biru (Blue Fire), sebuah keajaiban alam langka yang hanya ada dua di dunia. Api biru ini terbentuk dari gas belerang bertekanan tinggi yang keluar dari celah batuan dengan suhu mencapai 600°C, lalu menyala saat bersentuhan dengan udara. Fenomena magis ini hanya dapat dilihat pada dini hari sebelum matahari terbit.`,
    notes: `Selain keindahan alamnya, Kawah Ijen juga menjadi tempat mata pencaharian bagi para penambang belerang tradisional. Mereka dengan tangguh memikul puluhan kilogram bongkahan belerang kuning dari dasar kawah melintasi medan yang curam dan berasap tebal.`,
    longitude: -8.058,
    latitude: 114.242,
    street:
      "Jl. Kawah Ijen, Plalangan I, Kalianyar, Kec. Ijen, Kabupaten Bondowoso, Jawa Timur 68288",
    thumbnail: "/images/kawah-ijen.jpg",
    category: "Volcanic",
  },
  {
    id: 2,
    background: "bg-forest",
    title: "Kawah Ijen",
    description: `Kawah Ijen adalah salah satu destinasi wisata alam paling memesona yang terletak di perbatasan Kabupaten Banyuwangi
        dan Kabupaten Bondowoso, Jawa Timur. Berada di ketinggian 2.386 meter di atas permukaan laut, kawah ini merupakan danau air asam terbesar 
        di dunia yang memancarkan warna hijau toska yang sangat memukau.`,
    additionalDesc: `Daya tarik utama yang membuat Kawah Ijen mendunia adalah fenomena Api Biru (Blue Fire), sebuah keajaiban alam langka yang hanya ada dua di dunia.
         Api biru ini terbentuk dari gas belerang bertekanan tinggi yang keluar dari celah batuan dengan suhu mencapai 600°C, lalu menyala saat bersentuhan dengan udara. Fenomena magis ini hanya dapat dilihat pada dini hari sebelum matahari terbit.`,
    notes: `Selain keindahan alamnya, Kawah Ijen juga menjadi tempat mata pencaharian bagi para penambang belerang tradisional. Mereka dengan tangguh memikul puluhan kilogram bongkahan belerang kuning dari dasar kawah melintasi medan yang curam dan berasap tebal.`,
    latitude: -8.058,
    longitude: 114.242,
    street:
      "Jl. Kawah Ijen, Plalangan I, Kalianyar, Kec. Ijen, Kabupaten Bondowoso, Jawa Timur 68288",
    thumbnail: "/images/kawah-ijen.jpg",
    category: "Forest",
  },
  {
    id: 3,
    background: "bg-volcanic",
    title: "Kawah Ijen",
    description: `Kawah Ijen adalah salah satu destinasi wisata alam paling memesona yang terletak di perbatasan Kabupaten Banyuwangi
        dan Kabupaten Bondowoso, Jawa Timur. Berada di ketinggian 2.386 meter di atas permukaan laut, kawah ini merupakan danau air asam terbesar 
        di dunia yang memancarkan warna hijau toska yang sangat memukau.`,
    additionalDesc: `Daya tarik utama yang membuat Kawah Ijen mendunia adalah fenomena Api Biru (Blue Fire), sebuah keajaiban alam langka yang hanya ada dua di dunia.
         Api biru ini terbentuk dari gas belerang bertekanan tinggi yang keluar dari celah batuan dengan suhu mencapai 600°C, lalu menyala saat bersentuhan dengan udara. Fenomena magis ini hanya dapat dilihat pada dini hari sebelum matahari terbit.`,
    notes: `Selain keindahan alamnya, Kawah Ijen juga menjadi tempat mata pencaharian bagi para penambang belerang tradisional. Mereka dengan tangguh memikul puluhan kilogram bongkahan belerang kuning dari dasar kawah melintasi medan yang curam dan berasap tebal.`,
    latitude: -8.058,
    longitude: 114.242,
    street:
      "Jl. Kawah Ijen, Plalangan I, Kalianyar, Kec. Ijen, Kabupaten Bondowoso, Jawa Timur 68288",
    thumbnail: "/images/kawah-ijen.jpg",
    category: "Volcanic",
  },
  {
    id: 4,
    background: "bg-ocean",
    title: "Kawah Ijen",
    description: `Kawah Ijen adalah salah satu destinasi wisata alam paling memesona yang terletak di perbatasan Kabupaten Banyuwangi
        dan Kabupaten Bondowoso, Jawa Timur. Berada di ketinggian 2.386 meter di atas permukaan laut, kawah ini merupakan danau air asam terbesar 
        di dunia yang memancarkan warna hijau toska yang sangat memukau.`,
    additionalDesc: `Daya tarik utama yang membuat Kawah Ijen mendunia adalah fenomena Api Biru (Blue Fire), sebuah keajaiban alam langka yang hanya ada dua di dunia.
         Api biru ini terbentuk dari gas belerang bertekanan tinggi yang keluar dari celah batuan dengan suhu mencapai 600°C, lalu menyala saat bersentuhan dengan udara. Fenomena magis ini hanya dapat dilihat pada dini hari sebelum matahari terbit.`,
    notes: `Selain keindahan alamnya, Kawah Ijen juga menjadi tempat mata pencaharian bagi para penambang belerang tradisional. Mereka dengan tangguh memikul puluhan kilogram bongkahan belerang kuning dari dasar kawah melintasi medan yang curam dan berasap tebal.`,
    latitude: -8.058,
    longitude: 114.242,
    street:
      "Jl. Kawah Ijen, Plalangan I, Kalianyar, Kec. Ijen, Kabupaten Bondowoso, Jawa Timur 68288",
    thumbnail: "/images/kawah-ijen.jpg",
    category: "Ocean",
  },
  {
    id: 5,
    background: "bg-golden",
    title: "Kawah Ijen",
    description: `Kawah Ijen adalah salah satu destinasi wisata alam paling memesona yang terletak di perbatasan Kabupaten Banyuwangi
        dan Kabupaten Bondowoso, Jawa Timur. Berada di ketinggian 2.386 meter di atas permukaan laut, kawah ini merupakan danau air asam terbesar 
        di dunia yang memancarkan warna hijau toska yang sangat memukau.`,
    additionalDesc: `Daya tarik utama yang membuat Kawah Ijen mendunia adalah fenomena Api Biru (Blue Fire), sebuah keajaiban alam langka yang hanya ada dua di dunia.
         Api biru ini terbentuk dari gas belerang bertekanan tinggi yang keluar dari celah batuan dengan suhu mencapai 600°C, lalu menyala saat bersentuhan dengan udara. Fenomena magis ini hanya dapat dilihat pada dini hari sebelum matahari terbit.`,
    notes: `Selain keindahan alamnya, Kawah Ijen juga menjadi tempat mata pencaharian bagi para penambang belerang tradisional. Mereka dengan tangguh memikul puluhan kilogram bongkahan belerang kuning dari dasar kawah melintasi medan yang curam dan berasap tebal.`,
    latitude: -8.058,
    longitude: 114.242,
    street:
      "Jl. Kawah Ijen, Plalangan I, Kalianyar, Kec. Ijen, Kabupaten Bondowoso, Jawa Timur 68288",
    thumbnail: "/images/kawah-ijen.jpg",
    category: "Sunset",
  },
];

const getNextListItem = (id: number): listItemType | undefined => {
  const index = listItem.findIndex((item) => item.id === id);
  if (index === listItem.length - 1) {
    return listItem[0];
  }
  return listItem[index + 1];
};

export { listItem, getNextListItem };
