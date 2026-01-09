import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Clock, Star, Home, Building, Ruler } from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-living-room.jpg";
import portfolioLiving from "@/assets/portfolio-living.jpg";
import portfolioKitchen from "@/assets/portfolio-kitchen.jpg";
import portfolioBedroom from "@/assets/portfolio-bedroom.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const services = [
  {
    title: "Residential Design",
    description: "Transform your home into a personalized sanctuary that reflects your lifestyle.",
    icon: <Home className="w-12 h-12" />,
  },
  {
    title: "Commercial Design",
    description: "Create inspiring workspaces that boost productivity and impress clients.",
    icon: <Building className="w-12 h-12" />,
  },
  {
    title: "Space Planning",
    description: "Optimize every square foot with intelligent and functional layouts.",
    icon: <Ruler className="w-12 h-12" />,
  },
];

const portfolioPreview = [
  { image: portfolioLiving, title: "Modern Living Room" },
  { image: portfolioKitchen, title: "Luxury Kitchen" },
  { image: portfolioBedroom, title: "Serene Bedroom" },
];

const Index = () => {
  const [stats, setStats] = useState([
    { value: "150+", label: "Projects Completed", icon: Award },
    { value: "10+", label: "Years Experience", icon: Clock },
    { value: "0", label: "Happy Clients", icon: Users },
    { value: "0.0", label: "Client Rating", icon: Star },
  ]);

  useEffect(() => {
    const fetchRatingSummary = async () => {
      try {
        const response = await fetch(`${API_URL}/api/testimonials/summary`);
        const data = await response.json();
        
        if (data.success) {
          setStats(prev => prev.map(stat => {
            if (stat.label === "Happy Clients") {
              return { ...stat, value: data.summary.totalReviews.toString() };
            }
            if (stat.label === "Client Rating") {
              return { ...stat, value: data.summary.averageRating };
            }
            return stat;
          }));
        }
      } catch (error) {
        console.error("Error fetching rating summary:", error);
      }
    };

    fetchRatingSummary();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxurious modern interior design by ADÉmaison"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-accent-foreground/90 text-lg mb-4 tracking-wider uppercase"
            >
              ADÉmaison Interior Design
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-primary-foreground mb-6 leading-tight"
            >
              Transforming Spaces Into Stunning Sanctuaries
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl"
            >
              We create bespoke interior designs that reflect your unique style 
              and elevate your everyday living experience.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact" className="btn-accent">
                Book a Session
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/portfolio" className="btn-ghost text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10">
                View Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-gold" />
                <div className="text-3xl md:text-4xl font-serif text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent font-medium tracking-wider uppercase mb-4">
                About ADÉmaison
              </p>
              <h2 className="section-title mb-6">
                Designing Spaces That Tell Your Story
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At ADÉmaison Interior Design, we believe that every space has the 
                potential to inspire. Our team of passionate designers works 
                closely with you to understand your vision, lifestyle, and 
                aspirations, crafting interiors that are both beautiful and 
                functional.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                With over a decade of experience in residential and commercial 
                design, we bring expertise, creativity, and meticulous attention 
                to detail to every project.
              </p>
              <Link to="/about" className="btn-outline">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="img-zoom rounded-sm overflow-hidden">
                <img
                  src={portfolioLiving}
                  alt="ADÉmaison interior design project"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-sm hidden md:block">
                <div className="text-3xl font-serif mb-1">10+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-medium tracking-wider uppercase mb-4"
            >
              Our Services
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              What We Offer
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="premium-card text-center"
              >
                <div className="flex justify-center text-4xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-serif text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-primary">
              Explore All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-accent font-medium tracking-wider uppercase mb-4"
              >
                Our Portfolio
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="section-title"
              >
                Featured Projects
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 md:mt-0"
            >
              <Link to="/portfolio" className="btn-outline">
                View All Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioPreview.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group img-zoom"
              >
                <Link to="/portfolio" className="block relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover rounded-sm"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300 flex items-end justify-start p-6">
                    <h3 className="text-xl font-serif text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-accent-foreground mb-6"
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto"
          >
            Let us bring your vision to life. Schedule a consultation and take 
            the first step toward your dream space.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn-primary bg-primary hover:bg-primary/90">
              Book Your Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
