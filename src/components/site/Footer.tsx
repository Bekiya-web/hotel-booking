import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from "lucide-react";
import Logo from "./Logo";

const Footer = () => (
  <footer className="border-t border-border bg-card/40">
    <div className="container py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2 space-y-4">
        <Logo />
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          A five-star sanctuary where timeless hospitality meets modern luxury. Every stay,
          quietly extraordinary.
        </p>
        <div className="flex gap-3 pt-2">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:border-yellow-500 hover:text-yellow-600 transition-smooth"
              aria-label="Social link"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-widest text-yellow-600 mb-4">Explore</h4>
        <ul className="space-y-3 text-sm text-foreground/80">
          <li><Link to="/rooms" className="hover:text-yellow-600 transition-smooth">Rooms & Suites</Link></li>
          <li><Link to="/about" className="hover:text-yellow-600 transition-smooth">About</Link></li>
          <li><Link to="/reviews" className="hover:text-yellow-600 transition-smooth">Reviews</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-600 transition-smooth">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-widest text-yellow-600 mb-4">Contact</h4>
        <ul className="space-y-3 text-sm text-foreground/80">
          <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-yellow-600" /> 1 Skyline Promenade</li>
          <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-yellow-600" /> +1 (555) 123-4567</li>
          <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-yellow-600" /> stay@aurea-grand.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Auréa Grand. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p>Crafted with care · Best price guaranteed · Free cancellation</p>
          <span className="hidden md:inline">·</span>
          <Link to="/admin/login" className="text-yellow-600 hover:text-yellow-700 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;