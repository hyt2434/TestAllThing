import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Button } from './button';
import { Toggle } from './toggle';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'glass border-b border-border/40 py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center text-primary-foreground font-bold">
            VT
          </div>
          <span className="font-bold text-lg hidden sm:block">VietTravel</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <NavLink 
            to="/"
            className={({ isActive }) => cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-muted'
            )}
          >
            Home
          </NavLink>
          <NavLink 
            to="/search"
            className={({ isActive }) => cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-muted'
            )}
          >
            Search
          </NavLink>
          <NavLink 
            to="/social"
            className={({ isActive }) => cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-muted'
            )}
          >
            Social
          </NavLink>
          <NavLink 
            to="/partner"
            className={({ isActive }) => cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-muted'
            )}
          >
            Partner
          </NavLink>
          <NavLink 
            to="/admin"
            className={({ isActive }) => cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-muted'
            )}
          >
            Admin
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-4">
          <Toggle
            isChecked={darkMode}
            onToggle={toggleDarkMode}
            className="relative"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <MoonIcon className="h-3 w-3 text-primary" />
            ) : (
              <SunIcon className="h-3 w-3 text-accent" />
            )}
          </Toggle>
          
          <Button size="sm" variant="primary">
            Sign In
          </Button>
          
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export { Header };