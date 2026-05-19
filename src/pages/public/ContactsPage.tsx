import { useT } from '@/features/i18n/store';
import { useSettingsStore } from '@/features/settings/store';
import { PageHeader } from '@/shared/components/ui';
import { LeadForm } from '@/shared/components/forms/LeadForm';

export const ContactsPage = () => {
  const { t } = useT();
  const settings = useSettingsStore((s) => s.settings);

  return (
    <div className="container-page py-12 md:py-16">
      <PageHeader
        eyebrow={t('nav.contacts')}
        title={t('contacts.title')}
        subtitle={t('contacts.subtitle')}
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <dl className="border border-line divide-y divide-line">
            {[
              { label: t('contacts.address'), value: settings.address },
              { label: t('contacts.phone'), value: settings.phone },
              { label: t('contacts.email'), value: settings.email },
              { label: t('contacts.hours'), value: settings.workingHours },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-3 px-5 py-4">
                <dt className="text-xs uppercase tracking-wider text-ink-muted col-span-1">{row.label}</dt>
                <dd className="text-sm col-span-2">{row.value}</dd>
              </div>
            ))}
          </dl>

          {/* Map placeholder — intentional, not a fake map */}
          <div className="mt-8 aspect-[4/3] border border-line bg-surface-2 grid-bg flex items-center justify-center">
            <span className="eyebrow text-ink-subtle">{t('contacts.mapPlaceholder')}</span>
          </div>
        </div>

        <div>
          <LeadForm />
        </div>
      </div>
    </div>
  );
};
