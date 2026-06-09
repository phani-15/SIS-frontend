import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Feature cards data ─────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: 'menu_book',
    iconBg: 'var(--primary-container)',
    iconColor: 'var(--on-primary-container)',
    title: 'Academic Tracking',
    desc: 'Monitor grades, attendance, and course progression with real-time analytics and easy-to-read dashboards.',
  },
  {
    icon: 'assignment_ind',
    iconBg: 'var(--secondary-container)',
    iconColor: 'var(--on-secondary-container)',
    title: 'Admissions',
    desc: 'Streamline the application process from inquiry to enrollment with automated workflows and document management.',
  },
  {
    icon: 'support_agent',
    iconBg: 'var(--tertiary-container)',
    iconColor: 'var(--on-tertiary-container)',
    title: 'Student Support',
    desc: 'Connect students with advising, counseling, and peer resources to ensure their well-being and success.',
  },
];

const COLLAB_POINTS = [
  'Unified communication channels',
  'Shared resource libraries',
  'Collaborative project spaces',
];

/* ─── Footer links ───────────────────────────────────────────────────── */
const FOOTER_LINKS = ['Privacy Policy', 'Terms of Service', 'Campus Map', 'Directory'];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)' }}
    >

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section
        className="w-full mx-auto flex flex-col md:flex-row items-center gap-16 fade-in-up"
        style={{
          maxWidth: '1280px',
          padding: '80px 32px',
        }}
      >
        {/* Text side */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 z-10">
          <h1
            className="font-['Inter'] font-bold leading-tight tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: 'var(--primary)',
            }}
          >
            Empowering Student Success Through Integrated Data
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--on-surface-variant)', maxWidth: '520px' }}
          >
            A comprehensive platform designed to streamline academic tracking, simplify admissions,
            and foster a supportive educational community for all students and faculty.
          </p>
          <div className="flex gap-3 mt-2 flex-wrap">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all duration-200 shadow-sm hover:opacity-90 active:scale-95"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:opacity-80"
              style={{
                border: '2px solid var(--secondary)',
                color: 'var(--secondary)',
                backgroundColor: 'transparent',
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Image side */}
        <div
          className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-sm"
          style={{
            border: '1px solid rgba(196, 198, 207, 0.3)',
            backgroundColor: 'var(--surface-container-lowest)',
          }}
        >
          <img
            src="/images/home.webp"
            alt="Students reading in a cozy library setting"
            className="w-full h-auto object-cover"
            style={{ aspectRatio: '4/3', mixBlendMode: 'multiply', opacity: 0.9 }}
          />
        </div>
      </section>

      <section
        className="w-full py-20"
        style={{ backgroundColor: 'var(--surface-container-low)' }}
      >
        <div
          className="mx-auto flex flex-col gap-12"
          style={{ maxWidth: '1280px', padding: '0 32px' }}
        >
          {/* Section heading */}
          <div className="text-center flex flex-col gap-3" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2
              className="font-['Inter'] font-semibold"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--primary)' }}
            >
              Core Capabilities
            </h2>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '1rem' }}>
              Everything you need to manage the academic lifecycle in one intuitive platform.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-xl p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                style={{
                  backgroundColor: 'var(--surface-container-lowest)',
                  border: '1px solid rgba(196, 198, 207, 0.2)',
                }}
              >
                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: f.iconBg }}
                >
                  <span
                    className="material-symbols-outlined fill text-[22px]"
                    style={{ color: f.iconColor }}
                  >
                    {f.icon}
                  </span>
                </div>
                <h3
                  className="font-['Inter'] font-semibold text-xl"
                  style={{ color: 'var(--primary)' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--on-surface-variant)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COLLABORATION SECTION
      ══════════════════════════════════════ */}
      <section
        className="w-full mx-auto py-20 flex flex-col-reverse md:flex-row items-center gap-16"
        style={{ maxWidth: '1280px', padding: '80px 32px' }}
      >
        {/* Image */}
        <div
          className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-sm"
          style={{
            border: '1px solid rgba(196, 198, 207, 0.3)',
            backgroundColor: 'var(--surface-container-lowest)',
          }}
        >
          <img
            src='/images/group-colab.jpeg'
            alt="A group of diverse individuals collaborating"
            className="w-full h-auto object-cover"
            style={{ aspectRatio: '1 / 1' }}
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2
            className="font-['Inter'] font-semibold"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--primary)' }}
          >
            Built for Collaboration
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--on-surface-variant)' }}>
            Our platform isn't just a database; it's a hub for connection. We bring together
            students, faculty, and administration into a unified ecosystem where communication
            flows seamlessly and collective goals are achieved.
          </p>
          <ul className="flex flex-col gap-3 mt-2">
            {COLLAB_POINTS.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined fill text-[22px] mt-0.5 shrink-0"
                  style={{ color: 'var(--secondary)' }}
                >
                  check_circle
                </span>
                <span className="text-base" style={{ color: 'var(--on-surface)' }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer
        className="w-full mt-auto"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row justify-between items-center gap-6 py-12"
          style={{ maxWidth: '1280px', padding: '48px 32px' }}
        >
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span
              className="font-['Inter'] font-bold text-xl"
              style={{ color: 'var(--on-primary)' }}
            >
              Student Information System
            </span>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              © 2024 Student Information System. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm transition-colors duration-200 hover:underline no-underline"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}