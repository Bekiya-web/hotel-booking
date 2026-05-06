import React from "react";
import { Link, useLocation } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <span className="font-serif text-2xl tracking-wide text-yellow-600 leading-none">Auréa</span>
      <span className={`font-serif text-2xl tracking-[0.2em] leading-none uppercase font-semibold ${
        scrolled || !isHome ? "text-foreground" : "text-white drop-shadow-lg"
      }`}>Grand</span>
    </Link>
  );
};

export default Logo;