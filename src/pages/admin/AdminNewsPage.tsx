import { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { useT } from '@/features/i18n/store';
import { useNewsStore } from '@/features/news/store';
import type { NewsArticle, LocalizedText } from '@/shared/types';
import { PageHeader, ConfirmDialog, EmptyState } from '@/shared/components/ui';
import { cn, formatDate } from '@/shared/utils';

const DEMO_COVERS = [
  './demo/news-1.svg',
  './demo/news-2.svg',
  './demo/news-3.svg',
  './demo/facade.svg',
  './demo/atrium.svg',
  './demo/rooftop.svg',
];

const emptyText = (): LocalizedText => ({ kk: '', ru: '', en: '' });

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const emptyForm = (): Omit<NewsArticle, 'id'> => ({
  slug: '',
  cover: DEMO_COVERS[0],
  tag: '',
  title: emptyText(),
  excerpt: emptyText(),
  body: emptyText(),
  publishedAt: new Date().toISOString(),
  isPublished: true,
});

export const AdminNewsPage = () => {
  const { t, language } = useT();
  const items = useNewsStore((s) => s.items);
  const create = useNewsStore((s) => s.create);
  const update = useNewsStore((s) => s.update);
  const remove = useNewsStore((s) => s.remove);

  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<NewsArticle, 'id'>>(emptyForm());

  const locale = ({ kk: 'kk-KZ', ru: 'ru-RU', en: 'en-US' } as const)[language];

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(
      (n) =>
        n.title.ru.toLowerCase().includes(q) ||
        n.tag.toLowerCase().includes(q) ||
        n.slug.includes(q),
    );
  }, [items, search]);

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setCreating(true);
  };

  const startEdit = (article: NewsArticle) => {
    setCreating(false);
    setEditing(article);
    const { id: _id, ...rest } = article;
    void _id;
    setForm(rest);
  };

  const closeForm = () => {
    setCreating(false);
    setEditing(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug.trim() || slugify(form.title.ru || form.title.en || 'untitled');
    const payload = { ...form, slug };
    if (editing) {
      update(editing.id, payload);
    } else {
      create(payload);
    }
    closeForm();
  };

  const isOpen = creating || editing !== null;

  return (
    <>
      <PageHeader
        eyebrow={t('admin.section.list')}
        title={t('admin.news')}
        subtitle={t('admin.news.subtitle')}
        actions={
          <button type="button" className="btn-primary btn-sm" onClick={startCreate}>
            <Plus size={14} /> {t('common.create')}
          </button>
        }
      />

      <div className="card p-4 mb-6">
        <input
          type="text"
          placeholder={t('common.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-md"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('admin.news.cover')}</th>
                <th>{t('admin.news.title')}</th>
                <th>{t('admin.news.tag')}</th>
                <th>{t('admin.news.publishedAt')}</th>
                <th>{t('common.status')}</th>
                <th className="text-right">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => (
                <tr key={n.id}>
                  <td>
                    <div className="w-20 h-12 overflow-hidden border border-line">
                      <img src={n.cover} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td>
                    <div className="font-medium">{n.title[language] || n.title.ru}</div>
                    <div className="text-xs text-ink-subtle mt-0.5">/news/{n.slug}</div>
                  </td>
                  <td className="text-ink-muted">{n.tag}</td>
                  <td className="text-ink-muted whitespace-nowrap">
                    {formatDate(n.publishedAt, locale)}
                  </td>
                  <td>
                    <span className={n.isPublished ? 'badge-success' : 'badge-neutral'}>
                      {n.isPublished ? t('common.published') : t('common.unpublished')}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="btn-ghost btn-sm"
                        onClick={() => update(n.id, { isPublished: !n.isPublished })}
                      >
                        {n.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        type="button"
                        className="btn-ghost btn-sm"
                        onClick={() => startEdit(n)}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-danger btn-sm"
                        onClick={() => setConfirmId(n.id)}
                      >
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
          <form onSubmit={submit} className="relative w-full max-w-3xl card p-6 my-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl tracking-tight">
                {editing ? t('admin.section.editing') : t('admin.section.create')}
              </h2>
              <button type="button" className="p-2 -mr-2" onClick={closeForm}>
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="field-label">{t('admin.news.cover')}</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {DEMO_COVERS.map((src) => (
                    <button
                      type="button"
                      key={src}
                      onClick={() => setForm({ ...form, cover: src })}
                      className={cn(
                        'aspect-[16/10] overflow-hidden border-2 transition-colors',
                        form.cover === src ? 'border-accent' : 'border-line hover:border-line-strong',
                      )}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={form.cover}
                  onChange={(e) => setForm({ ...form, cover: e.target.value })}
                  placeholder="https://… or ./demo/*.svg"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="field-label">{t('admin.news.tag')}</label>
                  <input
                    type="text"
                    required
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    placeholder="События / Сервис / …"
                  />
                </div>
                <div>
                  <label className="field-label">{t('admin.news.slug')}</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated"
                  />
                </div>
                <div>
                  <label className="field-label">{t('admin.news.publishedAt')}</label>
                  <input
                    type="datetime-local"
                    value={form.publishedAt.slice(0, 16)}
                    onChange={(e) =>
                      setForm({ ...form, publishedAt: new Date(e.target.value).toISOString() })
                    }
                  />
                </div>
              </div>

              <fieldset className="grid md:grid-cols-3 gap-3">
                <legend className="field-label">{t('admin.news.title')}</legend>
                {(['kk', 'ru', 'en'] as const).map((lc) => (
                  <div key={lc}>
                    <div className="text-[10px] uppercase tracking-wider text-ink-subtle mb-1">{lc}</div>
                    <input
                      type="text"
                      value={form.title[lc]}
                      onChange={(e) =>
                        setForm({ ...form, title: { ...form.title, [lc]: e.target.value } })
                      }
                      required={lc === 'ru'}
                    />
                  </div>
                ))}
              </fieldset>

              <fieldset className="grid md:grid-cols-3 gap-3">
                <legend className="field-label">{t('admin.news.excerpt')}</legend>
                {(['kk', 'ru', 'en'] as const).map((lc) => (
                  <div key={lc}>
                    <div className="text-[10px] uppercase tracking-wider text-ink-subtle mb-1">{lc}</div>
                    <textarea
                      className="min-h-[80px]"
                      value={form.excerpt[lc]}
                      onChange={(e) =>
                        setForm({ ...form, excerpt: { ...form.excerpt, [lc]: e.target.value } })
                      }
                    />
                  </div>
                ))}
              </fieldset>

              <fieldset className="grid md:grid-cols-3 gap-3">
                <legend className="field-label">{t('admin.news.body')}</legend>
                {(['kk', 'ru', 'en'] as const).map((lc) => (
                  <div key={lc}>
                    <div className="text-[10px] uppercase tracking-wider text-ink-subtle mb-1">{lc}</div>
                    <textarea
                      className="min-h-[160px]"
                      value={form.body[lc]}
                      onChange={(e) =>
                        setForm({ ...form, body: { ...form.body, [lc]: e.target.value } })
                      }
                    />
                  </div>
                ))}
              </fieldset>

              <div>
                <label className="field-label">{t('common.status')}</label>
                <select
                  value={form.isPublished ? 'on' : 'off'}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.value === 'on' })}
                  className="md:max-w-xs"
                >
                  <option value="on">{t('common.published')}</option>
                  <option value="off">{t('common.unpublished')}</option>
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
