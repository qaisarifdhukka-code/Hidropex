import React, { useState } from 'react';

const timelineData = [
    { year: '1978', subtitle: 'THE BEGINNING', activeTitle: 'FOUNDATION & ORIGINS.', text: 'Hidropex established in Mumbai, India to manufacture precision hydraulic fittings.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02733-640x400.jpg' },
    { year: '-', subtitle: 'EXPANDING RANGE', activeTitle: 'EXPANDING PRODUCT RANGE.', text: 'Introduction of JIC and ORFS fitting lines to support diverse machinery needs.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/ASITENCIA-TECNICA-2-611x400.png' },
    { year: '-', subtitle: 'ADVANCING MFG', activeTitle: 'ADVANCING MANUFACTURING.', text: 'Implementation of automated CNC cells and high-precision machining centers.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/IMAGENESSERVICIO-TERRENO-2-2-611x400.png' },
    { year: '-', subtitle: 'SUPPORTING OEM', activeTitle: 'SUPPORTING GLOBAL OEMs.', text: 'Achieved critical automotive and industrial OEM certifications to supply top-tier manufacturers.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/1780319596630-640x400.jpg' },
    { year: '-', subtitle: 'GLOBAL SUPPLY', activeTitle: 'GLOBAL SUPPLY NETWORK.', text: 'Opened distribution logistics hubs to ensure JIT delivery worldwide.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg' },
    { year: 'TODAY', subtitle: 'GLOBAL MFG', activeTitle: 'GLOBAL MANUFACTURING. ENGINEERING-LED.', text: 'With decades of experience in hydraulic fittings, HIDROPEX now serves industrial applications across India and international markets.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-1280x720.jpg' }
];

export default function HeritageTimeline() {
    const [activeIndex, setActiveIndex] = useState(5); // Default to 'TODAY' as in prototype
    const activeItem = timelineData[activeIndex];

    return (
        <section id="company" className="section">
            <div className="container">
                <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                    <h2 className="text-xs" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span className="text-primary">07</span> ENGINEERING CONNECTIONS SINCE 1978
                    </h2>
                </div>

                <div className="timeline-nav flex justify-between" style={{ marginBottom: '2rem', position: 'relative', alignItems: 'flex-start' }}>
                    <div className="timeline-line"></div>
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

                <div className="grid grid-2 gap-4 fade-in" key={activeIndex}>
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

                <div className="text-center text-xs text-muted" style={{ marginTop: '2rem' }}>
                    ‹ DRAG TO EXPLORE ›
                </div>
            </div>
        </section>
    );
}
