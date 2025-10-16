import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, PawPrint } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-hero p-2 rounded-lg">
                <PawPrint className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">PetMate</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting loving families with wonderful pets. We're dedicated to finding the perfect home for every animal in our care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/adoption-process" className="text-muted-foreground hover:text-primary transition-colors">
                  Adoption Process
                </Link>
              </li>
              <li>
                <Link to="/pet-care-tips" className="text-muted-foreground hover:text-primary transition-colors">
                  Pet Care Tips
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Pet Adoption</li>
              <li className="text-muted-foreground">Pet Accessories</li>
              <li className="text-muted-foreground">Veterinary Support</li>
              <li className="text-muted-foreground">Training Programs</li>
              <li className="text-muted-foreground">Emergency Care</li>
              <li className="text-muted-foreground">Volunteer Programs</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p>27A, Carter Road</p>
                  <p>Bandra West, Mumbai</p>
                  <p>Maharashtra – 400050</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                  (+91) 9876543210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:info@petmate.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@petmate.com
                </a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-2">Emergency</h4>
              <p className="text-sm text-muted-foreground">
                Animal Helpline: <span className="font-medium text-primary">1962</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                24×7 Animal Rescue & Welfare
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} PetMate. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              PetMate is a registered non-profit organization dedicated to animal welfare and pet adoption services across India.
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              <p>Registration No: 12A/80G certified | PAN: AAATP1234M | GST: 27AAATP1234M1Z5</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
