"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const stats = [
  { key: "stat1", accent: "#00E87A" },
  { key: "stat2", accent: "#00E87A" },
  { key: "stat3", accent: "#F2F4F3" },
  { key: "stat4", accent: "#1FBB6E" },
] as const;

export function StatsGrid() {
  const t = useTranslations("stats");

  return (
    <section
      id="stats"
      className="relative px-6 py-24"
      style={{ backgroundColor: "#0B110E" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2
            className="mb-5 font-bold"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#F2F4F3",
              letterSpacing: "-0.02em",
            }}
          >
            {t("section_title")}
          </h2>
          <p
            className="mb-4 max-w-2xl leading-relaxed"
            style={{ color: "rgba(242,244,243,0.55)", fontSize: "0.975rem" }}
          >
            {t("section_subtitle")}
          </p>
          <p
            className="max-w-2xl leading-relaxed"
            style={{ color: "rgba(242,244,243,0.55)", fontSize: "0.975rem" }}
          >
            {t("project_link")}
          </p>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            backgroundColor: "rgba(0,232,122,0.12)",
            marginBottom: "3.5rem",
          }}
        />

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 gap-px lg:grid-cols-4"
          style={{ backgroundColor: "rgba(0,232,122,0.1)" }}
        >
          {stats.map(({ key, accent }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col justify-between p-8"
              style={{ backgroundColor: "#0B110E" }}
            >
              <p
                className="mb-4 leading-none font-bold"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                  color: accent,
                  letterSpacing: "-0.04em",
                }}
              >
                {t(`${key}_value`)}
              </p>
              <p
                className="text-sm leading-snug"
                style={{ color: "rgba(242,244,243,0.5)" }}
              >
                {t(`${key}_label`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Source note */}
        <p className="mt-6 text-xs" style={{ color: "rgba(242,244,243,0.25)" }}>
          {t("source_note")}
        </p>
      </div>
    </section>
  );
}
