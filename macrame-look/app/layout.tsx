import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Macrame Look | Մակրամե և ձեռագործ աքսեսուարների վարձույթ",
    template: "%s | Macrame Look",
  },

  description:
    "Macrame Look — մակրամե և ձեռագործ աքսեսուարների վարձույթ։ Ընտրեք յուրահատուկ ձեռագործ աքսեսուարներ ձեր միջոցառումների համար։",

  keywords: [
    "Macrame Look",
    "մակրամե",
    "մակրամե վարձույթ",
    "մակրամե աքսեսուարներ",
    "ձեռագործ աքսեսուարներ",
    "միջոցառումների աքսեսուարներ",
    "Հայաստան",
    "Երևան",
  ],

  authors: [
    {
      name: "Macrame Look",
    },
  ],

  creator: "Macrame Look",
  publisher: "Macrame Look",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "hy_AM",
    url: "https://macrame-look.vercel.app/",
    siteName: "Macrame Look",
    title: "Macrame Look | Մակրամե և ձեռագործ աքսեսուարների վարձույթ",
    description: "Մակրամե և ձեռագործ աքսեսուարների վարձույթ՝ ձեր միջոցառումները յուրահատուկ դարձնելու համար։",
    images: [
      {
        url: "/images/logo.png",
        width: 110,
        height: 50,
        alt: "Macrame Look",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Macrame Look | Մակրամե և ձեռագործ աքսեսուարների վարձույթ",
    description: "Մակրամե և ձեռագործ աքսեսուարների վարձույթ Հայաստանում։",
    images: ["/images/logo.png"],
  },

  alternates: {
    canonical: "https://macrame-look.vercel.app/",
  },

  category: "shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${DMSans.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mt-21 sm:mt-19 mb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}