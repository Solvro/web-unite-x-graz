/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { ReactElement } from "react";

// Here implement the types used in the app
export type Section = {
  id: string;
  title: string;
  content: string;
  model: ReactElement; // 3d model for section
  alignment?: "left" | "right";
};
