import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
};

export function StatCard({ label, value, hint, icon: Icon }: Props) {
  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all hover:shadow-[0_0_25px_-5px_rgba(var(--primary),0.2)] group cursor-default">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            {Icon ? (
              <Icon className="text-primary size-4" aria-hidden />
            ) : null}
          </div>
        </div>
        <p className="text-3xl font-extrabold tracking-tight tabular-nums bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
          {value}
        </p>
        {hint ? (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <p className="text-muted-foreground text-xs">{hint}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
