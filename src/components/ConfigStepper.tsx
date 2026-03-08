import { STEPS } from "@/lib/configuratorData";
import { motion } from "framer-motion";
import { Car, Zap, Settings, Layers, Palette, Armchair, Circle, Package, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Car, Zap, Settings, Layers, Palette, Armchair, Circle, Package, CheckCircle,
};

interface ConfigStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: Set<number>;
}

export default function ConfigStepper({ currentStep, onStepClick, completedSteps }: ConfigStepperProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-1 min-w-max px-4 py-3">
        {STEPS.map((step, index) => {
          const Icon = iconMap[step.icon];
          const isActive = index === currentStep;
          const isCompleted = completedSteps.has(index);
          const isAccessible = index <= Math.max(...Array.from(completedSteps), 0) + 1;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => isAccessible && onStepClick(index)}
                disabled={!isAccessible}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm whitespace-nowrap ${
                  isActive
                    ? "bg-primary/20 text-primary step-indicator-active"
                    : isCompleted
                    ? "bg-success/10 text-success"
                    : isAccessible
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                    : "text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                <motion.div
                  initial={false}
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                </motion.div>
                <span className="hidden sm:inline font-medium">{step.label}</span>
              </button>
              {index < STEPS.length - 1 && (
                <div className={`w-6 h-px mx-1 transition-colors duration-300 ${
                  isCompleted ? "bg-success/50" : "bg-border"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
