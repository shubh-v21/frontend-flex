import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[var(--color-primary)] flex items-center justify-center rounded-lg text-white font-bold text-xl">F</div>
          <h1 className="font-bold text-[var(--color-primary)] text-xl hidden sm:block">FrontendFlex</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="font-medium hover:text-[var(--color-primary-hover)]">Home</a>
          <a href="#projects" className="font-medium hover:text-[var(--color-primary-hover)]">Projects</a>
          <a href="#about" className="font-medium hover:text-[var(--color-primary-hover)]">About</a>
          <a href="https://github.com/shubh-v21/frontend-flex" 
            className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-all">
            GitHub
          </a>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[var(--color-primary)] p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden px-4 py-4 bg-white flex flex-col gap-4 animate-fadeIn">
          <a href="#" className="font-medium hover:text-[var(--color-primary-hover)]">Home</a>
          <a href="#projects" className="font-medium hover:text-[var(--color-primary-hover)]">Projects</a>
          <a href="#about" className="font-medium hover:text-[var(--color-primary-hover)]">About</a>
          <a href="https://github.com/shubh-v21/frontend-flex" 
            className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] text-center transition-all">
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
