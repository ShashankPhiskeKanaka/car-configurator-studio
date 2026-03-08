import { motion } from "framer-motion";
import { ConfigOption, formatPrice } from "@/lib/configuratorData";
import { Check } from "lucide-react";

interface OptionCardProps {
  option: ConfigOption;
  selected: boolean;
  onSelect: (option: ConfigOption) => void;
  disabled?: boolean;
  disabledReason?: string;
  index?: number;
}

export default function OptionCard({ option, selected, onSelect, disabled, disabledReason, index = 0 }: OptionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onClick={() => !disabled && onSelect(option)}
      disabled={disabled}
      className={`config-option text-left w-full relative group ${
        selected ? "config-option-selected" : ""
      } ${disabled ? "opacity-40 cursor-not-allowed hover:scale-100 hover:border-border" : ""}`}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-3.5 h-3.5 text-primary-foreground" />
        </motion.div>
      )}

      {option.color && (
        <div
          className="w-10 h-10 rounded-full mb-3 border-2 border-border transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: option.color }}
        />
      )}

      <h4 className="font-display font-semibold text-base mb-1">{option.name}</h4>
      {option.description && (
        <p className="text-muted-foreground text-sm mb-2">{option.description}</p>
      )}

      <span className="price-tag text-sm">
        {option.price === 0 ? "Included" : option.price > 0 ? `+${formatPrice(option.price)}` : formatPrice(option.price)}
      </span>

      {disabled && disabledReason && (
        <p className="text-destructive text-xs mt-2">{disabledReason}</p>
      )}
    </motion.button>
  );
}
