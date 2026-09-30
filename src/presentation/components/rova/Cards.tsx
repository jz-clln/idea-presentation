import { ImageFrame } from "../../content/ImageFrame";
import { cn } from "../../utils";

export function WorkflowStep({ number, title, text, className }: { number: string; title: string; text: string; className?: string }) {
  return (
    <div className={className}>
      <div className="inline-block bg-p-bg pr-6 font-display text-[96px] font-medium leading-none tracking-[-0.04em] text-p-primary">{number}</div>
      <div className="mt-8 text-[36px] font-semibold leading-[1.1]">{title}</div>
      <div className="mt-3 text-caption leading-[1.35] text-p-muted">{text}</div>
    </div>
  );
}

/** A large product frame. Pass `image` to show a real screenshot instead of the outline. */
export function RoleCard({ role, items, image, className }: { role: string; items: string[]; image?: string; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-card bg-p-surface shadow-card", className)}>
      <div className="bg-p-primary px-10 py-7 font-display text-[48px] font-medium text-p-primary-fg">{role}</div>
      {image ? (
        <ImageFrame src={image} alt={`${role} screen`} radius="none" className="flex-1" />
      ) : (
        <ul className="m-0 flex flex-1 list-none flex-col justify-center gap-7 p-10">
          {items.map((t) => (
            <li key={t} className="flex items-center gap-5 text-[36px]">
              <span className="h-4 w-4 rounded-full bg-p-accent" />
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
