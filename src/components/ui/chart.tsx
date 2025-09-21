// Simplified chart component to avoid TypeScript issues
import React from "react";

// Simple placeholder chart context
const ChartContext = React.createContext<any>(null);

export const useChart = () => {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer");
  }
  return context;
};

// Chart container component
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config?: any;
    children: React.ReactNode;
  }
>(({ children, config = {}, className, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

// Chart tooltip content
export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: any[];
    label?: string;
    hideLabel?: boolean;
    hideIndicator?: boolean;
  }
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={className} {...props} />;
});
ChartTooltipContent.displayName = "ChartTooltipContent";

// Chart legend content
export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: any[];
    hideIcon?: boolean;
    nameKey?: string;
  }
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={className} {...props} />;
});
ChartLegendContent.displayName = "ChartLegendContent";

// Chart tooltip
export const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={className} {...props} />;
});
ChartTooltip.displayName = "ChartTooltip";

// Chart legend
export const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={className} {...props} />;
});
ChartLegend.displayName = "ChartLegend";

// Chart style utility
export const ChartStyle = ({ id, config }: { id: string; config: any }) => {
  return null;
};