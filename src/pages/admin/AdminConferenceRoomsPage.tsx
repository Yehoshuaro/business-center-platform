import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useT } from '@/features/i18n/store';
import { useConferenceRoomsStore } from '@/features/conferenceRooms/store';
import type { ConferenceRoom, ConferenceStatus } from '@/shared/types';
import { PageHeader, OfficeStatusBadge, ConfirmDialog, EmptyState } from '@/shared/components/ui';
import { formatPrice } from '@/shared/utils';

const STATUSES: ConferenceStatus[] = ['available', 'reserved', 'occupied'];

const emptyForm = (): Omit<ConferenceRoom, 'id'> => ({
  name: '',
  capacity: 10,
  area: 0,
  hourlyPrice: null,
  status: 'available',
  equipment: [],
  description: '',
});

export const AdminConferenceRoomsPage = () => {
  const { t, language } = useT();
  const rooms = useConferenceRoomsStore((s) => s.items);
  const create = useConferenceRoomsStore((s) => s.create);
  const update = useConferenceRoomsStore((s) => s.update);
  const remove = useConferenceRoomsStore((s) => s.remove);

  const [editing, setEditing] = useState<ConferenceRoom | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<ConferenceRoom, 'id'>>(emptyForm());
  const [equipmentText, setEquipmentText] = useState('');

  const locale = ({ kk: 'kk-KZ', ru: 'ru-RU', en: 'en-US' } as const)[language];

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setEquipmentText('');
    setCreating(true);
  };

  const startEdit = (room: ConferenceRoom) => {
    setCreating(false);
    setEditing(room);
    const { id: _id, ...rest } = room;
    void _id;
    setForm(rest);
    setEquipmentText(room.equipment.join('\n'));
  };

  const closeForm = () => {
    setCreating(false);
    setEditing(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      equipment: equipmentText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editing) update(editing.id, payload);
    else create(payload);
    closeForm();
  };

  const isOpen = creating || editing !== null;

  return (
    <>
      <PageHeader
        eyebrow={t('admin.section.list')}
        title={t('admin.conferenceRooms')}
        actions={
          <button type="button" className="btn-primary btn-sm" onClick={startCreate}>
            <Plus size={14} /> {t('common.create')}
          </button>
        }
      />

      {rooms.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('admin.conferenceRooms')}</th>
                <th>{t('common.capacity')}</th>
                <th>{t('common.area')}, m²</th>
                <th>{t('common.status')}</th>
                <th>{t('common.price')} / hr</th>
                <th className="text-right">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id}>
                  <td className="font-medium">{r.name}</td>
                  <td className="text-ink-muted">{r.capacity}</td>
                  <td className="text-ink-muted">{r.area}</td>
                  <td><OfficeStatusBadge status={r.status} /></td>
                  <td className="text-ink-muted whitespace-nowrap">
                    {r.hourlyPrice === null ? t('common.priceOnRequest') : formatPrice(r.hourlyPrice, locale)}
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button type="button" className="btn-ghost btn-sm" onClick={() => startEdit(r)}>
                        <Pencil size={14} />
                      </button>
                      <button type="button" className="btn-danger btn-sm" onClick={() => setConfirmId(r.id)}>
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
          <form onSubmit={submit} className="relative w-full max-w-2xl card p-6 my-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl tracking-tight">
                {editing ? t('admin.section.editing') : t('admin.section.create')}
              </h2>
              <button type="button" className="p-2 -mr-2" onClick={closeForm}>
                <X size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="field-label">{t('admin.conferenceRooms')}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="field-label">{t('common.capacity')}</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="field-label">{t('common.area')}, m²</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="field-label">{t('common.status')}</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as ConferenceStatus })}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{t(`status.${s}`)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">{t('common.price')} / hr ({t('common.optional')})</label>
                <input
                  type="number"
                  min={0}
                  value={form.hourlyPrice ?? ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hourlyPrice: e.target.value === '' ? null : Number(e.target.value),
                    })
                  }
                  placeholder={t('common.priceOnRequest')}
                />
              </div>
              <div className="md:col-span-2">
                <label className="field-label">{t('common.description')}</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="field-label">{t('common.equipment')}</label>
                <textarea
                  value={equipmentText}
                  onChange={(e) => setEquipmentText(e.target.value)}
                  placeholder={'• one per line'}
                />
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
