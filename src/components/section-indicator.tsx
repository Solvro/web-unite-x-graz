"use client";
const handleClick = (id: string) => {
  const element = document.querySelector(`#${id}`);
  if (element !== null) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function SectionIndicator() {
  return (
    <div className="fixed top-1/2 right-6 z-20 flex -translate-y-1/2 flex-col items-center space-y-6">
      {[1, 2, 3, 4].map((section) => (
        <button
          key={section}
          onClick={() => {
            handleClick(`section-${section.toString()}`);
          }}
          aria-label={`Go to section ${section.toString()}`}
          className="group relative"
        >
          <span className="block h-3 w-3 rounded-full border border-white/70 transition-all group-hover:bg-white" />
        </button>
      ))}
    </div>
  );
}
