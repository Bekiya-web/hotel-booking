import { MapPin, Plane, Train, Coffee } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";

const About = () => (
  <SiteLayout>
    <section className="relative pt-32 pb-20 overflow-hidden">
      <img src="/hero image .jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-background/85" />
      <div className="container relative z-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-yellow-600 mb-4">Our story</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-6">A house built on quiet hospitality.</h1>
        <p className="text-lg text-foreground/80 leading-relaxed">
          Auréa Grand opened in 1924 as a private residence on the edge of the harbour. A century later, it remains a refuge — careful, considered, and quietly extraordinary.
        </p>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container grid lg:grid-cols-2 gap-16">
        <div className="space-y-6 text-foreground/80 leading-relaxed">
          <h2 className="font-serif text-4xl text-foreground">Where we are</h2>
          <p>Set on the Skyline Promenade, our doors open to a tree-lined boulevard, the old harbour, and the city's most loved galleries — all within a short walk.</p>
          <p>Whether your visit is for one slow weekend or a season of mornings, you'll find the city quietens here.</p>

          <div className="grid sm:grid-cols-2 gap-5 pt-6">
            {[
              { icon: MapPin, label: "1 Skyline Promenade" },
              { icon: Plane, label: "20 min from international airport" },
              { icon: Train, label: "5 min walk to central station" },
              { icon: Coffee, label: "Old town district" },
            ].map((i) => (
              <div key={i.label} className="flex items-center gap-3 text-sm">
                <i.icon className="w-5 h-5 text-yellow-600 shrink-0" /> {i.label}
              </div>
            ))}
          </div>
        </div>

        <div className="aspect-square rounded-md overflow-hidden bg-card border border-border">
          <iframe
            title="Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.50%2C-0.10%2C51.52&layer=mapnik"
            className="w-full h-full grayscale opacity-90"
          />
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default About;