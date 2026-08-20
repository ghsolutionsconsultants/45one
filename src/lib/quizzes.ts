export type Question = {
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export type Quiz = {
  id: string;
  name: string;
  tagline: string;
  questions: Question[];
};

export const quizzes: Quiz[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "tactics",
    name: "Tactics",
    tagline: "The ideas that decide matches before kick-off.",
    questions: [
      {
        q: "A side defends with a back five and two banks ahead of it. What are they accepting in exchange?",
        options: ["Losing the midfield battle", "Inviting sustained pressure", "Conceding the width"],
        answer: 1,
        why: "A low block gives up territory by design. The trade is space for structure: you concede the ball and the half, and keep the space between your lines too small to play in.",
      },
      {
        q: "Why does a holding midfielder drop between the centre backs at a goal kick?",
        options: ["To get on the ball earlier", "To create a spare man against the press", "To let the full backs defend deeper"],
        answer: 1,
        why: "Two forwards pressing three defenders means one is always free. Building through a spare man is the cleanest way to beat a first line of pressure without going long.",
      },
      {
        q: "An inverted winger plays on the opposite side to their strong foot mainly to do what?",
        options: ["Hold the touchline and cross", "Cut inside to shoot and combine", "Track the opposing full back"],
        answer: 1,
        why: "Coming inside onto the stronger foot opens the shot and the through ball, and it empties the touchline for the full back to overlap into.",
      },
      {
        q: "What is the biggest risk a high defensive line accepts?",
        options: ["The ball over the top", "Losing aerial duels", "Fouling near your own box"],
        answer: 0,
        why: "Squeezing the pitch compresses the space in front of you and leaves grass behind you. It only works with a keeper who sweeps and defenders who can turn and run.",
      },
      {
        q: "In a 3-5-2, which job is the most physically demanding?",
        options: ["The holding midfielder", "The wing-back", "The centre backs"],
        answer: 1,
        why: "Wing-backs supply all the width. They defend as part of a back five and attack as wingers, covering the full flank for ninety minutes.",
      },
      {
        q: "What does 'rest defence' actually mean?",
        options: [
          "The shape you keep behind the ball while attacking",
          "Resting players in a cup tie",
          "Dropping into a low block to see out a game",
        ],
        answer: 0,
        why: "Rest defence is your counter-prevention structure. A 4-3-3 usually keeps three defenders and two midfielders behind the ball, so any break has to beat five organised players.",
      },
      {
        q: "Why do coaches want a full back to invert into midfield?",
        options: [
          "It creates a spare man centrally and protects against counters",
          "It stops the winger being offside",
          "It lets the centre backs push higher",
        ],
        answer: 0,
        why: "Inverting adds a body in the middle where the game is decided, and puts a defender in the exact spot a counter would come through.",
      },
      {
        q: "A team wins the ball and immediately presses rather than dropping. Why?",
        options: [
          "The opponent is at their most disorganised right after winning it",
          "It saves energy over ninety minutes",
          "Referees favour the pressing side",
        ],
        answer: 0,
        why: "The counter-press targets the six seconds after a turnover, when the opponent has players out of shape and the ball is still uncontrolled.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "history",
    name: "PL history",
    tagline: "Thirty-odd years of the Premier League.",
    questions: [
      {
        q: "Which club won the very first Premier League title in 1992/93?",
        options: ["Manchester United", "Blackburn Rovers", "Arsenal"],
        answer: 0,
        why: "United took the inaugural title, ending a 26-year wait for a league championship and starting the most dominant run of the Premier League era.",
      },
      {
        q: "Arsenal's 'Invincibles' went unbeaten in which league season?",
        options: ["2001/02", "2003/04", "2005/06"],
        answer: 1,
        why: "Arsenal went the entire 2003/04 league season unbeaten: 26 wins and 12 draws from 38 games. No side has repeated it since.",
      },
      {
        q: "Leicester City won the title at odds of 5000-1 in which season?",
        options: ["2014/15", "2015/16", "2016/17"],
        answer: 1,
        why: "Leicester won 2015/16 having finished 14th the year before. It remains the biggest outsider ever to win a major European league.",
      },
      {
        q: "Which club has been relegated from the Premier League the most times?",
        options: ["Norwich City", "West Bromwich Albion", "Crystal Palace"],
        answer: 0,
        why: "Norwich's yo-yo record between the divisions is the most frequent of any Premier League club, a run of promotions immediately followed by drops.",
      },
      {
        q: "How many clubs have won the Premier League since it began in 1992?",
        options: ["Five", "Seven", "Nine"],
        answer: 1,
        why: "Manchester United, Blackburn, Arsenal, Chelsea, Manchester City, Leicester and Liverpool. Seven in more than thirty seasons.",
      },
      {
        q: "Sergio Agüero's title-winning goal against QPR came in which season?",
        options: ["2011/12", "2012/13", "2013/14"],
        answer: 0,
        why: "The 93:20 goal on the final day of 2011/12 won City the title on goal difference over United, and is probably the most replayed moment in the league's history.",
      },
      {
        q: "Which manager has won the most Premier League titles?",
        options: ["Pep Guardiola", "Alex Ferguson", "José Mourinho"],
        answer: 1,
        why: "Ferguson won 13 Premier League titles with Manchester United between 1993 and 2013, more than double any other manager.",
      },
      {
        q: "The Premier League reduced from 22 clubs to 20 in which year?",
        options: ["1995", "1998", "2001"],
        answer: 0,
        why: "The league dropped to 20 teams from the 1995/96 season, with four relegated and only two promoted at the end of 1994/95.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "legends",
    name: "Legends",
    tagline: "The players your dad still argues about.",
    questions: [
      {
        q: "Which player is the Premier League's all-time leading goalscorer?",
        options: ["Wayne Rooney", "Alan Shearer", "Harry Kane"],
        answer: 1,
        why: "Shearer scored 260 Premier League goals for Blackburn and Newcastle. He also won the title with Blackburn in 1995.",
      },
      {
        q: "Thierry Henry won the Premier League Golden Boot how many times?",
        options: ["Two", "Three", "Four"],
        answer: 2,
        why: "Henry took four Golden Boots with Arsenal, and remains the club's all-time leading scorer.",
      },
      {
        q: "Which of these players never won a Premier League title?",
        options: ["Steven Gerrard", "Frank Lampard", "Paul Scholes"],
        answer: 0,
        why: "Gerrard won the Champions League, FA Cup, League Cup and UEFA Cup with Liverpool, but the league title always escaped him.",
      },
      {
        q: "Roy Keane and Patrick Vieira defined which rivalry?",
        options: ["United vs Arsenal", "Liverpool vs Everton", "Chelsea vs Spurs"],
        answer: 0,
        why: "Their midfield battles were the centrepiece of the United and Arsenal rivalry from the late nineties into the mid two-thousands.",
      },
      {
        q: "Which South African goalkeeper captained Bafana Bafana and played in the Premier League?",
        options: ["Itumeleng Khune", "Ronwen Williams", "Andre Arendse"],
        answer: 2,
        why: "Arendse played for Fulham and Oxford United in England, and was a long-serving Bafana Bafana keeper through the nineties and early two-thousands.",
      },
      {
        q: "Eric Cantona famously said what after his kung-fu kick ban?",
        options: [
          "Something about seagulls and a trawler",
          "Something about lions and sheep",
          "Something about the weather in Manchester",
        ],
        answer: 0,
        why: "His seagulls-and-trawler line to the press remains the most quoted sentence any footballer has said at a podium.",
      },
      {
        q: "Which player has made the most Premier League appearances?",
        options: ["Ryan Giggs", "Gareth Barry", "James Milner"],
        answer: 1,
        why: "Barry made 653 Premier League appearances across Aston Villa, Manchester City, Everton and West Brom.",
      },
      {
        q: "Benni McCarthy scored the winner that knocked which side out of the Champions League with Porto?",
        options: ["Manchester United", "Real Madrid", "Bayern Munich"],
        answer: 0,
        why: "McCarthy scored twice against United in the 2004 last 16, in the tie that ended with Costinha's late goal and Mourinho's touchline sprint.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "stats",
    name: "Stats & records",
    tagline: "The numbers people quote and get wrong.",
    questions: [
      {
        q: "What does xG actually measure?",
        options: [
          "How many goals a team deserved to score",
          "The probability a chance is scored, based on similar past chances",
          "How well a striker finishes",
        ],
        answer: 1,
        why: "xG is a probability per shot, drawn from thousands of similar historical chances. It describes chance quality, not what a team deserved and not finishing skill.",
      },
      {
        q: "What is the highest points total in a Premier League season?",
        options: ["96", "100", "104"],
        answer: 1,
        why: "Manchester City reached exactly 100 points in 2017/18, the only time any English top-flight side has hit a century.",
      },
      {
        q: "A player's 'progressive carries' measures what?",
        options: [
          "Dribbles completed against a defender",
          "Ball carries that move play meaningfully towards goal",
          "Distance covered per match",
        ],
        answer: 1,
        why: "Progressive carries count runs with the ball that advance it a set distance towards the opponent's goal. It rewards carrying through lines rather than beating a man.",
      },
      {
        q: "Why is 'possession percentage' a weak measure on its own?",
        options: [
          "It ignores where on the pitch the ball was held",
          "It is calculated differently in every league",
          "It only counts completed passes",
        ],
        answer: 0,
        why: "Sixty percent possession in your own half is worth far less than forty percent spent in the final third. Field position is what turns the ball into chances.",
      },
      {
        q: "What is the fewest goals conceded in a 38-game Premier League season?",
        options: ["15", "24", "32"],
        answer: 0,
        why: "Chelsea conceded 15 in 2004/05, Mourinho's first season. It is the benchmark defensive record of the era.",
      },
      {
        q: "If a striker's xG is far above their goals over a full season, the most likely explanation is:",
        options: [
          "They are getting into good positions but finishing poorly",
          "The model is broken",
          "They are being played out of position",
        ],
        answer: 0,
        why: "Over a large sample, the gap points to finishing. The valuable half is that they keep reaching good positions, which is the harder skill to coach.",
      },
      {
        q: "What does PPDA measure?",
        options: [
          "Passes allowed per defensive action, a measure of pressing intensity",
          "Points per defensive action",
          "Percentage of passes in the defensive area",
        ],
        answer: 0,
        why: "PPDA counts how many passes the opposition completes before you make a defensive action. A low number means an aggressive press.",
      },
      {
        q: "Which is the better predictor of a team's results next season?",
        options: ["This season's goals scored", "This season's xG", "This season's points"],
        answer: 1,
        why: "xG is more stable year to year than actual goals, because finishing swings a lot in small samples. It is why recruitment departments lead with it.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "psl",
    name: "PSL",
    tagline: "South African football, properly.",
    questions: [
      {
        q: "Which club has won the most PSL titles since the league began in 1996?",
        options: ["Kaizer Chiefs", "Mamelodi Sundowns", "Orlando Pirates"],
        answer: 1,
        why: "Sundowns' run of consecutive titles from the mid-2010s onwards made them the most dominant side in the league's history.",
      },
      {
        q: "The Soweto derby is contested between which two clubs?",
        options: [
          "Kaizer Chiefs and Orlando Pirates",
          "Orlando Pirates and Moroka Swallows",
          "Kaizer Chiefs and Mamelodi Sundowns",
        ],
        answer: 0,
        why: "Chiefs against Pirates is the biggest fixture in South African football and one of the best-supported derbies on the continent.",
      },
      {
        q: "Which South African club won the CAF Champions League in 2016?",
        options: ["Orlando Pirates", "Mamelodi Sundowns", "SuperSport United"],
        answer: 1,
        why: "Sundowns beat Zamalek over two legs to become only the second South African side to win the competition.",
      },
      {
        q: "Kaizer Chiefs were founded by which former Orlando Pirates player?",
        options: ["Jomo Sono", "Kaizer Motaung", "Lucas Radebe"],
        answer: 1,
        why: "Motaung founded Chiefs in 1970 after a spell with Atlanta Chiefs in the United States, which is where the name comes from.",
      },
      {
        q: "Which Bafana Bafana captain went on to captain Leeds United?",
        options: ["Lucas Radebe", "Aaron Mokoena", "Steven Pienaar"],
        answer: 0,
        why: "Radebe captained both Leeds and South Africa, and is still known at Elland Road as 'The Chief'.",
      },
      {
        q: "South Africa won the Africa Cup of Nations in which year?",
        options: ["1994", "1996", "1998"],
        answer: 1,
        why: "Bafana Bafana won on home soil in 1996, beating Tunisia 2-0 in the final at the FNB Stadium.",
      },
      {
        q: "The PSL's top-flight division is officially known as what?",
        options: ["The Premier Division", "The National First Division", "The ABC Motsepe League"],
        answer: 0,
        why: "The Premier Division sits above the National First Division, with the ABC Motsepe League a tier below that.",
      },
      {
        q: "Which stadium hosted the 2010 World Cup final?",
        options: ["Moses Mabhida Stadium", "FNB Stadium", "Cape Town Stadium"],
        answer: 1,
        why: "The FNB Stadium in Johannesburg, also known as Soccer City, hosted both the opening match and the final.",
      },
    ],
  },
];
