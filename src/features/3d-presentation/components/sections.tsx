import type { Section } from "@/lib/types";
import { degToRad } from "@/lib/utils";

import { Model } from "./model";

export const sections: Section[] = [
  {
    id: "wireframe",
    title: "Section 1: Wireframe",
    content:
      "This section showcases the wireframe box representation. The wireframe gives us a clear view of the geometric structure and helps understand the underlying mesh topology.",
    model: (
      <Model
        modelSection={0}
        position={[2.5, 0, 0]}
        scale={2}
        rotation={[0, degToRad(-45), 0]}
        wireframe
      />
    ),
    alignment: "left",
  },
  {
    id: "full-box",
    title: "Section 2: Full Box",
    content:
      "Here we see the complete rendered box with full materials and lighting. This demonstrates how the wireframe translates into a solid, three-dimensional object.",
    model: (
      <Model
        modelSection={1}
        position={[-2.5, 0, 0]}
        scale={2}
        rotation={[0, degToRad(45), 0]}
      />
    ),
    alignment: "right",
  },
  {
    id: "full-box-2",
    title: "Section 3: Full Box",
    content:
      "Here we see the complete rendered box with full materials and lighting. This demonstrates how the wireframe translates into a solid, three-dimensional object.",
    model: (
      <Model
        modelSection={2}
        position={[2.5, 0, 0]}
        scale={2}
        rotation={[0, degToRad(-45), 0]}
      />
    ),
    alignment: "left",
  },
];
