import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsRight, GraduationCap, BookOpen, Award, Users, Shield } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: <BookOpen size={20} />,  label: 'Academic Records',     desc: 'Centralized grades, attendance & performance tracking.' },
  { icon: <Award size={20} />,     label: 'Achievements',         desc: 'Certifications, publications & project showcase.' },
  { icon: <Users size={20} />,     label: 'Student Profiles',     desc: 'Complete profiles for placements & career growth.' },
  { icon: <Shield size={20} />,    label: 'Secure & Verified',    desc: 'Transparent, accurate and up-to-date data.' },
];

export default function Home() {
  const navigate   = useNavigate();
  const [mounted, setMounted]   = useState(false);
  const heroTitleRef  = useRef(null);
  const heroTextRef   = useRef(null);
  const heroImageRef  = useRef(null);

  useEffect(() => {
    setMounted(true);

    const titleChars = heroTitleRef.current.querySelectorAll('span');
    const textChars  = heroTextRef.current.querySelectorAll('span');

    const tl = gsap.timeline();
    tl.fromTo(titleChars,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: 'power2.out' }
    ).fromTo(textChars,
      { opacity: 0 },
      { opacity: 1, stagger: 0.012, duration: 0.6 },
      '-=0.2'
    );

    gsap.fromTo(heroImageRef.current,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.6, ease: 'power3.out', delay: 0.2 }
    );

    // Feature cards stagger in on scroll
    gsap.fromTo('.feature-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.features-section', start: 'top 80%' }
      }
    );
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)}   50%{transform:translate(30px,40px)}   }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)}   50%{transform:translate(-20px,-30px)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0)}   50%{transform:translate(15px,-20px)}  }
        @keyframes shimmer   { 0%{background-position:-200% 0}      100%{background-position:200% 0}      }
        @keyframes scanline  { 0%{top:-10%}                         100%{top:110%}                        }
        @keyframes badgePulse{
          0%,100%{box-shadow:0 4px 20px rgba(138,46,136,0.4),0 0 0 1px rgba(255,255,255,0.08) inset}
          50%    {box-shadow:0 4px 30px rgba(138,46,136,0.65),0 0 0 1px rgba(255,255,255,0.13) inset}
        }
        @keyframes fadeInUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .orb-1 { animation: orbFloat1  8s ease-in-out infinite; }
        .orb-2 { animation: orbFloat2 10s ease-in-out infinite; }
        .orb-3 { animation: orbFloat3 12s ease-in-out infinite; }

        .shimmer-bar {
          background: linear-gradient(90deg,#8A2E88,#C084C8,#8A2E88);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .badge-pulse { animation: badgePulse 3s ease-in-out infinite; }

        .scanline-wrap { position:absolute; inset:0; overflow:hidden; pointer-events:none; border-radius:24px; }
        .scanline {
          position:absolute; left:0; right:0; height:3px;
          background:linear-gradient(transparent,rgba(192,132,200,0.07),transparent);
          animation: scanline 6s linear infinite;
        }

        .page-in { animation: fadeInUp 0.65s ease forwards; }

        /* Image shimmer border */
        .img-border {
          background: linear-gradient(135deg,#8A2E88,#C084C8,#8A2E88);
          background-size: 200% 200%;
          animation: shimmer 4s linear infinite;
          padding: 2px;
          border-radius: 20px;
        }
      `}</style>

      {/* ── Page shell ── */}
      <div className="min-h-screen bg-[#0f0a1a] font-['DM_Sans'] relative overflow-hidden">

        {/* Ambient orbs */}
        <div className="orb-1 absolute w-[600px] h-[600px] rounded-full pointer-events-none
          -top-[160px] -left-[140px]"
          style={{ background:'radial-gradient(circle,rgba(138,46,136,0.3) 0%,transparent 70%)', filter:'blur(100px)' }} />
        <div className="orb-2 absolute w-[500px] h-[500px] rounded-full pointer-events-none
          bottom-0 -right-[100px]"
          style={{ background:'radial-gradient(circle,rgba(99,40,180,0.22) 0%,transparent 70%)', filter:'blur(100px)' }} />
        <div className="orb-3 absolute w-[300px] h-[300px] rounded-full pointer-events-none
          top-1/2 left-[55%]"
          style={{ background:'radial-gradient(circle,rgba(200,100,210,0.15) 0%,transparent 70%)', filter:'blur(80px)' }} />

        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            'linear-gradient(rgba(138,46,136,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(138,46,136,0.05) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        {/* ── Hero section ── */}
        <section className="relative z-10 max-w-[1200px] mx-auto px-6 pt-16 pb-20">

          {/* Glass hero card */}
          <div
            className={`relative rounded-[24px] overflow-hidden border border-[#8A2E88]/22
              shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_32px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(138,46,136,0.1)]
              ${mounted ? 'page-in' : 'opacity-0'}`}
            style={{ background:'rgba(20,10,35,0.72)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)' }}
          >
            {/* Scanline */}
            <div className="scanline-wrap"><div className="scanline" /></div>

            {/* Shimmer top bar */}
            <div className="shimmer-bar h-[3px] w-full" />

            <div className="flex flex-col lg:flex-row items-center gap-10 p-8 lg:p-14">

              {/* ── Image side ── */}
              <div ref={heroImageRef} className="lg:w-[45%] flex justify-center flex-shrink-0">
                <div className="relative">
                  {/* Animated gradient border */}
                  <div className="img-border">
                    <img
                      src="/images/college.png"
                      draggable={false}
                      alt="JNTUGV Campus"
                      className="rounded-[18px] w-full max-w-[420px] object-cover block"
                    />
                  </div>
                  {/* Glow underneath */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-10 rounded-full
                    bg-[#8A2E88]/30 blur-2xl pointer-events-none" />
                </div>
              </div>

              {/* ── Text side ── */}
              <div className="lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left gap-6">

                {/* Badge */}
                <div className="badge-pulse flex items-center gap-2 px-4 py-2 rounded-full
                  bg-[#8A2E88]/15 border border-[#8A2E88]/30 w-fit"
                  style={{ boxShadow:'0 0 0 1px rgba(255,255,255,0.04) inset' }}>
                  <GraduationCap size={15} className="text-[#C084C8]" />
                  <span className="text-[0.75rem] font-semibold text-[#C8A0D7]/80 tracking-[0.06em] uppercase">
                    JNTU-GV Vizianagaram
                  </span>
                </div>

                {/* Title */}
                <h1
                  ref={heroTitleRef}
                  className="font-['Comfortaa'] font-bold text-[2rem] md:text-[2.8rem] lg:text-[3rem]
                    leading-[1.1] tracking-[-0.03em] text-slate-400" 
                >
                  {'Student InfoSys'.split('').map((char, i) => (
                    <span key={i} className="inline-block">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h1>

                {/* Divider */}
                <div className="flex items-center gap-3 w-full max-w-[360px] lg:mx-0 mx-auto">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8A2E88]/50 to-transparent" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C084C8]/70 shadow-[0_0_8px_rgba(192,132,200,0.6)]" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8A2E88]/50 to-transparent" />
                </div>

                {/* Description */}
                <p
                  ref={heroTextRef}
                  className="text-[0.92rem] text-[#C8A0D7]/60 leading-[1.8] max-w-[480px]"
                >
                  {'The Student Information System (SIS) for JNTUGV is a centralized digital platform that efficiently manages student data. It stores personal details, academic records, certifications, journal publications, projects, and other achievements in a secure and organized manner.'
                    .split(' ')
                    .map((word, i) => (
                      <span key={i} className="inline-block mr-[0.28em]">
                        {word.split('').map((char, j) => (
                          <span key={j} className="inline-block">{char}</span>
                        ))}
                      </span>
                    ))}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 px-6 py-[13px] rounded-[13px]
                      bg-gradient-to-br from-[#8A2E88] via-[#B060B8] to-[#C880D0]
                      font-['DM_Sans'] text-[0.9rem] font-semibold text-white
                      border-none cursor-pointer tracking-[0.01em]
                      shadow-[0_4px_22px_rgba(138,46,136,0.4),0_1px_0_rgba(255,255,255,0.1)_inset]
                      transition-all duration-250
                      hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(138,46,136,0.55)]
                      active:translate-y-0"
                  >
                    LOGIN
                    <ChevronsRight size={17} />
                  </button>

                  <button
                    onClick={() => navigate('/about')}
                    className="flex items-center gap-2 px-6 py-[13px] rounded-[13px]
                      bg-white/[0.04] border border-[#8A2E88]/25
                      font-['DM_Sans'] text-[0.9rem] font-medium text-[#C8A0D7]/75
                      cursor-pointer tracking-[0.01em]
                      transition-all duration-250
                      hover:bg-[#8A2E88]/12 hover:border-[#C084C8]/40 hover:text-white
                      active:scale-[0.98]"
                  >
                    Learn More
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Features section ── */}
        <section className="features-section relative z-10 max-w-[1200px] mx-auto px-6 pb-24">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8A2E88]/35 to-transparent" />
            <span className="text-[0.72rem] font-semibold text-[#967AA5]/55 tracking-[0.1em] uppercase">
              What We Offer
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8A2E88]/35 to-transparent" />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="feature-card group relative rounded-[18px] overflow-hidden p-5
                  border border-[#8A2E88]/18
                  transition-all duration-300 cursor-default
                  hover:border-[#C084C8]/35 hover:-translate-y-1
                  hover:shadow-[0_12px_40px_rgba(138,46,136,0.2)]"
                style={{
                  background:'rgba(20,10,35,0.65)',
                  backdropFilter:'blur(20px)',
                  WebkitBackdropFilter:'blur(20px)',
                  opacity: 0  /* gsap animates this in */
                }}
              >
                {/* Hover shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  pointer-events-none rounded-[18px]"
                  style={{ background:'linear-gradient(135deg,rgba(138,46,136,0.07) 0%,transparent 60%)' }} />

                {/* Icon */}
                <div className="badge-pulse w-10 h-10 flex items-center justify-center
                  rounded-[11px] bg-gradient-to-br from-[#8A2E88] to-[#C084C8] mb-4 text-white"
                  style={{ boxShadow:'0 4px 14px rgba(138,46,136,0.35)' }}>
                  {f.icon}
                </div>

                <h3 className="font-['DM_Sans'] font-semibold text-[0.95rem] text-white/90 mb-1.5">
                  {f.label}
                </h3>
                <p className="text-[0.8rem] text-[#C8A0D7]/50 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer strip ── */}
        <div className="relative z-10 border-t border-[#8A2E88]/15 py-5">
          <p className="text-center text-[0.72rem] text-[#967AA5]/35">
            © 2026 JNTU-GV Vizianagaram. All rights reserved.
          </p>
        </div>

      </div>
    </>
  );
}