import React, { useState, useRef, useEffect } from 'react';

const timelineData = [
    { year: '1978', subtitle: 'THE BEGINNING', activeTitle: 'FOUNDATION & ORIGINS.', text: 'Hidropex established in Mumbai, India to manufacture precision hydraulic fittings.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02733-640x400.jpg' },
    { year: '-', subtitle: 'EXPANDING RANGE', activeTitle: 'EXPANDING PRODUCT RANGE.', text: 'Introduction of JIC and ORFS fitting lines to support diverse machinery needs.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/ASITENCIA-TECNICA-2-611x400.png' },
    { year: '-', subtitle: 'ADVANCING MFG', activeTitle: 'ADVANCING MANUFACTURING.', text: 'Implementation of automated CNC cells and high-precision machining centers.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/IMAGENESSERVICIO-TERRENO-2-2-611x400.png' },
    { year: '-', subtitle: 'SUPPORTING OEM', activeTitle: 'SUPPORTING GLOBAL OEMs.', text: 'Achieved critical automotive and industrial OEM certifications to supply top-tier manufacturers.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/1780319596630-640x400.jpg' },
    { year: '-', subtitle: 'GLOBAL SUPPLY', activeTitle: 'GLOBAL SUPPLY NETWORK.', text: 'Opened distribution logistics hubs to ensure JIT delivery worldwide.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg' },
    { year: 'TODAY', subtitle: 'GLOBAL MFG', activeTitle: 'GLOBAL MANUFACTURING. ENGINEERING-LED.', text: 'With decades of experience in hydraulic fittings, HIDROPEX now serves industrial applications across India and international markets.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-1280x720.jpg' }
];

export default function HeritageTimeline() {
    const [activeIndex, setActiveIndex] = useState(0); // Start at the beginning
    const activeItem = timelineData[activeIndex];
    
    const [startX, setStartX] = useState<number | null>(null);

    // Auto-play effect
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev === timelineData.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [activeIndex]);

    const handlePointerDown = (e: React.PointerEvent) => {
        setStartX(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (startX === null) return;
        const diff = startX - e.clientX;
        
        if (diff > 50) {
            // Dragged left -> go to next item
            setActiveIndex(prev => Math.min(prev + 1, timelineData.length - 1));
        } else if (diff < -50) {
            // Dragged right -> go to previous item
            setActiveIndex(prev => Math.max(prev - 1, 0));
        }
        setStartX(null);
    };

    return (
        <section id="company" className="section">
            <div className="container">
                <div className="flex flex-col items-center justify-center" style={{ marginBottom: '2.5rem' }}>
                    <h2 className="text-2xl text-center" style={{ fontWeight: 400, letterSpacing: '0.05em', color: 'var(--color-primary)', margin: 0 }}>
                        ENGINEERING CONNECTIONS SINCE 1978
                    </h2>
                    <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-primary)', marginTop: '0.75rem' }}></div>
                </div>

                <div className="timeline-nav flex justify-between" style={{ marginBottom: '2rem', position: 'relative', alignItems: 'flex-start' }}>
                    <div className="timeline-line">
                        <div 
                            style={{ 
                                height: '100%', 
                                background: 'var(--color-primary)', 
                                width: `${(activeIndex / (timelineData.length - 1)) * 100}%`,
                                transition: 'width 0.3s ease'
                            }} 
                        />
                    </div>
                    {timelineData.map((item, i) => (
                        <div 
                            key={i} 
                            className="flex flex-col items-center gap-1"
                            style={{ cursor: 'pointer', zIndex: 1 }}
                            onClick={() => setActiveIndex(i)}
                        >
                            <div style={{ 
                                width: '16px', 
                                height: '16px', 
                                borderRadius: '50%', 
                                background: activeIndex === i ? 'var(--color-navy-dark)' : 'var(--color-bg-white)', 
                                border: activeIndex === i ? 'none' : (i < activeIndex ? '2px solid var(--color-primary)' : '2px solid var(--color-border-color)')
                            }}></div>
                            <span className={`text-sm font-bold ${item.year === '-' ? 'text-transparent' : ''}`} style={{ opacity: item.year === '-' ? 0 : 1 }}>
                                {item.year}
                            </span>
                            <span className="text-xs text-muted" style={{ color: activeIndex === i ? 'var(--color-primary)' : undefined }}>
                                {item.subtitle}
                            </span>
                        </div>
                    ))}
                </div>

                <div 
                    className="timeline-content-wrapper"
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    style={{ touchAction: 'pan-y', cursor: startX !== null ? 'grabbing' : 'grab', userSelect: 'none' }}
                >
                    <div className="grid grid-2 gap-4 fade-in" key={activeIndex} style={{ pointerEvents: 'none' }}>
                        <div className="timeline-img">
                            <div className="img-box" style={{ aspectRatio: '21/9', borderRadius: 'var(--radius-sm)', padding: 0, overflow: 'hidden' }}>
                                <img src={activeItem.img} alt={activeItem.activeTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="card flex flex-col justify-center">
                            <span className="text-xs text-muted">{activeItem.year === '-' ? activeItem.subtitle : activeItem.year}</span>
                            <h3 className="text-2xl text-primary" style={{ marginBottom: '1rem' }}>{activeItem.activeTitle}</h3>
                            <p className="text-sm">{activeItem.text}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4" style={{ marginTop: '2rem' }}>
                    <button 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s', width: '44px', height: '44px', flexShrink: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} 
                        onClick={() => setActiveIndex(prev => Math.max(prev - 1, 0))}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.transform = 'translateX(-2px)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'none'; }}
                        aria-label="Previous Timeline Item"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s', width: '44px', height: '44px', flexShrink: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} 
                        onClick={() => setActiveIndex(prev => Math.min(prev + 1, timelineData.length - 1))}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.transform = 'translateX(2px)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'none'; }}
                        aria-label="Next Timeline Item"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
