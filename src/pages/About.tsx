import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Heart, Eye } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import portfolioLiving from "@/assets/portfolio-living.jpg";
import portfolioKitchen from "@/assets/portfolio-kitchen.jpg";

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every detail matters. We approach each project with meticulous attention to ensure perfection in every corner.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Design is our calling. We pour creativity and enthusiasm into every space we transform.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "We see beyond the ordinary, envisioning possibilities that turn your dreams into reality.",
  },
];

const About = () => {
  return (
    <Layout>
      <PageHeader
        title="About ADÉmaison"
        subtitle="Discover the passion and expertise behind our award-winning interior design studio."
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
                Founded with a vision to transform ordinary spaces into
                extraordinary experiences, ADÉmaison Interior Design has been at
                the forefront of innovative interior design in Nigeria for over
                a decade.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our journey began with a simple belief: that thoughtfully
                designed spaces have the power to enhance lives, inspire
                creativity, and create lasting impressions. Today, we continue
                to uphold this philosophy in every project we undertake.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From intimate residential spaces to grand commercial
                establishments, our portfolio reflects our commitment to
                excellence, creativity, and client satisfaction. We take pride
                in understanding each client's unique vision and translating it
                into spaces that exceed expectations.
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
                    src={portfolioLiving}
                    alt="ADÉmaison interior design project showcase"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 border-4 border-accent rounded-sm hidden lg:block" />
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
              To create exceptional interior spaces that harmonize aesthetics
              with functionality, reflect our clients' personalities, and stand
              the test of time. We are committed to delivering personalized
              design solutions that transform how people live, work, and
              experience their environments.
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
                    src={portfolioKitchen}
                    alt="ADÉmaison design approach"
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
                process begins with understanding you—your lifestyle, preferences,
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
