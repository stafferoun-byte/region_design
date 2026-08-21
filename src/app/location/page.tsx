import { LocationSection } from "@/components/location-section";
import { SitePageFrame } from "@/components/site-page-frame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는길 | 이로운 법률사무소",
  description: "이로운 법률사무소 서울·남양주 사무소 안내",
};

export default function LocationPage() {
  return (
    <SitePageFrame>
      <LocationSection />
    </SitePageFrame>
  );
}
