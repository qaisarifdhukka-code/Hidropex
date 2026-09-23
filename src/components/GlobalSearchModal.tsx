import React, { useState, useEffect, useRef } from 'react';
import type { ProductFamily } from '../types/product';

interface SearchResult {
  type: 'family' | 'series';
  name: string;
  url: string;
  familySlug: string;
  matchContext?: string;
}

export default function GlobalSearchModal({ products }: { products: ProductFamily[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-search', handleOpen);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('open-search', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const newResults: SearchResult[] = [];

    products.forEach(family => {
      // Check family name
      if (family.name.toLowerCase().includes(lowerQuery)) {
        newResults.push({
          type: 'family',
          name: family.name,
          url: `/products/${family.slug}`,
          familySlug: family.slug,
        });
      }

      // Check groups and products
      family.groups?.forEach(group => {
        const matchGroup = group.name.toLowerCase().includes(lowerQuery);
        
        if (matchGroup) {
          newResults.push({
            type: 'series',
            name: `${family.name}: ${group.name}`,
            url: `/products/${family.slug}#${group.slug}`,
            familySlug: family.slug,
            matchContext: group.name
          });
        }

        group.products?.forEach(product => {
          const matchProduct = product.name.toLowerCase().includes(lowerQuery);
          
          let matchingPartNo = '';
          const matchPart = product.dimensionalData?.some(d => {
            if (d.partNo && d.partNo.toLowerCase().includes(lowerQuery)) {
              matchingPartNo = d.partNo;
              return true;
            }
            return false;
          });

          if (!matchGroup && (matchProduct || matchPart)) {
            let context = product.name;
            if (matchPart) context += ` (${matchingPartNo})`;

            newResults.push({
              type: 'series',
              name: `${family.name}: ${product.name}`,
              url: `/products/${family.slug}#${group.slug}`,
              familySlug: family.slug,
              matchContext: context
            });
          }
        });
      });
    });

    setResults(newResults.slice(0, 15)); // Limit to top 15 results
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 18, 30, 0.95)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '15vh',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={() => setIsOpen(false)}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 2rem'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '1rem' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Start typing to search..."
            style={{
              flexGrow: 1,
              border: 'none',
              outline: 'none',
              fontSize: '2.5rem',
              color: '#ffffff',
              fontFamily: 'inherit',
              fontWeight: 300,
              background: 'transparent'
            }}
          />
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
            onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {query && (
          <div style={{ overflowY: 'auto', maxHeight: '60vh', marginTop: '2rem', paddingRight: '1rem' }}>
            {results.length > 0 ? (
              results.map((r, idx) => (
                <a 
                  key={idx} 
                  href={r.url}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '1.25rem 0',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.2s ease',
                    opacity: 0.8
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.paddingLeft = '1rem'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.25rem 0' }}>
                        {r.name}
                      </h4>
                      {r.matchContext && (
                        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem', margin: 0 }}>
                          Matches: <span style={{ fontWeight: 600, color: '#f4b81c' }}>{r.matchContext}</span>
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                        {r.type}
                      </span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div style={{ padding: '3rem 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 300, margin: '0 0 0.5rem 0' }}>No products found for "{query}"</p>
                <p style={{ fontSize: '1rem', fontWeight: 300, margin: 0 }}>Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
