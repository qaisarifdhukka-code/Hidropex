import React, { useState } from 'react';

const mapData = [
    { 
        id: 'INDIA', 
        manufacturing: 'Six manufacturing facilities across Maharashtra and Madhya Pradesh.',
        engineering: 'Design, development, machining, forging and testing capabilities.',
        supply: 'Supporting OEM and industrial applications.',
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02733-640x400.jpg'
    },
    { 
        id: 'NORTH AMERICA', 
        manufacturing: 'Strategic partnerships with local manufacturers.',
        engineering: 'Localized technical support and application engineering.',
        supply: 'Expanding distribution network across North America for standard fluid power connectors.',
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg'
    },
    { 
        id: 'EUROPE', 
        manufacturing: 'Assembly and customization center.',
        engineering: 'Compliance testing for DIN and ISO standards.',
        supply: 'European logistics center providing JIT delivery for EU-based customers.',
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/1780319596630-640x400.jpg'
    },
    { 
        id: 'MIDDLE EAST', 
        manufacturing: 'Regional warehousing.',
        engineering: 'On-site technical consultation.',
        supply: 'Strategic distribution partnerships for heavy machinery and oil/gas sectors.',
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/ASITENCIA-TECNICA-2-611x400.png'
    },
    { 
        id: 'AFRICA', 
        manufacturing: 'Stocking distributors in key regions.',
        engineering: 'Field support for heavy equipment.',
        supply: 'Supporting mining and construction equipment across the continent.',
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/IMAGENESSERVICIO-TERRENO-2-2-611x400.png'
    },
    { 
        id: 'SOUTHEAST ASIA', 
        manufacturing: 'Regional distribution hub.',
        engineering: 'Application-specific engineering support.',
        supply: 'Partnerships supporting heavy machinery and construction equipment manufacturers.',
        img: 'https://www.hy-techengineers.com/images/product3.jpg'
    }
];

export default function GlobalPresenceMap() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = mapData[activeIndex];

    return (
        <section className="section section-bg-gray">
            <div className="container">
                <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                    <h2 className="text-xs flex flex-col-mobile gap-2" style={{ alignItems: 'flex-start' }}>
                        <div className="flex items-center gap-2" style={{ letterSpacing: '0.1em' }}>GLOBAL PRESENCE</div>
                        <span className="text-muted" style={{ fontWeight: 500, fontSize: '0.7rem' }}>BUILT IN INDIA. SUPPLIED ACROSS MARKETS.</span>
                    </h2>
                </div>

                <div className="flex gap-2 scroll-x-mobile" style={{ marginBottom: '2rem' }}>
                    {mapData.map((item, i) => (
                        <button 
                            key={item.id}
                            className={`btn ${activeIndex === i ? 'btn-primary' : 'btn-outline'}`}
                            style={{ 
                                padding: '0.5rem 1.5rem', 
                                borderColor: activeIndex === i ? 'transparent' : 'var(--color-border-color)' 
                            }}
                            onClick={() => setActiveIndex(i)}
                        >
                            {item.id}
                        </button>
                    ))}
                </div>

                <div className="grid grid-map gap-4 items-center fade-in" key={activeIndex}>
                    <div className="map-img">
                        <div className="img-box" style={{ aspectRatio: '21/9', borderRadius: 'var(--radius-sm)', padding: 0, overflow: 'hidden' }}>
                            <img src={activeItem.img} alt={`Global Supply Network - ${activeItem.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="text-xs text-muted" style={{ textTransform: 'uppercase' }}>SELECTED REGION: {activeItem.id}</span>
                            <div className="text-xs text-muted" style={{ marginTop: '1rem' }}>MANUFACTURING</div>
                            <div className="text-sm" style={{ fontWeight: 600 }}>{activeItem.manufacturing}</div>
                        </div>
                        <div style={{ height: '1px', background: 'var(--color-border-color)' }}></div>
                        <div>
                            <div className="text-xs text-muted">ENGINEERING</div>
                            <div className="text-sm" style={{ fontWeight: 600 }}>{activeItem.engineering}</div>
                        </div>
                        <div style={{ height: '1px', background: 'var(--color-border-color)' }}></div>
                        <div>
                            <div className="text-xs text-muted">SUPPLY</div>
                            <div className="text-sm" style={{ fontWeight: 600 }}>{activeItem.supply}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
