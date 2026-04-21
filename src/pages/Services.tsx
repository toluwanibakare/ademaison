import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, LayoutGrid, Eye, Home, Building2, Briefcase, UtensilsCrossed, Sofa, Armchair, Palette, Lightbulb, Droplets, ClipboardCheck, Package, Hammer, Star, HeartHandshake } from "lucide-react";
import LayoutComponent from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";

const services = [
  {
    icon: MessageSquare,
    title: "Design Consultation",
    description: "We listen to your vision and guide you toward informed design decisions.",
  },
  {
    icon: LayoutGrid,
    title: "Space Planning",
    description: "Smart layouts that balance flow, function, and daily living.",
  },
  {
    icon: Eye,
    title: "3D Visualization",
    description: "Experience your space in realistic 3D before any work begins.",
  },
  {
    icon: Home,
    title: "Residential Design",
    description: "Warm, personalized homes tailored to your lifestyle.",
  },
  {
    icon: Building2,
    title: "Commercial Design",
    description: "Interiors that elevate your brand and impress clients.",
  },
  {
    icon: Briefcase,
    title: "Workspace Design",
    description: "Offices that foster focus, collaboration, and wellbeing.",
  },
  {
    icon: UtensilsCrossed,
    title: "Kitchen Design",
    description: "Functional, beautiful kitchens that become the heart of your home.",
  },
  {
    icon: Sofa,
    title: "Living Spaces",
    description: "Bedrooms and living rooms designed for comfort and connection.",
  },
  {
    icon: Armchair,
    title: "Custom Furniture",
    description: "Bespoke pieces crafted to your exact specifications.",
  },
  {
    icon: Palette,
    title: "Materials & Finishes",
    description: "Expert guidance on flooring, tiles, fabrics, and hardware.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Layered lighting that transforms atmosphere and function.",
  },
  {
    icon: Droplets,
    title: "Color Consultation",
    description: "Palettes that evoke the right mood and visual flow.",
  },
  {
    icon: ClipboardCheck,
    title: "Project Management",
    description: "End-to-end coordination for flawless execution.",
  },
  {
    icon: Package,
    title: "Turnkey Solutions",
    description: "Complete design-build services, ready to move in.",
  },
  {
    icon: Hammer,
    title: "Renovation",
    description: "Transform existing spaces with fresh design and purpose.",
  },
  {
    icon: Star,
    title: "Styling & Staging",
    description: "Final touches that bring personality and life to your space.",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "Maintenance guidance and future updates whenever you need.",
  },
];

const Services = () => {
  return (
    <LayoutComponent>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive interior design solutions for discerning clients who value quality, clarity, and exceptional results."
        breadcrumbs={[{ label: "Services" }]}
      />

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Full-service interior design for residential and commercial spaces.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="group relative bg-card border border-border/50 rounded-lg p-6 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-serif text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Our Design Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-subtitle mx-auto"
            >
              A thoughtful approach that ensures clarity at every stage.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We begin by understanding your vision, needs, lifestyle, and budget through in-depth consultation.",
              },
              {
                step: "02",
                title: "Concept",
                description:
                  "Our team develops creative concepts, mood boards, and 3D visualizations for your review and refinement.",
              },
              {
                step: "03",
                title: "Design",
                description:
                  "Detailed designs, material selections, and specifications are finalized with your full approval.",
              },
              {
                step: "04",
                title: "Execution",
                description:
                  "We manage the implementation, coordinating all parties to bring your space to life with precision.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-serif text-accent mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-primary-foreground mb-6"
          >
            Ready to Begin?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto"
          >
            Contact us today to discuss your project and receive a personalized consultation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn-accent">
              Request a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </LayoutComponent>
  );
};

export default Services;
