import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Presentation,
  Users,
  ClipboardList,
  UserCog,
  Settings,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Newspaper,
  Images,
} from 'lucide-react';
import { useT } from '@/features/i18n/store';
import { useAuthStore } from '@/features/auth/store';
import { useSettingsStore } from '@/features/settings/store';
import { LanguageSwitcher, ThemeSwitcher } from './Switchers';
import { BrandMark } from '@/shared/components/ui/BrandMark';
import { cn } from '@/shared/utils';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, key: 'admin.dashboard', end: true },
  { to: '/admin/offices', icon: Building2, key: 'admin.offices' },
  { to: '/admin/conference-rooms', icon: Presentation, key: 'admin.conferenceRooms' },
  { to: '/admin/tenants', icon: Users, key: 'admin.tenants' },
  { to: '/admin/gallery', icon: Images, key: 'admin.gallery' },
  { to: '/admin/news', icon: Newspaper, key: 'admin.news' },
  { to: '/admin/leads', icon: ClipboardList, key: 'admin.leads' },
  { to: '/admin/users', icon: UserCog, key: 'admin.users' },
  { to: '/admin/settings', icon: Settings, key: 'admin.settings' },
];

export const AdminLayout = () => {
  const { t } = useT();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const signOut = useAuthStore((s) => s.signOut);
  const session = useAuthStore((s) => s.session);
  const settings = useSettingsStore((s) => s.settings);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => setDrawerOpen(false), [pathname]);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-surface-2 text-ink">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-64 flex-col bg-surface border-r border-line">
        <div className="h-16 flex items-center gap-3 px-5 border-b border-line">
          <BrandMark size="sm" />
          <span className="text-sm font-medium tracking-tight truncate">
            {settings.businessCenterName}
          </span>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-5 py-2.5 text-sm border-l-2 transition-colors',
                  isActive
                    ? 'border-accent bg-surface-2 text-ink font-medium'
                    : 'border-transparent text-ink-muted hover:text-ink hover:bg-surface-2'
                )
              }
            >
              <item.icon size={16} strokeWidth={1.75} />
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <NavLink to="/" className="flex items-center gap-2 text-xs text-ink-muted hover:text-ink mb-3">
            <ExternalLink size={13} /> {t('nav.home')}
          </NavLink>
          <div className="text-xs text-ink-muted truncate">{session?.email}</div>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 btn-secondary btn-sm w-full"
          >
            <LogOut size={14} /> {t('common.logout')}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-ink/30"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="relative w-72 max-w-[85%] bg-surface border-r border-line flex flex-col">
            <div className="h-16 flex items-center justify-between px-5 border-b border-line">
              <span className="text-sm font-medium tracking-tight truncate">
                {settings.businessCenterName}
              </span>
              <button onClick={() => setDrawerOpen(false)} className="p-2 -mr-2">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-5 py-3 text-sm border-l-2',
                      isActive
                        ? 'border-accent bg-surface-2 text-ink font-medium'
                        : 'border-transparent text-ink-muted'
                    )
                  }
                >
                  <item.icon size={16} strokeWidth={1.75} />
                  {t(item.key)}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-line">
              <button
                type="button"
                onClick={handleSignOut}
                className="btn-secondary btn-sm w-full"
              >
                <LogOut size={14} /> {t('common.logout')}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 sticky top-0 z-30 bg-surface border-b border-line flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="text-xs uppercase tracking-wider text-ink-muted">
              {t('nav.admin')}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
