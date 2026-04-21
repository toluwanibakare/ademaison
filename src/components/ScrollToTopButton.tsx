import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "../components/ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-10 right-8 z-50 flex items-center justify-center">
          <svg className="absolute w-[60px] h-[60px] -rotate-90 pointer-events-none">
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              className="text-primary/10"
            />
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-accent transition-all duration-300 ease-out"
            />
          </svg>
          <Button
            onClick={scrollToTop}
            className="rounded-full w-11 h-11 p-0 shadow-lg border-2 border-transparent hover:border-primary/50 transition-colors"
            size="icon"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
