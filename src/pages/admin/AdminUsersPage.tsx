import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Power } from 'lucide-react';
import { useT } from '@/features/i18n/store';
import { useUsersStore } from '@/features/users/store';
import type { AdminUser, AdminUserRole } from '@/shared/types';
import { PageHeader, UserStatusBadge, ConfirmDialog, EmptyState } from '@/shared/components/ui';

const ROLES: AdminUserRole[] = ['admin', 'manager', 'viewer'];

const emptyForm = (): Omit<AdminUser, 'id'> => ({
  fullName: '',
  email: '',
  role: 'manager',
  status: 'active',
});

export const AdminUsersPage = () => {
  const { t } = useT();
  const users = useUsersStore((s) => s.items);
  const create = useUsersStore((s) => s.create);
  const update = useUsersStore((s) => s.update);
  const remove = useUsersStore((s) => s.remove);
  const setStatus = useUsersStore((s) => s.setStatus);

  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<AdminUser, 'id'>>(emptyForm());

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setCreating(true);
  };

  const startEdit = (user: AdminUser) => {
    setCreating(false);
    setEditing(user);
    const { id: _id, ...rest } = user;
    void _id;
    setForm(rest);
  };

  const closeForm = () => {
    setCreating(false);
    setEditing(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) update(editing.id, form);
    else create(form);
    closeForm();
  };

  const isOpen = creating || editing !== null;

  return (
    <>
      <PageHeader
        eyebrow={t('admin.section.list')}
        title={t('admin.users')}
        actions={
          <button type="button" className="btn-primary btn-sm" onClick={startCreate}>
            <Plus size={14} /> {t('common.create')}
          </button>
        }
      />

      {users.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('form.name')}</th>
                <th>{t('form.email')}</th>
                <th>Role</th>
                <th>{t('common.status')}</th>
                <th className="text-right">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="font-medium">{u.fullName}</td>
                  <td className="text-ink-muted break-all">{u.email}</td>
                  <td className="text-ink-muted">{t(`role.${u.role}`)}</td>
                  <td><UserStatusBadge status={u.status} /></td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="btn-ghost btn-sm"
                        onClick={() => setStatus(u.id, u.status === 'active' ? 'disabled' : 'active')}
                        aria-label={t('common.status')}
                      >
                        <Power size={14} />
                      </button>
                      <button type="button" className="btn-ghost btn-sm" onClick={() => startEdit(u)}>
                        <Pencil size={14} />
                      </button>
                      <button type="button" className="btn-danger btn-sm" onClick={() => setConfirmId(u.id)}>
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

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-ink/40" onClick={closeForm} />
          <form onSubmit={submit} className="relative w-full max-w-lg card p-6 my-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl tracking-tight">
                {editing ? t('admin.section.editing') : t('admin.section.create')}
              </h2>
              <button type="button" className="p-2 -mr-2" onClick={closeForm}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="field-label">{t('form.name')}</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="field-label">{t('form.email')}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="field-label">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as AdminUserRole })}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{t(`role.${r}`)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">{t('common.status')}</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as AdminUser['status'] })}
                >
                  <option value="active">{t('userStatus.active')}</option>
                  <option value="disabled">{t('userStatus.disabled')}</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" className="btn-secondary" onClick={closeForm}>
                {t('common.cancel')}
              </button>
              <button type="submit" className="btn-primary">
                {t('common.save')}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={confirmId !== null}
        onCancel={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId) remove(confirmId);
          setConfirmId(null);
        }}
      />
    </>
  );
};
