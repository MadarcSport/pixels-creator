export const brandLogoUrl =
  "https://res.cloudinary.com/db7i9febj/image/upload/v1794301527/TR_Glossy_Blue_Paintbrush_with_Flying_Pixels_1_faqgsh.png";

export interface BrandIdentity {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  productUrls: [string, string];
  accent: string;
}

export const brandIdentities: BrandIdentity[] = [
  {
    id: "zenfiber",
    name: "Zenfiber",
    description: "Ecological bamboo tissue and toilet paper.",
    logoUrl:
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795818897/zenFiberLogo_fqaahf.png",
    productUrls: [
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795818707/00a752d5986c405f904bb975344eb6ee_s8yyys.png",
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795818711/8be5d21887a84987b20a4b3d47bbbf8a_ylw4ws.png",
    ],
    accent: "#b7d9b3",
  },
  {
    id: "pulsius",
    name: "Pulsius",
    description: "A sports tea energy drink with an active identity.",
    logoUrl:
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795819514/Pulsius_chinese_logo_1_n6qmac.png",
    productUrls: [
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795819203/pulsius2_jz93g1.png",
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795819197/pulsiBag1_1_wxczqs.png",
    ],
    accent: "#ff9a68",
  },
  {
    id: "mansio",
    name: "Mansio",
    description: "Modern home and bathroom essentials.",
    logoUrl:
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795819874/jv_logo_iesvu5.png",
    productUrls: [
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795819955/eggs003_kk2vpz.png",
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795819873/eggs1_tsayyx.png",
    ],
    accent: "#d5c7ff",
  },
  {
    id: "madarc-sport",
    name: "Madarc Sport",
    description: "Sport accessories, barware and wall decor.",
    logoUrl:
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795820075/madarcLogo1_zixhow.png",
    productUrls: [
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795818313/tinyWallBottleOpner_rtkopf.png",
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795818408/tinyWallBottleOpner1_nhljw3.png",
    ],
    accent: "#76cbd0",
  },
];
