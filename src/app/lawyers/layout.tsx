import { IBM_Plex_Sans_KR } from "next/font/google";
import type { ReactNode } from "react";

const ibmSans = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-ibm-sans",
});

export default function AttorneysLayout({ children }: { children: ReactNode }) {
  return <div className={ibmSans.variable}>{children}</div>;
}
