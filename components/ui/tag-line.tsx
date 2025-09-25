import { cn } from "@/lib/utils";

export default function TagLine({
  title,
  element = "div",
  className,
}: {
  title: string;
  element?: "div" | "h1" | "h2" | "h3" | "span";
  className?: string;
  large?: boolean;
}) {
  const TagElement = element;

  return (
    <TagElement
      className={cn(
        "mb-3 backdrop-blur-lg bg-background/30 leading-none animate-fade-up [animation-delay:100ms] opacity-0 border-primary rounded-sm text-pretty text-foreground/70 text-center px-3 py-1 text-sm/6 ring-1 ring-primary/50",
        className
      )}
    >
      {title}
    </TagElement>
  );
}
