export interface ConfigOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  color?: string;
  disabled?: boolean;
  disabledReason?: string;
}

export interface ConfigState {
  model: ConfigOption | null;
  engine: ConfigOption | null;
  transmission: ConfigOption | null;
  trim: ConfigOption | null;
  exteriorColor: ConfigOption | null;
  interiorColor: ConfigOption | null;
  wheels: ConfigOption | null;
  packages: ConfigOption[];
}

export const initialConfig: ConfigState = {
  model: null,
  engine: null,
  transmission: null,
  trim: null,
  exteriorColor: null,
  interiorColor: null,
  wheels: null,
  packages: [],
};

export const models: ConfigOption[] = [
  { id: "sedan", name: "ECP Sedan", description: "Elegant performance meets refined luxury", price: 45000 },
  { id: "suv", name: "ECP SUV", description: "Commanding presence with versatile capability", price: 55000 },
  { id: "coupe", name: "ECP Coupé", description: "Pure driving exhilaration in a sleek form", price: 52000 },
  { id: "sport", name: "ECP Sport", description: "Track-inspired performance for the road", price: 68000 },
];

export const engines: ConfigOption[] = [
  { id: "i4-turbo", name: "2.0L Turbo I4", description: "245 HP • 0-60 in 5.8s", price: 0 },
  { id: "v6", name: "3.0L Twin-Turbo V6", description: "380 HP • 0-60 in 4.2s", price: 8500 },
  { id: "v8", name: "5.0L V8", description: "460 HP • 0-60 in 3.8s", price: 15000 },
  { id: "electric", name: "Dual Motor Electric", description: "402 HP • 0-60 in 3.5s • 320mi range", price: 12000 },
];

export const transmissions: ConfigOption[] = [
  { id: "auto-8", name: "8-Speed Automatic", description: "Smooth, responsive shifting", price: 0 },
  { id: "auto-10", name: "10-Speed Automatic", description: "Enhanced fuel efficiency", price: 2500 },
  { id: "manual-6", name: "6-Speed Manual", description: "Pure driving engagement", price: -500 },
  { id: "dct", name: "7-Speed Dual-Clutch", description: "Lightning-fast gear changes", price: 4000 },
];

export const trims: ConfigOption[] = [
  { id: "base", name: "Essentials", description: "Premium standard features", price: 0 },
  { id: "premium", name: "Premium", description: "Enhanced comfort & technology", price: 6500 },
  { id: "sport", name: "Sport", description: "Performance-focused upgrades", price: 9000 },
  { id: "luxury", name: "Luxury", description: "Ultimate refinement", price: 14000 },
];

export const exteriorColors: ConfigOption[] = [
  { id: "obsidian", name: "Obsidian Black", price: 0, color: "#0a0a0a" },
  { id: "glacier", name: "Glacier White", price: 800, color: "#f0f0f0" },
  { id: "midnight-blue", name: "Midnight Blue", price: 1200, color: "#1a2744" },
  { id: "crimson", name: "Crimson Red", price: 1500, color: "#8b1a1a" },
  { id: "titanium", name: "Titanium Silver", price: 1000, color: "#8a8d8f" },
  { id: "forest", name: "British Racing Green", price: 1800, color: "#1a3c2a" },
];

export const interiorColors: ConfigOption[] = [
  { id: "ebony", name: "Ebony Black", price: 0, color: "#1a1a1a" },
  { id: "cream", name: "Ivory Cream", price: 1500, color: "#f5f0e8" },
  { id: "cognac", name: "Cognac Brown", price: 1800, color: "#6b3a2a" },
  { id: "red", name: "Crimson Red", price: 2200, color: "#6b1a1a" },
];

export const wheels: ConfigOption[] = [
  { id: "18-alloy", name: '18" Alloy', description: "Classic design", price: 0 },
  { id: "19-sport", name: '19" Sport', description: "Dynamic styling", price: 1500 },
  { id: "20-premium", name: '20" Premium', description: "Forged aluminum", price: 3000 },
  { id: "21-performance", name: '21" Performance', description: "Track-ready lightweight", price: 4500 },
];

export const packages: ConfigOption[] = [
  { id: "tech", name: "Technology Package", description: "Head-up display, surround cameras, premium audio", price: 4500 },
  { id: "winter", name: "Winter Package", description: "Heated seats, heated steering, all-weather mats", price: 2800 },
  { id: "safety", name: "Safety Package", description: "Adaptive cruise, lane keep, blind spot monitoring", price: 3500 },
  { id: "tow", name: "Tow Package", description: "Tow hitch, trailer sway control, heavy-duty cooling", price: 1800 },
];

export const STEPS = [
  { id: "model", label: "Model", icon: "Car" },
  { id: "engine", label: "Engine", icon: "Zap" },
  { id: "transmission", label: "Transmission", icon: "Settings" },
  { id: "trim", label: "Trim", icon: "Layers" },
  { id: "exterior", label: "Exterior", icon: "Palette" },
  { id: "interior", label: "Interior", icon: "Armchair" },
  { id: "wheels", label: "Wheels", icon: "Circle" },
  { id: "packages", label: "Packages", icon: "Package" },
  { id: "review", label: "Review", icon: "CheckCircle" },
] as const;

export function calculateTotal(config: ConfigState): number {
  let total = 0;
  if (config.model) total += config.model.price;
  if (config.engine) total += config.engine.price;
  if (config.transmission) total += config.transmission.price;
  if (config.trim) total += config.trim.price;
  if (config.exteriorColor) total += config.exteriorColor.price;
  if (config.interiorColor) total += config.interiorColor.price;
  if (config.wheels) total += config.wheels.price;
  config.packages.forEach((p) => (total += p.price));
  return total;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

export function getApplicableRules(config: ConfigState) {
  const disabledEngines: string[] = [];
  const disabledTransmissions: string[] = [];
  const disabledPackages: string[] = [];

  if (config.model?.id === "sedan") disabledEngines.push("v8");

  if (config.engine?.id === "electric") {
    disabledTransmissions.push("manual-6", "dct");
  }

  if (config.engine?.id === "electric") {
    disabledPackages.push("tow");
  }

  return { disabledEngines, disabledTransmissions, disabledPackages };
}
