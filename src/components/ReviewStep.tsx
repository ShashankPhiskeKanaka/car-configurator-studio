import { motion } from "framer-motion";
import { ConfigState, calculateTotal, formatPrice } from "@/lib/configuratorData";
import { Check, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewStepProps {
  config: ConfigState;
}

export default function ReviewStep({ config }: ReviewStepProps) {
  const total = calculateTotal(config);

  const sections = [
    { label: "Model", value: config.model },
    { label: "Engine", value: config.engine },
    { label: "Transmission", value: config.transmission },
    { label: "Trim", value: config.trim },
    { label: "Exterior Color", value: config.exteriorColor },
    { label: "Interior Color", value: config.interiorColor },
    { label: "Wheels", value: config.wheels },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Review Your Configuration</h2>
        <p className="text-muted-foreground mt-1">Confirm your selections before proceeding</p>
      </div>

      <div className="grid gap-3">
        {sections.map((section, i) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{section.label}</p>
                <p className="font-medium">{section.value?.name || "—"}</p>
              </div>
            </div>
            {section.value && section.value.price > 0 && (
              <span className="price-tag">{formatPrice(section.value.price)}</span>
            )}
            {section.value?.color && (
              <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: section.value.color }} />
            )}
          </motion.div>
        ))}

        {config.packages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sections.length * 0.06 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Packages</p>
              </div>
            </div>
            <div className="space-y-2 pl-11">
              {config.packages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between text-sm">
                  <span>{pkg.name}</span>
                  <span className="price-tag">{formatPrice(pkg.price)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex justify-between items-baseline mb-6">
          <span className="text-lg text-muted-foreground">Total Price</span>
          <span className="text-3xl font-display font-bold gradient-text">{formatPrice(total)}</span>
        </div>
        <div className="flex gap-3">
          <Button className="flex-1 gradient-primary text-primary-foreground h-12 text-base font-semibold">
            Request Quote
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Download className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
