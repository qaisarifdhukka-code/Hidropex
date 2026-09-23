import React, { useState } from 'react';

const plantData = [
    { 
        id: '01', 
        name: 'THANE', 
        capability: 'Hydraulic fittings manufacturing', 
        location: 'Wagle Industrial Estate, Thane, Maharashtra', 
        network: "Part of HIDROPEX's six-facility manufacturing network.", 
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg' 
    },
    { 
        id: '02', 
        name: 'SHIRWAL', 
        capability: 'Advanced CNC Machining', 
        location: 'Shirwal Industrial Area, Pune', 
        network: "Part of HIDROPEX's six-facility manufacturing network.", 
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/ASITENCIA-TECNICA-2-611x400.png' 
    },
    { 
        id: '03', 
        name: 'KAVATHE', 
        capability: 'Assembly and Testing', 
        location: 'Kavathe Mahankal, Sangli', 
        network: "Part of HIDROPEX's six-facility manufacturing network.", 
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02733-640x400.jpg' 
    },
    { 
        id: '04', 
        name: 'NASHIK', 
        capability: 'Forging and Raw Material Processing', 
        location: 'Ambad MIDC, Nashik', 
        network: "Part of HIDROPEX's six-facility manufacturing network.", 
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/IMAGENESSERVICIO-TERRENO-2-2-611x400.png' 
    },
    { 
        id: '05', 
        name: 'PITHAMPUR I', 
        capability: 'High Volume DIN Fittings', 
        location: 'Sector 3, Pithampur, Madhya Pradesh', 
        network: "Part of HIDROPEX's six-facility manufacturing network.", 
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/1780319596630-640x400.jpg' 
    },
    { 
        id: '06', 
        name: 'PITHAMPUR II', 
        capability: 'Custom OEM Machining', 
        location: 'Sector 1, Pithampur, Madhya Pradesh', 
        network: "Part of HIDROPEX's six-facility manufacturing network.", 
        img: 'https://www.hidropex.cl/wp-content/uploads/2026/06/DSC02870-640x400.jpg' 
    }
];

export default function PlantIndex() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = plantData[activeIndex];

    return (
        <section id="company" className="section section-bg-gray">
            <div className="container">
                <div className="flex items-start" style={{ marginBottom: '2rem' }}>
                    <h2 className="text-xs flex flex-col-mobile gap-2" style={{ alignItems: 'flex-start' }}>
                        <div className="flex items-center gap-2" style={{ letterSpacing: '0.1em' }}>OUR MANUFACTURING NETWORK</div>
                        <span className="text-muted" style={{ fontWeight: 500, fontSize: '0.7rem' }}>PLANT INDEX</span>
                    </h2>
                </div>

                <div className="grid grid-plant fade-in" style={{ borderRadius: '0', overflow: 'visible', border: 'none' }}>
                    {/* Sidebar Nav */}
                    <div className="plant-nav flex flex-col">
                        {plantData.map((item, i) => (
                            <button 
                                key={item.id}
                                className={`btn ${activeIndex === i ? 'btn-primary' : ''}`}
                                style={{ 
                                    justifyContent: 'flex-start', 
                                    borderRadius: 0, 
                                    backgroundColor: activeIndex === i ? 'var(--color-primary)' : 'transparent',
                                    color: activeIndex === i ? 'white' : 'var(--color-navy)',
                                    border: `1px solid ${activeIndex === i ? 'var(--color-primary)' : 'var(--color-border-color)'}`,
                                    borderBottom: (i === plantData.length - 1 || activeIndex === i) ? `1px solid ${activeIndex === i ? 'var(--color-primary)' : 'var(--color-border-color)'}` : 'none',
                                    marginBottom: '0',
                                    fontWeight: 700
                                }}
                                onClick={() => setActiveIndex(i)}
                            >
                                <span style={{ fontSize: '0.875rem' }}>{item.id} {item.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Image Area */}
                    <div className="plant-img" style={{ position: 'relative', height: '100%', minHeight: '340px' }}>
                        <img src={activeItem.img} alt={activeItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                    </div>

                    {/* Data Panel */}
                    <div className="plant-data flex flex-col" style={{ padding: '0', color: 'var(--color-navy)' }}>
                        <h4 className="text-xs" style={{ marginBottom: '1.5rem', color: 'var(--color-gray-dark)' }}>SELECTED: {activeItem.name}</h4>
                        
                        <div className="flex flex-col gap-1" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-color)', paddingBottom: '1rem' }}>
                            <span className="text-xs text-muted">FACILITY CAPABILITY</span>
                            <span className="text-base font-bold" style={{ color: 'var(--color-navy)' }}>{activeItem.capability}</span>
                        </div>
                        
                        <div className="flex flex-col gap-1" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-color)', paddingBottom: '1rem' }}>
                            <span className="text-xs text-muted">LOCATION</span>
                            <span className="text-base font-bold" style={{ color: 'var(--color-navy)' }}>{activeItem.location}</span>
                        </div>
                        
                        <div className="flex flex-col gap-1" style={{ marginBottom: '1.5rem' }}>
                            <span className="text-xs text-muted">NETWORK</span>
                            <span className="text-base font-bold" style={{ color: 'var(--color-navy)' }}>{activeItem.network}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
