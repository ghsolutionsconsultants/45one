export type Spot = {
  /** % across the pitch, 0 = own goal line, 100 = opposition goal line */
  x: number;
  /** % across the width */
  y: number;
  role: string;
  short: string;
  note: string;
};

export type Formation = {
  id: string;
  name: string;
  nickname: string;
  summary: string;
  strength: string;
  weakness: string;
  spots: Spot[];
};

const GK: Spot = {
  x: 6,
  y: 50,
  role: "Goalkeeper",
  short: "GK",
  note: "Starts the build. In a modern side the keeper is the spare man against a two-striker press.",
};

export const formations: Formation[] = [
  {
    id: "433",
    name: "4-3-3",
    nickname: "The default",
    summary:
      "Three forwards holding the width, a midfield triangle behind them. The shape most clubs default to because it gives natural passing angles all over the pitch.",
    strength: "Width high up, and a spare midfielder to build through.",
    weakness: "The single pivot gets isolated when both eights push on.",
    spots: [
      GK,
      { x: 24, y: 12, role: "Left back", short: "LB", note: "Either overlaps the winger or steps inside to make a back three in possession." },
      { x: 20, y: 36, role: "Left centre back", short: "CB", note: "Usually the ball player. Steps into midfield when the pivot drops." },
      { x: 20, y: 64, role: "Right centre back", short: "CB", note: "The aggressive one. Wins the duel so the line can push up." },
      { x: 24, y: 88, role: "Right back", short: "RB", note: "Holds width when the winger comes inside, tucks in when they stay out." },
      { x: 42, y: 50, role: "Holding midfielder", short: "6", note: "Screens the back four and sets the tempo. The whole shape breaks without them." },
      { x: 58, y: 28, role: "Left eight", short: "8", note: "Runs beyond the striker. This is where goals from midfield come from." },
      { x: 58, y: 72, role: "Right eight", short: "8", note: "Usually the ball carrier who breaks the first line of pressure." },
      { x: 80, y: 12, role: "Left winger", short: "LW", note: "Holds the touchline until the last moment, then attacks the far post." },
      { x: 86, y: 50, role: "Striker", short: "9", note: "Pins both centre backs so the eights get space to run into." },
      { x: 80, y: 88, role: "Right winger", short: "RW", note: "One-v-one merchant. The whole side is built to get them isolated." },
    ],
  },
  {
    id: "4231",
    name: "4-2-3-1",
    nickname: "The control shape",
    summary:
      "Two holding midfielders give the back four permanent cover, and a ten roams between the lines. The safest way to dominate possession without getting countered.",
    strength: "Double pivot makes counters against you very hard.",
    weakness: "The striker can end up alone if the ten does not join.",
    spots: [
      GK,
      { x: 24, y: 12, role: "Left back", short: "LB", note: "The main width provider on the left. The winger inside frees this lane." },
      { x: 20, y: 36, role: "Left centre back", short: "CB", note: "Splits wide at goal kicks so the pivot can drop between." },
      { x: 20, y: 64, role: "Right centre back", short: "CB", note: "Holds the line. Rarely steps out with two screens ahead." },
      { x: 24, y: 88, role: "Right back", short: "RB", note: "More conservative than the left. Balances the shape." },
      { x: 44, y: 36, role: "Left pivot", short: "6", note: "The destroyer. Kills the counter before it starts." },
      { x: 44, y: 64, role: "Right pivot", short: "6", note: "The passer. Turns defence into attack in one." },
      { x: 68, y: 14, role: "Left winger", short: "LW", note: "Comes inside onto the stronger foot as the full back overlaps." },
      { x: 68, y: 50, role: "Attacking midfielder", short: "10", note: "Lives between the lines. The one player nobody wants to mark." },
      { x: 68, y: 86, role: "Right winger", short: "RW", note: "Stays wide to stretch the back line horizontally." },
      { x: 88, y: 50, role: "Striker", short: "9", note: "Needs to hold the ball up. Everything runs through their back to goal." },
    ],
  },
  {
    id: "352",
    name: "3-5-2",
    nickname: "The wing-back system",
    summary:
      "A back three with two wing-backs supplying all the width, and a strike partnership through the middle. Brutal in transition, demanding on fitness.",
    strength: "Overloads the middle and gets two men on the last line.",
    weakness: "If a wing-back is caught high, the back three is exposed wide.",
    spots: [
      GK,
      { x: 20, y: 25, role: "Left centre back", short: "CB", note: "Steps out to cover the wing-back's inside shoulder." },
      { x: 18, y: 50, role: "Central defender", short: "CB", note: "The organiser. Sets the line for the other two." },
      { x: 20, y: 75, role: "Right centre back", short: "CB", note: "Defends the widest channel when the wing-back is up." },
      { x: 52, y: 8, role: "Left wing-back", short: "LWB", note: "Covers the whole flank. The most physically demanding job on the pitch." },
      { x: 46, y: 35, role: "Left centre mid", short: "CM", note: "Shuttles. Covers behind the wing-back when they go." },
      { x: 42, y: 50, role: "Holding midfielder", short: "6", note: "Sits in front of the three. Rarely crosses halfway." },
      { x: 46, y: 65, role: "Right centre mid", short: "CM", note: "The runner. Arrives late in the box." },
      { x: 52, y: 92, role: "Right wing-back", short: "RWB", note: "The main crossing outlet in this shape." },
      { x: 84, y: 38, role: "Striker", short: "9", note: "Runs the channel. Drags a centre back out to make space." },
      { x: 84, y: 62, role: "Second striker", short: "10", note: "Plays off the first. Picks up everything that drops." },
    ],
  },
  {
    id: "442",
    name: "4-4-2",
    nickname: "The old faithful",
    summary:
      "Two banks of four and a front two. Written off for years, still the hardest shape to break down when the two lines stay compact.",
    strength: "Compact, easy to organise, deadly on the counter.",
    weakness: "Gets outnumbered in central midfield against a three.",
    spots: [
      GK,
      { x: 22, y: 12, role: "Left back", short: "LB", note: "Tucks in tight. The winger ahead does the defensive running." },
      { x: 20, y: 38, role: "Left centre back", short: "CB", note: "One of a genuine partnership. They defend as a pair, not a unit of three." },
      { x: 20, y: 62, role: "Right centre back", short: "CB", note: "Attacks the first ball. The other covers behind." },
      { x: 22, y: 88, role: "Right back", short: "RB", note: "Overlaps only when the ball is safe. Discipline first." },
      { x: 50, y: 12, role: "Left midfielder", short: "LM", note: "Doubles up defensively. Not a winger, a midfielder who plays wide." },
      { x: 48, y: 38, role: "Centre midfielder", short: "CM", note: "The engine. Covers both boxes for ninety minutes." },
      { x: 48, y: 62, role: "Centre midfielder", short: "CM", note: "The other half of the pair. One goes, one holds, always." },
      { x: 50, y: 88, role: "Right midfielder", short: "RM", note: "Gets crosses in early. This shape feeds on width." },
      { x: 82, y: 36, role: "Striker", short: "9", note: "The target. Wins the first ball and holds it." },
      { x: 82, y: 64, role: "Strike partner", short: "9", note: "Plays off the knock-downs and runs in behind." },
    ],
  },
  {
    id: "532",
    name: "5-3-2",
    nickname: "The low block",
    summary:
      "The wing-backs drop in to make a back five. Concede the ball, protect the box, and hurt teams on the break. The away-day shape.",
    strength: "Almost no space between the lines for a ten to work in.",
    weakness: "Invites pressure. One mistake and you are camped in.",
    spots: [
      GK,
      { x: 30, y: 8, role: "Left wing-back", short: "LWB", note: "Drops to make the five. Springs forward the moment you win it." },
      { x: 24, y: 27, role: "Left centre back", short: "CB", note: "Covers the wide channel so the wing-back can press." },
      { x: 22, y: 50, role: "Central defender", short: "CB", note: "Never leaves the middle. Heads everything." },
      { x: 24, y: 73, role: "Right centre back", short: "CB", note: "Mirrors the left. Steps only when certain." },
      { x: 30, y: 92, role: "Right wing-back", short: "RWB", note: "The outlet. Fifty metres of running every counter." },
      { x: 48, y: 26, role: "Left centre mid", short: "CM", note: "Screens the half space where a ten wants to receive." },
      { x: 45, y: 50, role: "Holding midfielder", short: "6", note: "Sits on the edge of the box. Blocks the shooting lane." },
      { x: 48, y: 74, role: "Right centre mid", short: "CM", note: "Screens the other half space. Discipline over ambition." },
      { x: 76, y: 38, role: "Striker", short: "9", note: "Holds the ball to buy the team thirty seconds up the pitch." },
      { x: 76, y: 62, role: "Strike partner", short: "9", note: "The pace. Runs in behind the second the ball is won." },
    ],
  },
];
