import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { KoraPageEffects } from "@/components/kora-page-effects";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "이로운 법률사무소",
  description: "형사, 이혼, 상속, 민사·부동산 분쟁을 위한 프리미엄 법률 상담 메인페이지 시안",
  icons: {
    icon: [
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=3", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.png?v=3", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png?v=3",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [{ url: "/favicon.ico?v=3", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=3"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
        <link rel="stylesheet" href="/fonts/wanted-sans/WantedSansVariable.min.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full bg-[#FCFCFA]" suppressHydrationWarning>
        <SmoothScroll>
          <KoraPageEffects>{children}</KoraPageEffects>
        </SmoothScroll>
      </body>
    </html>
  );
}
