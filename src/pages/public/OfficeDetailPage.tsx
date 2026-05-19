import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useT } from '@/features/i18n/store';
import { useOfficesStore } from '@/features/offices/store';
import { OfficeStatusBadge } from '@/shared/components/ui';
import { LeadForm } from '@/shared/components/forms/LeadForm';
import { formatNumber, formatPrice } from '@/shared/utils';

export const OfficeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const office = useOfficesStore((s) => s.items.find((o) => o.id === id));
  const { t, language } = useT();
  const locale = ({ kk: 'kk-KZ', ru: 'ru-RU', en: 'en-US' } as const)[language];

  if (!office) return <Navigate to="/offices" replace />;

  return (
    <div className="container-page py-12 md:py-16">
      <Link to="/offices" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink mb-8">
        <ChevronLeft size={16} /> {t('common.back')}
      </Link>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="eyebrow mb-3">
            {t('common.floor')} {office.floor} · {t(`officeType.${office.type}`)}
          </div>
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <h1 className="font-display text-4xl md:text-5xl tracking-tight">{office.title}</h1>
            <OfficeStatusBadge status={office.status} />
          </div>

          {/* Visual — uses a demo render selected by office type */}
          <div className="aspect-[16/9] border border-line bg-surface-2 mb-10 overflow-hidden">
            <img
              src={
                office.type === 'openSpace'
                  ? './demo/openspace.svg'
                  : office.type === 'block'
                    ? './demo/atrium.svg'
                    : office.type === 'mixed'
                      ? './demo/lounge.svg'
                      : './demo/office.svg'
              }
              alt={office.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-line">
            <div>
              <div className="eyebrow mb-2">{t('common.area')}</div>
              <div className="font-display text-2xl">{formatNumber(office.area)} м²</div>
            </div>
            <div>
              <div className="eyebrow mb-2">{t('common.floor')}</div>
              <div className="font-display text-2xl">{office.floor}</div>
            </div>
            <div>
              <div className="eyebrow mb-2">{t('common.type')}</div>
              <div className="font-display text-2xl">{t(`officeType.${office.type}`)}</div>
            </div>
            <div>
              <div className="eyebrow mb-2">{t('common.price')}</div>
              <div className="font-display text-2xl">
                {office.price !== null ? formatPrice(office.price, locale) : t('common.priceOnRequest')}
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl mb-3">{t('common.description')}</h2>
          <p className="text-ink-muted leading-relaxed mb-10">{office.description}</p>

          {office.features.length > 0 && (
            <>
              <h2 className="font-display text-2xl mb-4">{t('common.features')}</h2>
              <ul className="grid gap-2 md:grid-cols-2 mb-10">
                {office.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm border-l-2 border-accent pl-3 py-1"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="eyebrow mb-3">{t('common.requestCallback')}</div>
          <LeadForm defaultInterest="office" relatedItemId={office.id} />
        </div>
      </div>
    </div>
  );
};
