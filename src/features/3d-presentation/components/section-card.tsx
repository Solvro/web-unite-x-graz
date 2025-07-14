import type { ReactNode } from "react";

interface SectionCardProps {
  id: string;
  children: ReactNode;
}

export function SectionCard({ id, children }: SectionCardProps) {
  return (
    <section id={id} className="h-[300vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-8 py-32">
        <div className="reveal-type grid h-full w-full grid-cols-2 gap-12 border border-white p-4">
          {children}
        </div>
      </div>
    </section>
  );
}
