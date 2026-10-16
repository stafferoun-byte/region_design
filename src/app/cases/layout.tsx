import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "성공사례 | 법무법인 이로운 파트너스",
  description: "법무법인 이로운 파트너스 승소·성공 사례",
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
