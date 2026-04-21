import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react";
import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";
import portfolioLiving from "../assets/portfolio-living.jpg";
import portfolioKitchen from "../assets/portfolio-kitchen.jpg";
import portfolioBedroom from "../assets/portfolio-bedroom.jpg";
import portfolioOffice from "../assets/portfolio-office.jpg";
import heroImage from "../assets/hero-living-room.jpg";
const projects = [{
  id: 1,
  image: heroImage,
  title: "Contemporary Residence",
  category: "Residential",
  description: "A stunning modern home featuring open-plan living spaces, neutral tones, and carefully curated furnishings that create an atmosphere of refined elegance."
}, {
  id: 2,
  image: portfolioLiving,
  title: "Penthouse Living Room",
  category: "Residential",
  description: "An sophisticated living space designed for a discerning client, blending contemporary African aesthetics with timeless luxury elements."
}, {
  id: 3,
  image: portfolioKitchen,
  title: "Old Kitchen Setup",
  category: "Residential",
  description: "A chef's dream kitchen featuring marble countertops, warm wood cabinetry, and brass fixtures that combine functionality with refined style."
}, {
  id: 4,
  image: portfolioBedroom,
  title: "Masters Bedroom",
  category: "Residential",
  description: "A tranquil bedroom retreat designed for ultimate relaxation, featuring soft textures, ambient lighting, and a calming neutral palette."
}, {
  id: 5,
  image: portfolioOffice,
  title: "Corporate Office Design",
  category: "Commercial",
  description: "A dynamic workspace that balances professionalism with creativity, designed to inspire productivity and collaboration."
}];
const projectVideos = [{
  id: 1,
  title: "Living Room Transformation",
  description: "A complete living room makeover from concept to completion.",
  videoUrl: "" // Placeholder - replace with actual video URL
}, {
  id: 2,
  title: "Modern Kitchen Reveal",
  description: "Watch the stunning reveal of this contemporary kitchen design.",
  videoUrl: "" // Placeholder - replace with actual video URL
}];
const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => {
      if (newDirection === 1) {
        return prevIndex === projects.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex === 0 ? projects.length - 1 : prevIndex - 1;
    });
  }, []);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 10000);
    return () => clearInterval(interval);
  }, [paginate]);
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };
  return <Layout>
      <PageHeader title="Our Portfolio" subtitle="Explore our collection of thoughtfully designed spaces that showcase our commitment to excellence." breadcrumbs={[{
      label: "Portfolio"
    }]} />

      {/* Premium Slideshow */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="relative">
            {/* Main Slideshow */}
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-sm bg-muted">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
                x: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                },
                opacity: {
                  duration: 0.2
                }
              }} drag="x" dragConstraints={{
                left: 0,
                right: 0
              }} dragElastic={1} onDragEnd={(e, {
                offset,
                velocity
              }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }} className="absolute inset-0">
                  <img src={projects[currentIndex].image} alt={projects[currentIndex].title} className={`w-full h-full object-cover ${currentIndex === 0 ? 'opacity-70' : ''}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-85" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: 0.3
                  }}>
                      <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm mb-4">
                        {projects[currentIndex].category}
                      </span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 text-destructive-foreground font-bold">
                        {projects[currentIndex].title}
                      </h3>
                      <p className="text-primary-foreground/90 max-w-2xl leading-relaxed">
                        {projects[currentIndex].description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Hidden on mobile */}
              <button onClick={() => paginate(-1)} className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-background/80 hover:bg-background text-foreground rounded-full transition-colors duration-200 z-10" aria-label="Previous project">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => paginate(1)} className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-background/80 hover:bg-background text-foreground rounded-full transition-colors duration-200 z-10" aria-label="Next project">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {projects.map((project, index) => <button key={project.id} onClick={() => goToSlide(index)} className={`w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden transition-all duration-300 ${index === currentIndex ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100"}`} aria-label={`Go to ${project.title}`}>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </button>)}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-6 text-muted-foreground">
              <span className="text-foreground font-medium">{currentIndex + 1}</span>
              <span className="mx-2">/</span>
              <span>{projects.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="section-padding bg-primary">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground mb-4">
              Project Videos
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Watch behind-the-scenes clips and stunning reveals from our recent projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projectVideos.map((video, index) => <motion.div key={video.id} initial={{
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
          }} className="group">
                <div className="relative aspect-[9/16] bg-muted rounded-sm overflow-hidden">
                  {video.videoUrl ? <video src={video.videoUrl} className="w-full h-full object-cover" controls playsInline preload="metadata" /> : <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/80">
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                        <Play className="w-8 h-8 text-accent" />
                      </div>
                      <p className="text-muted-foreground text-sm">Video coming soon</p>
                    </div>}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-serif text-primary-foreground mb-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    {video.description}
                  </p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Grid Gallery */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Project Gallery</h2>
            <p className="section-subtitle mx-auto">
              Browse through our complete collection of interior design projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => <motion.div key={project.id} initial={{
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
          }} className="group img-zoom cursor-pointer" onClick={() => goToSlide(index)}>
                <div className="relative overflow-hidden rounded-sm">
                  <img src={project.image} alt={project.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                      <h4 className="text-xl font-serif text-primary-foreground mb-2">
                        {project.title}
                      </h4>
                      <span className="text-sm text-primary-foreground/80">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto text-center">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-3xl md:text-4xl font-serif text-accent-foreground mb-6">
            Inspired by What You See?
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
        }} className="text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
            Let us create a stunning space tailored to your unique vision and
            lifestyle.
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
            <Link to="/contact" className="btn-primary bg-primary hover:bg-primary/90">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>;
};
export default Portfolio;
