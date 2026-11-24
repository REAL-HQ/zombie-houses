/**
 * US phone helpers. Inputs show "(813) 476-8508" as the user types; the database stores
 * the plain 10 digits ("8134768508"), the same format leads already use.
 */

/** Digits only, a leading +1 / 1 country code dropped (US area codes never start with 1), max 10. */
export function phoneDigits(value: string | null | undefined): string {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.startsWith("1")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/** Progressive "(813) 476-8508" format. Never ends in a separator, so backspace always removes a digit. */
export function formatPhone(value: string | null | undefined): string {
  const d = phoneDigits(value);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * Next formatted value for an onChange event. Handles typing, paste & backspace. When the user
 * deletes only a separator (digits unchanged but text shorter), the digit before the cursor goes too.
 */
export function nextPhoneValue(previous: string, raw: string, cursor?: number | null): string {
  if (raw.length < previous.length && phoneDigits(raw) === phoneDigits(previous) && raw.replace(/\D/g, "").length > 0) {
    const position = cursor ?? raw.length;
    const digitsBefore = raw.slice(0, position).replace(/\D/g, "").length;
    const digits = raw.replace(/\D/g, "");
    if (digitsBefore > 0) return formatPhone(digits.slice(0, digitsBefore - 1) + digits.slice(digitsBefore));
  }
  return formatPhone(raw);
}

/** onChange for uncontrolled phone inputs (FormData forms): formats the field in place. */
export function formatPhoneInPlace(event: { currentTarget: HTMLInputElement }) {
  const input = event.currentTarget;
  const previous = input.dataset.phonePrev ?? "";
  const next = nextPhoneValue(previous, input.value, input.selectionStart);
  input.value = next;
  input.dataset.phonePrev = next;
}

/** True when the value holds a full 10-digit US number. */
export function isValidPhone(value: string | null | undefined): boolean {
  return phoneDigits(value).length === 10;
}

/** Display a stored number as (813) 476-8508; anything that isn't 10 digits is shown as stored. */
export function displayPhone(value: string | null | undefined): string {
  return isValidPhone(value) ? formatPhone(value) : String(value ?? "");
}

/** tel: link target, +1 E.164 when the number is complete. */
export function phoneHref(value: string | null | undefined): string {
  return isValidPhone(value) ? `tel:+1${phoneDigits(value)}` : `tel:${String(value ?? "").replace(/[^\d+]/g, "")}`;
}
