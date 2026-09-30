import type { SlideDefinition } from "@/presentation";
import Title from "./01-Title";
import Content from "./02-Content";

export const slides: SlideDefinition[] = [
  { id: "title", title: "Title", component: Title },
  { id: "content", title: "Content", component: Content },
];
