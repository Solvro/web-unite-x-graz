"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function AboutOrgs() {
  const t = useTranslations("about");

  const orgs = [
    {
      logo: "/logos/solvro.svg",
      alt: t("solvro_name"),
      desc: t("solvro_desc"),
      accent: "#00E87A",
      url: "https://solvro.pwr.edu.pl",
    },
    {
      logo: "/logos/best-graz.png",
      alt: t("best_name"),
      desc: t("best_desc"),
      accent: "#1FBB6E",
      url: "https://best.eu.org/graz",
    },
  ];

  return (
    <section
      id="about"
      className="relative px-6 py-32"
      style={{ backgroundColor: "#0D2B1E" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="mb-4 font-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#F2F4F3",
              letterSpacing: "-0.02em",
            }}
          >
            {t("section_title")}
          </h2>
          <p
            className="mx-auto max-w-xl"
            style={{ color: "rgba(242,244,243,0.6)", fontSize: "1.05rem" }}
          >
            {t("section_subtitle")}
          </p>
        </motion.div>

        {/* Org cards */}
        <div className="mx-auto mb-20 grid max-w-3xl gap-6 md:grid-cols-2">
          {orgs.map((org, index) => (
            <motion.a
              key={org.url}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex cursor-pointer flex-col rounded-2xl p-6 transition-all duration-300"
              style={{
                backgroundColor: "#0B110E",
                border: `1px solid rgba(0,232,122,0.15)`,
                textDecoration: "none",
              }}
              onMouseEnter={(event_) => {
                event_.currentTarget.style.borderColor = `${org.accent}40`;
                event_.currentTarget.style.transform = "translateY(-4px)";
                event_.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(event_) => {
                event_.currentTarget.style.borderColor = "rgba(0,232,122,0.15)";
                event_.currentTarget.style.transform = "translateY(0)";
                event_.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Logo */}
              <div className="mb-6">
                <Image
                  src={org.logo}
                  alt={org.alt}
                  width={160}
                  height={56}
                  className="object-contain object-left"
                  style={{ height: "auto" }}
                />
              </div>

              {/* Desc */}
              <p
                className="flex-1 text-sm leading-relaxed"
                style={{ color: "rgba(242,244,243,0.6)" }}
              >
                {org.desc}
              </p>

              {/* Arrow */}
              <div
                className="mt-4 flex items-center gap-1 text-xs font-semibold transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: org.accent }}
              >
                {t("learn_more")}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6H10M7 3L10 6L7 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mb-16 h-px"
          style={{ backgroundColor: "rgba(0,232,122,0.15)" }}
        />

        {/* Funded by */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p
            className="mb-8 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(242,244,243,0.35)" }}
          >
            {t("funded_by")}
          </p>
          <div className="flex justify-center">
            <div className="opacity-50 transition-opacity duration-300 hover:opacity-80">
              <a
                href="https://www.unite-university.eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/logos/unite_a.png"
                  alt="Unite!"
                  width={500}
                  height={150}
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1)", height: "auto" }}
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* In cooperation with */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <p
            className="mb-8 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(242,244,243,0.35)" }}
          >
            {t("in_cooperation")}
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-8">
            {[
              {
                src: "/logos/pwr.png",
                alt: "Wrocław University of Science and Technology",
                url: "https://pwr.edu.pl",
              },
              {
                src: "/logos/tu-graz.png",
                alt: "TU Graz",
                url: "https://www.tugraz.at",
              },
              {
                src: "/logos/ams-nobg.png",
                alt: "ams OSRAM",
                url: "https://ams-osram.com",
              },
              {
                src: "/logos/Balluff_Logo.webp",
                alt: "Balluff",
                url: "https://www.balluff.com",
              },
              {
                src: "/logos/logo_wcss.svg",
                alt: "WCSS",
                url: "https://www.wcss.pl",
              },
              {
                src: "/logos/nami_logo.png",
                alt: "NaMi",
                url: "https://nami.pwr.edu.pl",
              },
              {
                src: "/logos/sal-silicon-austria-labs-logo.svg",
                alt: "Silicon Austria Labs",
                url: "https://silicon-austria-labs.com",
              },
              {
                src: "/logos/wroclaw.png",
                alt: "City of Wrocław",
                url: "https://www.wroclaw.pl",
              },
              { src: "/logos/xtpl.png", alt: "XTPL", url: "https://xtpl.com" },
            ].map((logo) => (
              <a
                key={logo.src}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 opacity-50 transition-opacity duration-300 hover:opacity-80"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={50}
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1)", height: "auto" }}
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
