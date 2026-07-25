import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, ArrowRight, ShieldCheck, Building2, Sparkles, KeyRound } from 'lucide-react';

const Admin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState('');

  const [formData, setFormData] = useState({ department: '', password: '' });

  useEffect(() => { setMounted(true); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Login successful! Redirecting to dashboard…');
    }, 1800);
  };

  return (
    <div className={`sis-page-shell flex items-center justify-center px-4 py-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="w-full max-w-6xl overflow-hidden rounded-[32px] sis-panel grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-8 lg:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-white">
              <Building2 size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[var(--primary)]">Administrative access</h1>
              <p className="text-sm text-[var(--on-surface-variant)]">Secure sign-in for the college administration portal.</p>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="sis-accent-pill"><Sparkles size={15} /> Trusted workflow</span>
            <span className="sis-accent-pill"><ShieldCheck size={15} /> Protected dashboard</span>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-[var(--error)]/20 bg-[var(--error-container)] px-3 py-2 text-sm text-[var(--on-error-container)]">
              <ShieldCheck size={16} /> {error}
            </div>
          )}
          {success && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-[var(--secondary)]/20 bg-[var(--secondary-container)] px-3 py-2 text-sm text-[var(--on-secondary-container)]">
              <ShieldCheck size={16} /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--on-surface)]">Department</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">
                  <Building2 size={18} />
                </span>
                <input type="text" name="department" placeholder="Enter department" value={formData.department} onChange={handleInputChange} className="w-full rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] py-3 pl-10 pr-3 text-sm text-[var(--on-surface)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--on-surface)]">Password</label>
              <div className="relative">
                <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition ${focused === 'password' ? 'text-[var(--primary)]' : 'text-[var(--outline)]'}`}>
                  <KeyRound size={18} />
                </span>
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} onFocus={() => setFocused('password')} onBlur={() => setFocused('')} autoComplete="current-password" className="w-full rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] py-3 pl-10 pr-12 text-sm text-[var(--on-surface)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--outline)] transition hover:text-[var(--primary)]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[var(--on-surface-variant)]">
                <input type="checkbox" className="h-4 w-4 rounded accent-[var(--primary)]" />
                Remember me
              </label>
              <a href="#" className="font-semibold text-[var(--primary)]">Forgot password?</a>
            </div>

            <button type="submit" disabled={isLoading || !!success} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-container)] disabled:cursor-not-allowed disabled:opacity-70">
              {isLoading ? 'Signing in…' : <>Continue <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <div className="relative hidden lg:block">
          <img src="/images/college.png" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 via-[var(--primary)]/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary-fixed)]">Campus oversight</p>
            <h2 className="mt-2 text-2xl font-semibold">Manage operations without losing the human touch.</h2>
            <p className="mt-2 text-sm text-[var(--primary-fixed)]">Every control panel now feels part of the same student-first experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;