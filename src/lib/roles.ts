/**
 * The recognised role set for each position, using the naming EA FC and
 * Football Manager have made standard. Each role also carries its focus,
 * which is the instruction that changes how the player behaves in the shape.
 */
export type Role = {
  name: string;
  focus: string;
  detail: string;
};

const GK: Role[] = [
  { name: "Goalkeeper", focus: "Defend", detail: "Holds the line, commands the six-yard box, distributes short and safe." },
  { name: "Sweeper Keeper", focus: "Build-Up", detail: "Defends the space behind a high line and joins the build-up as the spare man." },
];

const FULL_BACK: Role[] = [
  { name: "Fullback", focus: "Balanced", detail: "Holds the back four, supports the winger, picks moments to join." },
  { name: "Fullback", focus: "Defend", detail: "Stays home so the opposite side can attack. Prioritises the back line." },
  { name: "Wingback", focus: "Attack", detail: "Provides the width on their flank, overlapping and delivering from the byline." },
  { name: "Attacking Wingback", focus: "Attack", detail: "Effectively a winger. Stays high even in build-up and attacks the box." },
  { name: "Falseback", focus: "Build-Up", detail: "Inverts into midfield in possession to make a double pivot and screen the counter." },
  { name: "Falseback", focus: "Defend", detail: "Tucks inside to form a back three when the other full back pushes on." },
];

const CENTRE_BACK: Role[] = [
  { name: "Defender", focus: "Defend", detail: "Holds position, wins the duel, keeps the pass simple." },
  { name: "Stopper", focus: "Defend", detail: "Steps in front of the striker to attack the ball early rather than waiting." },
  { name: "Ball-Playing Defender", focus: "Build-Up", detail: "Breaks lines by passing through the press, and carries into midfield when unmarked." },
];

const HOLDING: Role[] = [
  { name: "Holding", focus: "Defend", detail: "Screens the back line, blocks the pass into the striker, rarely crosses halfway." },
  { name: "Centre-Half", focus: "Defend", detail: "Drops between the centre backs in possession to make a back three." },
  { name: "Deep-Lying Playmaker", focus: "Build-Up", detail: "Dictates tempo from deep, switches play, starts every attack." },
  { name: "Deep-Lying Playmaker", focus: "Roaming", detail: "Drifts across the pitch to find the free space and receive on the half turn." },
];

const CENTRE_MID: Role[] = [
  { name: "Box-to-Box", focus: "Balanced", detail: "Covers both penalty areas. Defends the edge of one box and arrives in the other." },
  { name: "Holding", focus: "Defend", detail: "Sits in front of the defence and lets the partner push forward." },
  { name: "Playmaker", focus: "Attack", detail: "Finds pockets between the lines and plays the pass before the assist." },
  { name: "Half-Winger", focus: "Attack", detail: "Occupies the half space between full back and centre back, drifting wide to combine." },
  { name: "Deep-Lying Playmaker", focus: "Build-Up", detail: "Drops deeper to receive from the centre backs and progress the ball." },
];

const ATTACKING_MID: Role[] = [
  { name: "Playmaker", focus: "Balanced", detail: "Receives in the pocket, turns, and plays the final ball." },
  { name: "Shadow Striker", focus: "Attack", detail: "Attacks the box beyond the striker rather than creating for others." },
  { name: "Classic 10", focus: "Roaming", detail: "Free role between the lines, drifting to wherever the space is." },
  { name: "Half-Winger", focus: "Wide", detail: "Drifts into the half space to combine with the winger and full back." },
];

const WINGER: Role[] = [
  { name: "Winger", focus: "Attack", detail: "Holds the touchline and takes the full back on for the cross." },
  { name: "Inside Forward", focus: "Attack", detail: "Cuts inside onto the stronger foot to shoot, freeing the overlap outside." },
  { name: "Wide Playmaker", focus: "Balanced", detail: "Comes short to combine and creates from wide rather than beating the man." },
  { name: "Winger", focus: "Defend", detail: "Tracks the opposition full back and drops into a bank of five." },
];

const WIDE_MID: Role[] = [
  { name: "Wide Midfielder", focus: "Balanced", detail: "Defensive duties first. Doubles up on the winger, then delivers from deep." },
  { name: "Winger", focus: "Attack", detail: "Pushes on as a genuine wide attacker with the full back covering behind." },
  { name: "Inside Forward", focus: "Attack", detail: "Comes inside to make a front four with the strike partnership." },
  { name: "Wide Playmaker", focus: "Roaming", detail: "Drifts inside to overload midfield and dictate from the half space." },
];

const WING_BACK: Role[] = [
  { name: "Wingback", focus: "Balanced", detail: "Up and down the flank all game. Width in attack, fifth defender out of possession." },
  { name: "Attacking Wingback", focus: "Attack", detail: "Reaches the last line as a winger. The main crossing outlet." },
  { name: "Wingback", focus: "Defend", detail: "A full back given licence to push on, but the back five comes first." },
  { name: "Falseback", focus: "Build-Up", detail: "Steps inside into midfield rather than holding width, creating a midfield overload." },
];

const STRIKER: Role[] = [
  { name: "Advanced Forward", focus: "Attack", detail: "Plays on the last shoulder and attacks the space behind the defence." },
  { name: "Poacher", focus: "Attack", detail: "Lives in the box. Judged purely on finishing and positioning." },
  { name: "Target Forward", focus: "Balanced", detail: "Wins the long ball, holds it up, brings runners into play." },
  { name: "Complete Forward", focus: "Balanced", detail: "Holds, runs in behind and finishes. Does all three jobs at once." },
  { name: "False 9", focus: "Roaming", detail: "Drops into midfield to create an overload and drag a centre back out of the line." },
  { name: "Pressing Forward", focus: "Defend", detail: "The first defender. Sets the trap by showing play into one side." },
];

const SECOND_STRIKER: Role[] = [
  { name: "Advanced Forward", focus: "Attack", detail: "Runs in behind the moment the ball is won." },
  { name: "Poacher", focus: "Attack", detail: "Finishes what the strike partner creates. Occupies the six-yard box." },
  { name: "False 9", focus: "Roaming", detail: "Drops off the front to link midfield and attack." },
  { name: "Shadow Striker", focus: "Attack", detail: "Attacks the box late from just behind the striker." },
];

const BY_POSITION: Record<string, Role[]> = {
  GK,
  LB: FULL_BACK,
  RB: FULL_BACK,
  LCB: CENTRE_BACK,
  RCB: CENTRE_BACK,
  CB: CENTRE_BACK,
  CDM: HOLDING,
  DLP: HOLDING,
  LCM: CENTRE_MID,
  RCM: CENTRE_MID,
  CM: CENTRE_MID,
  CAM: ATTACKING_MID,
  LW: WINGER,
  RW: WINGER,
  LM: WIDE_MID,
  RM: WIDE_MID,
  LWB: WING_BACK,
  RWB: WING_BACK,
  ST: STRIKER,
  SS: SECOND_STRIKER,
};

export function rolesFor(short: string): Role[] {
  return BY_POSITION[short] ?? [];
}
