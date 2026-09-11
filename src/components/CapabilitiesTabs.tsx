import React, { useState } from 'react';

const processData = [
    { id: '01', title: 'MATERIAL', desc: 'HIDROPEX uses traceable raw materials and precision forging. Rigorous incoming material inspection guarantees metallurgical integrity.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg' },
    { id: '02', title: 'DEVELOPMENT', desc: 'Application engineering and rapid prototyping. We work closely with OEM teams to develop robust connection solutions.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/ASITENCIA-TECNICA-2-611x400.png' },
    { id: '03', title: 'MACHINING', desc: 'Advanced CNC machining centers operating in ISO 9001 certified facilities ensure tight tolerances and repeatable accuracy.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02733-640x400.jpg' },
    { id: '04', title: 'INSPECTION', desc: 'In-process quality control, CMM measurements, and automated vision systems ensure zero-defect compliance.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/IMAGENESSERVICIO-TERRENO-2-2-611x400.png' },
    { id: '05', title: 'TESTING', desc: 'Pressure testing, burst testing, and impulse testing guarantee reliable performance under extreme hydraulic conditions.', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/1780319596630-640x400.jpg' }
];

export default function CapabilitiesTabs() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = processData[activeIndex];

    return (
        <section id="capabilities" className="section">
            <div className="container">
                <div className="flex justify-between items-start" style={{ marginBottom: '1.5rem' }}>
                    <h2 className="text-xs flex flex-col-mobile gap-2" style={{ alignItems: 'flex-start' }}>
                        <div className="flex items-center gap-2"><span className="text-primary">03</span> HOW HIDROPEX BUILDS RELIABILITY</div>
                        <span className="text-muted" style={{ fontWeight: 500, fontSize: '0.7rem' }}>HORIZONTAL PROCESS STORY</span>
                    </h2>
                </div>

                <div className="flex gap-4 scroll-x-mobile" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-border-color)', paddingBottom: '1rem' }}>
                    {processData.map((item, i) => (
                        <button 
                            key={item.id}
                            className={`btn ${activeIndex === i ? 'btn-primary' : 'btn-outline'}`} 
                            style={{ padding: '0.5rem 1rem', borderColor: activeIndex === i ? 'var(--color-primary)' : 'transparent' }}
                            onClick={() => setActiveIndex(i)}
                        >
                            {item.id} {item.title}
                        </button>
                    ))}
                </div>

                <div className="grid grid-2 gap-4 items-center fade-in" key={activeIndex}>
                    <div className="img-box" style={{ aspectRatio: '16/9', maxHeight: '380px', borderRadius: 'var(--radius-sm)', padding: 0, overflow: 'hidden' }}>
                        <img src={activeItem.img} alt={activeItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="flex flex-col gap-2" style={{ maxWidth: '500px', paddingLeft: '2rem' }}>
                        <span className="text-xs text-muted">STEP {activeItem.id}</span>
                        <h3 className="text-3xl text-primary" style={{ marginBottom: '0.5rem' }}>{activeItem.title}</h3>
                        <p className="text-base text-muted" style={{ lineHeight: 1.5 }}>{activeItem.desc}</p>
                        <div className="flex gap-2" style={{ marginTop: '1rem' }}>
                            <button 
                                className="btn btn-outline flex items-center justify-center" 
                                style={{ width: '48px', height: '48px', padding: 0, fontSize: '1.5rem', fontWeight: 300 }}
                                onClick={() => setActiveIndex(prev => prev === 0 ? processData.length - 1 : prev - 1)}
                            >
                                ‹
                            </button>
                            <button 
                                className="btn btn-outline flex items-center justify-center" 
                                style={{ width: '48px', height: '48px', padding: 0, fontSize: '1.5rem', fontWeight: 300 }}
                                onClick={() => setActiveIndex(prev => prev === processData.length - 1 ? 0 : prev + 1)}
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
