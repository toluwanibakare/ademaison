import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LayoutComponent from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";

const services = [
  {
    title: "Interior Design Consultation",
    description:
      "Every exceptional space begins with a thoughtful conversation. Our consultation sessions allow us to understand your vision, preferences, and how you intend to use your space. We listen carefully, ask the right questions, and offer expert guidance to help you make informed decisions. Whether you are starting from scratch or refining an existing concept, this is where your design journey takes shape.",
  },
  {
    title: "Space Planning and Layout Design",
    description:
      "The foundation of any successful interior lies in how the space is organized. We analyze your floor plan, traffic patterns, and daily routines to create layouts that feel intuitive and functional. Every room is designed to support the way you live or work, balancing openness with purpose and ensuring that no space is wasted.",
  },
  {
    title: "3D Design Visualization and Virtual Walkthroughs",
    description:
      "Before any work begins, you will see exactly what your space will look like. We create realistic 3D renders and immersive virtual walkthroughs that allow you to experience the design in detail. You can explore every angle, review material choices, and request adjustments with full clarity. This approach eliminates guesswork and ensures you are completely confident before execution begins. Changes are made on screen, not on site.",
  },
  {
    title: "Residential Interior Design",
    description:
      "Your home should be a true reflection of who you are. We design living spaces that are warm, inviting, and tailored to your lifestyle. From intimate apartments to expansive family homes, we approach each project with care, creating environments that balance beauty with everyday comfort. Every detail is considered, from furniture arrangement to the subtle textures that make a room feel complete.",
  },
  {
    title: "Commercial Interior Design",
    description:
      "A well-designed commercial space shapes how people feel and perform within it. We create interiors for offices, retail environments, hospitality venues, and more, always with an eye on brand identity and user experience. Our designs support productivity, impress clients, and create lasting impressions. We understand the demands of commercial projects and deliver spaces that work as hard as you do.",
  },
  {
    title: "Office and Workspace Design",
    description:
      "The modern workplace requires more than desks and chairs. We design offices that foster focus, collaboration, and wellbeing. From open-plan layouts to private executive suites, our approach considers acoustics, lighting, ergonomics, and aesthetics. The result is a workspace that attracts talent, supports your team, and reflects your company culture.",
  },
  {
    title: "Kitchen Design and Renovation",
    description:
      "The kitchen is the heart of any home. We design kitchens that are both beautiful and highly functional, with layouts that make cooking a pleasure. From cabinetry and countertops to appliance placement and storage solutions, every element is carefully planned. Whether you prefer a sleek modern aesthetic or timeless elegance, we create kitchens that become the gathering place they deserve to be.",
  },
  {
    title: "Bedroom and Living Room Design",
    description:
      "These are the spaces where life unfolds. We design bedrooms that promote rest and relaxation, with thoughtful attention to lighting, textures, and layout. Living rooms are crafted for comfort and connection, with seating arrangements that encourage conversation and entertainment. Each room is designed to feel personal, refined, and effortlessly livable.",
  },
  {
    title: "Custom Furniture Design and Sourcing",
    description:
      "Sometimes the perfect piece simply does not exist. We design custom furniture tailored to your exact specifications, working with skilled craftsmen to bring unique pieces to life. When custom is not required, we source from trusted suppliers and artisan makers to find furniture that fits your style, space, and budget. Every piece is selected with intention.",
  },
  {
    title: "Material and Finish Selection",
    description:
      "The materials you choose define the character of your space. We guide you through the selection of flooring, wall finishes, countertops, tiles, fabrics, and hardware, ensuring each element works in harmony. Our expertise helps you navigate the overwhelming number of options, so you can make confident decisions that will stand the test of time.",
  },
  {
    title: "Lighting Design and Planning",
    description:
      "Lighting transforms a room. We design layered lighting schemes that address ambient, task, and accent needs, creating atmosphere and enhancing functionality. From natural light optimization to fixture selection and placement, we ensure your space looks and feels right at every hour of the day. Good lighting is invisible until it is missing, and we make sure it never is.",
  },
  {
    title: "Color Consultation",
    description:
      "Color sets the mood of a space before anything else is noticed. We help you select palettes that evoke the right emotions, complement your furnishings, and create visual flow throughout your home or business. Our approach considers natural light, room function, and your personal preferences to arrive at colors that feel both intentional and timeless.",
  },
  {
    title: "Project Management and Site Supervision",
    description:
      "A beautiful design means little without flawless execution. We manage every phase of your project, coordinating contractors, suppliers, and craftsmen to ensure work is completed on time and to specification. Regular site visits allow us to address issues as they arise, maintain quality control, and keep you informed without the stress of managing it yourself.",
  },
  {
    title: "Design Build and Turnkey Solutions",
    description:
      "For clients who prefer a seamless experience, we offer complete design and build services. From initial concept through final installation, we handle everything. You receive a fully finished space, ready to move into, without the complexity of coordinating multiple parties. This approach saves time, reduces stress, and ensures a cohesive result from start to finish.",
  },
  {
    title: "Renovation and Remodeling",
    description:
      "Existing spaces often hold untapped potential. We approach renovations with fresh eyes, identifying opportunities to improve layout, update finishes, and enhance functionality. Whether you are refreshing a single room or undertaking a complete transformation, we manage the process carefully to minimize disruption while maximizing results.",
  },
  {
    title: "Styling and Final Staging",
    description:
      "The finishing touches bring a space to life. We handle the styling and staging of your completed project, placing artwork, arranging accessories, and adding those final layers that make a room feel complete. This is where personality shines through, transforming a designed space into one that feels truly lived in and loved.",
  },
  {
    title: "Post Project Support and Maintenance Guidance",
    description:
      "Our relationship does not end when the project is complete. We provide guidance on caring for your new space, from cleaning and maintenance tips to recommendations for seasonal updates. Should you need adjustments or additions in the future, we remain available to help you keep your space looking and functioning at its best.",
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

      {/* Services Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
                What We Offer
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                From initial consultation through final styling, we provide a complete range of interior design services for both residential and commercial clients. Each service is delivered with the same attention to detail and commitment to excellence.
              </p>
            </motion.div>

            <div className="space-y-16">
              {services.map((service, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border-b border-border/50 pb-12 last:border-b-0"
                >
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    {service.description}
                  </p>
                </motion.article>
              ))}
            </div>
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
