"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";

import { scrollSectionAtom } from "@/atoms/general-atoms";

const SECTIONS = [
  {
    title: "Section 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe incidunt qui unde dolore temporibus, autem quam nesciunt dolorem sed? Unde dolore quam illo, quibusdam esse doloremque harum dolorum laborum provident.",
  },
  {
    title: "Section 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum, quia culpa ea optio porro neque corrupti quis tempore fugiat officia qui, quasi ipsam animi suscipit expedita blanditiis fuga eligendi?",
  },
  {
    title: "Section 3",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis totam magni assumenda similique pariatur. Maxime ducimus unde ullam dolorem aut, laboriosam quisquam officiis, pariatur velit quia praesentium reiciendis! Nemo, quasi!",
  },
];

export function TextSections({ className }: { className?: string }) {
  const [section] = useAtom(scrollSectionAtom);

  const currentSection = SECTIONS[section];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`section-${section.toString()}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="section"
        >
          <h2>{currentSection.title}</h2>
          <p>{currentSection.content}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
