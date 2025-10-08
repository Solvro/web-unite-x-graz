import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useRef } from "react";

interface SectionCardProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  id,
  children,
  className,
  ...props
}: SectionCardProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    gsap.set(section, { opacity: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "center center",
      onEnter: () => {
        gsap.fromTo(section, { opacity: 0, y: 150 }, { opacity: 1, y: 0 });
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id={id} className="h-[300vh]" {...props}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-8 py-32">
        <div
          className={`grid h-full w-full grid-cols-2 gap-12 border border-white p-4 ${className}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
