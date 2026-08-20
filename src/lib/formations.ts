export type PhaseId = "buildUp" | "attack" | "restDefence" | "defence" | "transition";

export const phases: { id: PhaseId; label: string; blurb: string }[] = [
  {
    id: "buildUp",
    label: "Build-up",
    blurb: "Playing out from the goalkeeper against the first line of pressure.",
  },
  {
    id: "attack",
    label: "Attacking",
    blurb: "Settled possession in the final third against a set defence.",
  },
  {
    id: "restDefence",
    label: "Rest defence",
    blurb: "The shape you keep behind the ball while you are attacking.",
  },
  {
    id: "defence",
    label: "Defending",
    blurb: "Out of possession, organised in a block.",
  },
  {
    id: "transition",
    label: "Transition",
    blurb: "The six seconds after the ball changes hands, both ways.",
  },
];

export type Spot = {
  /** % up the pitch: 0 is your own goal line, 100 is theirs */
  x: number;
  /** % across the pitch */
  y: number;
  role: string;
  short: string;
  /** What the position is, in one line */
  note: string;
  /** The recognised interpretations of this position */
  variants: { name: string; detail: string }[];
  /** Players who define those interpretations */
  players: string[];
  /** Job in each phase. Only the phases where this position matters. */
  jobs: Partial<Record<PhaseId, string>>;
};

export type Formation = {
  id: string;
  name: string;
  nickname: string;
  summary: string;
  strength: string;
  weakness: string;
  /** How the shape behaves in each phase of play */
  phaseNotes: Record<PhaseId, { shape: string; detail: string }>;
  /** Where players move in each phase, keyed by index into spots */
  shifts: Partial<Record<PhaseId, Record<number, { x: number; y: number }>>>;
  spots: Spot[];
};

const keeper = (build: string): Spot => ({
  x: 7,
  y: 50,
  role: "Goalkeeper",
  short: "GK",
  note: "The spare man. Against two pressing forwards the keeper is the free player that makes building out possible.",
  variants: [
    {
      name: "Sweeper keeper",
      detail: "Defends the space behind a high line and starts attacks with their feet.",
    },
    {
      name: "Line keeper",
      detail: "Stays on the goal line, wins their box, plays direct. Suits a deep block.",
    },
    {
      name: "Distributor",
      detail: "Breaks the press with a mid-range pass into midfield rather than a long ball.",
    },
  ],
  players: ["Ronwen Williams", "Ederson", "Manuel Neuer", "Gianluigi Donnarumma"],
  jobs: { buildUp: build, restDefence: "Positioned on the edge of the box as the last covering defender.", transition: "First decision after a turnover: hold and settle, or release the counter early." },
});

export const formations: Formation[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "433",
    name: "4-3-3",
    nickname: "The default",
    summary:
      "Three forwards holding the width with a midfield triangle behind them. The shape most sides default to because it gives natural passing angles in every direction and covers the pitch evenly.",
    strength: "Width high up the pitch, and a spare midfielder to build through.",
    weakness: "The single pivot gets isolated when both eights push beyond the ball.",
    phaseNotes: {
      buildUp: {
        shape: "2-3-5 or 3-2-5",
        detail:
          "The centre backs split either side of the box and the pivot drops between or just in front of them. Both full backs step into midfield, or one inverts while the other stays wide, turning the back four into a back three plus a double pivot. That gives five players in the last line and a 3v2 against the opposition's front two.",
      },
      attack: {
        shape: "3-2-5",
        detail:
          "Wingers stay pinned to the touchline to stretch the back four horizontally. The striker occupies both centre backs so the eights can attack the half spaces between full back and centre back. The two deepest midfielders sit at the top of the box for cut-backs and second balls.",
      },
      restDefence: {
        shape: "3-2",
        detail:
          "Three defenders and the pivot pair stay behind the ball at all times. This is the counter-prevention structure: whoever loses the ball has two screens and three defenders behind them, so a break has to beat five organised players.",
      },
      defence: {
        shape: "4-1-4-1 or 4-5-1",
        detail:
          "The striker screens the pivot and shows play to one side. The near winger drops to make a bank of five while the far winger tucks into midfield. Against a back three, the striker curves their run to press one centre back while blocking the pass to the other.",
      },
      transition: {
        shape: "Counter-press",
        detail:
          "Because five players are already high, the first response to losing the ball is to press it immediately rather than drop. Win it back within six seconds and the opponent is still disorganised. If the press is beaten, the three-plus-two behind the ball buys time to reset.",
      },
    },
    shifts: {
      buildUp: {
        1: { x: 34, y: 30 },
        4: { x: 30, y: 72 },
        5: { x: 30, y: 50 },
        6: { x: 48, y: 26 },
        7: { x: 48, y: 74 },
        9: { x: 66, y: 50 },
      },
      attack: {
        1: { x: 52, y: 20 },
        4: { x: 52, y: 88 },
        5: { x: 56, y: 42 },
        6: { x: 74, y: 32 },
        7: { x: 74, y: 68 },
        8: { x: 90, y: 8 },
        9: { x: 92, y: 50 },
        10: { x: 90, y: 92 },
      },
      restDefence: {
        1: { x: 46, y: 26 },
        2: { x: 40, y: 40 },
        3: { x: 40, y: 62 },
        4: { x: 46, y: 76 },
        5: { x: 52, y: 50 },
      },
      defence: {
        1: { x: 22, y: 14 },
        2: { x: 20, y: 38 },
        3: { x: 20, y: 62 },
        4: { x: 22, y: 86 },
        5: { x: 36, y: 50 },
        6: { x: 44, y: 34 },
        7: { x: 44, y: 66 },
        8: { x: 46, y: 14 },
        9: { x: 62, y: 50 },
        10: { x: 46, y: 86 },
      },
    },
    spots: [
      keeper(
        "Steps to the edge of the box to make a back three, giving the centre backs an easy out-ball and forcing the press to commit."
      ),
      {
        x: 26,
        y: 12,
        role: "Left back",
        short: "LB",
        note: "Either overlaps the winger or steps inside to make a midfield three in possession.",
        variants: [
          { name: "Inverted full back", detail: "Steps into central midfield in build-up to create a double pivot and protect against counters." },
          { name: "Overlapping full back", detail: "Runs outside the winger to create a 2v1 and deliver from the byline." },
          { name: "Underlapping full back", detail: "Runs inside the winger into the half space, dragging the full back with them." },
        ],
        players: ["Alphonso Davies", "Josko Gvardiol", "Aurélien Tchouaméni"],
        jobs: {
          buildUp: "Steps into midfield beside the pivot, turning the shape into a 3-2. This creates a passing lane that did not exist and pulls the opposition winger inside.",
          attack: "Holds the touchline when the winger comes inside, or overlaps when they stay wide. Only one of them can be wide at a time.",
          restDefence: "Tucks in to make a back three so the team is never caught with a flat, empty back line.",
          defence: "Defends the wide channel and shows the winger onto their weaker foot, with the centre back covering inside.",
        },
      },
      {
        x: 20,
        y: 36,
        role: "Left centre back",
        short: "LCB",
        note: "Usually the ball player. Steps into midfield when the pivot drops.",
        variants: [
          { name: "Ball-playing defender", detail: "Breaks lines with passes through the press rather than around it." },
          { name: "Stepping centre back", detail: "Carries into midfield to create an overload, forcing someone to leave their man." },
          { name: "Wide centre back", detail: "In a back three, defends the outside channel and overlaps the winger." },
        ],
        players: ["Virgil van Dijk", "Antonio Rüdiger", "Grant Kekana"],
        jobs: {
          buildUp: "Splits wide of the box. The first pass out of defence usually comes from here, so the angle they take is the whole build-up.",
          attack: "Holds the halfway line to keep the opponent pinned and recycles possession from side to side.",
          restDefence: "One of the three that never crosses halfway. Responsible for the space behind the advanced full back.",
          defence: "Sets the height of the line and decides when to step out and when to drop.",
        },
      },
      {
        x: 20,
        y: 64,
        role: "Right centre back",
        short: "RCB",
        note: "The aggressive one. Wins the duel so the line can push up.",
        variants: [
          { name: "Stopper", detail: "Steps in front of the striker to attack the ball early rather than waiting for it." },
          { name: "Coverer", detail: "Sits half a yard deeper to sweep behind the stopper." },
          { name: "Aerial dominator", detail: "Wins the first ball against a target man so the midfield can play off the knock-downs." },
        ],
        players: ["William Saliba", "Rúben Dias", "Mosa Lebusa"],
        jobs: {
          buildUp: "Offers the simple sideways option and is prepared to go long if both midfield options are covered.",
          attack: "Guards the space in front of their own box for cleared crosses and second balls.",
          restDefence: "Defends the central lane against the counter. Never gets dragged wide.",
          defence: "Attacks the first ball, communicates the line, and dominates the striker physically.",
        },
      },
      {
        x: 26,
        y: 88,
        role: "Right back",
        short: "RB",
        note: "Holds width when the winger comes inside, tucks in when they stay out.",
        variants: [
          { name: "Attacking full back", detail: "Effectively a winger, delivering most of the crosses." },
          { name: "Inverted playmaker", detail: "Steps into midfield to dictate tempo from an unexpected position." },
          { name: "Defensive full back", detail: "Stays home to balance an attacking left side. Positional discipline first." },
        ],
        players: ["Trent Alexander-Arnold", "Achraf Hakimi", "Khuliso Mudau"],
        jobs: {
          buildUp: "Either pushes high to pin the opposition winger, or inverts. The two full backs should rarely do the same thing at the same time.",
          attack: "The main crossing outlet on this side. Times the overlap so the winger can play them in behind.",
          restDefence: "If the left back is high, this one tucks in as the third defender.",
          defence: "One-v-one defending in the wide area, delaying rather than diving in until support arrives.",
        },
      },
      {
        x: 42,
        y: 50,
        role: "Holding midfielder",
        short: "CDM",
        note: "Screens the back four and sets the tempo. The whole shape breaks without them.",
        variants: [
          { name: "Regista", detail: "The deep playmaker who dictates tempo and switches play. Everything comes through them." },
          { name: "Destroyer", detail: "Wins the ball, kills counters, keeps the pass simple. Positional intelligence over passing range." },
          { name: "Half back", detail: "Drops between the centre backs in possession to make a back three." },
        ],
        players: ["Rodri", "Casemiro", "Teboho Mokoena", "Andrea Pirlo"],
        jobs: {
          buildUp: "Drops between or in front of the centre backs to give a third angle. If marked, their movement still drags a presser out of position.",
          attack: "Sits at the top of the box, recycling and switching. Their positioning decides whether a counter is possible.",
          restDefence: "The single most important player in counter-prevention. Screens the pass into the opponent's striker.",
          defence: "Protects the space in front of the back four and picks up whoever arrives between the lines.",
          transition: "Fouls tactically if the counter is on. A yellow card here is cheaper than a two-on-two.",
        },
      },
      {
        x: 58,
        y: 28,
        role: "Left central midfielder",
        short: "LCM",
        note: "Runs beyond the striker. This is where goals from midfield come from.",
        variants: [
          { name: "Box-to-box", detail: "Covers both penalty areas, arrives late in the box." },
          { name: "Mezzala", detail: "Lives in the half space between full back and centre back, drifting wide to combine." },
          { name: "Free eight", detail: "Given licence to roam and find pockets, with the pivot covering behind." },
        ],
        players: ["Jude Bellingham", "Federico Valverde", "Frank Lampard"],
        jobs: {
          buildUp: "Drops to receive between the lines, or pins a midfielder so the pivot is free. Either way they occupy someone.",
          attack: "Attacks the half space and the back post. The run beyond the striker is what breaks a low block.",
          restDefence: "Recovers to the edge of the box. First to press if the ball is turned over centrally.",
          defence: "Presses the opposition pivot and blocks the pass inside.",
        },
      },
      {
        x: 58,
        y: 72,
        role: "Right central midfielder",
        short: "RCM",
        note: "Usually the ball carrier who breaks the first line of pressure.",
        variants: [
          { name: "Carrier", detail: "Beats the press by dribbling through it, turning a 3v3 into a 4v3." },
          { name: "Creator", detail: "Receives on the half turn and plays the pass before the last one." },
          { name: "Shuttler", detail: "Covers ground between the lines defensively, linking pivot and attack." },
        ],
        players: ["Kevin De Bruyne", "Ilkay Gündogan", "Themba Zwane"],
        jobs: {
          buildUp: "Shows for the ball between the lines with the body already open to play forward.",
          attack: "Combines with the winger and full back in the wide triangle, then delivers the cut-back.",
          restDefence: "Holds a position just ahead of the pivot to screen the counter on this side.",
          defence: "Presses in a curved run so the pass inside is closed as they arrive.",
        },
      },
      {
        x: 80,
        y: 12,
        role: "Left winger",
        short: "LW",
        note: "Holds the touchline until the last moment, then attacks the far post.",
        variants: [
          { name: "Inverted winger", detail: "Plays on the opposite side to their strong foot, cutting in to shoot and combine." },
          { name: "Touchline winger", detail: "Stays wide and beats their man on the outside to cross." },
          { name: "Inside forward", detail: "Starts wide but finishes as a second striker at the back post." },
        ],
        players: ["Mohamed Salah", "Vinícius Júnior", "Relebohile Mofokeng"],
        jobs: {
          buildUp: "Stays as high and wide as possible. Their job here is to pin the full back, not to receive.",
          attack: "One-v-one in isolation, or attacks the far post when the ball is on the other side.",
          restDefence: "Does not recover. Stays high as the counter-attack outlet.",
          defence: "Drops to make a bank of five and doubles up on the opposition full back.",
        },
      },
      {
        x: 88,
        y: 50,
        role: "Striker",
        short: "ST",
        note: "Pins both centre backs so the eights get space to run into.",
        variants: [
          { name: "Target man", detail: "Holds the ball with their back to goal so the team can advance." },
          { name: "Pressing forward", detail: "The first defender. Sets the trap by showing play one way." },
          { name: "False nine", detail: "Drops into midfield to create an overload and drag a centre back out." },
          { name: "Poacher", detail: "Lives on the last shoulder, judged purely on finishing." },
        ],
        players: ["Erling Haaland", "Harry Kane", "Iqraam Rayners", "Roberto Firmino"],
        jobs: {
          buildUp: "Occupies both centre backs so neither can step into midfield. Pure occupation, often without touching the ball.",
          attack: "Attacks the near post to drag a marker, opening the space behind for the arriving eight.",
          restDefence: "Stays central as the reference point for the clearance.",
          defence: "The first defender. Curves the press to force play into the trap side.",
          transition: "Holds the ball up for three seconds to let the team get up the pitch.",
        },
      },
      {
        x: 80,
        y: 88,
        role: "Right winger",
        short: "RW",
        note: "One-v-one merchant. The whole side is built to get them isolated.",
        variants: [
          { name: "Isolation winger", detail: "The team switches play specifically to give them a 1v1 with space." },
          { name: "Wide creator", detail: "Comes short to combine and plays the final ball rather than taking it on." },
          { name: "Runner in behind", detail: "Attacks the space over the top instead of taking on the full back." },
        ],
        players: ["Bukayo Saka", "Lamine Yamal", "Riyad Mahrez"],
        jobs: {
          buildUp: "Holds width to stretch the back line horizontally and create central gaps.",
          attack: "Takes on the full back with a spare defender occupied by the overlapping run.",
          restDefence: "Stays high with the striker as the second counter outlet.",
          defence: "Tracks the opposition full back and blocks the switch of play.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "4231",
    name: "4-2-3-1",
    nickname: "The control shape",
    summary:
      "Two holding midfielders give the back four permanent cover while a ten roams between the lines. The safest way to dominate the ball without getting countered.",
    strength: "The double pivot makes counters against you very hard to execute.",
    weakness: "The striker can end up isolated if the ten does not join them.",
    phaseNotes: {
      buildUp: {
        shape: "2-4-4",
        detail:
          "The two pivots split either side of the centre backs, giving four options across the second line. The ten drops into the space the opposition pivot vacates. Against a 4-4-2 press this creates a permanent 4v2 in midfield, which is why this shape rarely gets pinned in.",
      },
      attack: {
        shape: "2-3-5",
        detail:
          "Both full backs push high, one pivot steps forward and the other holds. The ten operates in the pocket between the opposition's midfield and defence, which is the hardest area in football to defend because nobody's marking assignment covers it.",
      },
      restDefence: {
        shape: "2-2 or 4-2",
        detail:
          "The two centre backs and two pivots form a perfect box behind the ball. This is the most secure rest-defence structure in football and the main reason coaches choose this shape over a 4-3-3.",
      },
      defence: {
        shape: "4-4-1-1",
        detail:
          "The ten screens the opposition pivot while the striker presses the centre backs. The wingers drop into a flat midfield four. Compact, easy to coach, and very hard to play through centrally.",
      },
      transition: {
        shape: "Counter through the ten",
        detail:
          "Win the ball and the first pass goes to the ten, who is already facing forward. The two pivots hold their position rather than joining, which is what keeps the shape safe.",
      },
    },
    shifts: {
      buildUp: {
        1: { x: 34, y: 12 },
        4: { x: 34, y: 88 },
        5: { x: 30, y: 30 },
        6: { x: 30, y: 70 },
        8: { x: 60, y: 50 },
      },
      attack: {
        1: { x: 62, y: 10 },
        4: { x: 62, y: 90 },
        5: { x: 58, y: 40 },
        6: { x: 48, y: 60 },
        7: { x: 84, y: 14 },
        8: { x: 78, y: 50 },
        9: { x: 84, y: 86 },
        10: { x: 92, y: 44 },
      },
      restDefence: {
        1: { x: 40, y: 22 },
        4: { x: 40, y: 78 },
        5: { x: 46, y: 40 },
        6: { x: 46, y: 60 },
      },
      defence: {
        1: { x: 22, y: 12 },
        2: { x: 20, y: 38 },
        3: { x: 20, y: 62 },
        4: { x: 22, y: 88 },
        5: { x: 40, y: 40 },
        6: { x: 40, y: 60 },
        7: { x: 42, y: 14 },
        8: { x: 56, y: 50 },
        9: { x: 42, y: 86 },
        10: { x: 68, y: 50 },
      },
    },
    spots: [
      keeper(
        "Rarely needs to step out. With four options ahead of them the simple pass is almost always on."
      ),
      {
        x: 26,
        y: 12,
        role: "Left back",
        short: "LB",
        note: "The main width provider on the left, freed by the winger coming inside.",
        variants: [
          { name: "Wing back in all but name", detail: "Provides all the width on this flank and gets to the byline." },
          { name: "Inverted full back", detail: "Steps in to make a midfield three when the pivot pushes on." },
          { name: "Balanced full back", detail: "Times runs off the winger rather than committing every time." },
        ],
        players: ["Andrew Robertson", "Theo Hernández", "Aubrey Modiba"],
        jobs: {
          buildUp: "Pushes high and wide immediately, pinning the opposition winger so they cannot press the centre back.",
          attack: "Overlaps into the space the inverted winger has vacated and delivers early.",
          restDefence: "Recovers to make a back three with the two centre backs.",
          defence: "Part of a flat back four. Holds the line rather than stepping out.",
        },
      },
      {
        x: 20,
        y: 36,
        role: "Left centre back",
        short: "LCB",
        note: "Splits wide at goal kicks so a pivot can drop between.",
        variants: [
          { name: "Progressor", detail: "Carries the ball into midfield when the press does not engage." },
          { name: "Line-breaking passer", detail: "Finds the ten between the lines with a vertical pass." },
        ],
        players: ["Josko Gvardiol", "Alessandro Bastoni", "Nyiko Mobbie"],
        jobs: {
          buildUp: "Receives wide of the box and either carries forward or plays into the pivot on the half turn.",
          attack: "Holds a high line to compress the pitch.",
          restDefence: "Half of the defensive box. Never both centre backs stepping at once.",
          defence: "Sets the line with their partner and defends the left channel.",
        },
      },
      {
        x: 20,
        y: 64,
        role: "Right centre back",
        short: "RCB",
        note: "Holds the line. Rarely steps out with two screens ahead.",
        variants: [
          { name: "Aerial anchor", detail: "Wins everything in the air, defends the six-yard box." },
          { name: "Recovery defender", detail: "Pace to defend the space behind a high line." },
        ],
        players: ["Marquinhos", "Gabriel Magalhães", "Thapelo Morena"],
        jobs: {
          buildUp: "Provides the simple switch to change the angle of attack.",
          attack: "Screens the counter alongside the pivots.",
          restDefence: "The deepest of the four in the box structure.",
          defence: "Attacks crosses and organises the line.",
        },
      },
      {
        x: 26,
        y: 88,
        role: "Right back",
        short: "RB",
        note: "More conservative than the left. Balances the shape.",
        variants: [
          { name: "Holding full back", detail: "Stays home so the opposite full back can attack freely." },
          { name: "Third centre back", detail: "Tucks inside in possession to form a back three." },
        ],
        players: ["Kyle Walker", "Dani Carvajal", "Khuliso Mudau"],
        jobs: {
          buildUp: "Stays deeper than the left back so the team is never four-across-the-back-and-nobody-home.",
          attack: "Underlaps rather than overlaps, arriving at the top of the box for the cut-back.",
          restDefence: "The safety full back. Tucks in immediately when possession is lost.",
          defence: "Defends one-v-one and forces the winger outside.",
        },
      },
      {
        x: 44,
        y: 36,
        role: "Left pivot",
        short: "CDM",
        note: "The destroyer. Kills the counter before it starts.",
        variants: [
          { name: "Ball winner", detail: "Aggressive, front-foot defending in midfield. Reads where the pass is going." },
          { name: "Anchor", detail: "Positional discipline over ball-winning. Sits in the space and blocks it." },
        ],
        players: ["N'Golo Kanté", "Declan Rice", "Sipho Mbule"],
        jobs: {
          buildUp: "Drops beside the centre back to make a 3v2 against the opposition's front two.",
          attack: "Holds position at the edge of the box. Does not join the attack.",
          restDefence: "Half of the four-man box. Screens the pass into the striker's feet.",
          defence: "Presses the ball in midfield while the partner covers behind.",
          transition: "The tactical foul, or the immediate counter-press. Decides which within a second.",
        },
      },
      {
        x: 44,
        y: 64,
        role: "Right pivot",
        short: "DLP",
        note: "The passer. Turns defence into attack in one.",
        variants: [
          { name: "Deep-lying playmaker", detail: "Dictates tempo, switches the point of attack, plays the ball that breaks a line." },
          { name: "Progressive carrier", detail: "Drives forward with the ball to commit an opponent." },
        ],
        players: ["Toni Kroos", "Martin Zubimendi", "Bongani Zungu"],
        jobs: {
          buildUp: "Receives on the half turn and switches play. The tempo of the whole team is set here.",
          attack: "Steps forward into the space the ten vacates, arriving as a second wave.",
          restDefence: "The other half of the box. Covers when the partner presses.",
          defence: "Screens the space between the lines and picks up runners from deep.",
        },
      },
      {
        x: 68,
        y: 14,
        role: "Left winger",
        short: "LW",
        note: "Comes inside onto the stronger foot as the full back overlaps.",
        variants: [
          { name: "Inverted winger", detail: "Cuts in to shoot, creating the lane for the overlapping full back." },
          { name: "Second striker", detail: "Effectively a forward, attacking the box alongside the nine." },
        ],
        players: ["Rafael Leão", "Kaoru Mitoma", "Oswin Appollis"],
        jobs: {
          buildUp: "Stays high to pin the full back, or drops into the half space to create a spare man.",
          attack: "Cuts inside onto the strong foot while the full back runs outside them.",
          restDefence: "Stays high as an outlet. Does not track all the way back.",
          defence: "Drops into the flat four and doubles up wide.",
        },
      },
      {
        x: 68,
        y: 50,
        role: "Attacking midfielder",
        short: "CAM",
        note: "Lives between the lines. The one player nobody wants to pick up.",
        variants: [
          { name: "Classic ten", detail: "Receives in the pocket, turns, and plays the killer ball." },
          { name: "Shadow striker", detail: "Attacks the box beyond the nine rather than creating for others." },
          { name: "Pressing ten", detail: "Chosen for their work rate screening the opposition pivot out of possession." },
        ],
        players: ["Kevin De Bruyne", "Bruno Fernandes", "Themba Zwane", "Mesut Özil"],
        jobs: {
          buildUp: "Drops into the space the opposition pivot leaves. Being marked is still a win: it drags a midfielder out of shape.",
          attack: "Operates in the pocket between midfield and defence and delivers the final pass.",
          restDefence: "The highest of the counter-pressers. First to the ball after a turnover.",
          defence: "Screens the opposition's deepest midfielder so the ball cannot go through the middle.",
          transition: "The outlet. Wins the ball and this is the first forward pass, already facing goal.",
        },
      },
      {
        x: 68,
        y: 86,
        role: "Right winger",
        short: "RW",
        note: "Stays wide to stretch the back line horizontally.",
        variants: [
          { name: "Touchline winger", detail: "Holds width all game to keep the pitch as wide as possible." },
          { name: "Direct dribbler", detail: "Takes on the full back at every opportunity." },
        ],
        players: ["Bukayo Saka", "Michael Olise", "Patrick Maswanganyi"],
        jobs: {
          buildUp: "Holds the touchline to keep the opposition back four stretched.",
          attack: "One-v-one, or the cut-back from the byline.",
          restDefence: "Stays high with the striker.",
          defence: "Tracks the full back and blocks the switch.",
        },
      },
      {
        x: 88,
        y: 50,
        role: "Striker",
        short: "ST",
        note: "Needs to hold the ball up. Everything runs through their back to goal.",
        variants: [
          { name: "Complete forward", detail: "Holds, runs in behind, and finishes. The full package this shape asks for." },
          { name: "Link forward", detail: "Drops to combine with the ten and let wingers attack the box." },
          { name: "Runner", detail: "Attacks the space behind rather than coming short." },
        ],
        players: ["Harry Kane", "Victor Osimhen", "Lyle Foster"],
        jobs: {
          buildUp: "Occupies both centre backs. If they drop, the ten runs beyond them instead.",
          attack: "Attacks the box, or drops to link so the ten and wingers can run past.",
          restDefence: "Stays central. The reference point for the long clearance.",
          defence: "Presses one centre back while blocking the pass to the other.",
          transition: "Holds up the first pass to relieve pressure and set the counter.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "352",
    name: "3-5-2",
    nickname: "The wing-back system",
    summary:
      "A back three with two wing-backs supplying all the width, and a strike partnership through the middle. Brutal in transition and physically demanding to play.",
    strength: "Overloads central midfield and gets two players on the last line.",
    weakness: "If a wing-back is caught high, the back three is exposed in the wide channel.",
    phaseNotes: {
      buildUp: {
        shape: "3-2-5",
        detail:
          "The back three splits wide with the pivot dropping in. The wide centre backs carry into midfield, which is the key mechanism: a centre back stepping forward with the ball forces a forward to press and immediately creates a free man behind them.",
      },
      attack: {
        shape: "3-2-5",
        detail:
          "Both wing-backs are on the last line, giving five attackers with two strikers occupying the centre backs. The strike partnership works in tandem: one comes short, the other runs in behind, so the centre backs are pulled in opposite directions.",
      },
      restDefence: {
        shape: "3-2",
        detail:
          "The back three plus the two central midfielders hold. This is why the shape survives losing wing-backs high up: three defenders is enough to handle a two-man counter while the midfielders screen.",
      },
      defence: {
        shape: "5-3-2",
        detail:
          "The wing-backs drop to make a back five. Two strikers press the centre backs and block the pass into midfield, forcing play wide where the wing-back and wide centre back double up.",
      },
      transition: {
        shape: "Direct counter",
        detail:
          "The most dangerous shape in the game on the counter. Two strikers ahead of the ball means an immediate 2v2 or 2v3, and the wing-backs cover fifty metres to make it four attackers within seconds.",
      },
    },
    shifts: {
      buildUp: {
        1: { x: 28, y: 22 },
        3: { x: 28, y: 78 },
        4: { x: 48, y: 8 },
        8: { x: 48, y: 92 },
        6: { x: 34, y: 50 },
      },
      attack: {
        1: { x: 46, y: 22 },
        3: { x: 46, y: 78 },
        4: { x: 84, y: 8 },
        8: { x: 84, y: 92 },
        5: { x: 62, y: 34 },
        7: { x: 62, y: 66 },
        6: { x: 50, y: 50 },
      },
      restDefence: {
        4: { x: 46, y: 16 },
        8: { x: 46, y: 84 },
        5: { x: 44, y: 36 },
        7: { x: 44, y: 64 },
        6: { x: 38, y: 50 },
      },
      defence: {
        1: { x: 20, y: 26 },
        2: { x: 18, y: 50 },
        3: { x: 20, y: 74 },
        4: { x: 22, y: 8 },
        8: { x: 22, y: 92 },
        5: { x: 40, y: 32 },
        6: { x: 38, y: 50 },
        7: { x: 40, y: 68 },
        9: { x: 62, y: 40 },
        10: { x: 62, y: 60 },
      },
    },
    spots: [
      keeper(
        "With three defenders ahead there is almost always a spare man, so the keeper rarely has to go long."
      ),
      {
        x: 22,
        y: 25,
        role: "Left centre back",
        short: "LCB",
        note: "Steps out to cover the wing-back's inside shoulder.",
        variants: [
          { name: "Carrying wide centre back", detail: "Drives into midfield with the ball to break the first line." },
          { name: "Overlapping centre back", detail: "Runs beyond the winger to create a wide overload." },
        ],
        players: ["Josko Gvardiol", "Alessandro Bastoni", "Grant Kekana"],
        jobs: {
          buildUp: "Carries forward into the space the wing-back vacated. This is the shape's main way of beating a press.",
          attack: "Pushes to the halfway line and provides the switch of play.",
          restDefence: "Defends the wide channel behind the advanced wing-back.",
          defence: "Becomes the left of a back five and defends the outside channel.",
        },
      },
      {
        x: 20,
        y: 50,
        role: "Central defender",
        short: "CB",
        note: "The organiser. Sets the line for the other two.",
        variants: [
          { name: "Libero", detail: "The spare man who sweeps behind and steps into midfield when free." },
          { name: "Commander", detail: "Organises the line and wins everything central. Rarely leaves position." },
        ],
        players: ["Virgil van Dijk", "Kalidou Koulibaly", "Mosa Lebusa"],
        jobs: {
          buildUp: "The free man. If nobody presses, they must carry the ball forward until someone does.",
          attack: "Holds the central position as the deepest player behind the ball.",
          restDefence: "Never leaves the middle. The insurance policy for everything ahead.",
          defence: "Marshals the back five and attacks every cross into the six-yard box.",
        },
      },
      {
        x: 22,
        y: 75,
        role: "Right centre back",
        short: "RCB",
        note: "Defends the widest channel when the wing-back is high.",
        variants: [
          { name: "Aggressive stepper", detail: "Follows the striker into midfield to deny them the turn." },
          { name: "Recovery pace", detail: "Covers the space in behind so the other two can defend forward." },
        ],
        players: ["Rúben Dias", "Gleison Bremer", "Nyiko Mobbie"],
        jobs: {
          buildUp: "Mirrors the left centre back. One carries, the other holds.",
          attack: "Provides balance while the ball is on the far side.",
          restDefence: "Covers the channel behind the right wing-back.",
          defence: "Right of the back five, doubling up with the wing-back.",
        },
      },
      {
        x: 52,
        y: 8,
        role: "Left wing-back",
        short: "LWB",
        note: "Covers the whole flank. The most physically demanding job on the pitch.",
        variants: [
          { name: "Attacking wing-back", detail: "Effectively a winger with defensive duties. The main creator." },
          { name: "Defensive wing-back", detail: "A full back given licence to push on, prioritising the back five." },
          { name: "Inverted wing-back", detail: "Steps into midfield rather than staying wide, creating a midfield three." },
        ],
        players: ["Alphonso Davies", "Federico Dimarco", "Aubrey Modiba"],
        jobs: {
          buildUp: "Pushes high immediately to stretch the pitch and occupy the opposition winger.",
          attack: "Reaches the last line, giving five attackers. Most crosses come from here.",
          restDefence: "The risk point. If caught upfield, the wide centre back must cover.",
          defence: "Drops fifty metres to become the left of a back five. Every single time.",
          transition: "Sprints the length of the flank to turn a two-man counter into a four-man one.",
        },
      },
      {
        x: 48,
        y: 33,
        role: "Left central midfielder",
        short: "LCM",
        note: "Shuttles. Covers behind the wing-back when they push on.",
        variants: [
          { name: "Shuttler", detail: "Covers ground box to box, filling whichever space opens." },
          { name: "Creative eight", detail: "The main passer, dropping wide to combine with the wing-back." },
        ],
        players: ["Nicolò Barella", "Federico Valverde", "Teboho Mokoena"],
        jobs: {
          buildUp: "Offers an angle between the lines and drops wide if the wing-back is pressed.",
          attack: "Arrives late in the box for cut-backs and second balls.",
          restDefence: "Screens the counter alongside the pivot and covers the wing-back's channel.",
          defence: "Part of the midfield three, shuttling across to double up wide.",
        },
      },
      {
        x: 42,
        y: 50,
        role: "Holding midfielder",
        short: "CDM",
        note: "Sits in front of the three. Rarely crosses halfway.",
        variants: [
          { name: "Anchor", detail: "Pure screen. Positional discipline, simple passing, no forward runs." },
          { name: "Deep playmaker", detail: "Drops between the wide centre backs to start every attack." },
        ],
        players: ["Rodri", "Marco Verratti", "Sipho Mbule"],
        jobs: {
          buildUp: "Drops between the back three to create a 4v2 against the opposition's front two.",
          attack: "Holds at the edge of the box and recycles. The pivot around which the shape turns.",
          restDefence: "The screen. Everything through the middle has to pass them first.",
          defence: "Central of the midfield three, protecting the space in front of the back five.",
        },
      },
      {
        x: 48,
        y: 67,
        role: "Right central midfielder",
        short: "RCM",
        note: "The runner. Arrives late in the box.",
        variants: [
          { name: "Late runner", detail: "Times arrival into the box behind the strikers." },
          { name: "Ball winner", detail: "Aggressive presser who springs the counter." },
        ],
        players: ["Jude Bellingham", "Hakan Calhanoglu", "Bongani Zungu"],
        jobs: {
          buildUp: "Rotates with the wing-back so someone always occupies the half space.",
          attack: "Third man into the box. The strikers occupy, this player finishes.",
          restDefence: "Balances the shape when the other eight pushes forward.",
          defence: "Presses the opposition's deepest midfielder.",
        },
      },
      {
        x: 52,
        y: 92,
        role: "Right wing-back",
        short: "RWB",
        note: "The main crossing outlet in this shape.",
        variants: [
          { name: "Crosser", detail: "Gets to the byline and delivers for two strikers." },
          { name: "Inverted wing-back", detail: "Comes inside to overload midfield instead of holding width." },
        ],
        players: ["Achraf Hakimi", "Denzel Dumfries", "Khuliso Mudau"],
        jobs: {
          buildUp: "Holds width to pin the opposition winger back into their own half.",
          attack: "Delivers from the byline. With two strikers in the box, crossing is a genuine weapon here.",
          restDefence: "Recovers as fast as possible, or the back three becomes a two-v-three.",
          defence: "Right of the back five.",
          transition: "The fifty-metre sprint that turns a break into a goal.",
        },
      },
      {
        x: 84,
        y: 38,
        role: "Striker",
        short: "ST",
        note: "Runs the channel and drags a centre back out to make space.",
        variants: [
          { name: "Channel runner", detail: "Attacks the space between centre back and full back rather than staying central." },
          { name: "Target man", detail: "Holds the ball up so the partner can run beyond." },
        ],
        players: ["Marcus Thuram", "Darwin Núñez", "Iqraam Rayners"],
        jobs: {
          buildUp: "Runs the channel to offer a direct out-ball when playing short is not on.",
          attack: "Occupies one centre back and attacks the near post.",
          defence: "Presses one centre back and blocks the pass into midfield.",
          transition: "One of two players already ahead of the ball. The counter starts here.",
        },
      },
      {
        x: 84,
        y: 62,
        role: "Second striker",
        short: "SS",
        note: "Plays off the first and picks up everything that drops.",
        variants: [
          { name: "Second striker", detail: "Drops into the pocket and links midfield to attack." },
          { name: "Poacher", detail: "Stays on the last shoulder and finishes what the partner creates." },
          { name: "Wide-drifting forward", detail: "Pulls into the channel to create central space for the partner." },
        ],
        players: ["Lautaro Martínez", "Julián Álvarez", "Relebohile Mofokeng"],
        jobs: {
          buildUp: "Drops into midfield to create a numerical advantage against the opposition pivot.",
          attack: "Works in tandem with the striker: one short, one in behind, never both the same.",
          defence: "Screens the pass into the opposition's holding midfielder.",
          transition: "The runner. Wins the ball and this player is already sprinting behind the line.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "442",
    name: "4-4-2",
    nickname: "The old faithful",
    summary:
      "Two banks of four with a front two. Written off for years, still the hardest shape to break down when both lines stay compact and disciplined.",
    strength: "Compact, simple to organise, and lethal on the counter.",
    weakness: "Gets outnumbered in central midfield against a three.",
    phaseNotes: {
      buildUp: {
        shape: "2-4-4 or 4-4-2",
        detail:
          "The most direct of the shapes. The centre backs split, the midfield two drop to receive, and full backs push on. Many sides using this shape deliberately skip the build-up entirely and go long to the front two, then win the second ball with a compact midfield.",
      },
      attack: {
        shape: "2-4-4",
        detail:
          "Both wide midfielders push on to become wingers and both full backs advance, giving four in the attacking line. Crossing is central to this shape because two strikers in the box makes it a genuinely efficient way to score.",
      },
      restDefence: {
        shape: "4-2",
        detail:
          "The back four plus both central midfielders hold their positions. Because the wide players are midfielders rather than wingers, they recover quickly, so this shape is rarely caught out of position.",
      },
      defence: {
        shape: "4-4-2",
        detail:
          "Two banks of four with about ten metres between them, shuffling across as a unit. The front two block the pass into midfield. Nothing goes through the middle. The whole design forces play wide, where the touchline acts as an extra defender.",
      },
      transition: {
        shape: "Counter to the front two",
        detail:
          "The strikers stay high and central. One holds the ball, the other runs in behind, and the wide midfielders sprint to support. Simple, direct, and extremely effective against a side that has committed its full backs.",
      },
    },
    shifts: {
      buildUp: {
        1: { x: 34, y: 12 },
        4: { x: 34, y: 88 },
        6: { x: 34, y: 40 },
        7: { x: 34, y: 60 },
      },
      attack: {
        1: { x: 62, y: 10 },
        4: { x: 62, y: 90 },
        5: { x: 82, y: 12 },
        8: { x: 82, y: 88 },
        6: { x: 56, y: 40 },
        7: { x: 60, y: 60 },
        9: { x: 90, y: 40 },
        10: { x: 90, y: 60 },
      },
      restDefence: {
        1: { x: 34, y: 14 },
        4: { x: 34, y: 86 },
        6: { x: 44, y: 40 },
        7: { x: 44, y: 60 },
      },
      defence: {
        1: { x: 20, y: 14 },
        2: { x: 18, y: 38 },
        3: { x: 18, y: 62 },
        4: { x: 20, y: 86 },
        5: { x: 38, y: 14 },
        6: { x: 36, y: 38 },
        7: { x: 36, y: 62 },
        8: { x: 38, y: 86 },
        9: { x: 58, y: 40 },
        10: { x: 58, y: 60 },
      },
    },
    spots: [
      keeper(
        "Often the start of a direct attack rather than a passing move. The long ball to the front two is a tactic, not a failure."
      ),
      {
        x: 24,
        y: 12,
        role: "Left back",
        short: "LB",
        note: "Tucks in tight. The midfielder ahead does the defensive running.",
        variants: [
          { name: "Overlapping full back", detail: "Provides the width when the wide midfielder comes inside." },
          { name: "Defensive full back", detail: "Stays in the back four and prioritises the bank of four." },
        ],
        players: ["Andrew Robertson", "Luke Shaw", "Aubrey Modiba"],
        jobs: {
          buildUp: "Pushes up the line to give a simple outlet away from central pressure.",
          attack: "Overlaps and crosses. Two strikers in the box makes this worthwhile.",
          restDefence: "Recovers into the back four quickly. This shape defends as a unit of eight.",
          defence: "Left of a flat four, never stepping out of line.",
        },
      },
      {
        x: 20,
        y: 38,
        role: "Left centre back",
        short: "LCB",
        note: "Half of a genuine partnership. They defend as a pair, not a unit of three.",
        variants: [
          { name: "Stopper", detail: "Attacks the first ball and steps in front of the striker." },
          { name: "Sweeper", detail: "Sits deeper to cover the stopper and the space behind." },
        ],
        players: ["Virgil van Dijk", "Nathan Aké", "Mosa Lebusa"],
        jobs: {
          buildUp: "Splits wide, or simply goes long to the front two if the press is aggressive.",
          attack: "Holds the halfway line and deals with clearances.",
          restDefence: "One of the four that never breaks shape.",
          defence: "Stopper or sweeper depending on the partnership. One goes, one covers, always.",
        },
      },
      {
        x: 20,
        y: 62,
        role: "Right centre back",
        short: "RCB",
        note: "Attacks the first ball while the other covers behind.",
        variants: [
          { name: "Aerial specialist", detail: "Wins the header against a target man in every phase." },
          { name: "Reader", detail: "Anticipates the pass and intercepts rather than tackling." },
        ],
        players: ["Rúben Dias", "Harry Maguire", "Grant Kekana"],
        jobs: {
          buildUp: "The safe sideways pass, or the diagonal to the far wide midfielder.",
          attack: "Guards against the counter with their partner.",
          restDefence: "Stays central and deep.",
          defence: "The other half of the partnership. Communication decides everything.",
        },
      },
      {
        x: 24,
        y: 88,
        role: "Right back",
        short: "RB",
        note: "Overlaps only when the ball is safe. Discipline first.",
        variants: [
          { name: "Balanced full back", detail: "Picks moments to join rather than attacking constantly." },
          { name: "Attacking full back", detail: "Gets forward at every opportunity with cover behind." },
        ],
        players: ["Kyle Walker", "Reece James", "Khuliso Mudau"],
        jobs: {
          buildUp: "Offers width on the right and lets the wide midfielder come inside.",
          attack: "Delivers early crosses rather than working to the byline.",
          restDefence: "Holds position in the four.",
          defence: "Right of the flat four, forcing the winger down the line.",
        },
      },
      {
        x: 50,
        y: 12,
        role: "Left midfielder",
        short: "LM",
        note: "Doubles up defensively. Not a winger: a midfielder who plays wide.",
        variants: [
          { name: "Wide midfielder", detail: "Defensive duties first. Tracks the full back all the way back." },
          { name: "Converted winger", detail: "Attacking threat given licence to stay high, with the full back covering." },
        ],
        players: ["Dominik Szoboszlai", "Jack Grealish", "Patrick Maswanganyi"],
        jobs: {
          buildUp: "Comes short to receive, or stays high for the diagonal from the centre back.",
          attack: "Gets crosses in early. This shape feeds on width and delivery.",
          restDefence: "Recovers into the bank of four immediately. This is the discipline that makes 4-4-2 work.",
          defence: "Doubles up on the opposition winger with the full back. Never lets them face forward.",
        },
      },
      {
        x: 48,
        y: 38,
        role: "Left central midfielder",
        short: "LCM",
        note: "The engine. Covers both boxes for ninety minutes.",
        variants: [
          { name: "Box-to-box", detail: "Covers the ground the extra man would in a midfield three." },
          { name: "Ball winner", detail: "Breaks up play, keeps it simple, protects the back four." },
        ],
        players: ["Declan Rice", "N'Golo Kanté", "Teboho Mokoena"],
        jobs: {
          buildUp: "Drops to receive and turn, or acts as a decoy to open a lane to the wide midfielder.",
          attack: "Arrives at the edge of the box for cut-backs and second balls.",
          restDefence: "One of the two who never gets ahead of the ball at the same time as the partner.",
          defence: "Central of the four, screening the space in front of the back line.",
        },
      },
      {
        x: 48,
        y: 62,
        role: "Right central midfielder",
        short: "RCM",
        note: "The other half of the pair. One goes, one holds, always.",
        variants: [
          { name: "Deep playmaker", detail: "The passing brain, spraying diagonals to the wide players." },
          { name: "Runner", detail: "Gets beyond the strikers to make a third man in the box." },
        ],
        players: ["Toni Kroos", "Frank Lampard", "Bongani Zungu"],
        jobs: {
          buildUp: "The main progressive passer. Switches play to the far side to escape pressure.",
          attack: "Holds at the edge of the box while the partner joins the attack.",
          restDefence: "Screens the counter and forces play backwards.",
          defence: "Blocks the pass into the opposition's number ten.",
        },
      },
      {
        x: 50,
        y: 88,
        role: "Right midfielder",
        short: "RM",
        note: "Gets crosses in early. This shape feeds on width.",
        variants: [
          { name: "Crosser", detail: "Delivers from deep and wide rather than beating the full back." },
          { name: "Inverted threat", detail: "Cuts inside to shoot with the full back overlapping outside." },
        ],
        players: ["Bukayo Saka", "Antony", "Oswin Appollis"],
        jobs: {
          buildUp: "Provides the outlet for the long diagonal, taking play away from the press.",
          attack: "Crosses for the front two. Volume of delivery matters more than perfection here.",
          restDefence: "Drops into the bank of four.",
          defence: "Tracks the opposition full back the whole way.",
        },
      },
      {
        x: 82,
        y: 36,
        role: "Striker",
        short: "ST",
        note: "The target. Wins the first ball and holds it.",
        variants: [
          { name: "Target man", detail: "Wins the long ball and brings others into play." },
          { name: "Pressing forward", detail: "Leads the press and blocks the pass into midfield." },
        ],
        players: ["Ollie Watkins", "Dominic Calvert-Lewin", "Lyle Foster"],
        jobs: {
          buildUp: "The out-ball. Wins the header and knocks it down for the strike partner.",
          attack: "Attacks the near post on crosses and occupies the aerial centre back.",
          defence: "Blocks the pass into midfield while pressing the centre back.",
          transition: "Holds the ball up to let the midfield join the counter.",
        },
      },
      {
        x: 82,
        y: 64,
        role: "Strike partner",
        short: "SS",
        note: "Plays off the knock-downs and runs in behind.",
        variants: [
          { name: "Runner", detail: "Attacks the space behind the defence at every opportunity." },
          { name: "Poacher", detail: "Occupies the six-yard box and finishes the crosses." },
          { name: "Second striker", detail: "Drops into midfield to make it a temporary 4-4-1-1." },
        ],
        players: ["Darwin Núñez", "Michael Owen", "Iqraam Rayners"],
        jobs: {
          buildUp: "Reads the flick from the partner and runs onto the second ball.",
          attack: "Attacks the far post while the partner takes the near.",
          defence: "Presses the second centre back and blocks the switch.",
          transition: "The pace on the counter. Runs the moment possession changes.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "532",
    name: "5-3-2",
    nickname: "The low block",
    summary:
      "The wing-backs drop in to make a back five. Concede the ball, protect the box, and hurt teams on the break. The away-day shape.",
    strength: "Almost no space between the lines for a ten to work in.",
    weakness: "Invites pressure. One mistake and you are camped in your own half.",
    phaseNotes: {
      buildUp: {
        shape: "3-2-5 when brave, direct when not",
        detail:
          "Sides using this shape often are not trying to build at all. The plan is to go long to the front two, win the second ball with a compact three, and counter. When they do build, it looks like a 3-5-2 with the wing-backs pushing on.",
      },
      attack: {
        shape: "3-2-5",
        detail:
          "The wing-backs push fifty metres to make five attackers. This is a burst rather than a state: the shape attacks in waves and then resets, because staying high leaves the back three exposed.",
      },
      restDefence: {
        shape: "3-2 or 5-3",
        detail:
          "Almost never fully committed. Three defenders and usually the holding midfielder stay home, which is why this shape concedes so few counter-attacks even when it does push forward.",
      },
      defence: {
        shape: "5-3-2",
        detail:
          "The defining phase. Five across the back with three ahead of them gives no gap between the lines for a ten to receive. The two strikers stay central to block the pass into midfield. Play is forced wide and into crosses, which a back five is built to defend.",
      },
      transition: {
        shape: "Long counter",
        detail:
          "Win the ball deep, hold it with the striker, and release the second striker into the space the opposition has left. The wing-backs cover fifty metres. Everything depends on that first pass out being accurate.",
      },
    },
    shifts: {
      buildUp: {
        1: { x: 42, y: 8 },
        5: { x: 42, y: 92 },
        6: { x: 46, y: 26 },
        8: { x: 46, y: 74 },
        7: { x: 32, y: 50 },
      },
      attack: {
        1: { x: 78, y: 8 },
        5: { x: 78, y: 92 },
        6: { x: 62, y: 30 },
        8: { x: 62, y: 70 },
        7: { x: 46, y: 50 },
        2: { x: 34, y: 30 },
        3: { x: 32, y: 50 },
        4: { x: 34, y: 70 },
        9: { x: 88, y: 40 },
        10: { x: 88, y: 60 },
      },
      restDefence: {
        1: { x: 40, y: 12 },
        5: { x: 40, y: 88 },
        6: { x: 48, y: 32 },
        8: { x: 48, y: 68 },
        7: { x: 38, y: 50 },
      },
      transition: {
        1: { x: 50, y: 10 },
        5: { x: 50, y: 90 },
        9: { x: 78, y: 36 },
        10: { x: 84, y: 62 },
        6: { x: 54, y: 32 },
        8: { x: 54, y: 68 },
      },
    },
    spots: [
      keeper(
        "Often goes long by design. The first pass is a tactical decision, not a last resort."
      ),
      {
        x: 30,
        y: 10,
        role: "Left wing-back",
        short: "LWB",
        note: "Drops to make the five. Springs forward the moment you win it.",
        variants: [
          { name: "Defensive wing-back", detail: "A full back by trade. Prioritises the back five." },
          { name: "Counter-attacking wing-back", detail: "Chosen for pace to cover fifty metres in transition." },
        ],
        players: ["Aubrey Modiba", "Destiny Udogie", "Ashley Young"],
        jobs: {
          buildUp: "Stays deep unless the team commits. Discipline over ambition here.",
          attack: "Bursts forward to the last line, then recovers immediately.",
          restDefence: "Usually already home. That is the point of the shape.",
          defence: "Left of a back five, doubling up with the wide centre back.",
          transition: "The outlet on the break. Fifty metres, every time.",
        },
      },
      {
        x: 24,
        y: 27,
        role: "Left centre back",
        short: "LCB",
        note: "Covers the wide channel so the wing-back can press.",
        variants: [
          { name: "Wide centre back", detail: "Comfortable defending in the channel and stepping out to the winger." },
          { name: "Aggressive stepper", detail: "Follows runners into midfield to deny the turn." },
        ],
        players: ["Josko Gvardiol", "Alessandro Bastoni", "Nyiko Mobbie"],
        jobs: {
          defence: "Steps out to the winger when the wing-back is beaten, with the central defender covering.",
          restDefence: "Holds the wide channel against the counter.",
          attack: "Pushes to halfway to support but no further.",
          buildUp: "Carries into midfield only when clearly unpressed.",
        },
      },
      {
        x: 22,
        y: 50,
        role: "Central defender",
        short: "CB",
        note: "Never leaves the middle. Heads everything.",
        variants: [
          { name: "Commander", detail: "Organises the five, attacks every cross, stays central always." },
          { name: "Sweeper", detail: "Covers behind whichever of the two steps out." },
        ],
        players: ["Virgil van Dijk", "Kalidou Koulibaly", "Mosa Lebusa"],
        jobs: {
          defence: "The heart of the block. Defends the six-yard box and wins the crosses this shape invites.",
          restDefence: "Deepest player behind the ball at all times.",
          attack: "Holds a deep position even when the team commits forward.",
          buildUp: "Plays the safe pass or goes long. No unnecessary risk.",
        },
      },
      {
        x: 24,
        y: 73,
        role: "Right centre back",
        short: "RCB",
        note: "Mirrors the left. Steps only when certain.",
        variants: [
          { name: "Recovery defender", detail: "Pace to defend the space behind when the block is broken." },
          { name: "Physical presence", detail: "Dominates the striker and wins the direct ball." },
        ],
        players: ["Rúben Dias", "Gleison Bremer", "Grant Kekana"],
        jobs: {
          defence: "Right of the five, covering the channel and doubling up wide.",
          restDefence: "Screens the right channel against the break.",
          attack: "Provides balance while the ball is on the far side.",
          buildUp: "Simple sideways ball, or the diagonal to the far wing-back.",
        },
      },
      {
        x: 30,
        y: 90,
        role: "Right wing-back",
        short: "RWB",
        note: "The outlet. Fifty metres of running on every counter.",
        variants: [
          { name: "Direct wing-back", detail: "Carries the ball the length of the flank in transition." },
          { name: "Crossing specialist", detail: "Gets to the byline and delivers for the front two." },
        ],
        players: ["Khuliso Mudau", "Denzel Dumfries", "Pervis Estupiñán"],
        jobs: {
          defence: "Right of the back five. Non-negotiable.",
          transition: "Sprints the flank to turn a two-man break into three.",
          attack: "Delivers the cross with two strikers waiting.",
          restDefence: "Recovers before the ball does.",
        },
      },
      {
        x: 48,
        y: 26,
        role: "Left central midfielder",
        short: "LCM",
        note: "Screens the half space where a ten wants to receive.",
        variants: [
          { name: "Screener", detail: "Positional discipline. Occupies space rather than chasing the ball." },
          { name: "Shuttler", detail: "Covers the ground wide when the wing-back steps out." },
        ],
        players: ["Nicolò Barella", "Declan Rice", "Sipho Mbule"],
        jobs: {
          defence: "Blocks the half space. The gap between centre back and wing-back is the one to protect.",
          transition: "First support runner on the counter.",
          attack: "Arrives at the edge of the box for second balls.",
          restDefence: "Holds ahead of the back three.",
        },
      },
      {
        x: 45,
        y: 50,
        role: "Holding midfielder",
        short: "CDM",
        note: "Sits on the edge of the box. Blocks the shooting lane.",
        variants: [
          { name: "Anchor", detail: "Never leaves the space in front of the defence." },
          { name: "Destroyer", detail: "Breaks up everything that arrives between the lines." },
        ],
        players: ["Casemiro", "Rodri", "Teboho Mokoena"],
        jobs: {
          defence: "Protects the edge of the box, blocks shots and picks up the runner from deep.",
          restDefence: "Stays home even when the team counters. The insurance.",
          buildUp: "Drops between the centre backs when the team chooses to play out.",
          transition: "Wins the second ball, then feeds the counter rather than joining it.",
        },
      },
      {
        x: 48,
        y: 74,
        role: "Right central midfielder",
        short: "RCM",
        note: "Screens the other half space. Discipline over ambition.",
        variants: [
          { name: "Screener", detail: "Mirror of the left. Protects the space, not the ball." },
          { name: "Counter-attacking eight", detail: "The one given licence to break forward when possession is won." },
        ],
        players: ["Hakan Calhanoglu", "Federico Valverde", "Bongani Zungu"],
        jobs: {
          defence: "Blocks the right half space and shuttles wide to double up.",
          transition: "Joins the break as the third man.",
          attack: "Late arrival at the top of the box.",
          restDefence: "Balances the shape when the partner pushes on.",
        },
      },
      {
        x: 76,
        y: 38,
        role: "Striker",
        short: "ST",
        note: "Holds the ball to buy the team thirty seconds up the pitch.",
        variants: [
          { name: "Target man", detail: "Wins the long ball and holds it while the team advances." },
          { name: "Pressing trigger", detail: "Starts the press to force a long ball the back five will win." },
        ],
        players: ["Ollie Watkins", "Victor Osimhen", "Lyle Foster"],
        jobs: {
          defence: "Blocks the pass into the opposition's holding midfielder.",
          transition: "Holds the first pass under pressure. The whole counter depends on this.",
          attack: "Attacks the near post and occupies the centre back.",
          buildUp: "The long out-ball when the block clears its lines.",
        },
      },
      {
        x: 76,
        y: 62,
        role: "Strike partner",
        short: "SS",
        note: "The pace. Runs in behind the second the ball is won.",
        variants: [
          { name: "Runner in behind", detail: "Pure pace, attacking the space a high line leaves." },
          { name: "Wide-drifting forward", detail: "Pulls into the channel where the full back has advanced." },
        ],
        players: ["Darwin Núñez", "Rafael Leão", "Relebohile Mofokeng"],
        jobs: {
          transition: "Runs the instant possession changes. The single most important run in this shape.",
          defence: "Screens the second centre back and blocks the switch.",
          attack: "Attacks the far post and the space behind the full back.",
          buildUp: "Runs the channel for the direct ball.",
        },
      },
    ],
  },
];
