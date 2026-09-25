import React, { useState, useEffect } from 'react';

type ProductItem = {
    id: string;
    family: string;
    title: string;
    desc: string;
    img: string;
    brochure?: string;
};

const productData: ProductItem[] = [
    { id: '01', family: 'DIN', title: 'DIN METRIC FITTINGS', desc: 'Hydraulic tube connection systems manufactured for demanding industrial applications. The range includes fittings and connection components for hydraulic systems requiring reliable, repeatable performance.', img: 'https://www.hy-techengineers.com/images/product1.jpg' },
    { id: '02', family: 'JIC', title: 'JIC TUBE FITTINGS', desc: 'Standard 37° flare fittings for reliable high-pressure fluid power systems. Engineered for high performance and easy assembly.', img: 'https://www.hy-techengineers.com/images/product3.jpg' },
    { id: '03', family: 'ORFS', title: 'ORFS FITTINGS', desc: 'O-Ring Face Seal fittings providing leak-free connections for high-vibration applications. Designed for zero-clearance installations.', img: 'https://www.hy-techengineers.com/images/product2.jpg' },
    { id: '04', family: 'CONVERSION', title: 'CONVERSION ADAPTORS', desc: 'Versatile adaptors to transition between various thread types. Ensuring seamless integration across different fluid handling systems.', img: 'https://www.hy-techengineers.com/images/double-ferrule-compression-fittings1.jpg' },
    { id: '05', family: 'D. FERRULE', title: 'DOUBLE FERRULE', desc: 'Double ferrule compression fittings for leak-tight gas and fluid connections. Ideal for instrumentation and process control.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg' },
    { id: '06', family: 'CUSTOM', title: 'CUSTOM FITTINGS', desc: 'Precision-engineered fittings designed to OEM specifications. Fast prototyping and reliable mass manufacturing.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02733-640x400.jpg' }
];

export default function ProductSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? productData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === productData.length - 1 ? 0 : prev + 1));
    };

    // Auto-play effect
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const currentItem = productData[currentIndex];

    // Enable simple swipe detection
    let touchstartX = 0;
    const handleTouchStart = (e: React.TouchEvent) => { touchstartX = e.changedTouches[0].screenX; };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchendX = e.changedTouches[0].screenX;
        if (touchendX < touchstartX - 50) handleNext();
        if (touchendX > touchstartX + 50) handlePrev();
    };

    return (
        <section id="products" className="section" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
            <div className="container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                
                {/* Header (Centered, No Numbers) */}
                <div className="flex flex-col items-center" style={{ marginBottom: '2.5rem' }}>
                    <h2 className="text-2xl m-0" style={{ fontWeight: 400, letterSpacing: '0.05em', color: 'var(--color-primary)' }}>
                        OUR PRODUCTS
                    </h2>
                    <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-primary)', marginTop: '0.75rem' }}></div>
                </div>

                <div 
                    className="grid grid-2 items-center gap-4 fade-in" 
                    key={currentIndex}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="product-slider-img">
                        <div className="img-box" style={{ aspectRatio: '16/9', maxHeight: '400px', borderRadius: 'var(--radius-sm)', padding: 0, overflow: 'hidden', background: 'white' }}>
                            <img 
                                src={currentItem.img} 
                                alt={currentItem.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }} 
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'} 
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} 
                            />
                        </div>
                    </div>
                    <div className="product-slider-info flex flex-col gap-2 pl-desktop-2" style={{ maxWidth: '400px' }}>
                        <span className="text-xs text-muted">PRODUCT FAMILY</span>
                        <h3 className="text-2xl text-primary" style={{ marginBottom: '0.5rem' }}>{currentItem.title}</h3>
                        <p className="text-sm" style={{ marginBottom: '1.5rem' }}>{currentItem.desc}</p>
                        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                            <a href="/contact" className="btn btn-outline">REQUEST A QUOTE ↗</a>
                            <a href={currentItem.brochure ? `/brochures/${currentItem.brochure}` : '/brochures/Hidropex_Catalogue.pdf'} download className="btn btn-primary">
                                DOWNLOAD BROCHURE ↓
                            </a>
                        </div>
                    </div>
                </div>

                {/* Slider Navigator */}
                <div className="slider-controls flex items-center justify-between gap-4" style={{ marginTop: '2.5rem', width: '100%' }}>
                    <button 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s', width: '44px', height: '44px', flexShrink: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} 
                        onClick={handlePrev}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.transform = 'translateX(-2px)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'none'; }}
                        aria-label="Previous Slide"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    
                    <div className="slider-track" style={{ display: 'flex', gap: '4px', flex: 1 }}>
                        {productData.map((_, i) => (
                            <div key={i} style={{ height: '3px', flex: 1, background: i <= currentIndex ? 'var(--color-primary)' : 'var(--color-border-color)', borderRadius: '2px', transition: 'background 0.3s ease' }}></div>
                        ))}
                    </div>
                    
                    <div className="text-xs flex gap-4 text-muted slider-nav-text" style={{ margin: '0 1rem', overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '4px' }}>
                        {productData.map((item, i) => (
                            <span 
                                key={item.id}
                                onClick={() => setCurrentIndex(i)}
                                className={`interactive-tab ${i === currentIndex ? 'active text-primary font-bold' : 'text-muted'}`}
                                style={{ cursor: 'pointer', transition: 'color 0.2s ease' }}
                                onMouseOver={(e) => { if (i !== currentIndex) e.currentTarget.style.color = '#1e293b'; }}
                                onMouseOut={(e) => { if (i !== currentIndex) e.currentTarget.style.color = 'var(--color-muted)'; }}
                            >
                                {item.family}
                            </span>
                        ))}
                    </div>

                    <button 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s', width: '44px', height: '44px', flexShrink: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} 
                        onClick={handleNext}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.transform = 'translateX(2px)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'none'; }}
                        aria-label="Next Slide"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
