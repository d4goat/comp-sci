import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);
CustomEase.create("hop", "0.8, 0, 0.2, 1");
CustomEase.create("hop2", "0.9, 0, 0.1, 1");

export const splitText = (
  selector: Element | string,
  type: "words" | "chars" | "lines",
  className: string,
  mask = true,
) => {
  return SplitText.create(selector, {
    type,
    [`${type}Class`]: className,
    ...(mask && { mask: type }),
  });
};

export { gsap, SplitText, CustomEase };
