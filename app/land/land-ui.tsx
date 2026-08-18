"use client"

/**
 * Presentational shell for /land.
 *
 * The visual system is a recolor of the 887-day category winner's lander,
 * read from source (reference/land-clone-spec-freedom-land-network.md):
 * dark scrimmed hero photo carousel, uppercase headline with the final word
 * colour-split into the accent, form card floating over the hero, circular
 * numbered process steps, top-bordered pillar cards, full-bleed gradient CTA
 * strips, dark multi-column footer.
 *
 * Their palette (#E13C38 red / #112C58 navy / #41B7EB cyan) is replaced with
 * Kind Acquisition's own brand: amber #F9A61A on black.
 *
 * The form itself is NOT reimplemented here — SurveyCard is passed in as a
 * child so the real webhook, tracking, lead scoring and geo gate are used.
 */

import type { ReactNode } from "react"

const AMBER = "#F9A61A"
const AMBER_DK = "#C77F0B"

const PROCESS = [
  { n: "1", t: "Tell us where the land is", d: "County, state, and parcel number if you have it. That is enough for us to evaluate it." },
  { n: "2", t: "Receive a cash offer", d: "A straightforward all-cash number, in writing, within one business day." },
  { n: "3", t: "Sign the agreement", d: "Plain documents you can sign through email. No office visit, no trip to the property." },
  { n: "4", t: "We schedule the closing", d: "Through a licensed Carolina closing attorney, on a date that works for you." },
  { n: "5", t: "You get your cash", d: "Sign the deed and receive funds by mailed check or wire, whichever you prefer." },
]

const PILLARS = [
  { t: "Land is what we actually do", d: "Plenty of house buyers will take a parcel if it falls in their lap. Land has been our bread and butter for years, and it is why we can price a Carolina tract properly instead of guessing low to cover ourselves." },
  { t: "We know these counties", d: "A tract in Anson prices nothing like a lot in Mecklenburg, and a mountain parcel in Ashe is a different animal again. We buy across all 100 North Carolina counties and all 46 in South Carolina." },
  { t: "No fees or commissions", d: "No listing fee, no commission, no closing costs. The number we put in writing is the number you receive at closing." },
  { t: "Five steps to cash", d: "We buy directly, which cuts the parts of a land sale that drag: no listing period, no showings, and no buyer whose financing can collapse." },
]

const REASONS = [
  { t: "No use for it anymore", d: "The parcel does nothing for you. Nobody in the family visits it, hunts it, or wants it." },
  { t: "Taxes and carrying costs", d: "A county tax bill every year for land that produces nothing, plus mowing and the occasional nuisance notice." },
  { t: "Present-use value coming due", d: "Land in farm or forestry deferral looks cheap to hold, right until the use changes and the deferred taxes land at once." },
  { t: "Probate or divorce", d: "An estate to settle or a split to finish, and the land has to become a number everyone can divide." },
  { t: "The septic permit never came", d: "A failed soil evaluation from the county health department ends a build plan quietly. The land stays, the plan does not." },
  { t: "You moved away", d: "You cannot check on it, keep it bush-hogged, or answer a county letter from another state." },
  { t: "Timber came off and that was that", d: "Once a tract is cut, the reason to keep holding it often goes with the timber." },
  { t: "Land values are up in your county", d: "Some owners sell simply because the number today beats the one they expected." },
]

const VERIFY = [
  ["Ask who is handling the closing, then call them yourself.", "Both Carolinas close through a licensed attorney. Ask us for the firm and call their office directly, not through us. A buyer who will not name one is the clearest warning sign there is."],
  ["Ask for the legal business name and a physical address.", "We are based in Charlotte, North Carolina. Look us up in the Secretary of State registry for either state."],
  ["Ask for proof of funds.", "We send it before you sign anything. We buy with our own money, which is why we can commit to a closing date."],
  ["Ask whether they will hand your contract to somebody else.", "Some buyers tie up a parcel, shop it around, and walk if nobody bites. You lose months and the land goes back on your tax bill."],
]

const FAQS = [
  ["How fast can I get an offer on my land?", "Within one business day of getting your parcel details. We pull the county record ourselves, so you do not gather paperwork or pay anything up front."],
  ["Are there any fees, commissions, or closing costs?", "No. No commissions, no listing fees, and no closing costs. What we put in writing is what you receive."],
  ["What areas do you buy in?", "North Carolina and South Carolina only. All 100 NC counties and all 46 SC counties, from the coast through the Sandhills and Piedmont to the mountains. We are based in Charlotte."],
  ["What if I do not know my parcel number?", "Give us the county and roughly where the land sits. Parcel numbers are public record in every Carolina county and we will look it up for you."],
  ["Do I need to visit the property or clear anything?", "No. We buy as-is. You do not need to bush-hog it, have it surveyed, or set foot on it."],
  ["What about back taxes, or land that will not perc?", "Tell us either way. Delinquent taxes and a failed soil evaluation are normal parts of the land we look at, and they get handled at closing rather than by you beforehand."],
  ["Who handles the closing?", "A licensed closing attorney, which is how real estate closes in both Carolinas. You are welcome to call their office directly before you sign anything with us."],
  ["How long does closing take, and how do I get paid?", "As little as 14 days once title work is clear. You choose a mailed check or a wire to your account."],
]

export function LandUI({ form, heroImages }: { form: ReactNode; heroImages: string[] }) {
  return (
    <>
      {/* ── hero: scrimmed photo carousel, colour-split headline, form card ── */}
      <div className="relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className="land-slide absolute inset-0 h-full w-full object-cover"
              style={{ animationDelay: `${i * 7}s` }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg,rgba(8,8,8,.92) 0%,rgba(8,8,8,.74) 44%,rgba(8,8,8,.42) 100%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <h1 className="text-center text-[2.15rem] font-bold uppercase leading-[1.12] text-white text-balance sm:text-[2.75rem] lg:text-left lg:text-[3.6rem] lg:leading-[1.08]">
              We Buy Vacant Land In The Carolinas For <span style={{ color: AMBER }}>Cash</span>
            </h1>
            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {["Offer in 24 hours", "We pay all closing costs", "Any condition, any access", "North & South Carolina"].map((b) => (
                <li key={b} className="flex items-center gap-3 text-base font-semibold text-white">
                  <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" style={{ fill: AMBER }} aria-hidden="true">
                    <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.7 7.6l-5.3 6a1 1 0 01-1.5 0L5.3 11a1 1 0 111.5-1.3l1.9 2.1 4.5-5.1a1 1 0 111.5 1.3z" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-center text-[15px] leading-relaxed text-neutral-300 lg:text-left">
              Carolina land often has no street address. The county and a rough location is enough to start.
            </p>
          </div>
          <div>{form}</div>
        </div>
      </div>

      {/* ── process ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-[1.9rem] font-bold text-neutral-900 md:text-[2.5rem] md:leading-[1.15]">What&apos;s the process?</h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded" style={{ backgroundColor: AMBER }} />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
            {PROCESS.map((s) => (
              <li key={s.n} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-neutral-900" style={{ backgroundColor: AMBER }}>{s.n}</div>
                <h3 className="mt-4 text-[17px] font-bold text-neutral-900">{s.t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-neutral-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── gradient CTA strip ── */}
      <div className="py-16 text-center md:py-24" style={{ background: `linear-gradient(100deg, ${AMBER} 0%, ${AMBER_DK} 100%)` }}>
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-[1.9rem] font-bold text-neutral-900 md:text-[2.5rem] md:leading-[1.15]">Sell Your Land The Easy Way</h2>
          <p className="mx-auto mt-4 max-w-xl text-[18px] leading-[1.65] text-neutral-900/80">
            A straightforward process that walks you through every step, so selling your land is smooth and worry-free.
          </p>
          <a href="#top" className="mt-8 inline-block rounded bg-neutral-900 px-10 py-[18px] text-base font-bold uppercase tracking-wide text-white">Get Your Cash Offer Now</a>
        </div>
      </div>

      {/* ── pillars ── */}
      <section className="border-t border-neutral-200 py-20 md:py-28" style={{ backgroundColor: "#FEF7EA" }}>
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-center text-[1.9rem] font-bold text-neutral-900 md:text-[2.5rem] md:leading-[1.15]">Why work with Kind Acquisition?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[18px] leading-[1.7] text-neutral-600">
            There are plenty of realtors, land buyers, and out-of-state companies making offers on Carolina land right now. Here is what separates us.
          </p>
          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.t} className="rounded-lg bg-white p-8 shadow-sm" style={{ borderTop: `4px solid ${AMBER}` }}>
                <h3 className="text-xl font-bold text-neutral-900">{p.t}</h3>
                <p className="mt-3 text-[16px] leading-[1.7] text-neutral-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── auction objection ── */}
      <section className="bg-neutral-950 py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-[1.9rem] font-bold md:text-[2.5rem] md:leading-[1.15]">Would an auction or an agent get you more?</h2>
          <div className="mt-5 h-1 w-20 rounded" style={{ backgroundColor: AMBER }} />
          <p className="mt-8 text-[18px] leading-[1.75] text-neutral-300">
            Sometimes, honestly, yes. If your tract is large, has road frontage and water, and sits in a growing county, an auction can beat a cash offer. We will tell you when we think that is your situation.
          </p>
          <p className="mt-5 text-[18px] leading-[1.75] text-neutral-300">
            What an auction does not put up front is the rest of it. You pay the marketing. You wait for a sale date. You may pay a buyer&apos;s premium on top of a commission. And on the day, the price is whoever shows up.
          </p>
          <p className="mt-5 text-[18px] leading-[1.75] text-neutral-300">
            Listing has the same problem in slower form. Raw land does not qualify for an ordinary mortgage, so your buyer pool is people paying cash, and Carolina tracts routinely sit while the county tax bill keeps arriving.
          </p>
          <p className="mt-8 text-[18px] font-semibold leading-[1.7]">
            Our offer is a number, in writing, in a day, that does not move. Compare it against anything you like. If somebody beats it, take theirs.
          </p>
        </div>
      </section>

      {/* ── verify us ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-[1.9rem] font-bold text-neutral-900 md:text-[2.5rem] md:leading-[1.15]">Check that we are real before you talk to us</h2>
          <p className="mt-6 text-[18px] leading-[1.75] text-neutral-600">
            Vacant land is the most impersonated asset in real estate. Nobody lives on it, so a fake seller can put a parcel under contract and disappear with a deposit before the real owner notices. That has made every honest land buyer look suspicious. Here is the checklist landowners are told to run. We would rather you ran it now than wondered later.
          </p>
          <ul className="mt-9 space-y-5">
            {VERIFY.map(([t, d]) => (
              <li key={t} className="rounded-lg border border-neutral-200 p-6">
                <p className="font-semibold text-neutral-900">{t}</p>
                <p className="mt-2 text-[16px] leading-[1.7] text-neutral-600">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── reasons ── */}
      <section className="border-t border-neutral-200 py-20 md:py-28" style={{ backgroundColor: "#FEF7EA" }}>
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-center text-[1.9rem] font-bold text-neutral-900 md:text-[2.5rem] md:leading-[1.15]">Reasons people sell Carolina land</h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[17px] leading-[1.7] text-neutral-600">
            Land does not fall apart the way a house does. It just quietly costs you money every year for something you never use.
          </p>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r) => (
              <div key={r.t} className="pt-4" style={{ borderTop: `3px solid ${AMBER}` }}>
                <h3 className="text-[16px] font-bold text-neutral-900">{r.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-neutral-600">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── faq ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-center text-[1.9rem] font-bold text-neutral-900 md:text-[2.5rem] md:leading-[1.15]">Common questions</h2>
          <div className="mt-11 divide-y divide-neutral-200 border-y border-neutral-200">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-neutral-900">
                  {q}
                  <span className="mt-0.5 shrink-0 text-xl leading-none transition group-open:rotate-45" style={{ color: AMBER_DK }} aria-hidden="true">+</span>
                </summary>
                <p className="mt-3.5 text-[16px] leading-[1.7] text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── closing strip ── */}
      <div className="py-16 text-center md:py-24" style={{ background: `linear-gradient(100deg, ${AMBER} 0%, ${AMBER_DK} 100%)` }}>
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-[1.9rem] font-bold text-neutral-900 md:text-[2.5rem] md:leading-[1.15]">Turn Your Carolina Land Into Cash</h2>
          <p className="mx-auto mt-4 max-w-xl text-[18px] leading-[1.65] text-neutral-900/80">
            One business day, no fee, no obligation. If the number is not right for you, nothing happens.
          </p>
          <a href="#top" className="mt-8 inline-block rounded bg-neutral-900 px-10 py-[18px] text-base font-bold uppercase tracking-wide text-white">Get My Cash Offer</a>
        </div>
      </div>
    </>
  )
}
