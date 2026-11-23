export interface EcommerceProduct {
  asin: string;
  title: string;
  imageUrl: string;
  url: string;
}

export const ecommerceProducts: EcommerceProduct[] = [
  {
    asin: "B09Q69PL8C",
    title: "Featured product",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/718i8jzVeNL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/dp/B09Q69PL8C?ref=myi_title_dp",
  },
  {
    asin: "B0CDVDPFF6",
    title: "Football-themed product",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71mWRpiZ1VL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/MADARC-SPORT-Football-Drinking-relief/dp/B0CDVDPFF6/ref=ast_sto_dp_puis",
  },
  {
    asin: "B0CHM79MSM",
    title: "Baseball-themed product",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71fkwPBiZ6L._AC_SL1500_.jpg",
    url: "https://www.amazon.com/MADARC-SPORT-Baseball-Drinking-relief/dp/B0CHM79MSM/ref=ast_sto_dp_puis",
  },
  {
    asin: "B0G6B4CN36",
    title: "Motorcycle handlebar toilet paper holder",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/71+JBJDOpUL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/Standing-Toilet-Holder-Motorcycle-Handlebars/dp/B0G6B4CN36/ref=ast_sto_dp_puis",
  },
  {
    asin: "B0B762CJJW",
    title: "Baseball design disposable product",
    imageUrl:
      "https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T4/images/I/818Egg1KnpL._AC_SL1500_.jpg",
    url: "https://www.amazon.com/50-Baseball-Design-Disposable-Definition/dp/B0B762CJJW/",
  },
];
