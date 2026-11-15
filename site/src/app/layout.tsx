import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["600", "700"],
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });

const titre = "Retour — Vos clients ne partent pas. Ils oublient.";
const description =
  "Retour rappelle vos clients au bon moment, avec une offre à usage unique. Ils reviennent, sans que vous leur écriviez.";

export const metadata: Metadata = {
  title: titre,
  description,
  openGraph: { title: titre, description, locale: "fr_FR", type: "website" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
