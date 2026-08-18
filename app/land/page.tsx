import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { LandForm } from "@/components/survey/land-form"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import config from "@/lib/config"
import { LandUI } from "./land-ui"

/**
 * /land — Kind Acquisition's vacant-land funnel for North and South Carolina.
 *
 * Visual system is a recolor of the 887-day category winner's lander, read from
 * source: reference/land-clone-spec-freedom-land-network.md.
 *
 * Reuses SurveyCard so the webhook, tracking, lead scoring and geo gate are the
 * SAME proven plumbing as the house funnel. No parallel form, no second webhook.
 *
 * This route intentionally does NOT pass "land" in disqualifiedPropertyTypes.
 * The house funnel disqualifies land; this one IS the land funnel.
 */

// Self-hosted at build time — the category winner uses Poppins throughout.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" })

export const metadata: Metadata = {
  title: "Sell Your Land Fast For Cash | North & South Carolina | Kind Acquisition",
  description:
    "We buy vacant land across North and South Carolina for cash. Written offer in one business day, no commissions, no closing costs. Charlotte based.",
}

const HERO_IMAGES = ["/land/hero-1.jpg", "/land/hero-2.jpg", "/land/hero-3.jpg"]

export default function LandPage() {
  const allowedStates = config.allowedStates
    .split(",").map(s => s.trim()).filter(Boolean)

  return (
    <main id="top" className={`${poppins.className} relative min-h-screen bg-white`}>
      <Header
        companyName={config.companyName}
        phoneDisplay={config.phoneDisplay}
        phoneHref={config.phoneHref}
        logoUrl={config.logoUrl}
        headerBgColor={config.headerBgColor}
        ibuykcStyle
      />

      <LandUI
        heroImages={HERO_IMAGES}
        form={
          <LandForm
            allowedStates={allowedStates}
            phoneDisplay={config.phoneDisplay}
            phoneHref={config.phoneHref}
          />
        }
      />

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
