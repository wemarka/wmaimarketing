
import React from "react";
import { cn } from "@/lib/utils";
import StatCard from "./StatCard";
import AnimateInView from "@/components/ui/animate-in-view";

export interface StatItem {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  format?: "number" | "percentage" | "currency" | "none";
  trend?: "day" | "week" | "month" | "year";
  featured?: boolean;
}

interface StatsGridProps {
  items: StatItem[];
  columns?: number;
  className?: string;
  staggerDelay?: number;
  animation?: "fade" | "slide-up" | "slide-right" | "slide-left" | "scale" | "bounce";
}

const StatsGrid: React.FC<StatsGridProps> = ({
  items,
  columns = 4,
  className,
  staggerDelay = 0.05,
  animation = "slide-up"
}) => {
  // Determine grid columns based on count and specified columns
  const getGridClass = () => {
    switch(columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 sm:grid-cols-2";
      case 3: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case 4: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
      case 5: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
      default: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <AnimateInView
      animation="fade"
      once={true}
      className="w-full"
    >
      <div className={cn("grid gap-4", getGridClass(), className)}>
        {items.map((stat, index) => (
          <StatCard
            key={`${stat.title}-${index}`}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            positive={stat.positive}
            icon={stat.icon}
            format={stat.format}
            trend={stat.trend}
            animation={animation}
            delay={index * staggerDelay}
            featured={stat.featured}
          />
        ))}
      </div>
    </AnimateInView>
  );
};

export default StatsGrid;
