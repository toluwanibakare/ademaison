import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, Send, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { useToast } from "@/hooks/use-toast";

const testimonials = [
  {
    quote:
      "ADÉmaison transformed our house into a home that truly reflects who we are. Their attention to detail and understanding of our lifestyle was remarkable. Every room now tells our story.",
    name: "Adaeze Okonkwo",
    title: "Residential Client, Port Harcourt",
    rating: 5,
  },
  {
    quote:
      "Working with ADÉmaison was an absolute pleasure. They took our vague ideas and turned them into a stunning reality. The team's professionalism and creativity exceeded our expectations.",
    name: "Emeka Nwosu",
    title: "Homeowner, Abuja",
    rating: 5,
  },
  {
    quote:
      "Our office space was completely reimagined by ADÉmaison. The new design has significantly improved our team's productivity and morale. Clients are always impressed when they visit.",
    name: "Olumide Adeyemi",
    title: "CEO, Tech Startup",
    rating: 5,
  },
  {
    quote:
      "I was hesitant about hiring a designer, but ADÉmaison made the process so enjoyable. They listened to every concern and delivered a space that's both beautiful and functional.",
    name: "Chidinma Eze",
    title: "Residential Client, Port Harcourt",
    rating: 4,
  },
  {
    quote:
      "The transformation of our restaurant by ADÉmaison has been incredible. Our customers constantly compliment the ambiance, and we've seen a noticeable increase in repeat visits.",
    name: "Tunde Bakare",
    title: "Restaurant Owner, Port Harcourt",
    rating: 5,
  },
  {
    quote:
      "ADÉmaison understood exactly what we needed for our boutique hotel. They created spaces that are both luxurious and welcoming. Our guests love the unique design touches.",
    name: "Ngozi Okafor",
    title: "Hospitality Client, Enugu",
    rating: 5,
  },
];

const StarRating = ({ rating, interactive = false, onRatingChange }: { rating: number; interactive?: boolean; onRatingChange?: (rating: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <Star
            className={`w-5 h-5 ${
              (interactive ? hoverRating || rating : rating) >= star
                ? 'fill-gold text-gold'
                : 'text-muted-foreground/30'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const { toast } = useToast();
  const [reviewForm, setReviewForm] = useState({
    name: "",
    title: "",
    review: "",
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;
  const totalReviews = testimonials.length;

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setReviewForm((prev) => ({ ...prev, rating }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (reviewForm.rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Choose a star rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Thank you for your review",
      description:
        "Your testimonial has been submitted and will be reviewed by our team.",
    });

    setReviewForm({ name: "", title: "", review: "", rating: 0 });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <PageHeader
        title="Client Testimonials"
        subtitle="Hear what our valued clients have to say about their experience with ADÉmaison."
        breadcrumbs={[{ label: "Testimonials" }]}
      />

      {/* Overall Rating Summary */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          >
            <div className="text-center">
              <p className="text-5xl font-serif text-foreground mb-2">{averageRating.toFixed(1)}</p>
              <div className="flex justify-center mb-2">
                <StarRating rating={Math.round(averageRating)} />
              </div>
              <p className="text-muted-foreground text-sm">Overall Rating</p>
            </div>
            <div className="h-16 w-px bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-5xl font-serif text-foreground mb-2">{totalReviews}</p>
              <p className="text-muted-foreground text-sm">Happy Clients</p>
            </div>
          </motion.div>
        </div>
      </section>

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
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
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
            <div className="flex justify-center mb-6">
              <StarRating rating={5} />
            </div>
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

      {/* Submit a Review Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-title mb-4"
              >
                Share Your Experience
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                Have you worked with ADÉmaison? We would love to hear about your
                experience.
              </motion.p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleReviewSubmit}
              className="premium-card"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={reviewForm.name}
                    onChange={handleReviewChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Title or Location
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={reviewForm.title}
                    onChange={handleReviewChange}
                    required
                    className="form-input"
                    placeholder="e.g., Homeowner, Port Harcourt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Rating
                  </label>
                  <StarRating 
                    rating={reviewForm.rating} 
                    interactive 
                    onRatingChange={handleRatingChange} 
                  />
                </div>

                <div>
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    value={reviewForm.review}
                    onChange={handleReviewChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Share your experience working with ADÉmaison..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Review
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
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
