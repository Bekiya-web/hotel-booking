import { Star, BadgeCheck } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";

const reviews = [
  { name: "Helena Marlow", country: "London, UK", date: "March 2026", rating: 5, room: "Deluxe Skyline", text: "The service was so quietly attentive — every detail anticipated. The sunset from our window was unforgettable. We've already booked again." },
  { name: "Daniel Reyes", country: "Toronto, CA", date: "February 2026", rating: 5, room: "Executive Suite", text: "An absolute masterpiece of a hotel. The fireplace lounge in our suite, the spa, the breakfast — everything was first class." },
  { name: "Sara Khan", country: "Dubai, UAE", date: "January 2026", rating: 5, room: "Penthouse Terrace", text: "Booked for our anniversary. From the welcome champagne to the chef's tasting menu, it felt cinematic. The terrace pool at sunset is unreal." },
  { name: "Marcus Lindqvist", country: "Stockholm, SE", date: "December 2025", rating: 5, room: "Classic King", text: "Even the entry-level room felt like a suite elsewhere. Linens, lighting, silence — everything is dialed in." },
  { name: "Isabela Rocha", country: "Lisbon, PT", date: "December 2025", rating: 4, room: "Deluxe Skyline", text: "Stunning property and staff. Only small note — would love a quicker breakfast service on weekends. Will return regardless." },
  { name: "Yusuf Demir", country: "Istanbul, TR", date: "November 2025", rating: 5, room: "Executive Suite", text: "Auréa understands hospitality the old way. Quiet, elegant, never performative. A rare experience." },
];

const Reviews = () => {
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <SiteLayout>
      <section className="pt-32 pb-12 border-b border-border">
        <div className="container max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-yellow-600 mb-4">Verified guest stories</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Reviews & testimonials</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />)}
          </div>
          <p className="text-2xl font-serif"><span className="text-yellow-600">{avg}</span> / 5 from 1,423 verified stays</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl space-y-6">
          {reviews.map((r) => (
            <article key={r.name} className="bg-card border border-border rounded-md p-8 hover:shadow-card transition-smooth">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-serif text-xl flex items-center gap-2">
                    {r.name}
                    <BadgeCheck className="w-4 h-4 text-yellow-600" />
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{r.country} · {r.date} · {r.room}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                </div>
              </div>
              <p className="text-foreground/85 leading-relaxed">"{r.text}"</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Reviews;