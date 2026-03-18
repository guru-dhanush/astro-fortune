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

const MOVABLE_KARANAS = ["Bava", "Balava", "Kaulava", "Taitila", "Garija", "Vanija", "Vishti"];
const FIXED_KARANAS_END = ["Shakuni", "Chatushpada", "Naga"];

const HINDU_MONTHS = [
  "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha",
  "Shravana", "Bhadrapada", "Ashwin", "Kartika",
  "Margashirsha", "Pausha", "Magha", "Phalguna",
];

const VARA_NAMES = [
  "Ravivara", "Somvara", "Mangalavara", "Budhavara",
  "Guruvara", "Shukravara", "Shanivara",
];

const SIXTY_YEAR_CYCLE = [
  "Prabhava", "Vibhava", "Shukla", "Pramoda", "Prajapati",
  "Angirasa", "Shrimukha", "Bhava", "Yuvan", "Dhata",
  "Ishvara", "Bahudhanya", "Pramathi", "Vikrama", "Vrusha",
  "Chitrabhanu", "Subhanu", "Tarana", "Parthiva", "Vyaya",
  "Sarvajit", "Sarvadhari", "Virodhi", "Vikruta", "Khara",
  "Nandana", "Vijaya", "Jaya", "Manmatha", "Durmukhi",
  "Hevilambi", "Vilambi", "Vikari", "Sharvari", "Plava",
  "Shubhakrut", "Shobhana", "Krodhi", "Vishvavasu", "Parabhava",
  "Plavanga", "Keelaka", "Saumya", "Sadharana", "Virodhikrut",
  "Paridhaavi", "Pramaadeecha", "Aananda", "Rakshasa", "Nala",
  "Pingala", "Kalayukti", "Siddharthi", "Raudra", "Durmathi",
  "Dundubhi", "Rudhirodgari", "Raktakshi", "Krodhana", "Akshaya",
];

function julianDay(year: number, month: number, day: number): number {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function toRad(deg: number) { return deg * Math.PI / 180; }
function toDeg(rad: number) { return rad * 180 / Math.PI; }
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

function sunriseSunset(year: number, month: number, day: number, lat: number, lonDeg: number): { sunrise: string; sunset: string } {
  const jdNoon = julianDay(year, month, day) + 0.5;
  const n = jdNoon - 2451545.0 + 0.0008;
  const Jstar = n - lonDeg / 360;
  const M = norm360(357.5291 + 0.98560028 * Jstar);
  const Mrad = toRad(M);
  const C = 1.9148 * Math.sin(Mrad) + 0.02 * Math.sin(2 * Mrad) + 0.0003 * Math.sin(3 * Mrad);
  const lam = norm360(M + C + 180 + 102.9372);
  const lamRad = toRad(lam);
  const Jtransit = 2451545.0 + Jstar + 0.0053 * Math.sin(Mrad) - 0.0069 * Math.sin(2 * lamRad);
  const decl = Math.asin(Math.sin(lamRad) * Math.sin(toRad(23.4397)));
  const cosOmega = (Math.sin(toRad(-0.833)) - Math.sin(toRad(lat)) * Math.sin(decl)) /
    (Math.cos(toRad(lat)) * Math.cos(decl));

  function jdToIST(j: number): string {
    const hoursUTC = ((j + 0.5) % 1) * 24;
    const hoursIST = (hoursUTC + 5.5) % 24;
    const h = Math.floor(hoursIST);
    const m = Math.round((hoursIST - h) * 60);
    const mClamped = m >= 60 ? 59 : m;
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${mClamped.toString().padStart(2, "0")} ${ampm}`;
  }

  if (cosOmega < -1 || cosOmega > 1) {
    return { sunrise: "N/A", sunset: "N/A" };
  }
  const omega0 = toDeg(Math.acos(cosOmega));
  const Jrise = Jtransit - omega0 / 360;
  const Jset  = Jtransit + omega0 / 360;
  return {
    sunrise: jdToIST(Jrise),
    sunset:  jdToIST(Jset),
  };
}

export interface PanchangResult {
  tithi: string;
  paksha: "Shukla" | "Krishna";
  nakshatra: string;
  yoga: string;
  tithiNum: number;
}

export interface FullPanchangResult {
  dateStr: string;
  vara: string;
  tithi: string;
  paksha: "Shukla" | "Krishna";
  nakshatra: string;
  yoga: string;
  karana: string;
  amantaMonth: string;
  purnimantaMonth: string;
  vikramYear: number;
  vikramCycle: string;
  shakaYear: number;
  shakaCycle: string;
  sunrise: string;
  sunset: string;
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

export function getFullPanchang(date: Date): FullPanchangResult {
  const year  = date.getFullYear();
  const month = date.getMonth() + 1;
  const day   = date.getDate();

  const jd = julianDay(year, month, day) + (6.5 / 24);
  const ayanamsa = lahiriAyanamsa(jd);

  const sunTropical  = sunLongitude(jd);
  const moonTropical = moonLongitude(jd);
  const sunLon  = norm360(sunTropical  - ayanamsa);
  const moonLon = norm360(moonTropical - ayanamsa);

  const elongation  = norm360(moonLon - sunLon);
  const tithiIndex  = Math.floor(elongation / 12);
  const paksha: "Shukla" | "Krishna" = tithiIndex < 15 ? "Shukla" : "Krishna";
  const tithi    = TITHI_NAMES[tithiIndex] ?? "Pratipada";

  const nakshatraIndex = Math.floor(moonLon / (360 / 27));
  const nakshatra = NAKSHATRAS[nakshatraIndex % 27];

  const yogaIndex = Math.floor(norm360(sunLon + moonLon) / (360 / 27));
  const yoga = YOGAS[yogaIndex % 27];

  const karanaIdx = Math.floor(elongation / 6);
  let karana: string;
  if (karanaIdx === 0) karana = "Kinstughna";
  else if (karanaIdx >= 57) karana = FIXED_KARANAS_END[karanaIdx - 57] ?? "Naga";
  else karana = MOVABLE_KARANAS[(karanaIdx - 1) % 7];

  const vara = VARA_NAMES[date.getDay()];

  const sunSign = Math.floor(sunLon / 30);
  const amantaMonth = HINDU_MONTHS[sunSign % 12];
  const purnimantaMonth = paksha === "Krishna"
    ? HINDU_MONTHS[(sunSign + 1) % 12]
    : amantaMonth;

  const vikramYear = month <= 3 ? year + 56 : year + 57;
  const shakaYear  = month <= 3 ? year - 79 : year - 78;

  const vikramCycle = SIXTY_YEAR_CYCLE[(vikramYear + 9) % 60];
  const shakaCycle  = SIXTY_YEAR_CYCLE[(shakaYear  + 11) % 60];

  const { sunrise, sunset } = sunriseSunset(year, month, day, 28.6, 77.2);

  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dateStr = `${DAY_NAMES[date.getDay()]}, ${day} ${MONTH_NAMES[date.getMonth()]} ${year}`;

  return {
    dateStr,
    vara,
    tithi,
    paksha,
    nakshatra,
    yoga,
    karana,
    amantaMonth,
    purnimantaMonth,
    vikramYear,
    vikramCycle,
    shakaYear,
    shakaCycle,
    sunrise,
    sunset,
  };
}
