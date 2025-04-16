
import * as React from "react";

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps {
  children: React.ReactNode;
  config: ChartConfig;
  className?: string;
}

export const ChartContainer = ({ 
  children, 
  config, 
  className = "" 
}: ChartContainerProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      {children}
    </div>
  );
};

interface ChartTooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
}

export const ChartTooltip = ({ content }: ChartTooltipProps) => {
  return content;
};

export const ChartTooltipContent = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium">{label}</div>
        </div>
        <div className="grid grid-flow-col items-center gap-4">
          {payload.map((entry, index) => (
            <div
              key={`item-${index}`}
              className="flex flex-col gap-1 text-xs text-muted-foreground"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <div
                    className="size-2 rounded-full"
                    style={{ background: entry.color }}
                  />
                  <span>{entry.name}</span>
                </div>
                <div>{entry.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ChartLegend = ({ content }: { content: React.ReactNode }) => {
  return content;
};

export const ChartLegendContent = (props: any) => {
  const { payload } = props;
  if (!payload) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-1.5">
          <div
            className="size-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-xs font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
