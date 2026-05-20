import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, GraduationCap } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Randomly trigger glitch effect
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { label: 'Student Login', path: '/login', icon: <GraduationCap size={15} /> },
    { label: 'HOD Portal',    path: '/hod',   icon: <Search size={15} /> },
    { label: 'Admin Panel',   path: '/admin', icon: <Home size={15} /> },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes orbFloat1  { 0%,100%{transform:translate(0,0)}   50%{transform:translate(30px,40px)}   }
        @keyframes orbFloat2  { 0%,100%{transform:translate(0,0)}   50%{transform:translate(-20px,-30px)} }
        @keyframes orbFloat3  { 0%,100%{transform:translate(0,0)}   50%{transform:translate(15px,-20px)}  }
        @keyframes shimmer    { 0%{background-position:-200% 0}      100%{background-position:200% 0}      }
        @keyframes cardIn     { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)}     50%{transform:translateY(-12px)}      }
        @keyframes scanline   { 0%{top:-10%} 100%{top:110%} }
        @keyframes fadeInUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        /* Glitch */
        @keyframes glitch1 {
          0%,100%{clip-path:inset(0 0 95% 0);transform:translate(-4px,0)}
          25%    {clip-path:inset(30% 0 50% 0);transform:translate(4px,0)}
          50%    {clip-path:inset(60% 0 20% 0);transform:translate(-3px,0)}
          75%    {clip-path:inset(80% 0 5% 0) ;transform:translate(3px,0)}
        }
        @keyframes glitch2 {
          0%,100%{clip-path:inset(50% 0 30% 0);transform:translate(4px,0)}
          25%    {clip-path:inset(10% 0 80% 0);transform:translate(-4px,0)}
          50%    {clip-path:inset(75% 0 10% 0);transform:translate(2px,0)}
          75%    {clip-path:inset(20% 0 60% 0);transform:translate(-2px,0)}
        }

        .orb-1 { animation: orbFloat1  8s ease-in-out infinite; }
        .orb-2 { animation: orbFloat2 10s ease-in-out infinite; }
        .orb-3 { animation: orbFloat3 12s ease-in-out infinite; }

        .shimmer-bar {
          background: linear-gradient(90deg,#8A2E88,#C084C8,#8A2E88);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .card-in  { animation: cardIn  0.65s ease forwards; }
        .float-y  { animation: floatY  4s ease-in-out infinite; }
        .link-in  { animation: fadeInUp 0.5s ease forwards; }

        .scanline-wrap { position:absolute; inset:0; overflow:hidden; pointer-events:none; border-radius:28px; }
        .scanline {
          position:absolute; left:0; right:0; height:3px;
          background:linear-gradient(transparent,rgba(192,132,200,0.08),transparent);
          animation: scanline 5s linear infinite;
        }

        /* 404 glitch layers */
        .glitch-wrap { position:relative; display:inline-block; }
        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          font-family: 'Comfortaa', cursive;
          font-weight: 700;
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;
          pointer-events: none;
          opacity: 0;
        }
        .glitch-wrap::before { color:#ff60ff; }
        .glitch-wrap::after  { color:#60e0ff; }

        .glitch-wrap.active::before { opacity:0.7; animation: glitch1 0.3s steps(2) forwards; }
        .glitch-wrap.active::after  { opacity:0.7; animation: glitch2 0.3s steps(2) forwards; }
      `}</style>

      {/* ── Page shell ── */}
      <div className="min-h-screen w-full flex items-center justify-center p-4
        bg-[#0f0a1a] font-['DM_Sans'] relative overflow-hidden">

        {/* Ambient orbs */}
        <div className="orb-1 absolute w-[520px] h-[520px] rounded-full pointer-events-none
          -top-[140px] -left-[110px]"
          style={{ background:'radial-gradient(circle,rgba(138,46,136,0.32) 0%,transparent 70%)', filter:'blur(90px)' }} />
        <div className="orb-2 absolute w-[420px] h-[420px] rounded-full pointer-events-none
          -bottom-[110px] -right-[90px]"
          style={{ background:'radial-gradient(circle,rgba(99,40,180,0.22) 0%,transparent 70%)', filter:'blur(90px)' }} />
        <div className="orb-3 absolute w-[260px] h-[260px] rounded-full pointer-events-none
          top-1/2 left-[58%]"
          style={{ background:'radial-gradient(circle,rgba(200,100,210,0.15) 0%,transparent 70%)', filter:'blur(80px)' }} />

        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            'linear-gradient(rgba(138,46,136,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(138,46,136,0.055) 1px,transparent 1px)',
          backgroundSize:'48px 48px'
        }} />

        {/* ── Card ── */}
        <div
          className={`relative w-full max-w-[500px] rounded-[28px] overflow-hidden
            border border-[#8A2E88]/25
            shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_32px_80px_rgba(0,0,0,0.55),0_0_60px_rgba(138,46,136,0.1)]
            ${mounted ? 'card-in' : 'opacity-0'}`}
          style={{ background:'rgba(20,10,35,0.78)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)' }}
        >
          {/* Scanline sweep */}
          <div className="scanline-wrap"><div className="scanline" /></div>

          {/* Shimmer bar */}
          <div className="shimmer-bar h-[3px] w-full" />

          <div className="px-10 pt-10 pb-9 flex flex-col items-center text-center">

            {/* Logo row */}
            <div className="flex items-center gap-2.5 mb-8 self-start">
              <div className="w-8 h-8 flex items-center justify-center rounded-[9px]
                bg-gradient-to-br from-[#8A2E88] to-[#C084C8]
                shadow-[0_3px_12px_rgba(138,46,136,0.4)]">
                <GraduationCap size={16} color="#fff" />
              </div>
              <span className="font-['Comfortaa'] font-bold text-[0.95rem] text-white/90 tracking-[-0.01em]">
                Student InfoSys
              </span>
            </div>

            {/* ── 404 display ── */}
            <div className="float-y mb-2 select-none">
              {/* Big glitchy 404 */}
              <div
                className={`glitch-wrap ${glitchActive ? 'active' : ''}`}
                data-text="404"
              >
                <span
                  className="font-['Comfortaa'] font-bold text-[7rem] leading-none tracking-[-0.04em]"
                  style={{
                    background: 'linear-gradient(135deg,#fff 20%,#C084C8 60%,#8A2E88 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px rgba(192,132,200,0.35))',
                  }}
                >
                  404
                </span>
              </div>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 w-full mb-7">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8A2E88]/40 to-transparent" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C084C8]/60
                shadow-[0_0_8px_rgba(192,132,200,0.5)]" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8A2E88]/40 to-transparent" />
            </div>

            {/* Message */}
            <h1 className="font-['Comfortaa'] font-bold text-[1.45rem] text-white
              tracking-[-0.02em] leading-tight mb-3">
              Page Not Found
            </h1>
            <p className="text-[0.9rem] text-[#C8A0D7]/55 leading-relaxed max-w-[340px] mb-8">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            {/* ── CTA buttons ── */}
            <div className="flex flex-col sm:flex-row gap-3 w-full mb-8">
              {/* Primary */}
              <button
                onClick={() => navigate('/')}
                className="flex-1 flex items-center justify-center gap-2 py-[13px] px-5 rounded-[13px]
                  bg-gradient-to-br from-[#8A2E88] via-[#B060B8] to-[#C880D0]
                  font-['DM_Sans'] text-[0.9rem] font-semibold text-white
                  border-none cursor-pointer tracking-[0.01em]
                  shadow-[0_4px_22px_rgba(138,46,136,0.4),0_1px_0_rgba(255,255,255,0.1)_inset]
                  transition-all duration-250
                  hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(138,46,136,0.55)]
                  active:translate-y-0"
              >
                <Home size={16} />
                Go to Home
              </button>

              {/* Secondary */}
              <button
                onClick={() => navigate(-1)}
                className="flex-1 flex items-center justify-center gap-2 py-[13px] px-5 rounded-[13px]
                  bg-white/[0.04] border border-[#8A2E88]/25
                  font-['DM_Sans'] text-[0.9rem] font-medium text-[#C8A0D7]/80
                  cursor-pointer tracking-[0.01em]
                  transition-all duration-250
                  hover:bg-[#8A2E88]/12 hover:border-[#C084C8]/40 hover:text-white
                  active:scale-[0.98]"
              >
                <ArrowLeft size={16} />
                Go Back
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-1.5 mt-8 pt-5
              border-t border-white/6 w-full">
              <span className="text-[0.7rem] text-[#967AA5]/35">
                © 2026 JNTU-GV Vizianagaram. All rights reserved.
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;