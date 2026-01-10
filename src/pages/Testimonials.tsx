import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, Send, Star, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { getTestimonials, getRatingSummary, submitTestimonial, Testimonial, RatingSummary } from "@/api/testimonials";

const StarRating = ({
  rating,
  interactive = false,
  onRatingChange
}: {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  return <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" disabled={!interactive} onClick={() => interactive && onRatingChange?.(star)} onMouseEnter={() => interactive && setHoverRating(star)} onMouseLeave={() => interactive && setHoverRating(0)} className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}>
          <Star className={`w-5 h-5 ${(interactive ? hoverRating || rating : rating) >= star ? 'fill-gold text-gold' : 'text-muted-foreground/30'} transition-colors`} />
        </button>)}
    </div>;
};

const Testimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [summary, setSummary] = useState<RatingSummary>({ totalReviews: 0, averageRating: "0.0" });
  const [isLoading, setIsLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    title: "",
    review: "",
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsRes, summaryRes] = await Promise.all([
          getTestimonials(),
          getRatingSummary()
        ]);
        
        if (testimonialsRes.success) {
          setTestimonials(testimonialsRes.testimonials);
        }
        if (summaryRes.success) {
          setSummary(summaryRes.summary);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setReviewForm(prev => ({
      ...prev,
      rating
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewForm.rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Choose a star rating before submitting your review.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await submitTestimonial(reviewForm);
      
      if (response.success) {
        toast({
          title: "Thank you for your review!",
          description: response.message
        });
        setReviewForm({
          name: "",
          title: "",
          review: "",
          rating: 0
        });
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <Layout>
      <PageHeader title="Client Testimonials" subtitle="Hear what our valued clients have to say about their experience with ADÉmaison." breadcrumbs={[{
      label: "Testimonials"
    }]} />

      {/* Overall Rating Summary */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="text-center">
              <p className="text-5xl font-serif text-foreground mb-2">{summary.averageRating}</p>
              <div className="flex justify-center mb-2">
                <StarRating rating={Math.round(parseFloat(summary.averageRating))} />
              </div>
              <p className="text-muted-foreground text-sm">Overall Rating</p>
            </div>
            <div className="h-16 w-px bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-5xl font-serif text-foreground mb-2">{summary.totalReviews}</p>
              <p className="text-muted-foreground text-sm">Reviews</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-accent" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20">
              <Quote className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
              <h3 className="text-2xl font-serif text-foreground mb-4">No Reviews Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We don't have any reviews at the moment. Be the first to share your experience with ADÉmaison!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {testimonials.map((testimonial, index) => <motion.div key={testimonial.id} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="premium-card relative">
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
                </motion.div>)}
            </div>
          )}
        </div>
      </section>

      {/* Featured Testimonial - Only show if we have testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-primary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-16 h-16 mx-auto mb-8 text-gold/40" />
              <div className="flex justify-center mb-6">
                <StarRating rating={testimonials[0]?.rating || 5} />
              </div>
              <motion.blockquote initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="text-2xl md:text-3xl font-serif text-primary-foreground leading-relaxed mb-8 italic">
                "{testimonials[0]?.quote}"
              </motion.blockquote>
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2
            }}>
                <p className="text-primary-foreground font-medium text-lg">
                  {testimonials[0]?.name}
                </p>
                <p className="text-primary-foreground/70">
                  {testimonials[0]?.title}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Submit a Review Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <motion.h2 initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} className="section-title mb-4">
                Share Your Experience
              </motion.h2>
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.1
            }} className="text-muted-foreground">
                Have you worked with ADÉmaison? We would love to hear about your
                experience.
              </motion.p>
            </div>

            <motion.form initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.2
          }} onSubmit={handleReviewSubmit} className="premium-card">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input type="text" id="name" name="name" value={reviewForm.name} onChange={handleReviewChange} required className="form-input" placeholder="Enter your full name" />
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                    Title or Location
                  </label>
                  <input type="text" id="title" name="title" value={reviewForm.title} onChange={handleReviewChange} required className="form-input" placeholder="e.g., Homeowner, Port Harcourt" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Rating
                  </label>
                  <StarRating rating={reviewForm.rating} interactive onRatingChange={handleRatingChange} />
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-foreground mb-2">
                    Your Review
                  </label>
                  <textarea id="review" name="review" value={reviewForm.review} onChange={handleReviewChange} required rows={5} className="form-input resize-none" placeholder="Share your experience working with ADÉmaison..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Submitting..." : <>
                      Submit Review
                      <Send className="w-4 h-4" />
                    </>}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto text-center">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="section-title mb-6">
            Join Our Happy Clients
          </motion.h2>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the ADÉmaison difference. Let us create a space that
            you'll love for years to come.
          </motion.p>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2
        }}>
            <Link to="/contact" className="btn-accent">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>;
};
export default Testimonials;