import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  AlertCircle,
  Palette,
  TrendingUp,
  CheckCircle,
  Star,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";

const reasons = [
  {
    icon: Clock,
    title: "Save Valuable Time",
    description:
      "Interior design projects involve countless decisions—from layouts and materials to colors and furnishings. A professional designer streamlines this process, handling research, sourcing, and coordination so you can focus on what matters most to you.",
    benefits: [
      "Expert product and material sourcing",
      "Efficient project timelines",
      "Streamlined decision-making",
    ],
  },
  {
    icon: AlertCircle,
    title: "Avoid Costly Mistakes",
    description:
      "Without professional guidance, it's easy to make expensive errors—wrong-sized furniture, mismatched materials, or poor space planning. Our expertise helps you invest wisely and avoid costly corrections down the road.",
    benefits: [
      "Accurate measurements and planning",
      "Quality material selection",
      "Budget-conscious decisions",
    ],
  },
  {
    icon: Star,
    title: "Reduce Stress",
    description:
      "Designing a space can be overwhelming. From managing contractors to making endless choices, the process can quickly become stressful. We handle the complexities, providing a smooth, enjoyable experience from start to finish.",
    benefits: [
      "Professional project management",
      "Vendor coordination",
      "Clear communication throughout",
    ],
  },
  {
    icon: Palette,
    title: "Define Your Personal Style",
    description:
      "Many people struggle to articulate their design preferences. A skilled designer helps you discover and refine your unique aesthetic, creating spaces that authentically reflect who you are and how you live.",
    benefits: [
      "Personalized design consultation",
      "Style discovery process",
      "Cohesive aesthetic throughout",
    ],
  },
  {
    icon: TrendingUp,
    title: "Increase Property Value",
    description:
      "Thoughtfully designed interiors significantly enhance property value. Whether you're planning to sell or simply want to invest in your home, professional design delivers lasting returns.",
    benefits: [
      "Strategic design investments",
      "Quality finishes that last",
      "Appealing to future buyers",
    ],
  },
  {
    icon: CheckCircle,
    title: "Achieve a Complete Result",
    description:
      "Professional designers see the big picture. We ensure every element—furniture, lighting, textures, and accessories—works together harmoniously, delivering a polished, complete space you'll love for years.",
    benefits: [
      "Holistic design approach",
      "Attention to every detail",
      "Cohesive final result",
    ],
  },
];

const WhyHireDesigner = () => {
  return (
    <Layout>
      <PageHeader
        title="Why Hire a Designer"
        subtitle="Discover the transformative value a professional interior designer brings to your project."
        breadcrumbs={[{ label: "Why Hire a Designer" }]}
      />

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Investing in professional interior design is an investment in your
              quality of life. Here's why partnering with ADÉmaison makes all the
              difference.
            </motion.p>
          </div>

          <div className="space-y-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="premium-card"
              >
                <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                  <div className="md:col-span-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-accent/10">
                      <reason.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="text-xl md:text-2xl font-serif text-foreground mb-4">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <ul className="space-y-3">
                      {reason.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
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

      {/* Summary Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title mb-6"
            >
              The ADÉmaison Difference
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            >
              At ADÉmaison, we combine creative vision with practical expertise to
              deliver exceptional results. Our personalized approach ensures that
              your space not only looks stunning but also functions perfectly for
              your lifestyle. From initial concept to final installation, we're
              with you every step of the way.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/services" className="btn-outline">
                Explore Our Services
              </Link>
              <Link to="/contact" className="btn-accent">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
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
            Ready to Experience the Difference?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto"
          >
            Let our team transform your space into something extraordinary. Your
            dream interior is just a consultation away.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn-accent">
              Book Your Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyHireDesigner;
