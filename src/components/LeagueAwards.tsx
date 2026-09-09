import type { Award, LeagueStats } from "@/lib/fpl";

function Podium({ entries, suffix }: { entries: Award[]; suffix: string }) {
  if (!entries.length) {
    return <p className="mt-4 text-sm text-mute">Nothing to show yet.</p>;
  }

  return (
    <ol className="mt-4 flex flex-col gap-2.5">
      {entries.map((e, i) => (
        <li key={`${e.team}-${e.manager}`} className="flex items-baseline gap-3">
          <span
            className={`w-4 shrink-0 font-display text-sm ${
              i === 0 ? "text-volt" : "text-mute"
            }`}
          >
            {i + 1}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm text-bone">{e.team}</span>
            <span className="block truncate text-xs text-mute">{e.manager}</span>
          </span>
          <span
            className={`shrink-0 font-display text-lg tabular-nums ${
              i === 0 ? "text-volt" : "text-bone/70"
            }`}
          >
            {e.value > 0 && suffix === " places" ? "+" : ""}
            {e.value}
            <span className="ml-0.5 font-sans text-[10px] font-normal uppercase tracking-[0.1em] text-mute">
              {suffix}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function LeagueAwards({ stats }: { stats: LeagueStats }) {
  const awards: {
    title: string;
    blurb: string;
    entries: Award[];
    suffix: string;
  }[] = [
    {
      title: "In form",
      blurb:
        "Most points across the last three gameweeks. Ignores the table entirely, so it shows who is climbing before the standings catch up.",
      entries: stats.formTable,
      suffix: " pts",
    },
    {
      title: "Gameweek high",
      blurb:
        "The five biggest hauls in the most recent gameweek. One good captain pick usually decides it.",
      entries: stats.topGameweek,
      suffix: " pts",
    },
    {
      title: "Climbers",
      blurb:
        "Biggest jumps up the table since last gameweek. The reward for a differential nobody else owned.",
      entries: stats.climbers,
      suffix: " places",
    },
    {
      title: "Sliding",
      blurb:
        "Biggest drops since last gameweek. Usually a captain who blanked while everyone else's returned.",
      entries: stats.fallers,
      suffix: " places",
    },
    {
      title: "Bench regrets",
      blurb:
        "Most points left sitting on the bench this season. The purest form of fantasy pain.",
      entries: stats.benchKings,
      suffix: " pts",
    },
    {
      title: "The gambler",
      blurb:
        "Most points paid out on transfer hits. Sometimes it buys a title, usually it buys regret.",
      entries: stats.hitTakers,
      suffix: " pts",
    },
    {
      title: "Mr Consistent",
      blurb:
        "Smallest swing between gameweek scores. Never spikes, never collapses, and quietly climbs all season.",
      entries: stats.mostConsistent,
      suffix: " swing",
    },
  ];

  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {awards
        .filter((a) => a.entries.length > 0)
        .map((a) => (
          <div
            key={a.title}
            className="flex h-full flex-col rounded-2xl border border-line bg-ink p-6 sm:p-7"
          >
            <h3 className="font-display text-xl tracking-tight sm:text-2xl">
              {a.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-mute">{a.blurb}</p>
            <div className="mt-auto">
              <Podium entries={a.entries} suffix={a.suffix} />
            </div>
          </div>
        ))}
    </div>
  );
}
