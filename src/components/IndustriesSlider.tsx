import React, { useState, useEffect } from 'react';

const indData = [
    { title: 'AGRICULTURE', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/ASITENCIA-TECNICA-2-611x400.png', desc: 'High-performance fittings for heavy-duty farming equipment.' },
    { title: 'CONSTRUCTION', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02733-640x400.jpg', desc: 'Robust connections designed for extreme on-site environments.' },
    { title: 'MINING', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/1780319596630-640x400.jpg', desc: 'Ultra-durable components for abrasive and high-pressure mining applications.' },
    { title: 'MATERIAL HANDLING', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg', desc: 'Reliable hydraulics for forklifts, cranes, and logistics machinery.' },
    { title: 'INDUSTRIAL', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/IMAGENESSERVICIO-TERRENO-2-2-611x400.png', desc: 'Precision-engineered fittings for manufacturing and factory automation.' }
];

export default function IndustriesSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Show 2 items at a time
    const itemsToShow = 2;
    const maxIndex = Math.ceil(indData.length / itemsToShow) - 1;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            handleNext();
        }, 4000);
        return () => clearInterval(timer);
    }, [isHovered, currentIndex]); // Added currentIndex to reset timer on manual click

    // Get the two items for the current page
    const startIndex = currentIndex * itemsToShow;
    const currentItems = indData.slice(startIndex, startIndex + itemsToShow);

    // If we are on the last page and there's only 1 item, we can fill the second slot with the first item to keep the 2-column layout full
    if (currentItems.length < itemsToShow) {
        currentItems.push(indData[0]);
    }

    return (
        <section id="industries" className="section" style={{ paddingBottom: '4rem' }}>
            <div className="container">
                <div className="flex justify-between items-start flex-col-mobile gap-4" style={{ marginBottom: '2rem' }}>
                    <h2 className="text-xs flex flex-col-mobile gap-2" style={{ alignItems: 'flex-start' }}>
                        <div className="flex items-center gap-2" style={{ letterSpacing: '0.1em' }}>DEMANDING APPLICATIONS</div>
                        <span className="text-muted" style={{ fontWeight: 500, fontSize: '0.7rem' }}>INDUSTRIES SERVED</span>
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <button 
                                onClick={handlePrev}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s', width: '40px', height: '40px' }}
                                onMouseOver={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button 
                                onClick={handleNext}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s', width: '40px', height: '40px' }}
                                onMouseOver={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div 
                    className="grid grid-2 grid-1-mobile gap-4" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ minHeight: '400px' }}
                >
                    {currentItems.map((item, i) => (
                        <div 
                            key={`${currentIndex}-${i}`} 
                            className="fade-in"
                            style={{ 
                                position: 'relative', 
                                borderRadius: 'var(--radius-sm)', 
                                overflow: 'hidden', 
                                height: '400px',
                                cursor: 'pointer'
                            }}
                        >
                            <img 
                                src={item.img} 
                                alt={item.title} 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover', 
                                    transition: 'transform 0.5s ease' 
                                }} 
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'} 
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} 
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,18,30,0.9), transparent 60%)', pointerEvents: 'none' }}></div>
                            
                            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', pointerEvents: 'none' }}>
                                <h3 className="text-2xl text-white" style={{ marginBottom: '0.5rem', fontWeight: 600 }}>{item.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.desc}</p>
                                <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Explore Solutions <span style={{ color: 'var(--color-primary)' }}>→</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-4" style={{ marginTop: '1.5rem' }}>
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            style={{ 
                                width: '8px', 
                                height: '8px', 
                                borderRadius: '50%', 
                                padding: 0,
                                border: 'none',
                                background: currentIndex === i ? 'var(--color-primary)' : '#cbd5e1',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
