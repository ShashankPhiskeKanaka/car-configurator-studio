import { motion, AnimatePresence } from "framer-motion";
import { ConfigState, calculateTotal, formatPrice } from "@/lib/configuratorData";

interface PriceSummaryProps {
  config: ConfigState;
}

export default function PriceSummary({ config }: PriceSummaryProps) {
  const total = calculateTotal(config);

  const items = [
    { label: "Model", value: config.model },
    { label: "Engine", value: config.engine },
    { label: "Transmission", value: config.transmission },
    { label: "Trim", value: config.trim },
    { label: "Exterior", value: config.exteriorColor },
    { label: "Interior", value: config.interiorColor },
    { label: "Wheels", value: config.wheels },
  ].filter((item) => item.value);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-5 sticky top-4"
    >
      <h3 className="font-display text-lg font-semibold mb-4">Your Configuration</h3>
      <div className="space-y-2 mb-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between text-sm"
            >
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">
                {item.value!.name}
                {item.value!.price > 0 && (
                  <span className="text-primary ml-2">+{formatPrice(item.value!.price)}</span>
                )}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {config.packages.length > 0 && (
          <>
            <div className="section-divider my-3" />
            {config.packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between text-sm"
              >
                <span className="text-muted-foreground">{pkg.name}</span>
                <span className="text-primary font-medium">+{formatPrice(pkg.price)}</span>
              </motion.div>
            ))}
          </>
        )}
      </div>

      <div className="section-divider mb-4" />

      <div className="flex justify-between items-baseline">
        <span className="text-muted-foreground text-sm">Estimated Total</span>
        <motion.span
          key={total}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-2xl font-display font-bold gradient-text"
        >
          {formatPrice(total)}
        </motion.span>
      </div>
    </motion.div>
  );
}
