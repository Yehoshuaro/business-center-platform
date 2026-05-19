import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useT } from '@/features/i18n/store';
import { useOfficesStore } from '@/features/offices/store';
import { useConferenceRoomsStore } from '@/features/conferenceRooms/store';
import { useTenantsStore } from '@/features/tenants/store';
import { useLeadsStore } from '@/features/leads/store';
import { MetricCard, LeadStatusBadge, PageHeader } from '@/shared/components/ui';
import { formatDate } from '@/shared/utils';

export const AdminDashboardPage = () => {
  const { t, language } = useT();
  const offices = useOfficesStore((s) => s.items);
  const rooms = useConferenceRoomsStore((s) => s.items);
  const tenants = useTenantsStore((s) => s.items);
  const leads = useLeadsStore((s) => s.items);

  const locale = ({ kk: 'kk-KZ', ru: 'ru-RU', en: 'en-US' } as const)[language];
  const available = offices.filter((o) => o.status === 'available').length;
  const recentLeads = [...leads]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);

  return (
    <>
      <PageHeader eyebrow={t('admin.dashboard')} title={t('admin.dashboard')} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-10">
        <MetricCard label={t('admin.metrics.offices')} value={offices.length} />
        <MetricCard label={t('admin.metrics.available')} value={available} />
        <MetricCard label={t('admin.metrics.leads')} value={leads.length} />
        <MetricCard label={t('admin.metrics.tenants')} value={tenants.length} />
        <MetricCard label={t('admin.metrics.rooms')} value={rooms.length} />
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-medium tracking-tight">{t('admin.recentLeads')}</h2>
          <Link to="/admin/leads" className="text-xs link-underline inline-flex items-center gap-1">
            {t('admin.section.list')} <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="table-wrap border-0">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('form.name')}</th>
                <th>{t('form.phone')}</th>
                <th>{t('form.interest')}</th>
                <th>{t('common.status')}</th>
                <th className="text-right">{t('form.message').slice(0, 0)}</th>
                <th className="text-right">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="font-medium">
                    <Link to="/admin/leads" className="hover:text-accent">{lead.name}</Link>
                  </td>
                  <td className="text-ink-muted">{lead.phone}</td>
                  <td className="text-ink-muted">{t(`interest.${lead.interestType}`)}</td>
                  <td><LeadStatusBadge status={lead.status} /></td>
                  <td className="text-ink-muted text-xs max-w-[260px] truncate">{lead.message}</td>
                  <td className="text-right text-xs text-ink-muted whitespace-nowrap">
                    {formatDate(lead.createdAt, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
