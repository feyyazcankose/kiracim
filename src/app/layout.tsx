import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kiracım.com - AI Destekli Kira Evi Önerisi",
  description:
    "Size en uygun kira evini bulmanıza yardımcı olan AI destekli platform",
  keywords: [
    "kira",
    "ev",
    "konut",
    "AI",
    "öneri",
    "İstanbul",
    "Ankara",
    "İzmir",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
