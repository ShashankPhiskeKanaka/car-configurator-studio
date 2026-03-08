import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Shield, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-display font-bold text-lg">ECP</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <span className="hover:text-foreground transition-colors cursor-pointer">Models</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Technology</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">About</span>
        </div>
        <Button
          onClick={() => navigate("/configure")}
          variant="outline"
          className="text-sm border-primary/30 text-primary hover:bg-primary/10"
        >
          Configure Now
        </Button>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              Enterprise Car Configuration Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            Build Your
            <br />
            <span className="gradient-text">Dream Car</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Configure every detail with real-time validation, intelligent rules,
            and an interactive 3D experience. From engine to interior — make it yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={() => navigate("/configure")}
              className="gradient-primary text-primary-foreground px-8 h-12 text-base font-semibold group"
            >
              Start Configuring
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="px-8 h-12 text-base border-border hover:bg-muted"
            >
              Explore Models
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-float" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Grade Configuration
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powered by intelligent rules, real-time pricing, and manufacturing validation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Real-Time Validation",
                desc: "Every selection validated against thousands of rules in under 100ms.",
              },
              {
                icon: Shield,
                title: "Compliance Built-In",
                desc: "Market-specific regulations and dealer constraints enforced automatically.",
              },
              {
                icon: Globe,
                title: "Multi-Region Support",
                desc: "50,000+ SKUs per model with region-specific pricing and availability.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass-card-hover p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass-card p-12 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 relative">
            Ready to Configure?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto relative">
            Start building your perfect vehicle with our intelligent configurator.
          </p>
          <Button
            onClick={() => navigate("/configure")}
            className="gradient-primary text-primary-foreground px-10 h-12 text-base font-semibold relative group"
          >
            Launch Configurator
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">E</span>
            </div>
            <span>Enterprise Car Configuration Platform</span>
          </div>
          <span>© 2026 ECP. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
