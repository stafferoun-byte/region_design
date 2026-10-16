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
  metadataBase: new URL("https://erounpartners.com"),
  title: "법무법인 이로운 파트너스",
  description:
    "법무법인 이로운 파트너스는 상속·형사·부동산·이혼·민사·기업 분쟁까지, 의뢰인의 상황을 세심하게 살피고 필요한 법률 해결책을 제시합니다. 따뜻한 소통과 책임 있는 조력으로, 당신의 이로운 내일을 함께합니다.",
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
