import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "성공사례 | 이로운 법률사무소",
  description: "이로운 법률사무소 승소·성공 사례",
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
