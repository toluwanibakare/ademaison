import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";

const testimonials = [
  {
    quote:
      "ADÉmaison transformed our house into a home that truly reflects who we are. Their attention to detail and understanding of our lifestyle was remarkable. Every room now tells our story.",
    name: "Adaeze Okonkwo",
    title: "Residential Client, Lagos",
  },
  {
    quote:
      "Working with ADÉmaison was an absolute pleasure. They took our vague ideas and turned them into a stunning reality. The team's professionalism and creativity exceeded our expectations.",
    name: "Emeka Nwosu",
    title: "Homeowner, Abuja",
  },
  {
    quote:
      "Our office space was completely reimagined by ADÉmaison. The new design has significantly improved our team's productivity and morale. Clients are always impressed when they visit.",
    name: "Olumide Adeyemi",
    title: "CEO, Tech Startup",
  },
  {
    quote:
      "I was hesitant about hiring a designer, but ADÉmaison made the process so enjoyable. They listened to every concern and delivered a space that's both beautiful and functional.",
    name: "Chidinma Eze",
    title: "Residential Client, Port Harcourt",
  },
  {
    quote:
      "The transformation of our restaurant by ADÉmaison has been incredible. Our customers constantly compliment the ambiance, and we've seen a noticeable increase in repeat visits.",
    name: "Tunde Bakare",
    title: "Restaurant Owner, Lagos",
  },
  {
    quote:
      "ADÉmaison understood exactly what we needed for our boutique hotel. They created spaces that are both luxurious and welcoming. Our guests love the unique design touches.",
    name: "Ngozi Okafor",
    title: "Hospitality Client, Enugu",
  },
];

const Testimonials = () => {
  return (
    <Layout>
      <PageHeader
        title="Client Testimonials"
        subtitle="Hear what our valued clients have to say about their experience with ADÉmaison."
        breadcrumbs={[{ label: "Testimonials" }]}
      />

      {/* Testimonials Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="premium-card relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20" />
                <div className="relative">
                  <p className="text-foreground leading-relaxed mb-6 text-lg italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-xl font-serif text-accent">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="section-padding bg-primary">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-16 h-16 mx-auto mb-8 text-gold/40" />
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif text-primary-foreground leading-relaxed mb-8 italic"
            >
              "Choosing ADÉmaison was the best decision we made for our home.
              Their team brought a level of expertise and creativity that
              transformed our living space beyond what we imagined possible."
            </motion.blockquote>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-primary-foreground font-medium text-lg">
                The Adeleke Family
              </p>
              <p className="text-primary-foreground/70">
                Complete Home Renovation, Victoria Island
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-6"
          >
            Join Our Happy Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Experience the ADÉmaison difference. Let us create a space that
            you'll love for years to come.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn-accent">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
