const COUNTRY_CODES: Record<string, string> = {
  // Asia
  "South Korea": "KR",
  "Korea": "KR",
  "Japan": "JP",
  "China": "CN",
  "Taiwan": "TW",
  "India": "IN",
  "Thailand": "TH",
  "Singapore": "SG",
  "Vietnam": "VN",
  "Malaysia": "MY",
  // Europe
  "Germany": "DE",
  "France": "FR",
  "Switzerland": "CH",
  "Italy": "IT",
  "Spain": "ES",
  "United Kingdom": "GB",
  "UK": "GB",
  "Netherlands": "NL",
  "Sweden": "SE",
  "Finland": "FI",
  "Denmark": "DK",
  "Norway": "NO",
  "Poland": "PL",
  "Czech Republic": "CZ",
  "Austria": "AT",
  "Belgium": "BE",
  "Hungary": "HU",
  "Russia": "RU",
  // Americas
  "United States": "US",
  "USA": "US",
  "Canada": "CA",
  "Mexico": "MX",
  "Brazil": "BR",
  // Others
  "Australia": "AU",
  "New Zealand": "NZ",
  "South Africa": "ZA",
  "Israel": "IL",
};

function codeToFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 0x1f1a5))
    .join("");
}

export function countryFlag(name: string): string {
  const code = COUNTRY_CODES[name];
  return code ? codeToFlag(code) : "";
}
