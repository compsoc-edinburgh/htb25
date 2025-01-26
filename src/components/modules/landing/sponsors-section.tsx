import { cn } from "~/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Sponsor {
  name: string;
  logo: string;
  website: string;
  tier: "gold" | "silver" | "bronze" | "platinum";
  isReleased?: boolean;
}

const SPONSOR_DATA: Sponsor[] = [
  {
    name: "G-Research",
    logo: "/sponsors/g-research.png",
    website: "https://www.gresearch.co.uk/",
    tier: "platinum",
    isReleased: false,
  },
  {
    name: "Optiver",
    logo: "/sponsors/optiver.svg",
    website: "https://www.optiver.com/",
    tier: "gold",
    isReleased: false,
  },
  {
    name: "QRT",
    logo: "/sponsors/qrt.png",
    website: "https://www.qube-rt.com/",
    tier: "gold",
    isReleased: false,
  },
  {
    name: "Lloyds Bank Group",
    logo: "/sponsors/lloyds.svg",
    website: "https://www.lloydsbankinggroup.com/",
    tier: "silver",
    isReleased: false,
  },
  {
    name: "Viridien",
    logo: "/sponsors/viridien.svg",
    website: "https://www.viridiengroup.com/",
    tier: "silver",
    isReleased: false,
  },
  {
    name: "DoraHacks",
    logo: "/sponsors/dorahacks.png",
    website: "https://dorahacks.com/",
    tier: "bronze",
    isReleased: false,
  },
];

const TIER_STYLES = {
  platinum: {
    badge: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    card: "bg-neutral-500 shadow-lg hover:shadow-purple-200/20 animate-shine relative overflow-hidden",
  },
  gold: {
    badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    card: "bg-neutral-500 shadow-md hover:shadow-yellow-100/20",
  },
  silver: {
    badge: "bg-gray-400/10 text-gray-400 border-gray-400/20",
    card: "bg-neutral-500 shadow-sm hover:shadow-gray-100/10",
  },
  bronze: {
    badge: "bg-amber-700/10 text-amber-700 border-amber-700/20",
    card: "bg-neutral-500",
  },
} as const;

const SponsorBox = ({ sponsor }: { sponsor: Sponsor }) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-lg",
        "aspect-video border border-border/10 p-6 transition-all duration-300",
        !sponsor.isReleased && "cursor-default",
        sponsor.isReleased && "hover:border-accent/50",
        TIER_STYLES[sponsor.tier].card,
      )}
    >
      {sponsor.tier === "platinum" && (
        <div className="absolute inset-0 -translate-x-full animate-[shine_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

      {sponsor.isReleased ? (
        <>
          <div className="absolute left-3 top-3">
            <span
              className={cn(
                "rounded-full border px-2 py-1 text-xs font-medium",
                TIER_STYLES[sponsor.tier].badge,
              )}
            >
              {sponsor.tier.toUpperCase()}
            </span>
          </div>
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full items-center justify-center"
          >
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="max-h-[60%] max-w-[60%] object-contain"
            />
            <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="text-lg font-semibold text-neutral-300">
            Coming Soon
          </div>
        </div>
      )}
    </div>
  );
};

const SponsorsSection = () => {
  return (
    <section className="mx-auto mb-16 w-full max-w-7xl p-6">
      <h2 className="mb-12 text-center font-bold sm:text-xl md:text-2xl lg:text-3xl">
        Our Sponsors
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SPONSOR_DATA.map((sponsor) => (
          <SponsorBox key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
};

export const SponsorsComponents = {
  SponsorsSection,
  SPONSOR_DATA,
} as const;
