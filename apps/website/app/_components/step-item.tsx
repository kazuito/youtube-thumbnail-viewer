interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

export function StepItem({ number, title, description }: StepItemProps) {
  return (
    <div className="flex gap-4">
      <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
        {number}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
