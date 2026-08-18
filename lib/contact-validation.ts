/**
 * Shared contact validation.
 *
 * Extracted verbatim from components/survey/survey-card.tsx so the land form and
 * the house survey enforce exactly the same rules instead of drifting apart.
 * Behaviour is unchanged: same disposable-domain set, same blocked words, same
 * NANP structural checks.
 */

const DISPOSABLE_DOMAINS = new Set(["mailinator.com","guerrillamail.com","tempmail.com","throwaway.email","yopmail.com","sharklasers.com","guerrillamail.info","grr.la","guerrillamail.biz","guerrillamail.de","guerrillamail.net","guerrillamail.org","spam4.me","trashmail.com","trashmail.me","trashmail.net","mytemp.email","mohmal.com","tempail.com","dispostable.com","maildrop.cc","10minutemail.com","temp-mail.org","fakeinbox.com","mailnesia.com","getnada.com","emailondeck.com","33mail.com","harakirimail.com","jetable.org","meltmail.com","mailcatch.com","tempinbox.com","spamgourmet.com","mailexpire.com","incognitomail.org","getairmail.com","mailnull.com","safeemail.xyz","tempmailo.com","burnermail.io"])

const BLOCKED_WORDS = new Set(["fuck","shit","ass","damn","bitch","bastard","dick","cock","pussy","cunt","whore","slut","fag","nigger","nigga","retard","penis","vagina","anus","dildo","porn","xxx","viagra","cialis","casino","bitcoin","crypto","forex","mlm","scam","spam","test123","asdf","qwerty","aaaaaa","zzzzzz","abcdef","123456"])

// Format phone as (XXX) XXX-XXXX
export function formatPhoneNumber(value: string): string {
  let digits = value.replace(/\D/g, "")
  if (digits.startsWith("1")) digits = digits.slice(1)
  if (digits.length > 10) digits = digits.slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

// Validate US phone number
export function validatePhone(phone: string): { valid: boolean; msg: string } {
  const digits = phone.replace(/\D/g, "").replace(/^1/, "")
  if (digits.length !== 10) return { valid: false, msg: "Please enter a valid 10-digit US phone number." }
  const area = digits.slice(0, 3)
  // NANP structural rules: area code can't start with 0 or 1
  if (area[0] === "0" || area[0] === "1") return { valid: false, msg: `Area code (${area}) doesn't appear to be valid.` }
  if (/^(\d)\1{9}$/.test(digits)) return { valid: false, msg: "Please enter a real phone number." }
  if (["1234567890", "0123456789", "9876543210"].includes(digits)) return { valid: false, msg: "Please enter a real phone number." }
  const exchange = digits.slice(3, 6)
  if (exchange === "555") return { valid: false, msg: "Please enter a real phone number, not a 555 number." }
  if (exchange.startsWith("0") || exchange.startsWith("1")) return { valid: false, msg: "That doesn't look like a valid phone number." }
  return { valid: true, msg: "" }
}

export function validateEmail(email: string): { valid: boolean; msg: string } {
  if (!email || email.trim() === "") return { valid: false, msg: "Email is required." }
  const e = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { valid: false, msg: "Please enter a valid email address." }
  const domain = e.split("@")[1]
  if (DISPOSABLE_DOMAINS.has(domain)) return { valid: false, msg: "Please use a real email address, not a temporary one." }
  const fakePatterns = ["test@test", "fake@fake", "asdf@asdf", "noemail@", "spam@", "junk@", "nobody@nobody", "aaa@aaa", "abc@abc", "example@example"]
  for (const pattern of fakePatterns) {
    if (e.startsWith(pattern)) return { valid: false, msg: "Please enter your real email address." }
  }
  const emailParts = e.replace("@", " ").replace(/\./g, " ").split(/\s+/)
  for (const part of emailParts) {
    if (BLOCKED_WORDS.has(part)) return { valid: false, msg: "Please enter a valid email address." }
  }
  const localPart = e.split("@")[0]
  const domainName = domain.split(".")[0]
  for (const word of BLOCKED_WORDS) {
    if (word.length >= 4 && (localPart.includes(word) || domainName.includes(word))) {
      return { valid: false, msg: "Please enter a valid email address." }
    }
  }
  return { valid: true, msg: "" }
}

/** Digits only, US country code stripped. */
export function phoneDigits(v: string): string {
  return v.replace(/\D/g, "").replace(/^1/, "")
}
