import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Layout, Palette, Sofa, ClipboardList } from "lucide-react";
import LayoutComponent from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";

const services = [
  {
    icon: Home,
    title: "Residential Interior Design",
    description:
      "Transform your house into a home that reflects your personality and lifestyle. We create warm, inviting spaces that balance aesthetics with comfort, from cozy apartments to sprawling estates.",
    features: [
      "Complete home design",
      "Room-by-room makeovers",
      "Custom furniture selection",
      "Lighting design",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Interior Design",
    description:
      "Create workspaces that inspire productivity and impress clients. Our commercial designs blend functionality with brand identity to create environments where businesses thrive.",
    features: [
      "Office design",
      "Retail spaces",
      "Hospitality interiors",
      "Corporate branding integration",
    ],
  },
  {
    icon: Layout,
    title: "Space Planning",
    description:
      "Maximize the potential of every square foot. Our strategic space planning ensures optimal flow, functionality, and comfort while making the most of available space.",
    features: [
      "Layout optimization",
      "Traffic flow analysis",
      "Furniture arrangement",
      "Storage solutions",
    ],
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description:
      "Discover the perfect palette for your space. Our color experts help you choose hues that set the right mood, complement your furnishings, and create visual harmony.",
    features: [
      "Color psychology expertise",
      "Paint selection",
      "Material coordination",
      "Accent color strategies",
    ],
  },
  {
    icon: Sofa,
    title: "Furniture & Decor Selection",
    description:
      "Curate the perfect pieces for your space. We source furniture, artwork, and accessories that align with your design vision and budget, creating cohesive interiors.",
    features: [
      "Furniture sourcing",
      "Art curation",
      "Accessory selection",
      "Custom furniture design",
    ],
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    description:
      "Enjoy a stress-free design experience. We coordinate all aspects of your project, from vendor management to installation, ensuring seamless execution.",
    features: [
      "Vendor coordination",
      "Timeline management",
      "Budget oversight",
      "Quality control",
    ],
  },
];

const Services = () => {
  return (
    <LayoutComponent>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive interior design solutions tailored to bring your vision to life."
        breadcrumbs={[{ label: "Services" }]}
      />

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="premium-card group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-accent/10 group-hover:bg-accent transition-colors duration-300">
                      <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
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
              A proven approach that ensures exceptional results every time.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
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
                  "Our team develops creative concepts, mood boards, and initial designs for your review.",
              },
              {
                step: "03",
                title: "Design",
                description:
                  "Detailed designs, material selections, and specifications are finalized with your approval.",
              },
              {
                step: "04",
                title: "Execution",
                description:
                  "We manage the implementation, coordinating all vendors to bring your space to life.",
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
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto"
          >
            Contact us today to discuss your design needs and receive a
            personalized consultation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn-accent">
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </LayoutComponent>
  );
};

export default Services;
