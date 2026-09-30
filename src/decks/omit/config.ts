import { presentationConfig } from "@/presentation/presentation.config";
import type { PresentationConfig } from "@/presentation/types";

/** Inherits the default settings. Override anything here. */
export const omitConfig: PresentationConfig = { ...presentationConfig, title: "Omit" };