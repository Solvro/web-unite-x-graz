"use client";

import { useAtom } from "jotai";

import { scrollSectionAtom } from "@/atoms/general-atoms";

export function TextSections({ className }: { className?: string }) {
  const [section] = useAtom(scrollSectionAtom);

  return (
    <div className={className}>
      {section === 0 && (
        <div className="section">
          <h2>Section 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            incidunt qui unde dolore temporibus, autem quam nesciunt dolorem
            sed? Unde dolore quam illo, quibusdam esse doloremque harum dolorum
            laborum provident.
          </p>
        </div>
      )}
      {section === 1 && (
        <div className="section">
          <h2>Section 2</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            ipsum, quia culpa ea optio porro neque corrupti quis tempore fugiat
            officia qui, quasi ipsam animi suscipit expedita blanditiis fuga
            eligendi?
          </p>
        </div>
      )}
      {section === 2 && (
        <div className="section">
          <h2>Section 3</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis totam magni assumenda similique pariatur. Maxime
            ducimus unde ullam dolorem aut, laboriosam quisquam officiis,
            pariatur velit quia praesentium reiciendis! Nemo, quasi!
          </p>
        </div>
      )}
      {![0, 1, 2].includes(section) && <div>xd</div>}
    </div>
  );
}
