import type { Section } from "@/lib/types";

interface SectionContentProps {
  section: Section;
}

export function SectionContent({ section }: SectionContentProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <section
        className={`relative flex h-3/4 w-full max-w-screen-2xl items-center rounded border border-white px-6 py-12 ${section.alignment === "right" ? "flex-row-reverse text-right" : ""}`}
      >
        <div className="flex-1">
          <h2 className="mb-4 text-3xl font-bold">{section.title}</h2>
          <p className="text-lg text-neutral-500">{section.content}</p>
        </div>
        <div className="flex-1" />
      </section>
    </div>
  );
}
