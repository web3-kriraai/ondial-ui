/**
 * Example nav data — wire your own routes and labels here, then map in your header component.
 */
export const MAIN_NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Login" },
] as const;

export type MainNavItem = (typeof MAIN_NAV)[number];
