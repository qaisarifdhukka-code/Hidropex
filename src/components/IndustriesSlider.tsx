import React from 'react';

const indData = [
    { title: 'AGRICULTURE', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/ASITENCIA-TECNICA-2-611x400.png' },
    { title: 'CONSTRUCTION', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02733-640x400.jpg' },
    { title: 'MINING', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/1780319596630-640x400.jpg' },
    { title: 'MATERIAL HANDLING', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg' },
    { title: 'INDUSTRIAL', img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/IMAGENESSERVICIO-TERRENO-2-2-611x400.png' }
];

export default function IndustriesSlider() {
    return (
        <section id="industries" className="section" style={{ overflow: 'hidden' }}>
            <div className="container">
                <div className="flex justify-between items-start flex-col-mobile gap-4" style={{ marginBottom: '2rem' }}>
                    <h2 className="text-xs flex flex-col-mobile gap-2" style={{ alignItems: 'flex-start' }}>
                        <div className="flex items-center gap-2"><span className="text-primary">05</span> DEMANDING APPLICATIONS</div>
                        <span className="text-muted" style={{ fontWeight: 500, fontSize: '0.7rem' }}>INDUSTRIES SERVED</span>
                    </h2>
                    <a href="#company" className="btn btn-ghost text-xs" style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>VIEW ALL INDUSTRIES ↗</a>
                </div>

                <div className="ind-slider flex gap-4" style={{ overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}>
                    {indData.map((item, i) => (
                        <div key={i} className="ind-card flex-shrink-0" style={{ width: '300px', scrollSnapAlign: 'start' }}>
                            <div className="img-box" style={{ aspectRatio: '4/5', marginBottom: '1rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative' }}>
                                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,26,36,0.9), transparent 60%)' }}></div>
                                <h3 className="text-xl text-white" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', fontWeight: 600 }}>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                    {/* Empty div for padding at the end of scroll */}
                    <div className="flex-shrink-0" style={{ width: '2rem' }}></div>
                </div>
            </div>
        </section>
    );
}
