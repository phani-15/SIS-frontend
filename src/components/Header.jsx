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
        { label: 'Administrators', path: '/ofc' },
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
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

                .header-nav {
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(138, 46, 136, 0.1);
                    transition: box-shadow 0.3s ease, background 0.3s ease;
                }

                .header-nav.scrolled {
                    box-shadow: 0 4px 30px rgba(138, 46, 136, 0.08);
                    background: rgba(255, 255, 255, 0.97);
                }

                .header-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    height: 72px;
                    gap: 1rem;
                }

                /* Logo */
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    text-decoration: none;
                    width: fit-content;
                }

                .logo-icon {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, #8A2E88 0%, #C084C8 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 16px rgba(138, 46, 136, 0.28);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                    flex-shrink: 0;
                }

                .logo:hover .logo-icon {
                    transform: scale(1.08) rotate(-3deg);
                    box-shadow: 0 6px 22px rgba(138, 46, 136, 0.38);
                }

                .logo-text-wrap {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.1;
                }

                .logo-title {
                    font-family: 'Comfortaa', cursive;
                    font-weight: 700;
                    font-size: 1.15rem;
                    color: #7B2282;
                    letter-spacing: -0.01em;
                }

                .logo-subtitle {
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 500;
                    font-size: 0.72rem;
                    color: #9E7AAE;
                    letter-spacing: 0.02em;
                    margin-top: 1px;
                }

                /* Desktop Menu — centered via grid */
                .desktop-menu {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    justify-content: center;
                }

                .nav-btn {
                    position: relative;
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 500;
                    font-size: 0.9rem;
                    color: #4A3360;
                    padding: 8px 16px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    border-radius: 10px;
                    transition: color 0.2s ease, background 0.2s ease;
                    white-space: nowrap;
                    letter-spacing: 0.01em;
                }

                .nav-btn::after {
                    content: '';
                    position: absolute;
                    bottom: 4px;
                    left: 16px;
                    right: 16px;
                    height: 2px;
                    border-radius: 2px;
                    background: linear-gradient(90deg, #8A2E88, #C084C8);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .nav-btn:hover {
                    color: #8A2E88;
                    background: rgba(138, 46, 136, 0.06);
                }

                .nav-btn:hover::after {
                    transform: scaleX(1);
                }

                /* Right placeholder to keep grid balanced */
                .header-right {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                /* Mobile toggle */
                .mobile-toggle {
                    display: none;
                    background: none;
                    border: none;
                    padding: 8px;
                    border-radius: 10px;
                    color: #8A2E88;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .mobile-toggle:hover {
                    background: rgba(138, 46, 136, 0.08);
                }

                /* Mobile drawer */
                .mobile-drawer {
                    display: none;
                    flex-direction: column;
                    background: #fff;
                    border-top: 1px solid rgba(138, 46, 136, 0.1);
                    padding: 12px 16px 16px;
                    gap: 4px;
                    box-shadow: 0 12px 30px rgba(138, 46, 136, 0.08);
                }

                .mobile-drawer.open {
                    display: flex;
                    animation: slideDown 0.22s ease;
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .mobile-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 14px;
                    border: none;
                    background: transparent;
                    border-radius: 12px;
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 500;
                    font-size: 0.92rem;
                    color: #4A3360;
                    cursor: pointer;
                    text-align: left;
                    transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
                }

                .mobile-btn:hover {
                    background: linear-gradient(135deg, rgba(138, 46, 136, 0.09), rgba(192, 132, 200, 0.09));
                    color: #8A2E88;
                    transform: translateX(4px);
                }

                .mobile-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8A2E88, #C084C8);
                    flex-shrink: 0;
                    opacity: 0.7;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .header-inner {
                        grid-template-columns: 1fr auto;
                        height: 64px;
                    }

                    .desktop-menu {
                        display: none;
                    }

                    .header-right {
                        display: none;
                    }

                    .mobile-toggle {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            `}</style>

            <nav className={`header-nav${scrolled ? ' scrolled' : ''}`}>
                <div className="header-inner">

                    {/* Left — Logo */}
                    <div className="logo" onClick={() => navigate('/')}>
                        <div className="logo-icon">
                            <GraduationCap size={22} color="#fff" />
                        </div>
                        <div className="logo-text-wrap">
                            <span className="logo-title">Student InfoSys</span>
                            <span className="logo-subtitle">JNTU-GV Vizianagaram</span>
                        </div>
                    </div>

                    {/* Center — Nav Items */}
                    <ul className="desktop-menu" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <button
                                    className="nav-btn"
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Right — balanced placeholder on desktop, hamburger on mobile */}
                    <div className="header-right">
                        {/* Optional: CTA button can go here */}
                    </div>

                    {/* Mobile hamburger (takes the right slot on mobile) */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Drawer */}
                <div className={`mobile-drawer${mobileMenuOpen ? ' open' : ''}`}>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            className="mobile-btn"
                            onClick={() => {
                                navigate(item.path);
                                setMobileMenuOpen(false);
                            }}
                        >
                            <span className="mobile-dot" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}