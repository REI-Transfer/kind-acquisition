import type { Metadata } from "next"
import { SurveyCard } from "@/components/survey/survey-card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import config from "@/lib/config"

/**
 * /land — Kind Acquisition's vacant-land funnel for North and South Carolina.
 *
 * Structure derived from a source-level teardown of the 887-day category winner
 * (reference/land-clone-spec-freedom-land-network.md). Reuses SurveyCard so the
 * webhook, tracking, lead scoring and geo gate are the SAME proven plumbing as
 * the house funnel. No parallel form, no second webhook.
 *
 * NOTE: this route intentionally does NOT pass "land" in disqualifiedPropertyTypes.
 * The house funnel disqualifies land; this one is the land funnel.
 */

export const metadata: Metadata = {
  title: "Sell Your Land Fast For Cash | North & South Carolina | Kind Acquisition",
  description:
    "We buy vacant land across North and South Carolina for cash. Written offer in one business day, no commissions, no closing costs. Charlotte based.",
}

const PROCESS = [
  { n: "1", t: "Tell us where the land is", d: "County, state, and parcel number if you have it. That is enough for us to evaluate it. You do not gather documents." },
  { n: "2", t: "Receive a cash offer", d: "A straightforward all-cash number, in writing, within one business day. No obligation to accept it." },
  { n: "3", t: "Sign the agreement", d: "Plain documents you can sign through email. No office visit and no trip out to the property." },
  { n: "4", t: "We schedule the closing", d: "Through a licensed North or South Carolina closing attorney, on a date that works for you." },
  { n: "5", t: "You get your cash", d: "Sign the deed and receive your funds by mailed check or wire, whichever you prefer." },
]

const PILLARS = [
  { t: "Land is what we actually do", d: "Plenty of house buyers will take a parcel if it falls in their lap. Land has been our bread and butter for years, and it is the reason we can price a Carolina parcel properly instead of guessing low to cover ourselves." },
  { t: "We know these counties", d: "A tract in Anson prices nothing like a lot in Mecklenburg, and a mountain parcel in Ashe is a different animal again. We buy across all 100 North Carolina counties and all 46 in South Carolina." },
  { t: "No fees or commissions", d: "No listing fee, no commission, no closing costs. The number we put in writing is the number you receive at closing." },
  { t: "Five steps to cash", d: "We buy directly, which avoids the parts of a land sale that drag: no listing period, no showings, and no buyer whose financing can fall apart." },
]

const REASONS = [
  { t: "No use for it anymore", d: "The parcel does nothing for you. Nobody in the family visits it, hunts it, or wants it." },
  { t: "Taxes and carrying costs", d: "A county tax bill every year for land that produces nothing, plus mowing and the occasional nuisance notice." },
  { t: "Present-use value is a trap now", d: "Land enrolled in farm or forestry deferral looks cheap to hold, right up until the use changes and the deferred taxes come due at once." },
  { t: "Probate or divorce", d: "An estate to settle or a split to finish, and the land has to become a number everyone can divide." },
  { t: "The septic permit never came", d: "A failed soil evaluation from the county health department ends a build plan quietly. The land stays, the plan does not." },
  { t: "You moved away", d: "You cannot check on it, keep it bush-hogged, or answer a county letter from another state." },
  { t: "Timber came off and that was that", d: "Once a tract is cut, the reason to keep holding it often goes with the timber." },
  { t: "Land values are up in your county", d: "Some owners sell simply because the number today is better than the one they expected." },
]

const FAQS = [
  { q: "How fast can I get an offer on my land?", a: "Within one business day of getting your parcel details. We pull the county record ourselves, so you do not need to gather paperwork or pay for anything up front." },
  { q: "Are there any fees, commissions, or closing costs?", a: "No. No commissions, no listing fees, and no closing costs. What we put in writing is what you receive." },
  { q: "What areas do you buy in?", a: "North Carolina and South Carolina only. All 100 North Carolina counties and all 46 South Carolina counties, from the coast through the Sandhills and Piedmont to the mountains. We are based in Charlotte." },
  { q: "What if I do not know my parcel number?", a: "Give us the county and roughly where the land sits. Parcel numbers are public record in every Carolina county and we will look it up for you." },
  { q: "Do I need to visit the property or clear anything?", a: "No. We buy as-is. You do not need to bush-hog it, have it surveyed, or set foot on it." },
  { q: "What about back taxes, or land that will not perc?", a: "Tell us either way. Delinquent taxes and a failed soil evaluation are normal parts of the land we look at, and they are handled at closing rather than by you beforehand." },
  { q: "Who handles the closing?", a: "A licensed closing attorney, which is how real estate closes in both Carolinas. You are welcome to call their office directly before you sign anything with us." },
  { q: "How long does closing take, and how do I get paid?", a: "As little as 14 days once the title work is clear. You choose a mailed check or a wire to your account." },
]

export default function LandPage() {
  let parsedServiceAreas: Array<{ id: string; centerLat: number; centerLng: number; radiusMiles: number }> = []
  try { parsedServiceAreas = JSON.parse(config.serviceAreas) } catch {}

  // Land funnel: keep the house funnel's other gates, but never disqualify land here.
  const disqualifiedPropertyTypes = config.disqualifiedPropertyTypes
    .split(",").map(s => s.trim()).filter(Boolean).filter(t => t !== "land")
  const disqualifiedOwnershipLengths = config.disqualifiedOwnershipLengths
    .split(",").map(s => s.trim()).filter(Boolean)
  const allowedStates = config.allowedStates
    .split(",").map(s => s.trim()).filter(Boolean)

  const accent = config.accentColor

  return (
    <main className="relative min-h-screen bg-gray-50">
      <Header
        companyName={config.companyName}
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        logoUrl={config.logoUrl}
        headerBgColor={config.headerBgColor}
        ibuykcStyle
      />

      {/* ── hero + form ── */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:py-8 lg:px-8">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-[3.5rem] lg:leading-[1.12] text-balance">
            We Buy Vacant Land In The Carolinas For{" "}
            <span style={{ color: accent }}>Cash</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 md:text-lg">
            A written cash offer on your North or South Carolina parcel within one business day.
            No commissions, no listing, and we cover the closing costs.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-5">
            {["Offer in 24 hours", "We pay all closing costs", "Any condition, any access", "NC & SC only"].map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-sm font-medium text-gray-700 md:text-base">
                <svg className="h-4 w-4 shrink-0" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-5 max-w-3xl md:mt-7">
          <SurveyCard
            phoneDisplay={config.phoneDisplay}
            phoneHref={config.phoneHref}
            serviceAreas={parsedServiceAreas}
            disqualifiedPropertyTypes={disqualifiedPropertyTypes}
            disqualifiedOwnershipLengths={disqualifiedOwnershipLengths}
            allowedStates={allowedStates}
            motivationV2={config.motivationV2}
          />
        </div>
      </section>

      {/* ── process ── */}
      <section className="border-t border-gray-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">What&apos;s the process?</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded" style={{ backgroundColor: accent }} />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {PROCESS.map((s) => (
              <li key={s.n} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-gray-900" style={{ backgroundColor: accent }}>
                  {s.n}
                </div>
                <h3 className="mt-3 text-base font-bold text-gray-900">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── why us ── */}
      <section className="border-t border-gray-200 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
            Why work with {config.companyName}?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600 md:text-lg">
            There are plenty of realtors, land buyers, and out-of-state companies making offers on Carolina
            land right now. Here is what separates us.
          </p>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.t} className="rounded-lg bg-white p-6 shadow-sm" style={{ borderTop: `4px solid ${accent}` }}>
                <h3 className="text-lg font-bold text-gray-900">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── auction objection: the #1 competing exit, which no competitor addresses ── */}
      <section className="bg-gray-900 py-14 text-white md:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl font-extrabold md:text-4xl">Would an auction or an agent get you more?</h2>
          <div className="mt-4 h-1 w-16 rounded" style={{ backgroundColor: accent }} />
          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            Sometimes, honestly, yes. If your tract is large, has road frontage and water, and sits in a
            growing county, an auction can beat a cash offer. We will tell you when we think that is your
            situation.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            What an auction does not put up front is the rest of it. You pay the marketing. You wait for a
            sale date. You may pay a buyer&apos;s premium on top of a commission. And on the day, the price
            is whoever shows up.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            Listing has the same problem in slower form. Raw land does not qualify for an ordinary mortgage,
            so your buyer pool is people paying cash, and Carolina tracts routinely sit while the county tax
            bill keeps arriving.
          </p>
          <p className="mt-6 text-lg font-semibold leading-relaxed">
            Our offer is a number, in writing, in a day, that does not move. Compare it against anything you
            like. If somebody beats it, take theirs.
          </p>
        </div>
      </section>

      {/* ── verification: built from the checklist landowners are coached to run ── */}
      <section className="border-t border-gray-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Check that we are real before you talk to us
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 md:text-lg">
            Vacant land is the most impersonated asset in real estate. Nobody lives on it, so a fake seller
            can put a parcel under contract and disappear with a deposit before the real owner notices. That
            has made every honest land buyer look suspicious. Here is the checklist landowners are told to
            run. We would rather you ran it now than wondered later.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              ["Ask who is handling the closing, then call them yourself.", "Both Carolinas close through a licensed attorney. Ask us for the firm and call their office directly, not through us. A buyer who will not name one is the clearest warning sign there is."],
              ["Ask for the legal business name and a physical address.", "We are based in Charlotte, North Carolina. Look us up in the Secretary of State registry for either state."],
              ["Ask for proof of funds.", "We send it before you sign anything. We buy with our own money, which is why we can commit to a closing date."],
              ["Ask whether they will hand your contract to somebody else.", "Some buyers tie up a parcel, shop it around, and walk if nobody bites. You lose months and the land goes back on your tax bill."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-lg border border-gray-200 p-5">
                <p className="font-semibold text-gray-900">{t}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-gray-600">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── reasons ── */}
      <section className="border-t border-gray-200 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
            Reasons people sell Carolina land
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600">
            Land does not fall apart the way a house does. It just quietly costs you money every year for
            something you never use.
          </p>
          <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r) => (
              <div key={r.t} className="pt-4" style={{ borderTop: `3px solid ${accent}` }}>
                <h3 className="text-[15px] font-bold text-gray-900">{r.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── faq ── */}
      <section className="border-t border-gray-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">Common questions</h2>
          <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-gray-900">
                  {f.q}
                  <span className="mt-0.5 shrink-0 text-xl leading-none transition group-open:rotate-45" style={{ color: accent }} aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── closing cta ── */}
      <section className="border-t border-gray-200 py-14 text-center md:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Find out what your parcel is worth to us
          </h2>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            One business day, no fee, no obligation. If the number is not right for you, nothing happens.
          </p>
          <a
            href="#top"
            className="mt-7 inline-block rounded-lg px-8 py-4 text-base font-bold text-gray-900"
            style={{ backgroundColor: accent }}
          >
            Get My Cash Offer
          </a>
        </div>
      </section>

      <Footer
        companyName={config.companyName}
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        privacyPolicyUrl={config.privacyPolicyUrl}
        termsUrl={config.termsUrl}
      />
    </main>
  )
}
