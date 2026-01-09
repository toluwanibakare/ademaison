import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Services",
    path: "/services"
  }, {
    name: "Portfolio",
    path: "/portfolio"
  }];
  const serviceLinks = [{
    name: "Residential Design",
    path: "/services"
  }, {
    name: "Commercial Design",
    path: "/services"
  }, {
    name: "Space Planning",
    path: "/services"
  }, {
    name: "Color Consultation",
    path: "/services"
  }];
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="ADÉmaison Logo"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Transforming spaces into stunning sanctuaries. Premium interior
              design services tailored to your unique vision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif mb-6">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => <li key={index}>
                  <Link to={link.path} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+2347075300493" className="flex items-start gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>+234 707 530 0493</span>
                </a>
              </li>
              <li>
                <a href="mailto:adeleyetola@yahoo.com" className="flex items-start gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>adeleyetola@yahoo.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Rivers State, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} ADÉmaison Interior Design. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/contact" className="text-sm transition-colors duration-200 text-muted">
                ​Built by TMB    
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;