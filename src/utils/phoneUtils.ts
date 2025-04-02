import { Country, PhoneInputState } from "../types";

// Countries where the leading zero should be omitted in international format
const ZERO_OMIT_COUNTRIES = [
  "PK", // Pakistan
  "IN", // India
  "BD", // Bangladesh
  "NG", // Nigeria
  // Add more countries as needed based on research or user feedback
];

export const formatPhoneNumber = (
  value: string,
  mask: string,
  countryCode?: string // Optional country code to determine zero-omit behavior
): { phoneNumber: string; unmasked: string } => {
  let unmasked = (value.match(/\d+/g) || []).join("");
  if (!unmasked) return { phoneNumber: "", unmasked: "" };

  // Check if the country requires omitting the leading zero
  if (
    countryCode &&
    ZERO_OMIT_COUNTRIES.includes(countryCode) &&
    unmasked.startsWith("0")
  ) {
    unmasked = unmasked.slice(1); // Remove leading zero
  }

  // Apply the mask
  let phoneNumber = mask.replace(/9/g, "_");
  for (
    let i = 0;
    i < unmasked.length && i < (mask.match(/9/g)?.length || 0);
    i++
  ) {
    phoneNumber = phoneNumber.replace("_", unmasked[i]);
  }

  // Trim to the last valid number
  const numberPointer = phoneNumber
    .split("")
    .findIndex((char, idx) => char !== " " && !isNaN(+char) && idx > 0);
  phoneNumber = phoneNumber.slice(
    0,
    numberPointer >= 0 ? numberPointer + 1 : phoneNumber.length
  );

  return { phoneNumber, unmasked: (phoneNumber.match(/\d+/g) || []).join("") };
};

export const getDefaultCountry = (
  defaultCode: string,
  countries: Country[]
): Country =>
  countries.find((c) => c.code === defaultCode) ||
  countries.find((c) => c.code === "TR")!;
