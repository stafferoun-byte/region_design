"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const FONT_WANTED =
  '"Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const EROUN_GREEN = "#5DC39B";
const HOVER_CREAM = "#FFFFFA";

const TEAM = [
  {
    id: "01",
    name: "Koraline Spencer",
    role: "Founder & CEO",
    bio: "Leads firm strategy and client partnerships with two decades of courtroom and advisory experience.",
    image: "/images/lawyer-popout01.png",
  },
  {
    id: "02",
    name: "Priya Sharma",
    role: "Head of Growth Strategy",
    bio: "Designs case strategy frameworks that turn complex disputes into clear, winnable paths.",
    image: "/images/lawyer-popout.png",
  },
  {
    id: "03",
    name: "James Okoro",
    role: "Senior Growth Consultant",
    bio: "Specializes in high-stakes litigation support and cross-border matter coordination.",
    image: "/images/lawyer-popout01.png",
  },
  {
    id: "04",
    name: "Alex Tanaka",
    role: "Growth Operations Lead",
    bio: "Builds the systems behind every engagement — intake, evidence, and hearing readiness.",
    image: "/images/lawyer-popout.png",
  },
  {
    id: "05",
    name: "David Wilson",
    role: "Head of Client Solutions",
    bio: "Owns client experience from first consult through resolution and post-case care.",
    image: "/images/lawyer-popout01.png",
  },
  {
    id: "06",
    name: "Rachel Andersen",
    role: "Revenue Strategist",
    bio: "Advises on commercial and civil matters with a focus on practical, cost-clear outcomes.",
    image: "/images/lawyer-popout.png",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function TeamRow({
  member,
  open,
  onToggle,
}: {
  member: (typeof TEAM)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const active = open;

  return (
    <div className="border-b border-white/30">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group relative flex w-full items-center gap-[20px] overflow-hidden rounded-full px-3 py-3 text-left md:gap-[30px] md:px-3.5 md:py-3.5"
      >
        {/* Kora hover — cream capsule */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ease-out ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{ backgroundColor: HOVER_CREAM }}
        />

        <span className="relative z-[1] size-[60px] shrink-0 overflow-hidden rounded-full bg-white/20 md:size-[80px]">
          <Image
            src={member.image}
            alt=""
            fill
            className="object-cover object-[center_18%]"
            sizes="80px"
          />
        </span>

        <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-5">
          <span className="flex min-w-0 flex-1 flex-col gap-[7px]">
            <span
              className={`block truncate text-[17px] leading-[1.2] font-bold tracking-[-0.03em] transition-colors duration-300 md:text-[20px] ${
                active
                  ? "text-[#242424]"
                  : "text-white group-hover:text-[#242424]"
              }`}
              style={{ fontFamily: FONT_WANTED }}
            >
              {member.name}
            </span>
            <span
              className={`block text-[13px] leading-[1.3] font-medium tracking-[-0.02em] transition-colors duration-300 md:text-[15px] ${
                active
                  ? "text-[#616161]"
                  : "text-white/90 group-hover:text-[#616161]"
              }`}
              style={{ fontFamily: FONT_WANTED }}
            >
              {member.role}
            </span>
          </span>

          <span
            className={`shrink-0 text-[14px] font-semibold tracking-[-0.02em] transition-colors duration-300 md:text-[15px] ${
              active
                ? "text-[#242424]"
                : "text-white group-hover:text-[#242424]"
            }`}
            style={{ fontFamily: FONT_WANTED }}
          >
            {member.id}
          </span>
        </span>

        {/* Default: white circle + dark plus → Hover: green circle + white plus */}
        <span
          className={`relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-300 md:size-9 ${
            open ? "rotate-45" : "rotate-0"
          } ${
            active
              ? "bg-[#5DC39B]"
              : "bg-white group-hover:bg-[#5DC39B]"
          }`}
          aria-hidden
        >
          <span
            className={`absolute h-[1.5px] w-3 rounded-full transition-colors duration-300 ${
              active
                ? "bg-white"
                : "bg-[#242424] group-hover:bg-white"
            }`}
          />
          <span
            className={`absolute h-3 w-[1.5px] rounded-full transition-colors duration-300 ${
              active
                ? "bg-white"
                : "bg-[#242424] group-hover:bg-white"
            }`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="bio"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="overflow-hidden"
          >
            <p
              className="max-w-[520px] px-3.5 pb-4 pl-[88px] text-[14px] leading-[1.5] font-medium tracking-[-0.02em] text-white/85 md:pl-[126px] md:text-[15px]"
              style={{ fontFamily: FONT_WANTED }}
            >
              {member.bio}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full bg-white"
      aria-label="Meet the team"
    >
      {/* Outer gutter — wider than hero inset so the green card sits inset */}
      <div className="w-full px-8 py-8 md:px-12 md:py-10 lg:px-16">
        <motion.div
          className="flex w-full origin-center flex-col gap-[60px] overflow-hidden rounded-[40px] px-5 py-[60px] will-change-transform md:gap-[90px] md:px-8 md:py-[90px] xl:gap-[120px] xl:px-10 xl:py-[120px]"
          style={{ backgroundColor: EROUN_GREEN }}
          initial={reduceMotion ? false : { scale: 0.92, opacity: 0.96 }}
          animate={
            inView || reduceMotion
              ? { scale: 1, opacity: 1 }
              : { scale: 0.92, opacity: 0.96 }
          }
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: easeOut }}
        >
          <div className="flex w-full flex-col gap-[50px]">
            <div className="flex w-full flex-col items-start gap-5">
              <motion.a
                href="#top"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 16, filter: "blur(10px)" }
                }
                animate={
                  inView || reduceMotion
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 16, filter: "blur(10px)" }
                }
                transition={{ duration: 0.75, ease: easeOut }}
                className="inline-flex w-fit items-center gap-2.5"
                aria-label="이로운 법률사무소"
              >
                <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-white md:size-9">
                  <Image
                    src="/images/eroun-logo.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-5 w-auto object-contain"
                  />
                </span>
                <span
                  className="text-[18px] font-bold tracking-[-0.04em] text-white md:text-[20px]"
                  style={{ fontFamily: FONT_WANTED }}
                >
                  Eroun
                  <span className="align-super text-[10px]">™</span>
                </span>
              </motion.a>

              <motion.h2
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 28, filter: "blur(12px)" }
                }
                animate={
                  inView || reduceMotion
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 28, filter: "blur(12px)" }
                }
                transition={{
                  duration: 0.85,
                  delay: reduceMotion ? 0 : 0.08,
                  ease: easeOut,
                }}
                className="max-w-[560px] text-[clamp(34px,4vw,48px)] leading-[1.15] font-bold tracking-[-0.05em] text-white"
                style={{ fontFamily: FONT_WANTED }}
              >
                Meet the team
                <br />
                behind the growth.
              </motion.h2>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={
                inView || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              transition={{
                duration: 0.8,
                delay: reduceMotion ? 0 : 0.16,
                ease: easeOut,
              }}
              className="grid w-full grid-cols-1 gap-x-[50px] border-t border-white/30 md:grid-cols-2"
            >
              {TEAM.map((member) => (
                <TeamRow
                  key={member.id}
                  member={member}
                  open={openId === member.id}
                  onToggle={() =>
                    setOpenId((cur) => (cur === member.id ? null : member.id))
                  }
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
