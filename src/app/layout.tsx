import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ["latin"], variable: '--font-fraunces' });

export const metadata: Metadata = {
  title: "Mosayane",
  description: "Auteure-compositrice-interprète, Yaoundé, Cameroun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${fraunces.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
