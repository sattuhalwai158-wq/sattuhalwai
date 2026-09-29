import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Home", to: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight className="size-3 text-gold/70 shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.to ? (
                <span
                  className="font-medium text-foreground tracking-wide line-clamp-1"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  {index === 0 && <Home className="size-3" aria-hidden="true" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
