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
        backgroundColor: 'rgba(10, 18, 30, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8vh 2rem'
      }}
      onClick={() => setIsOpen(false)}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '850px',
          background: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,0,0,0.05)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3c5d9c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, part numbers, or series..."
            style={{
              flexGrow: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.5rem',
              color: '#121a24',
              fontFamily: 'inherit',
              fontWeight: 400
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a0aec0', background: '#f4f6f9', padding: '0.3rem 0.5rem', borderRadius: '4px', letterSpacing: '0.05em' }}>ESC</span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', color: '#a0aec0', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#1f2d3d'}
              onMouseOut={e => e.currentTarget.style.color = '#a0aec0'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {query && (
          <div style={{ overflowY: 'auto', padding: '1rem 0' }}>
            {results.length > 0 ? (
              results.map((r, idx) => (
                <a 
                  key={idx} 
                  href={r.url}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '1rem 2rem',
                    textDecoration: 'none',
                    borderBottom: idx !== results.length - 1 ? '1px solid #f4f6f9' : 'none',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: '#1f2d3d', fontSize: '1.05rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>
                        {r.name}
                      </h4>
                      {r.matchContext && (
                        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                          Matches: <span style={{ fontWeight: 600, color: '#3c5d9c' }}>{r.matchContext}</span>
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                        {r.type}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#64748b' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, margin: '0 auto 1.5rem auto' }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <p style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 500, color: '#1f2d3d' }}>No products found for "{query}"</p>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Try searching for generic terms like "Equal Straight" or specific series like "G-06-L"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
