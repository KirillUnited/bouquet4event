import { Raleway as FontSans } from "next/font/google";
import { Playfair_Display as FontSerif } from "next/font/google";

export const fontSans = FontSans({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-sans",
});
export const fontSerif = FontSerif({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-serif",
})