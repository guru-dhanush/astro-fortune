"use client";

import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { getFullPanchang } from "@/lib/panchang";

const CalenderSection = () => {
  const p = useMemo(() => getFullPanchang(new Date()), []);

  return (
    <section className="flex flex-col items-center p-2 py-10 md:p-10">
      <Badge variant="secondary" className="mb-6">
        Calendar
      </Badge>
      <h2 className="text-4xl font-bold text-heading mb-6">Hindu Calendar</h2>

      <div className="w-full border border-primary/60 rounded-3xl p-5 md:p-5 lg:p-8 m-2 md:m-0">
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-xl font-medium">Aaj Ka Panchang</h3>
            <div className="flex flex-col my-2 text-muted-foreground">
              <p className="text-xs">{p.dateStr}</p>
              <p className="text-xs">New Delhi, India</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-accent">{p.vara}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {p.paksha === "Shukla" ? "🌕" : "🌑"} {p.paksha} Paksha
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Panchang data columns */}
          <div className="md:col-span-2 space-y-6 text-sm">
            {/* Row 1 — Lunar month & year */}
            <div className="grid grid-cols-2 gap-6 border-b border-secondary/30 pb-6">
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Amanta:</span>
                  <span>{p.amantaMonth}</span>
                </p>
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Purnimanta:</span>
                  <span>{p.purnimantaMonth}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Vikram:</span>
                  <span>
                    {p.vikramYear} {p.vikramCycle}
                  </span>
                </p>
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Shaka:</span>
                  <span>
                    {p.shakaYear} {p.shakaCycle}
                  </span>
                </p>
              </div>
            </div>

            {/* Row 2 — Tithi & Nakshatra */}
            <div className="grid grid-cols-2 gap-6 border-b border-secondary/30 pb-6">
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Tithi:</span>
                  <span>
                    {p.paksha} {p.tithi}
                  </span>
                </p>
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Nakshatra:</span>
                  <span>{p.nakshatra}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Yoga:</span>
                  <span>{p.yoga}</span>
                </p>
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Karana:</span>
                  <span>{p.karana}</span>
                </p>
              </div>
            </div>

            {/* Row 3 — Sunrise & Sunset */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Sunrise:</span>
                  <span>{p.sunrise}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-xs md:text-sm">
                  <span className="font-semibold">Sunset:</span>
                  <span>{p.sunset}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right column — sun/moon icons */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-2">
              <img
                src="/home/panchang/sunrise.svg"
                alt="Sunrise"
                className="w-full max-w-30"
              />
              <span className="text-xs font-medium">Sunrise</span>
              <span className="text-xs text-muted-foreground">{p.sunrise}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/home/panchang/sunset.svg"
                alt="Sunset"
                className="w-full max-w-30"
              />
              <span className="text-xs font-medium">Sunset</span>
              <span className="text-xs text-muted-foreground">{p.sunset}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/home/panchang/moonrise.svg"
                alt="Moonrise"
                className="w-full max-w-30"
              />
              <span className="text-xs font-medium">Paksha</span>
              <span className="text-xs text-muted-foreground">{p.paksha}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/home/panchang/moonset.svg"
                alt="Nakshatra"
                className="w-full max-w-30"
              />
              <span className="text-xs font-medium">Nakshatra</span>
              <span className="text-xs text-muted-foreground">
                {p.nakshatra}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalenderSection;
