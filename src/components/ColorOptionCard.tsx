import { motion } from "framer-motion";
import { ConfigOption, formatPrice } from "@/lib/configuratorData";
import { Check } from "lucide-react";

interface ColorOptionCardProps {
  option: ConfigOption;
  selected: boolean;
  onSelect: (option: ConfigOption) => void;
  index?: number;
}

export default function ColorOptionCard({ option, selected, onSelect, index = 0 }: ColorOptionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      onClick={() => onSelect(option)}
      className="flex flex-col items-center gap-2 group"
    >
      <div className={`relative w-14 h-14 rounded-full border-2 transition-all duration-300 ${
        selected ? "border-primary scale-110 shadow-[0_0_20px_hsl(var(--primary)/0.4)]" : "border-border hover:border-muted-foreground hover:scale-105"
      }`}>
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: option.color }}
        />
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check className="w-5 h-5 text-primary-foreground drop-shadow-lg" />
          </motion.div>
        )}
      </div>
      <div className="text-center">
        <p className={`text-xs font-medium transition-colors ${selected ? "text-foreground" : "text-muted-foreground"}`}>
          {option.name}
        </p>
        <p className="text-xs text-primary">
          {option.price === 0 ? "Included" : `+${formatPrice(option.price)}`}
        </p>
      </div>
    </motion.button>
  );
}
