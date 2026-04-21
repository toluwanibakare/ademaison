import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import portfolioLiving from "@/assets/portfolio-living.jpg";
import portfolioKitchen from "@/assets/portfolio-kitchen.jpg";
import portfolioBedroom from "@/assets/portfolio-bedroom.jpg";
import portfolioOffice from "@/assets/portfolio-office.jpg";
import heroImage from "@/assets/hero-living-room.jpg";
import diningFull from "@/assets/dining-room-full.jpg";
import accentChair from "@/assets/accent-chair.jpg";
import wallArt from "@/assets/wall-art-setup.jpg";
import decorDetail from "@/assets/decor-setup.jpg";
import tvSetting from "@/assets/tv-setting.jpg";
import designedHouseVideo from "@/assets/videos/designed_house.mp4";
import diningVideo from "@/assets/videos/dining.mp4";
import fullHouseVideo from "@/assets/videos/full_house.mp4";
// import modernDesignVideo from "@/assets/videos/modern_design.mp4";
import livingRoomVideo from "@/assets/videos/living_room.mp4";
import anteRoomVideo from "@/assets/videos/ante_room.mp4";
import mastersBedroomVideo from "@/assets/videos/masters_bedroom.mp4";
import bedroomVideo from "@/assets/videos/bedroom.mp4";
import kitchenVideo from "@/assets/videos/kitchen.mp4";

const projects = [{
  id: 1,
  image: diningFull,
  title: "Signature Dining Room",
  category: "Residential",
  description: "A sophisticated dining space featuring a grand table, designer lighting, and a perfectly balanced aesthetic for the ultimate gathering experience."
}, {
  id: 2,
  image: portfolioLiving,
  title: "Penthouse Living Room",
  category: "Residential",
  description: "An sophisticated living space designed for a discerning client, blending contemporary African aesthetics with timeless luxury elements."
}, {
  id: 3,
  image: accentChair,
  title: "Minimalist Reading Nook",
  category: "Residential",
  description: "A curated corner for relaxation, featuring an iconic armchair and vibrant greenery that brings life to a modern minimalist space."
}, {
  id: 4,
  image: wallArt,
  title: "Artistic Living Corner",
  category: "Residential",
  description: "Thoughtfully composed wall art and plush seating that transform a simple corner into a centered focal point of the home."
}, {
  id: 5,
  image: portfolioBedroom,
  title: "Masters Bedroom",
  category: "Residential",
  description: "A tranquil bedroom retreat designed for ultimate relaxation, featuring soft textures, ambient lighting, and a calming neutral palette."
}, {
  id: 6,
  image: decorDetail,
  title: "Modern Decor Detail",
  category: "Residential",
  description: "It's all in the details. Carefully selected accessories and lighting that elevate the everyday to the extraordinary."
}, {
  id: 7,
  image: portfolioOffice,
  title: "Corporate Office Design",
  category: "Commercial",
  description: "A dynamic workspace that balances professionalism with creativity, designed to inspire productivity and collaboration."
}, {
  id: 8,
  image: tvSetting,
  title: "Media Lounge Gallery",
  category: "Residential",
  description: "A perfectly balanced entertainment zone where technology meets comfort, featuring clean lines and warm textures for the ultimate home cinema experience."
}];

const projectVideos = [
  designedHouseVideo,
  diningVideo,
  // mordernDesignVideo,
  fullHouseVideo,
  livingRoomVideo,
  anteRoomVideo,
  mastersBedroomVideo,
  bedroomVideo,
  kitchenVideo
];

const Portfolio = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const videoContainerRef = React.useRef<HTMLDivElement>(null);
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
      <section className="py-12 bg-primary">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground">
              Project Videos
            </h2>
          </div>

          <div className="relative">
            {/* Navigation Arrows - Desktop only */}
            <button
              onClick={() => {
                if (videoContainerRef.current) {
                  videoContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
                }
              }}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-background/90 hover:bg-background text-foreground rounded-full shadow-lg transition-colors duration-200"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (videoContainerRef.current) {
                  videoContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
                }
              }}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-background/90 hover:bg-background text-foreground rounded-full shadow-lg transition-colors duration-200"
              aria-label="Next video"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable Video Container */}
            <div
              ref={videoContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 md:px-12 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projectVideos.map((videoUrl, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 snap-center"
                >
                  <div className="relative w-[200px] md:w-[240px] aspect-[9/16] bg-muted rounded-sm overflow-hidden">
                    <video
                      src={videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
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