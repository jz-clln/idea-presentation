export { TruckArt, Landscape } from "./Scenery";
export { AnimatedRoute } from "./RouteLine";
export { LoadBadge, FarmNode, BuyerNode, TruckNode } from "./Nodes";
export { WorkflowStep, RoleCard } from "./Cards";

/** Set NEXT_PUBLIC_ROVA_DEMO_URL to the live demo. Empty means the closing slide shows a placeholder. */
export const ROVA_DEMO_URL = process.env.NEXT_PUBLIC_ROVA_DEMO_URL ?? "";
