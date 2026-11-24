import { expect, test } from "bun:test";
import { displayPhone, formatPhone, isValidPhone, nextPhoneValue, phoneDigits, phoneHref } from "../src/lib/phone";
import { serviceContactSchema } from "../src/lib/service-lead";

test("typing progressively formats the example US phone number", () => {
  let value = "";
  for (const digit of "8134768508") value = nextPhoneValue(value, value + digit);
  expect(value).toBe("(813) 476-8508");
  expect(formatPhone("813")).toBe("(813");
  expect(formatPhone("813476")).toBe("(813) 476");
});
test("pasting drops a leading +1 or 1 country code", () => {
  expect(nextPhoneValue("", "+1 (813) 476-8508")).toBe("(813) 476-8508");
  expect(phoneDigits("18134768508")).toBe("8134768508");
});
test("phone digits are capped at ten", () => {
  expect(phoneDigits("813476850899")).toBe("8134768508");
});
test("backspace removes a digit even when deleting a separator", () => {
  expect(nextPhoneValue("(813) 476-8508", "(813) 476-850")).toBe("(813) 476-850");
  expect(nextPhoneValue("(813) 476-8508", "(813) 4768508", 9)).toBe("(813) 478-508");
});
test("contact schema outputs plain ten digits", () => {
  expect(serviceContactSchema.parse({ name: "Example", phone: "(813) 476-8508", email: "" }).phone).toBe("8134768508");
});
test("incomplete phone numbers are invalid", () => {
  expect(isValidPhone("813476850")).toBe(false);
  expect(serviceContactSchema.safeParse({ name: "Example", phone: "813476850", email: "" }).success).toBe(false);
});
test("lead displays format complete numbers and preserve incomplete values", () => {
  expect(displayPhone("8134768508")).toBe("(813) 476-8508");
  expect(displayPhone("813-476")).toBe("813-476");
});
test("complete telephone links use +1 E.164", () => {
  expect(phoneHref("8134768508")).toBe("tel:+18134768508");
});