"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

const items = [
  { href: "/projects", label: "项目" },
  { href: "/statistics/own", label: "Own" },
  { href: "/statistics/personal", label: "个人统计" },
  { href: "/statistics/projects", label: "项目统计" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((c) => (
          <NavigationMenuItem key={c.href}>
            <NavigationMenuLink
              asChild
              active={c.href === pathname}
              className={cn(
                pathname === c.href
                  ? "text-primary font-semibold bg-accent/50"
                  : "text-muted-foreground"
              )}
            >
              <Link href={c.href}>{c.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
