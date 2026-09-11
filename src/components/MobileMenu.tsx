import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        className="mobile-menu-btn" 
        onClick={toggleMenu}
        aria-label="Toggle Navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            onClick={toggleMenu}
            style={{
              position: 'fixed',
              top: '5rem', /* Below Header */
              left: 0,
              width: '100vw',
              height: 'calc(100vh - 5rem)',
              backgroundColor: 'rgba(0, 5, 15, 0.5)',
              zIndex: 90
            }}
          />
          <nav className="nav-links show" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              position: 'absolute', 
              top: '100%', 
              left: 0, 
              width: '100%', 
              background: 'white', 
              padding: '1rem', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
              zIndex: 100 
          }}>
            <a href="/products" onClick={toggleMenu} className="active">PRODUCTS</a>
            <a href="/#capabilities" onClick={toggleMenu}>CAPABILITIES</a>
            <a href="/#industries" onClick={toggleMenu}>INDUSTRIES</a>
            <a href="/#company" onClick={toggleMenu}>COMPANY</a>
            <a href="/#resources" onClick={toggleMenu}>RESOURCES</a>
          </nav>
        </>
      )}
    </>
  );
}
