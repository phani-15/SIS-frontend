import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { label: 'Student', path: '/login' },
        { label: 'HOD', path: '/hod' },
        { label: 'Administrators', path: '/administrator' },
        { label: 'Admin', path: '/admin' },
        { label: 'About Us', path: '/about' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Font imports - consider moving to index.html or global CSS */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-slideDown {
                    animation: slideDown 0.22s ease;
                }
            `}</style>

            <nav className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-purple-100/97 shadow-[0_4px_30px_rgba(138,46,136,0.08)]' 
                    : 'bg-purple-100/92 backdrop-blur-xl border-b border-[#8A2E88]/10'
            }`}>
                <div className="max-w-7xl mx-auto px-6 h-18 md:h-18 grid grid-cols-[1fr_auto_1fr] items-center gap-4">

                    {/* Left — Logo */}
                    <div 
                        className="flex items-center gap-3 cursor-pointer select-none w-fit"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-11 h-11 bg-linear-to-br from-[#8A2E88] to-[#C084C8] rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(138,46,136,0.28)] transition-all duration-250 hover:scale-108 hover:-rotate-3 hover:shadow-[0_6px_22px_rgba(138,46,136,0.38)] shrink-0">
                            <GraduationCap size={22} color="#fff" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-['Comfortaa'] font-bold text-[1.15rem] text-[#7B2282] tracking-tight">
                                Student InfoSys
                            </span>
                            <span className="font-['DM_Sans'] font-medium text-[0.72rem] text-[#9E7AAE] tracking-wide mt-0.5">
                                JNTU-GV Vizianagaram
                            </span>
                        </div>
                    </div>

                    {/* Center — Nav Items (Desktop) */}
                    <ul className="hidden md:flex items-center gap-0.5 justify-center list-none m-0 p-0">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <button
                                    className="relative font-['DM_Sans'] font-medium text-[0.9rem] text-[#4A3360] px-4 py-2 bg-transparent cursor-pointer rounded-lg transition-colors duration-200 whitespace-nowrap tracking-wide hover:text-[#8A2E88] hover:bg-[#8A2E88]/6 group"
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.label}
                                    <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded bg-linear-to-r from-[#8A2E88] to-[#C084C8] scale-x-0 origin-left transition-transform duration-280 ease-in-out group-hover:scale-x-100" />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Right — Placeholder (Desktop) */}
                    <div className="hidden md:flex justify-end items-center" />

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className="md:hidden bg-transparent border-none p-2 rounded-lg text-[#8A2E88] cursor-pointer transition-colors duration-200 hover:bg-[#8A2E88]/8 flex items-center justify-center"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Drawer */}
                <div className={`md:hidden flex flex-col bg-white border-t border-[#8A2E88]/10 px-4 pb-4 pt-3 gap-1 shadow-[0_12px_30px_rgba(138,46,136,0.08)] overflow-hidden transition-all duration-200 ${
                    mobileMenuOpen ? 'max-h-96 opacity-100 animate-slideDown' : 'max-h-0 opacity-0'
                }`}>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            className="flex items-center gap-2.5 px-3.5 py-3 bg-transparent border-none rounded-xl font-['DM_Sans'] font-medium text-[0.92rem] text-[#4A3360] cursor-pointer text-left transition-all duration-200 hover:bg-linear-to-br hover:from-[#8A2E88]/9 hover:to-[#C084C8]/9 hover:text-[#8A2E88] hover:translate-x-1"
                            onClick={() => {
                                navigate(item.path);
                                setMobileMenuOpen(false);
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-linear-to-br from-[#8A2E88] to-[#C084C8] shrink-0 opacity-70" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}