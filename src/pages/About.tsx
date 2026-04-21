import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Gem, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import portfolioKitchen from "@/assets/portfolio-kitchen.jpg";
import chairClose from "@/assets/accent-chair-close.jpg";
import decorDetail from "@/assets/decor-setup.jpg";

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every detail matters. We approach each project with meticulous attention to ensure perfection in every corner.",
  },
  {
    icon: Gem,
    title: "Elegance",
    description:
      "Beauty in simplicity. We craft spaces that exude timeless sophistication and refined taste.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Trust is our foundation. We uphold honesty and transparency in every client relationship.",
  },
];

const About = () => {
  return (
    <Layout>
      <PageHeader
        title="About ADÉmaison"
        subtitle="Precision in Design. Elegance Defined by Integrity."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="section-title mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
              Adémaison was founded from a simple but defining moment in 2015, 
              when a family friend entrusted the brand’s founder with styling 
              a two bedroom apartment. What began as a personal favor quickly 
              revealed a natural talent for transforming spaces, resulting in 
              a project that exceeded expectations and sparked a deeper passion 
              for interior decoration.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
              Over the years, this passion evolved into a professional practice, 
              with experience spanning residential styling, space planning, and 
              interior consultations. The brand name Adémaison was officially 
              established in 2025 to represent this growth, vision, and commitment 
              to refined living.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
              Today, Adémaison delivers thoughtful interior decoration solutions 
              shaped by both local insight and international exposure. Through 
              consultations and projects connected to France, Qatar, Port Harcourt, 
              and London, the brand brings a global perspective to creating warm, 
              functional, and beautifully styled spaces.
              </p>
              <p className="text-muted-foreground leading-relaxed">
              At its core, Adémaison is driven by the belief that every space 
              should feel intentional, personal, and truly lived in.  
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="img-zoom rounded-sm overflow-hidden">
                  <img
                    src={chairClose}
                    alt="ADÉmaison detail focus: Armchair and plant setup"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                </div>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-primary">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary-foreground mb-8"
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-foreground/90 leading-relaxed"
            >
              To create exceptional interior spaces that reflect refined elegance and timeless beauty, 
              guided by a commitment to integrity, attention to detail, and the highest standards of design 
              excellence. We transform visions into environments that inspire, comfort, and elevate everyday living.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Our Core Values
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="premium-card text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="img-zoom rounded-sm overflow-hidden">
                  <img
                    src={decorDetail}
                    alt="ADÉmaison detail focus: Sideboard and accessories"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title mb-6">Our Approach</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We believe that great design emerges from deep collaboration. Our
                process begins with understanding you, your lifestyle, preferences,
                aspirations, and practical needs. This foundation allows us to
                create spaces that are authentically yours.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From initial concept to final installation, we guide you through
                every step, ensuring transparency, communication, and satisfaction.
                Our team combines creative vision with technical expertise to
                deliver results that inspire and endure.
              </p>
              <Link to="/contact" className="btn-accent">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
