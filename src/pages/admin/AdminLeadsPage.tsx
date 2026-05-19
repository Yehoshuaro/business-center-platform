import { useMemo, useState } from 'react';
import { Trash2, X, Eye } from 'lucide-react';
import { useT } from '@/features/i18n/store';
import { useLeadsStore } from '@/features/leads/store';
import { useAuthStore } from '@/features/auth/store';
import type { Lead, LeadStatus } from '@/shared/types';
import { PageHeader, LeadStatusBadge, ConfirmDialog, EmptyState } from '@/shared/components/ui';
import { formatDate } from '@/shared/utils';

const STATUSES: LeadStatus[] = ['new', 'contacted', 'inProgress', 'closed'];

export const AdminLeadsPage = () => {
  const { t, language } = useT();
  const leads = useLeadsStore((s) => s.items);
  const setStatus = useLeadsStore((s) => s.setStatus);
  const remove = useLeadsStore((s) => s.remove);
  const addComment = useLeadsStore((s) => s.addComment);
  const session = useAuthStore((s) => s.session);

  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const locale = ({ kk: 'kk-KZ', ru: 'ru-RU', en: 'en-US' } as const)[language];

  const filtered = useMemo(() => {
    return [...leads]
      .filter((l) => statusFilter === 'all' || l.status === statusFilter)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [leads, statusFilter]);

  // Always read the latest version of the currently-selected lead from the store
  const currentLead = selected ? leads.find((l) => l.id === selected.id) ?? null : null;

  const submitComment = () => {
    if (!currentLead || !commentText.trim()) return;
    addComment(currentLead.id, session?.fullName ?? 'Manager', commentText.trim());
    setCommentText('');
  };

  return (
    <>
      <PageHeader eyebrow={t('admin.section.list')} title={t('admin.leads')} />

      <div className="card p-4 mb-6 flex flex-wrap gap-3 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'all')}
          className="max-w-[220px]"
        >
          <option value="all">{t('common.all')}</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{t(`leadStatus.${s}`)}</option>
          ))}
        </select>
        <div className="text-xs text-ink-muted ml-auto">
          {filtered.length} / {leads.length}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('form.name')}</th>
                <th>{t('form.phone')}</th>
                <th>{t('form.interest')}</th>
                <th>{t('common.status')}</th>
                <th>Created</th>
                <th className="text-right">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className="font-medium">{lead.name}</div>
                    {lead.email && <div className="text-xs text-ink-subtle">{lead.email}</div>}
                  </td>
                  <td className="text-ink-muted whitespace-nowrap">{lead.phone}</td>
                  <td className="text-ink-muted">{t(`interest.${lead.interestType}`)}</td>
                  <td><LeadStatusBadge status={lead.status} /></td>
                  <td className="text-xs text-ink-muted whitespace-nowrap">
                    {formatDate(lead.createdAt, locale)}
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button type="button" className="btn-ghost btn-sm" onClick={() => setSelected(lead)}>
                        <Eye size={14} />
                      </button>
                      <button type="button" className="btn-danger btn-sm" onClick={() => setConfirmId(lead.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentLead && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-2xl card p-6 my-8">
            <div className="flex items-start justify-between mb-5 gap-4">
              <div>
                <div className="eyebrow mb-1">{t('form.interest')}: {t(`interest.${currentLead.interestType}`)}</div>
                <h2 className="font-display text-2xl tracking-tight">{currentLead.name}</h2>
                <div className="text-xs text-ink-muted mt-1">
                  {formatDate(currentLead.createdAt, locale)}
                </div>
              </div>
              <button type="button" className="p-2 -mr-2" onClick={() => setSelected(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-5 text-sm">
              <div>
                <div className="eyebrow mb-1">{t('form.phone')}</div>
                <div>{currentLead.phone}</div>
              </div>
              <div>
                <div className="eyebrow mb-1">{t('form.email')}</div>
                <div className="break-all">{currentLead.email || '—'}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="eyebrow mb-1">{t('form.message')}</div>
                <div className="text-ink-muted whitespace-pre-wrap">{currentLead.message || '—'}</div>
              </div>
            </div>

            <div className="border-t border-line pt-5 mb-5">
              <div className="eyebrow mb-2">{t('common.status')}</div>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(currentLead.id, s)}
                    className={
                      currentLead.status === s ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'
                    }
                  >
                    {t(`leadStatus.${s}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-line pt-5">
              <div className="eyebrow mb-3">{t('admin.comments')}</div>
              {currentLead.comments.length === 0 ? (
                <p className="text-sm text-ink-muted mb-4">{t('admin.noComments')}</p>
              ) : (
                <ul className="space-y-3 mb-4">
                  {currentLead.comments.map((c) => (
                    <li key={c.id} className="border border-line bg-surface-2 p-3">
                      <div className="flex justify-between text-xs text-ink-muted mb-1">
                        <span className="font-medium text-ink">{c.author}</span>
                        <span>{formatDate(c.createdAt, locale)}</span>
                      </div>
                      <div className="text-sm whitespace-pre-wrap">{c.text}</div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t('admin.addComment')}
                  className="flex-1 min-h-[80px]"
                />
                <button
                  type="button"
                  className="btn-primary self-start"
                  onClick={submitComment}
                  disabled={!commentText.trim()}
                >
                  {t('admin.addComment')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmId !== null}
        onCancel={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId) {
            remove(confirmId);
            if (selected && selected.id === confirmId) setSelected(null);
          }
          setConfirmId(null);
        }}
      />
    </>
  );
};
