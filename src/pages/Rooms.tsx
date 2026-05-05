import { useMemo, useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import BookingWidget from "@/components/site/BookingWidget";
import RoomCard from "@/components/site/RoomCard";
import { rooms } from "@/data/rooms";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Rooms = () => {
  const [maxPrice, setMaxPrice] = useState(1500);
  const [bedTypes, setBedTypes] = useState<Record<string, boolean>>({});
  const [minRating, setMinRating] = useState(4);

  const filtered = useMemo(() => {
    const activeBeds = Object.entries(bedTypes).filter(([, v]) => v).map(([k]) => k);
    return rooms.filter((r) => {
      if (r.price > maxPrice) return false;
      if (r.rating < minRating) return false;
      if (activeBeds.length && !activeBeds.some((b) => r.bed.toLowerCase().includes(b))) return false;
      return true;
    });
  }, [maxPrice, bedTypes, minRating]);

  return (
    <SiteLayout>
      <section className="pt-32 pb-12 border-b border-border">
        <div className="container">
          <p className="text-xs uppercase tracking-[0.4em] text-yellow-600 mb-4">Stay with us</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Rooms & Suites</h1>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Real-time availability across our collection. Best price guaranteed.
          </p>
          <BookingWidget variant="inline" />
        </div>
      </section>

      <section className="py-16">
        <div className="container grid lg:grid-cols-[260px_1fr] gap-12">
          <aside className="space-y-8 lg:sticky lg:top-28 self-start">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-yellow-600 mb-4">Price per night</h3>
              <Slider
                value={[maxPrice]}
                onValueChange={(v) => setMaxPrice(v[0])}
                max={1500}
                min={100}
                step={50}
              />
              <p className="text-sm text-muted-foreground mt-3">Up to <span className="text-foreground font-medium">${maxPrice}</span></p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-yellow-600 mb-4">Bed type</h3>
              <div className="space-y-3">
                {["king", "sofa"].map((b) => (
                  <Label key={b} className="flex items-center gap-3 cursor-pointer text-sm capitalize">
                    <Checkbox
                      checked={!!bedTypes[b]}
                      onCheckedChange={(c) => setBedTypes((s) => ({ ...s, [b]: !!c }))}
                    />
                    {b === "king" ? "King bed" : "With sofa"}
                  </Label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-yellow-600 mb-4">Minimum rating</h3>
              <Slider value={[minRating]} onValueChange={(v) => setMinRating(v[0])} min={3} max={5} step={0.1} />
              <p className="text-sm text-muted-foreground mt-3">★ {minRating.toFixed(1)} & up</p>
            </div>
          </aside>

          <div>
            <p className="text-sm text-muted-foreground mb-6">{filtered.length} rooms available</p>
            <div className="grid gap-8 md:grid-cols-2">
              {filtered.map((r) => (
                <RoomCard key={r.id} room={r} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center py-20 text-muted-foreground">No rooms match your filters.</p>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Rooms;