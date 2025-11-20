import LocalFont from "next/font/local";

export const vazirmatnLocal = LocalFont({
  src: [
    {
      path: "./Vazirmatn-Light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Vazirmatn-Black.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});
