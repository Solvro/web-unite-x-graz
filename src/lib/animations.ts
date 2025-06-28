// Definition of common animations
// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import type * as THREE from "three";

export const SlideInOut = (
  group: THREE.Group,
  left = false,
  trigger: string,
) => {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger,
        start: "top 50%",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(
      group.position,
      { x: left ? -10 : 10 },
      { x: left ? -2.5 : 2.5, duration: 0.4 },
    )
    .to(group.position, {
      x: left ? -2.5 : 2.5,
      duration: 0.5,
    })
    .to(group.position, {
      x: left ? -10 : 10,
      duration: 0.2,
    });
};

export const SlideInOutRotateScale = (
  group: THREE.Group,
  trigger: string,
  scale: number,
  rotation: { x?: number; y?: number; z?: number },
  left = false,
) => {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger,
        start: "top 50%",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(
      group.position,
      { x: left ? -10 : 10 },
      { x: left ? -2.5 : 2.5, duration: 0.2 },
    )
    .to(group.scale, { x: scale, y: scale, z: scale, duration: 0.4 }, "<")
    .to(group.rotation, { ...rotation, duration: 0.4 }, "<")
    .to(group.position, { x: left ? -10 : 10, duration: 0.2 })
    .to(group.scale, { x: 1, y: 1, z: 1, duration: 0.2 }, "<")
    .to(group.rotation, { x: 0, y: 0, z: 0, duration: 0.2 }, "<");
};
