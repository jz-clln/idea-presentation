import { presentationConfig } from "@/presentation/presentation.config";
import type { PresentationConfig } from "@/presentation/types";

/** Inherits the default settings. Override anything here. */
export const starterConfig: PresentationConfig = { ...presentationConfig, title: "Starter deck" };
