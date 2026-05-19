import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useT } from '@/features/i18n/store';
import { useSettingsStore } from '@/features/settings/store';
import { LanguageSwitcher, ThemeSwitcher } from './Switchers';
import { BrandMark } from '@/shared/components/ui/BrandMark';
import { cn } from '@/shared/utils';

const navLinks = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/offices', key: 'nav.offices' },
  { to: '/conference-rooms', key: 'nav.conferenceRooms' },
  { to: '/tenants', key: 'nav.tenants' },
  { to: '/news', key: 'nav.news' },
  { to: '/contacts', key: 'nav.contacts' },
];

export const PublicNavbar = () => {
  const { t } = useT();
  const settings = useSettingsStore((s) => s.settings);
  const [open, setOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-line">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <BrandMark size="md" />
          <span className="hidden sm:block text-sm font-medium tracking-tight text-ink">
            {settings.businessCenterName}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 text-sm tracking-tight transition-colors relative',
                  isActive
                    ? 'text-accent font-medium'
                    : 'text-ink-muted hover:text-ink'
                )
              }
            >
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          <Link to="/login" className="btn-secondary btn-sm hidden md:inline-flex">
            {t('nav.login')}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-ink"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-line bg-surface">
          <div className="container-page py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2.5 text-sm border-b border-line last:border-b-0',
                    isActive ? 'text-accent font-medium' : 'text-ink'
                  )
                }
              >
                {t(link.key)}
              </NavLink>
            ))}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary btn-sm">
                {t('nav.login')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
