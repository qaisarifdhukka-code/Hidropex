import React, { useState } from 'react';

interface TechnicalViewerProps {
  bodyUrl?: string;
  assemblyUrl?: string;
  productName: string;
}

export default function TechnicalViewer({ bodyUrl, assemblyUrl, productName }: TechnicalViewerProps) {
  const [view, setView] = useState<'body' | 'assembly'>(assemblyUrl ? 'assembly' : 'body');
  
  const currentUrl = view === 'body' ? bodyUrl : assemblyUrl;

  return (
    <div className="technical-viewer flex flex-col" style={{ height: '100%' }}>
      {/* Tab Toggles */}
      {(bodyUrl && assemblyUrl) && (
        <div className="flex" style={{ borderBottom: '1px solid var(--color-border-color)', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setView('assembly')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: 'none',
              borderBottom: view === 'assembly' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: view === 'assembly' ? 'var(--color-primary)' : 'var(--color-gray-dark)',
              fontWeight: view === 'assembly' ? 700 : 500,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Assembly Part
          </button>
          <button
            onClick={() => setView('body')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: 'none',
              borderBottom: view === 'body' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: view === 'body' ? 'var(--color-primary)' : 'var(--color-gray-dark)',
              fontWeight: view === 'body' ? 700 : 500,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Body Part
          </button>
        </div>
      )}

      {/* Image Display */}
      <div 
        className="viewer-container" 
        style={{ 
          flexGrow: 1, 
          background: 'var(--color-bg-white)', 
          border: '1px solid var(--color-border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          position: 'relative',
          minHeight: '400px'
        }}
      >
        {currentUrl ? (
          <img 
            src={currentUrl} 
            alt={`${productName} - ${view} view`} 
            style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
          />
        ) : (
          <div style={{ color: 'var(--color-gray-dark)', fontSize: '0.875rem' }}>
            No technical drawing available.
          </div>
        )}
        
        {currentUrl && (
          <a 
            href={currentUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'var(--color-bg-gray)',
              border: '1px solid var(--color-border-color)',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-navy)',
              textDecoration: 'none',
              borderRadius: 'var(--radius-sm)'
            }}
            title="Enlarge Image"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
