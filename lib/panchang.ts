const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya",
];

const YOGAS = [
  "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana",
  "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi",
  "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata",
  "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha",
  "Shukla", "Brahma", "Indra", "Vaidhriti",
];

function julianDay(year: number, month: number, day: number): number {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function toRad(deg: number) { return deg * Math.PI / 180; }
function norm360(x: number) { return ((x % 360) + 360) % 360; }

function sunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = toRad(norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T));
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);
  return norm360(L0 + C);
}

function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L1 = norm360(218.3165 + 481267.8813 * T);
  const M1 = toRad(norm360(134.9634 + 477198.8676 * T + 0.0089970 * T * T));
  const D  = toRad(norm360(297.8502 + 445267.1115 * T - 0.0018819 * T * T));
  const F  = toRad(norm360(93.2720 + 483202.0175 * T - 0.0034029 * T * T));
  const Ms = toRad(norm360(357.5291 + 35999.0503 * T));

  const correction =
    6.2886 * Math.sin(M1) +
    1.2740 * Math.sin(2 * D - M1) +
    0.6583 * Math.sin(2 * D) +
    0.2136 * Math.sin(2 * M1) -
    0.1851 * Math.sin(Ms) -
    0.1143 * Math.sin(2 * F) +
    0.0588 * Math.sin(2 * D - 2 * M1) +
    0.0572 * Math.sin(2 * D - Ms - M1) +
    0.0533 * Math.sin(2 * D + M1) +
    0.0459 * Math.sin(2 * D - Ms) +
    0.0410 * Math.sin(M1 - F) -
    0.0348 * Math.sin(D);

  return norm360(L1 + correction);
}

function lahiriAyanamsa(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return 23.85 + 0.01360 * T;
}

export interface PanchangResult {
  tithi: string;
  paksha: "Shukla" | "Krishna";
  nakshatra: string;
  yoga: string;
  tithiNum: number;
}

export function getPanchang(year: number, month: number, day: number): PanchangResult {
  const jd = julianDay(year, month, day) + (6.5 / 24);
  const ayanamsa = lahiriAyanamsa(jd);

  const sunLon  = norm360(sunLongitude(jd)  - ayanamsa);
  const moonLon = norm360(moonLongitude(jd) - ayanamsa);

  const elongation = norm360(moonLon - sunLon);
  const tithiIndex = Math.floor(elongation / 12);

  const paksha: "Shukla" | "Krishna" = tithiIndex < 15 ? "Shukla" : "Krishna";
  const tithi = TITHI_NAMES[tithiIndex] ?? "Pratipada";

  const nakshatraIndex = Math.floor(moonLon / (360 / 27));
  const nakshatra = NAKSHATRAS[nakshatraIndex % 27];

  const yogaIndex = Math.floor(norm360(sunLon + moonLon) / (360 / 27));
  const yoga = YOGAS[yogaIndex % 27];

  return { tithi, paksha, nakshatra, yoga, tithiNum: tithiIndex + 1 };
}
