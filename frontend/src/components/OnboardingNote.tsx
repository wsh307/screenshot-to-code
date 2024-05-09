// frontend/src/components/OnboardingNote.tsx
import { useTranslation } from 'react-i18next';

export function OnboardingNote() {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col space-y-4 bg-green-700 p-2 rounded text-stone-200 text-sm'>
      <span>
        {t('onboardingnote.note')}
        <a
          className='inline underline hover:opacity-70'
          href='https://buy.stripe.com/8wM6sre70gBW1nqaEE'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('onboardingnote.buy_credits')}
        </a>
        {t('onboardingnote.or_use_own_key')}
        <a
          href='https://github.com/abi/screenshot-to-code/blob/main/Troubleshooting.md'
          className='inline underline hover:opacity-70'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('onboardingnote.instructions')}
        </a>
        {t('onboardingnote.settings_hint')}
      </span>
    </div>
  );
}
