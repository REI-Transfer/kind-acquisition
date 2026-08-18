"use client"

/**
 * LandForm — the vacant-land capture form, built to the proven category pattern.
 *
 * Source: reference/land-clone-spec-freedom-land-network.md, a source-level
 * teardown of the 887-day category winner. Its form is THREE steps:
 *
 *     1  Contact    First Name, Last Name, Phone, Email
 *     2  Location   County, State
 *     3  Specifics  Parcel Number, Approx. Acres
 *
 * Two findings drive the shape, and both cut against instinct:
 *
 * 1. CONTACT COMES FIRST. An abandon at step 2 or 3 still leaves a name and a
 *    phone. A county-first form leaves a county and nobody to call.
 *
 * 2. NO DISQUALIFYING QUESTIONS. Not one competitor lander asks about legal
 *    access, back taxes, heir status, POA dues or buildability. They qualify in
 *    the ad creative, capture minimally, and disqualify downstream. Our own
 *    architecture already works that way, since n8n owns qualification and CAPI.
 *
 * This deliberately does NOT use the house SurveyCard: a vacant parcel usually
 * has no street address to geocode, which is why the category collects
 * county + state + APN instead of an address autocomplete.
 */

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { captureTrackingData, readGfSid } from "@/lib/tracking"

const STEPS = ["Contact", "Location", "Specifics"] as const

type Data = {
  firstName: string; lastName: string; phone: string; email: string
  county: string; state: string
  parcelNumber: string; acres: string; timeline: string
}

const EMPTY: Data = {
  firstName: "", lastName: "", phone: "", email: "",
  county: "", state: "",
  parcelNumber: "", acres: "", timeline: "",
}

// Intent qualifier taken from Sell Land ASAP. Reads as helpful rather than as a
// gate, which is why it is the one extra field the category tolerates.
const TIMELINE = [
  { id: "asap", label: "As soon as possible" },
  { id: "1-3-months", label: "1 to 3 months" },
  { id: "3-6-months", label: "3 to 6 months" },
  { id: "exploring", label: "Just exploring my options" },
]

// Scored the land way: an owner who cannot move the parcel any other way is our
// best lead, not our worst.
const SCORE_TIMELINE: Record<string, number> = { asap: 3, "1-3-months": 2, "3-6-months": 1, exploring: 0 }
const SCORE_ACRES = (a: string) => {
  const n = parseFloat(a)
  if (!isFinite(n)) return 1
  if (n >= 20) return 3
  if (n >= 5) return 2
  if (n >= 1) return 1
  return 0
}

export function LandForm({
  allowedStates = [],
  phoneDisplay = "",
  phoneHref = "",
}: { allowedStates?: string[]; phoneDisplay?: string; phoneHref?: string }) {
  const [step, setStep] = useState(0)
  const [d, setD] = useState<Data>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const set = (k: keyof Data, v: string) => setD((p) => ({ ...p, [k]: v }))

  const states = allowedStates.length ? allowedStates : ["NC", "SC"]
  const digits = d.phone.replace(/\D/g, "").replace(/^1/, "")

  const canAdvance =
    step === 0
      ? d.firstName.trim() !== "" && d.lastName.trim() !== "" && digits.length === 10 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())
      : step === 1
      ? d.county.trim() !== "" && d.state !== ""
      : true

  async function submit() {
    setSubmitting(true); setError("")
    // ?? binds looser than +, so the parens matter: without them a set timeline
    // would swallow the acreage score entirely.
    const score = (SCORE_TIMELINE[d.timeline] ?? 0) + SCORE_ACRES(d.acres)
    const eventId = `land_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    const payload = {
      firstName: d.firstName.trim(),
      lastName: d.lastName.trim(),
      name: `${d.firstName.trim()} ${d.lastName.trim()}`.trim(),
      email: d.email.trim().toLowerCase(),
      phone: d.phone,
      // Land identity: county + state + APN, not a street address.
      address: [d.parcelNumber && `Parcel ${d.parcelNumber}`, `${d.county} County`, d.state]
        .filter(Boolean).join(", "),
      county: d.county.trim(),
      state: d.state,
      parcelNumber: d.parcelNumber.trim(),
      acres: d.acres.trim(),
      propertyType: "land",
      timeline: d.timeline,
      source: "Land Form",
      submittedAt: new Date().toISOString(),
      qualified: true,
      lead_score: score,
      lead_quality: score >= 4 ? "hot" : score >= 2 ? "warm" : "cold",
      meta_event_id: eventId,
      meta_event_name: "Lead",
      meta_value: score * 25,
      gf_sid: readGfSid(),
      ...captureTrackingData(),
    }
    try {
      if (typeof window !== "undefined" && (window as { fbq?: (...a: unknown[]) => void }).fbq) {
        ;(window as { fbq: (...a: unknown[]) => void }).fbq("track", "Lead", {
          content_name: "Kind Acquisition Land", value: score * 25, currency: "USD",
        }, { eventID: eventId })
      }
      const r = await fetch("/api/submit", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      })
      if (!r.ok) throw new Error("submit failed")
      window.location.href = "/thank-you"
    } catch {
      setError("Something went wrong. Please call us and we'll take your details directly.")
      setSubmitting(false)
    }
  }

  const next = () => (step === STEPS.length - 1 ? submit() : setStep(step + 1))

  return (
    <div className="rounded-xl bg-white p-6 shadow-xl sm:p-8">
      <div className="text-center">
        <h2 className="text-[22px] font-bold leading-tight text-gray-900 sm:text-2xl">
          Get A FREE, No-Obligation Cash Offer
        </h2>
        <p className="mt-1.5 text-sm text-gray-500">Provide your land&apos;s information</p>
      </div>

      {/* three-step rail, mirroring the winner's Contact / Location / Specifics */}
      <div className="mt-6 flex gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-[#F9A61A]" : "bg-gray-200"}`} />
            <p className={`mt-2 text-center text-[11px] font-bold uppercase tracking-wider ${i <= step ? "text-gray-900" : "text-gray-400"}`}>
              {i + 1} {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {step === 0 && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" required>
                <Input value={d.firstName} onChange={(e) => set("firstName", e.target.value)} autoComplete="given-name" />
              </Field>
              <Field label="Last Name" required>
                <Input value={d.lastName} onChange={(e) => set("lastName", e.target.value)} autoComplete="family-name" />
              </Field>
            </div>
            <Field label="Phone" required>
              <Input value={d.phone} onChange={(e) => set("phone", e.target.value)} type="tel" inputMode="tel" autoComplete="tel" />
            </Field>
            <Field label="Email Address" required>
              <Input value={d.email} onChange={(e) => set("email", e.target.value)} type="email" inputMode="email" autoComplete="email" />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <p className="text-sm text-gray-500">
              Vacant land often has no street address. The county is enough for us to pull the parcel.
            </p>
            <Field label="County" required>
              <Input value={d.county} onChange={(e) => set("county", e.target.value)} placeholder="e.g. Anson" />
            </Field>
            <Field label="State" required>
              <select
                value={d.state}
                onChange={(e) => set("state", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select a state</option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Parcel Number / APN" hint="Optional. We will look it up if you do not have it.">
              <Input value={d.parcelNumber} onChange={(e) => set("parcelNumber", e.target.value)} placeholder="e.g. 06-123-456" />
            </Field>
            <Field label="Approx. Acres" hint="A rough number is fine.">
              <Input value={d.acres} onChange={(e) => set("acres", e.target.value)} inputMode="decimal" placeholder="e.g. 12" />
            </Field>
            <Field label="How soon are you looking to sell?">
              <select
                value={d.timeline}
                onChange={(e) => set("timeline", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select one</option>
                {TIMELINE.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </Field>
          </>
        )}

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <Button
          onClick={next}
          disabled={!canAdvance || submitting}
          className="h-12 w-full text-base font-bold uppercase tracking-wide text-gray-900 hover:brightness-95"
          style={{ backgroundColor: "#F9A61A" }}
        >
          {submitting ? "Sending..." : step === STEPS.length - 1 ? "Get My Cash Offer" : "Continue"}
        </Button>

        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
          <Check className="h-3.5 w-3.5" /> No obligation. No fees. We never list your parcel publicly.
        </p>
        {phoneDisplay && (
          <p className="text-center text-xs text-gray-400">
            Prefer to talk? <a href={`tel:${phoneHref}`} className="font-semibold text-gray-600 underline">{phoneDisplay}</a>
          </p>
        )}
      </div>
    </div>
  )
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}{required && <span className="text-[#C77F0B]"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-gray-500">{hint}</span>}
    </label>
  )
}
