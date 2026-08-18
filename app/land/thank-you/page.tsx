import type { Metadata } from "next"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { CheckCircle2, Phone, MessageSquare } from "lucide-react"
import config from "@/lib/config"

/**
 * /land/thank-you — confirmation for the vacant-land funnel.
 *
 * Separate route rather than a branch inside /thank-you. That page is entirely
 * homeowner copy ("repaint your kitchen and list it in the spring", "houses that
 * needed more work") and recommends four homeowner articles, so there was nothing
 * to reuse. Keeping it separate also means the live house funnel cannot break.
 *
 * Contact sits ABOVE the confirmation message so the number a seller needs to
 * save is the first thing on screen, not something they scroll for.
 */

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" })

const AMBER = "#F9A61A"

export const metadata: Metadata = {
  title: `Thank You | ${config.companyName}`,
  description: "We have your parcel details. Your written cash offer is on the way.",
  robots: { index: false, follow: false },
}

const NEXT_STEPS = [
  { n: "1", t: "We pull the county record", d: "Parcel, acreage, tax status and access, straight from the county. You do not need to gather anything or pay for a survey." },
  { n: "2", t: "You get a written offer", d: "Within one business day. A real number with no conditions buried underneath it, and no obligation to accept." },
  { n: "3", t: "You pick the closing date", d: "If the number works, closing goes through a licensed Carolina attorney. We cover the closing costs." },
]

export default function LandThankYouPage() {
  const phone = config.phoneDisplay
  const href = (config.phoneHref || "").replace(/^tel:/, "")

  return (
    <main className={`${poppins.className} min-h-screen bg-white text-gray-900`}>
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Image
            src="/logo-kind-acquisition.png"
            alt={config.companyName}
            width={256}
            height={64}
            className="h-14 w-auto"
            unoptimized
          />
        </div>
      </header>

      {/* ── CONTACT FIRST. The number they need to save, above the message. ── */}
      <section className="border-b border-gray-200" style={{ backgroundColor: "#FEF7EA" }}>
        <div className="mx-auto max-w-3xl px-4 py-10 text-center md:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#8A5905" }}>
            Save this number
          </p>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-balance md:text-4xl">
            Expect a call or text from{" "}
            <span className="whitespace-nowrap rounded-md px-2 py-0.5" style={{ backgroundColor: AMBER }}>
              {phone}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-gray-700 md:text-lg">
            That is our team, not a call centre. Save it now so our call does not come through as an
            unknown number. If you would rather reach us first, do that instead.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${href}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-gray-900 shadow-sm transition hover:brightness-95 sm:w-auto"
              style={{ backgroundColor: AMBER }}
            >
              <Phone className="h-5 w-5" />
              Call {phone}
            </a>
            <a
              href={`sms:${href}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-base font-bold text-white transition hover:bg-black sm:w-auto"
            >
              <MessageSquare className="h-5 w-5" />
              Text us instead
            </a>
          </div>
        </div>
      </section>

      {/* ── confirmation ── */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-center md:py-16">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900">
          <CheckCircle2 className="h-7 w-7" style={{ color: AMBER }} />
        </div>
        <h2 className="text-2xl font-bold leading-tight text-balance md:text-3xl">
          We have your parcel details
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-600 md:text-lg">
          Nothing else is needed from you right now. We do the county research ourselves and come back
          with a number.
        </p>
      </section>

      {/* ── what happens next, land-specific ── */}
      <section className="border-t border-gray-200" style={{ backgroundColor: "#FEF7EA" }}>
        <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
          <h2 className="text-center text-2xl font-bold md:text-3xl">What happens next</h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded" style={{ backgroundColor: AMBER }} />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {NEXT_STEPS.map((s) => (
              <li key={s.n} className="text-center">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-gray-900"
                  style={{ backgroundColor: AMBER }}
                >
                  {s.n}
                </div>
                <h3 className="mt-4 text-[17px] font-bold">{s.t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-gray-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── a straight note, written for land not houses ── */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
            While you wait
          </p>
          <h2 className="mt-3 text-center text-2xl font-bold text-balance md:text-3xl">
            A few things worth knowing before we talk
          </h2>
          <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-gray-700 md:text-[17px]">
            <p>
              Most people who reach out to us are not in a hurry. The land has just been sitting there,
              costing a little every year, and at some point it stopped being worth the annual bill.
              That is a completely normal reason to sell, and you do not need a better one.
            </p>
            <p>
              You may not know your parcel number, whether it perc&apos;d, where the lines run, or if there
              is legal access. That is fine. Those are the things we look up, and none of them need an
              answer from you before we can make an offer.
            </p>
            <p>
              If the land is behind on taxes, landlocked, will not perc, or is still in a parent&apos;s name,
              say so when we talk. None of those kill a deal. They are ordinary on land and they get sorted
              at closing rather than by you beforehand.
            </p>
            <p>
              And if you want to check us out before that call, please do. Ask us which attorney handles the
              closing and ring their office directly. Ask for proof of funds. Anyone buying land should be
              happy to answer both, and we would rather you asked now than wondered later.
            </p>
          </div>
        </div>
      </section>

      {/* ── closing contact repeat ── */}
      <section className="border-t border-gray-200 px-4 py-12 text-center md:py-16">
        <p className="text-[16px] text-gray-600">Questions in the meantime?</p>
        <a
          href={`tel:${href}`}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-gray-900 transition hover:brightness-95"
          style={{ backgroundColor: AMBER }}
        >
          <Phone className="h-5 w-5" />
          {phone}
        </a>
      </section>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} {config.companyName}. All rights reserved.
      </footer>
    </main>
  )
}
