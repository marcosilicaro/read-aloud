// Sample data embedded inline so the prototype works offline.

window.LIBRARY = [
  {
    id: "history-ancient-world",
    title: "The History of the Ancient World",
    subtitle: "From the Earliest Accounts to the Fall of Rome",
    author: "Susan Wise Bauer",
    chapters: 91, segments: 4322,
    minutes: 1820, // ~30 hrs
    listenedMin: 412,
    accent: "oklch(0.58 0.14 55)", // terracotta
    cover: "ancient",
  },
  {
    id: "monetary-fiscal-history",
    title: "A Monetary and Fiscal History of the United States",
    subtitle: "1961 – 2021",
    author: "Alan S. Blinder",
    chapters: 21, segments: 1579,
    minutes: 720,
    listenedMin: 180,
    accent: "oklch(0.55 0.12 200)", // deep teal
    cover: "monetary",
  },
  {
    id: "james-call-transcript",
    title: "Call with James",
    subtitle: "Lease Review & Deal Analysis",
    author: "Marco & James",
    chapters: 1, segments: 75,
    minutes: 17,
    listenedMin: 6,
    accent: "oklch(0.55 0.11 120)", // olive
    cover: "transcript",
  },
];

// A single chapter's worth of demo content for the Reader view.
// Taken from the transcript (voice-y, conversational — good for showing speakers).
window.SAMPLE_CHAPTER = {
  bookId: "james-call-transcript",
  chapterIdx: 0,
  chapterTitle: "Full Conversation",
  segments: [
    { speaker: "Marco",
      timestamp: "00:28",
      text: "I have two questions. One is about the leases, because I'm doing the lease read-through. I have one question regarding the Angelos pizza lease. That one — my confusion is whether it's a triple net or a gross lease." },
    { speaker: "James",
      timestamp: "01:25",
      text: "That would not be a triple net. Triple net is when the tenant pays all expenses — real estate taxes, insurance, utilities, common area maintenance, snow, and all that. What did the addendum say?" },
    { speaker: "Marco",
      timestamp: "01:45",
      text: "The addendum language said: this is a fixed-base rental lease. Lessor will collect no additional rent." },
    { speaker: "James",
      timestamp: "01:53",
      text: "Since it's saying no additional rent, that means it's a gross lease. What they can do is separately meter the utilities. The utility provider goes directly to the tenant, so the landlord doesn't even see the bill." },
    { speaker: "Marco",
      timestamp: "03:00",
      text: "The other question was about translating that information into the lease tab — filling out the first section regarding square footage, the lease commencement date, the lease expiration date, the rent, and so on." },
    { speaker: "James",
      timestamp: "03:36",
      text: "For this one, you would say: gross lease, tenant only responsible for utilities which are individually metered. Everything else is landlord responsibility. Then below that, there's the general notes that you fill out as well." },
    { speaker: "Marco",
      timestamp: "04:17",
      text: "What changed? Any other flags that I should be looking for?" },
    { speaker: "James",
      timestamp: "04:19",
      text: "A lot of times these landlords will have a form lease they'll send to each tenant, and the stuff that deviates from that form will either be all caps, bolded, italicized, or the format just looks different. You can tell it was added on. Anything like that is usually what I keep an eye out for." },
    { speaker: "James",
      timestamp: "05:10",
      text: "I like to flag if there's ever been any rent that was waived — maybe during COVID they were delayed on rent, so they worked on a payment plan. I like to flag that. I also flag any big jumps. If they were paying $5 and now they're paying $15, you don't know how well they'll be able to sustain that." },
  ]
};

// Editorial summary content for the Summary view.
window.SAMPLE_SUMMARY = {
  chapterTitle: "Ch. 7 — The Volcker Shock",
  period: "1977 – 1983",
  bigIdea: "Paul Volcker's Fed deliberately engineered a severe recession to break the back of double-digit inflation — a painful but ultimately successful bet that restored central bank credibility for a generation.",
  takeaways: [
    { title: "Volcker's Gamble", text: "Appointed in 1979, Volcker raised interest rates to unprecedented levels — the fed funds rate hit 20% — to crush entrenched inflation expectations." },
    { title: "Deliberate Recession", text: "The 1981–82 recession was the deepest since the Great Depression, with unemployment hitting 10.8%. Volcker accepted this cost as necessary." },
    { title: "Credibility Restored", text: "By holding firm despite enormous political pressure and economic pain, Volcker re-established the Fed's anti-inflation credibility for a generation." },
    { title: "Monetarist Experiment", text: "The Fed briefly adopted money supply targeting but found it operationally unworkable, and returned to interest-rate targeting within two years." },
  ],
  pullQuote: "The Fed had to be willing to be deeply unpopular — and stay unpopular long enough for expectations to change.",
  figures: [
    { name: "Paul Volcker", role: "Fed Chair" },
    { name: "Jimmy Carter", role: "President, appointed Volcker" },
    { name: "Ronald Reagan", role: "President during the recession" },
  ],
  timeline: [
    { year: "1979", label: "Volcker appointed Fed Chair" },
    { year: "1980", label: "Fed funds rate hits 20%" },
    { year: "1981", label: "Deep recession begins" },
    { year: "1982", label: "Unemployment peaks at 10.8%" },
    { year: "1983", label: "Inflation falls below 4%" },
  ],
  terms: ["Disinflation", "Fed Credibility", "Money Supply Targeting", "Double-Dip Recession"],
};
