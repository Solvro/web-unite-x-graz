import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import {
  TiSocialFacebook,
  TiSocialGithub,
  TiSocialInstagram,
  TiSocialLinkedin,
} from "react-icons/ti";

import { vt323 } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { PaddingWrapper } from "../padding-wrapper";

function List({
  text,
  children,
  className,
}: {
  text: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <h2 className="text-[.85em] font-medium uppercase sm:text-base">
        {text}
      </h2>
      <ul className="flex w-full flex-col">{children}</ul>
    </div>
  );
}

function ListItem({
  url,
  as,
  target = "_blank",
  text,
  label,
}: {
  target?: string;
  label?: string;
  text: string;
} & ({ as: ReactElement; url?: never } | { as?: never; url: string })) {
  return (
    <li className="mb-2 w-full text-[.85em] font-light sm:text-sm md:text-base">
      {url == null ? (
        as
      ) : (
        <Link
          href={url}
          target={target}
          rel="noopener noreferrer"
          className="underline-animation"
          aria-label={label}
        >
          {text}
        </Link>
      )}
    </li>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#101314] p-4 py-8">
      <PaddingWrapper className="flex flex-col items-center justify-center gap-8 lg:flex-row">
        <div className="mr-20 ml-40">
          <div className="flex items-center justify-center">
            <Image
              src={"logo_solvro_mono.svg"}
              alt="Logo Solvro"
              width={150}
              height={150}
              loading="lazy"
            />
            <Image
              src={"logo_solvro_mono.svg"}
              alt="Logo Solvro"
              width={150}
              height={150}
              className="ml-20"
              loading="lazy"
            />
          </div>
          <div className="mt-8 flex items-center gap-4">
            <TiSocialFacebook className="text-5xl" />
            <TiSocialInstagram className="text-4xl" />
            <TiSocialLinkedin className="text-5xl" />
            <TiSocialGithub className="text-5xl" />
          </div>
        </div>
        <div className="grid h-full grid-cols-8 gap-x-2 gap-y-4 py-5 sm:gap-x-3 sm:gap-y-5 lg:grid-cols-4 lg:py-16 xl:grid-cols-6">
          <List
            text="Kontakt"
            className="col-span-5 w-full flex-grow pt-6 sm:col-span-4 lg:col-span-1 lg:row-start-2 xl:row-start-1"
          >
            <ListItem text="Instagram" url={""} />
            <ListItem text="Facebook" url={""} />
            <ListItem text="Tiktok" url={""} />
          </List>

          <List
            text="Social media"
            className="col-span-3 w-full flex-grow pt-6 md:col-span-4 lg:col-span-1 lg:row-start-2 xl:row-start-1"
          >
            <ListItem text="Instagram" url={""} />
            <ListItem text="Facebook" url={""} />
            <ListItem text="Tiktok" url={""} />
          </List>
          <List
            text="Inne"
            className="col-span-2 flex w-full flex-grow pt-6 sm:col-span-3 md:col-span-4 lg:col-span-1 lg:row-start-2 xl:row-start-1"
          >
            <ListItem text="Polityka prywatności" url="" />
            <ListItem text="Zgłoś błąd" url="" />
          </List>
        </div>
      </PaddingWrapper>

      <p className={`${vt323.className} text-center text-xl`}>
        MADE WITH{" "}
        <Image
          src="/heartPixel.svg"
          alt="Heart"
          width={16}
          height={16}
          className="inline-block"
        />{" "}
        BY{" "}
        <Link href="https://solvro.pwr.edu.pl/pl/" className="underline">
          SOLVRO
        </Link>{" "}
        &copy; 2025
      </p>
    </footer>
  );
}
