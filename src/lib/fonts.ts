import { Inter, VT323 } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
});
