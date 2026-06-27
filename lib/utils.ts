import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create("hop", "0.8, 0, 0.2, 1");
const hop2 = CustomEase.create("hop2", "0.9, 0, 0.1, 1");

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn, hop, hop2 };
