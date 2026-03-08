import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfigStepper from "@/components/ConfigStepper";
import PriceSummary from "@/components/PriceSummary";
import OptionCard from "@/components/OptionCard";
import ColorOptionCard from "@/components/ColorOptionCard";
import StepLayout from "@/components/StepLayout";
import ReviewStep from "@/components/ReviewStep";
import CarModel3D from "@/components/CarModel3D";
import {
  ConfigState,
  ConfigOption,
  initialConfig,
  models,
  engines,
  transmissions,
  trims,
  exteriorColors,
  interiorColors,
  wheels,
  packages,
  getApplicableRules,
  STEPS,
} from "@/lib/configuratorData";

export default function Configurator() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<ConfigState>(initialConfig);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const rules = getApplicableRules(config);

  const updateConfig = useCallback((key: keyof ConfigState, value: ConfigOption | ConfigOption[] | null) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const togglePackage = useCallback((pkg: ConfigOption) => {
    setConfig((prev) => {
      const exists = prev.packages.find((p) => p.id === pkg.id);
      return {
        ...prev,
        packages: exists
          ? prev.packages.filter((p) => p.id !== pkg.id)
          : [...prev.packages, pkg],
      };
    });
  }, []);

  const goNext = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!config.model;
      case 1: return !!config.engine;
      case 2: return !!config.transmission;
      case 3: return !!config.trim;
      case 4: return !!config.exteriorColor;
      case 5: return !!config.interiorColor;
      case 6: return !!config.wheels;
      case 7: return true;
      default: return true;
    }
  };

  const resetConfig = () => {
    setConfig(initialConfig);
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const carColor = config.exteriorColor?.color || "#1a2744";
  const modelType = config.model?.id || "sedan";

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepLayout title="Select Your Model" subtitle="Choose the foundation of your vehicle">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {models.map((m, i) => (
                <OptionCard
                  key={m.id}
                  option={m}
                  selected={config.model?.id === m.id}
                  onSelect={() => updateConfig("model", m)}
                  index={i}
                />
              ))}
            </div>
          </StepLayout>
        );
      case 1:
        return (
          <StepLayout title="Choose Your Engine" subtitle="Select the powertrain that suits your driving style">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {engines.map((e, i) => (
                <OptionCard
                  key={e.id}
                  option={e}
                  selected={config.engine?.id === e.id}
                  onSelect={() => updateConfig("engine", e)}
                  disabled={rules.disabledEngines.includes(e.id)}
                  disabledReason="Not available for this model"
                  index={i}
                />
              ))}
            </div>
          </StepLayout>
        );
      case 2:
        return (
          <StepLayout title="Select Transmission" subtitle="Match your engine with the perfect gearbox">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {transmissions.map((t, i) => (
                <OptionCard
                  key={t.id}
                  option={t}
                  selected={config.transmission?.id === t.id}
                  onSelect={() => updateConfig("transmission", t)}
                  disabled={rules.disabledTransmissions.includes(t.id)}
                  disabledReason="Not compatible with selected engine"
                  index={i}
                />
              ))}
            </div>
          </StepLayout>
        );
      case 3:
        return (
          <StepLayout title="Choose Your Trim" subtitle="Define the character of your vehicle">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trims.map((t, i) => (
                <OptionCard
                  key={t.id}
                  option={t}
                  selected={config.trim?.id === t.id}
                  onSelect={() => updateConfig("trim", t)}
                  index={i}
                />
              ))}
            </div>
          </StepLayout>
        );
      case 4:
        return (
          <StepLayout title="Exterior Color" subtitle="Choose a color that expresses your style">
            <div className="flex flex-wrap gap-6 justify-center py-4">
              {exteriorColors.map((c, i) => (
                <ColorOptionCard
                  key={c.id}
                  option={c}
                  selected={config.exteriorColor?.id === c.id}
                  onSelect={() => updateConfig("exteriorColor", c)}
                  index={i}
                />
              ))}
            </div>
          </StepLayout>
        );
      case 5:
        return (
          <StepLayout title="Interior Color" subtitle="Select the interior ambiance">
            <div className="flex flex-wrap gap-6 justify-center py-4">
              {interiorColors.map((c, i) => (
                <ColorOptionCard
                  key={c.id}
                  option={c}
                  selected={config.interiorColor?.id === c.id}
                  onSelect={() => updateConfig("interiorColor", c)}
                  index={i}
                />
              ))}
            </div>
          </StepLayout>
        );
      case 6:
        return (
          <StepLayout title="Select Wheels" subtitle="Complete the look with the perfect wheels">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wheels.map((w, i) => (
                <OptionCard
                  key={w.id}
                  option={w}
                  selected={config.wheels?.id === w.id}
                  onSelect={() => updateConfig("wheels", w)}
                  index={i}
                />
              ))}
            </div>
          </StepLayout>
        );
      case 7:
        return (
          <StepLayout title="Add Packages" subtitle="Enhance your vehicle with optional packages">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {packages.map((p, i) => (
                <OptionCard
                  key={p.id}
                  option={p}
                  selected={config.packages.some((cp) => cp.id === p.id)}
                  onSelect={() => togglePackage(p)}
                  disabled={rules.disabledPackages.includes(p.id)}
                  disabledReason="Not compatible with selected engine"
                  index={i}
                />
              ))}
            </div>
          </StepLayout>
        );
      case 8:
        return <ReviewStep config={config} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">E</span>
            </div>
            <span className="font-display font-bold">ECP Configurator</span>
          </div>

          <button
            onClick={resetConfig}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        <ConfigStepper
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          completedSteps={completedSteps}
        />
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* 3D Viewer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:w-1/2 h-[300px] lg:h-auto lg:sticky lg:top-32 relative"
        >
          <CarModel3D color={carColor} modelType={modelType} />
          <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/60">
            Drag to rotate • Scroll to zoom
          </div>
        </motion.div>

        {/* Configuration Panel */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep}>
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="border-t border-border p-4 md:p-6 flex items-center justify-between bg-background/80 backdrop-blur-xl">
            <Button
              onClick={goPrev}
              variant="outline"
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < STEPS.length - 1 && (
              <Button
                onClick={goNext}
                disabled={!canProceed()}
                className="gradient-primary text-primary-foreground gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Price Summary - Mobile */}
          <div className="lg:hidden border-t border-border">
            <PriceSummary config={config} />
          </div>
        </div>

        {/* Desktop Price Summary */}
        <div className="hidden lg:block w-72 xl:w-80 p-4 border-l border-border">
          <PriceSummary config={config} />
        </div>
      </div>
    </div>
  );
}
