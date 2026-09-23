import React, { useState, useEffect, useRef } from 'react';
import type { ProductFamily } from '../types/product';

interface SearchResult {
  type: 'family' | 'series' | 'product';
  name: string;
  url: string;
  matchContext?: string;
}

export default function InlineSearch({ products }: { products: ProductFamily[] }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus shortcut and cross-component integration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('inline-search-input')?.focus();
      }
    };
    
    const handleOpenSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setQuery(customEvent.detail);
      }
      setIsFocused(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Small timeout to allow scrolling and state update to process
      setTimeout(() => {
        document.getElementById('inline-search-input')?.focus();
      }, 50);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search', handleOpenSearch);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search', handleOpenSearch);
    };
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const newResults: SearchResult[] = [];
    
    const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    products.forEach(family => {
      if (family.name.toLowerCase().includes(lowerQuery)) {
        newResults.push({ type: 'family', name: family.name, url: `/products/${family.slug}` });
      }
      family.groups?.forEach(group => {
        const seriesSlug = slugify(group.series || 'series');
        const matchGroup = group.name.toLowerCase().includes(lowerQuery);
        
        if (matchGroup) {
          newResults.push({ type: 'series', name: `${family.name}: ${group.name}`, url: `/products/${family.slug}/${seriesSlug}/${group.slug}`, matchContext: group.name });
        }
        
        group.products?.forEach(product => {
          const matchProduct = product.name.toLowerCase().includes(lowerQuery);
          let matchingPartNo = '';
          const matchPart = product.dimensionalData?.some(d => {
            if (d.partNo && d.partNo.toLowerCase().includes(lowerQuery)) {
              matchingPartNo = d.partNo; return true;
            }
            return false;
          });
          if (!matchGroup && (matchProduct || matchPart)) {
            let context = product.name;
            if (matchPart) context += ` (${matchingPartNo})`;
            newResults.push({ type: 'product', name: `${family.name}: ${product.name}`, url: `/products/${family.slug}/${seriesSlug}/${group.slug}/${product.slug}`, matchContext: context });
          }
        });
      });
    });
    setResults(newResults.slice(0, 10));
  }, [query, products]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div 
        style={{
          display: 'flex', alignItems: 'center', 
          background: isFocused ? '#ffffff' : 'rgba(255, 255, 255, 0.1)', 
          border: '1px solid',
          borderColor: isFocused ? '#ffffff' : 'rgba(255, 255, 255, 0.2)', 
          padding: '0.35rem 0.75rem', 
          borderRadius: '9999px', 
          width: isFocused ? '320px' : '240px', 
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isFocused ? '0 4px 10px -2px rgba(0, 0, 0, 0.2)' : 'none'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isFocused ? '#64748b' : 'rgba(255, 255, 255, 0.7)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'all 0.3s' }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          id="inline-search-input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={e => {
            if (e.key === 'Enter' && results.length > 0) {
              window.location.href = results[0].url;
            }
          }}
          placeholder="Search products..."
          style={{
            flexGrow: 1, border: 'none', outline: 'none', background: 'transparent',
            color: isFocused ? '#121a24' : '#ffffff',
            fontSize: '0.75rem', fontWeight: 500, paddingLeft: '0.5rem', fontFamily: 'inherit',
            transition: 'color 0.3s'
          }}
        />
        {!isFocused && !query && (
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', color: 'rgba(255, 255, 255, 0.9)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)', flexShrink: 0 }}>
            Ctrl K
          </div>
        )}
        {query && (
           <button onClick={() => { setQuery(''); document.getElementById('inline-search-input')?.focus(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#94a3b8', padding: 0, marginLeft: '0.5rem' }}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        )}
      </div>

      {isFocused && query && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, width: '400px',
          background: '#ffffff', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0,0,0,0.05)',
          overflow: 'hidden', zIndex: 1000
        }}>
          {results.length > 0 ? (
            <div style={{ maxHeight: '350px', overflowY: 'auto', padding: '0.5rem 0' }}>
              {results.map((r, i) => (
                <a key={i} href={r.url} onClick={() => setIsFocused(false)} style={{ display: 'block', padding: '0.75rem 1rem', textDecoration: 'none', borderBottom: i !== results.length - 1 ? '1px solid #f1f5f9' : 'none' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <h4 style={{ color: '#1f2d3d', fontSize: '0.85rem', fontWeight: 600, margin: '0 0 0.15rem 0', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{r.name}</h4>
                        {r.matchContext && <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Matches: <span style={{color:'#3c5d9c', fontWeight:600}}>{r.matchContext}</span></p>}
                      </div>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8', background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase', flexShrink: 0, marginLeft: '0.5rem' }}>{r.type}</span>
                   </div>
                </a>
              ))}
            </div>
          ) : (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b' }}>
               <p style={{ fontSize: '0.85rem', margin: 0 }}>No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
