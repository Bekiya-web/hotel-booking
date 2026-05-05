import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Check, Lock, ShieldCheck } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getRoom } from "@/data/rooms";
import { toast } from "sonner";

const steps = ["Your details", "Payment", "Confirmation"];

const Checkout = () => {
  const { id } = useParams();
  const room = getRoom(id || "");
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  if (!room) {
    return (
      <SiteLayout>
        <div className="container py-40 text-center">
          <h1 className="font-serif text-4xl mb-4">Room not found</h1>
          <Button asChild variant="gold"><Link to="/rooms">Browse rooms</Link></Button>
        </div>
      </SiteLayout>
    );
  }

  const nights = 2;
  const subtotal = room.price * nights;

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      toast.success("Booking confirmed!", { description: "A confirmation email has been sent." });
      navigate("/");
    }
  };

  return (
    <SiteLayout>
      <section className="pt-28 pb-20">
        <div className="container max-w-5xl">
          {/* PROGRESS */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border ${
                      i <= step
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-sm hidden sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && <div className={`w-12 h-px ${i < step ? "bg-yellow-500" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            <div className="bg-card border border-border rounded-md p-8">
              {step === 0 && (
                <>
                  <h2 className="font-serif text-3xl mb-6">Guest details</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>First name</Label>
                      <Input placeholder="Helena" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last name</Label>
                      <Input placeholder="Marlow" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Phone</Label>
                      <Input type="tel" placeholder="+1 (555) 000 0000" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Special requests <span className="text-muted-foreground">(optional)</span></Label>
                      <Textarea placeholder="Late check-in, dietary needs, celebrations..." rows={3} />
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="font-serif text-3xl mb-6">Payment</h2>
                  <RadioGroup defaultValue="card" className="space-y-3 mb-6">
                    {[
                      { v: "card", label: "Credit / Debit card" },
                      { v: "paypal", label: "PayPal" },
                      { v: "hotel", label: "Pay at hotel" },
                    ].map((o) => (
                      <Label key={o.v} className="flex items-center gap-3 border border-border rounded-md p-4 cursor-pointer hover:border-yellow-500 transition-smooth">
                        <RadioGroupItem value={o.v} />
                        <span>{o.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Card number</Label>
                      <Input placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiry</Label>
                      <Input placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVC</Label>
                      <Input placeholder="•••" />
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground mt-6">
                    <Lock className="w-3 h-3" /> Encrypted payment. We never store your card.
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-serif text-3xl mb-6">Review & confirm</h2>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">You're booking the <span className="text-foreground font-medium">{room.name}</span> for {nights} nights.</p>
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> Free cancellation up to 48 hours</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> Instant confirmation by email</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> No hidden fees</li>
                    </ul>
                  </div>
                </>
              )}

              <div className="flex gap-3 mt-10">
                {step > 0 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
                )}
                <Button variant="hero" size="lg" className="ml-auto" onClick={next}>
                  {step === steps.length - 1 ? "Confirm Booking" : "Continue"}
                </Button>
              </div>
            </div>

            {/* SUMMARY */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="bg-card border border-border rounded-md overflow-hidden">
                <img src={room.image} alt={room.name} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-1">{room.name}</h3>
                  <p className="text-xs text-muted-foreground mb-5">{room.view} · {room.bed}</p>

                  <div className="space-y-3 text-sm pb-5 border-b border-border">
                    <div className="flex justify-between"><span className="text-muted-foreground">${room.price} × {nights} nights</span><span>${subtotal}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Taxes & fees</span><span className="text-success">Included</span></div>
                  </div>
                  <div className="flex justify-between pt-5 text-base">
                    <span className="font-medium">Total</span>
                    <span className="font-serif text-2xl text-yellow-600">${subtotal}</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border space-y-2 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-yellow-600" /> Best price guaranteed</p>
                    <p className="flex items-center gap-2"><Lock className="w-3 h-3 text-yellow-600" /> Secure 256-bit checkout</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Checkout;