import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Stay", to: "/rooms" },
  { label: "Reviews", to: "/reviews" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled || !isHome
          ? "bg-background/95 backdrop-blur-md border-b border-border/60"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Logo />

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm uppercase tracking-widest transition-smooth ${
                scrolled || !isHome
                  ? "text-foreground/80 hover:text-yellow-500"
                  : "text-white/90 hover:text-yellow-400 drop-shadow-lg"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className={scrolled || !isHome ? "" : "text-white drop-shadow-lg"}>
            <ThemeToggle />
          </div>
          <a
            href="tel:+15551234567"
            className={`hidden md:flex items-center gap-2 text-sm transition-smooth ${
              scrolled || !isHome
                ? "text-foreground/80 hover:text-yellow-500"
                : "text-white/90 hover:text-yellow-400 drop-shadow-lg"
            }`}
          >
            <Phone className="w-4 h-4" />
            +1 (555) 123-4567
          </a>
          <Button asChild variant="hero" size="sm" className="hidden md:inline-flex">
            <Link to="/rooms">Book Now</Link>
          </Button>
          <button
            className={`lg:hidden p-2 ${scrolled || !isHome ? "text-foreground" : "text-white drop-shadow-lg"}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm uppercase tracking-widest text-foreground/80"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="hero" className="mt-2">
              <Link to="/rooms">Book Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;