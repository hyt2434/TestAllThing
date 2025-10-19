import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

function Footer({ className, ...props }) {
  const provinces = [
    { name: 'Hanoi', slug: 'hanoi' },
    { name: 'Ho Chi Minh City', slug: 'ho-chi-minh-city' },
    { name: 'Da Nang', slug: 'da-nang' },
    { name: 'Hue', slug: 'hue' },
    { name: 'Hoi An', slug: 'hoi-an' },
    { name: 'Nha Trang', slug: 'nha-trang' },
    { name: 'Phu Quoc', slug: 'phu-quoc' },
    { name: 'Ha Long Bay', slug: 'ha-long-bay' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: 'facebook' },
    { name: 'Instagram', url: '#', icon: 'instagram' },
    { name: 'Twitter', url: '#', icon: 'twitter' },
    { name: 'YouTube', url: '#', icon: 'youtube' },
  ];

  return (
    <footer className={cn('bg-card border-t border-border mt-16', className)} {...props}>
      <div className="container max-w-screen-2xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center text-primary-foreground font-bold">
                VT
              </div>
              <span className="font-bold text-lg">VietTravel</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover the beauty of Vietnam with our premium travel services.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              {socialLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.name}
                >
                  <SocialIcon type={link.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Popular Provinces</h3>
            <div className="grid grid-cols-2 gap-2">
              {provinces.slice(0, 4).map(province => (
                <Link 
                  key={province.slug} 
                  to={`/search?province=${province.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {province.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">More Destinations</h3>
            <div className="grid grid-cols-2 gap-2">
              {provinces.slice(4).map(province => (
                <Link 
                  key={province.slug} 
                  to={`/search?province=${province.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {province.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row justify-between">
            <p>© {new Date().getFullYear()} VietTravel. All rights reserved.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <span>Made with ♥ in Vietnam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Simple social icon component
function SocialIcon({ type, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      {type === 'facebook' && (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      )}
      {type === 'instagram' && (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      )}
      {type === 'twitter' && (
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      )}
      {type === 'youtube' && (
        <>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </>
      )}
    </svg>
  );
}

export { Footer };