import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

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
              position: 'absolute',
              top: '100%', /* Below Header */
              left: 0,
              width: '100%',
              height: '100vh',
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="/products" onClick={toggleMenu} className="active">PRODUCTS</a>
                <button 
                  onClick={(e) => { e.preventDefault(); setIsProductsOpen(!isProductsOpen); }} 
                  style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer' }}
                  aria-label="Toggle Products Submenu"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isProductsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              {isProductsOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem', paddingBottom: '0.5rem', gap: '0.5rem' }}>
                  <a href="/products/din-metric-fittings" onClick={toggleMenu} style={{ fontSize: '0.875rem', color: 'var(--color-navy)', fontWeight: 500, textTransform: 'none' }}>DIN Metric Fittings</a>
                  <a href="#" onClick={toggleMenu} style={{ fontSize: '0.875rem', color: 'var(--color-navy)', fontWeight: 500, textTransform: 'none' }}>JIC Tube Fittings</a>
                  <a href="#" onClick={toggleMenu} style={{ fontSize: '0.875rem', color: 'var(--color-navy)', fontWeight: 500, textTransform: 'none' }}>ORFS Fittings</a>
                  <a href="#" onClick={toggleMenu} style={{ fontSize: '0.875rem', color: 'var(--color-navy)', fontWeight: 500, textTransform: 'none' }}>Conversion Fittings</a>
                </div>
              )}
            </div>
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
