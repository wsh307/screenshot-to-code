// frontend/src/components/UrlInputSection.tsx
import { useState } from 'react';
import { HTTP_BACKEND_URL } from '../config';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface Props {
  screenshotOneApiKey: string | null;
  doCreate: (urls: string[], inputMode: 'image' | 'video') => void;
}

export function UrlInputSection({ doCreate, screenshotOneApiKey }: Props) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [referenceUrl, setReferenceUrl] = useState('');

  async function takeScreenshot() {
    if (!screenshotOneApiKey) {
      toast.error(t('urlinput.missing_api_key_error'), { duration: 8000 });
      return;
    }

    if (!referenceUrl) {
      toast.error(t('urlinput.missing_url_error'));
      return;
    }

    if (referenceUrl) {
      try {
        setIsLoading(true);
        const response = await fetch(`${HTTP_BACKEND_URL}/api/screenshot`, {
          method: 'POST',
          body: JSON.stringify({
            url: referenceUrl,
            apiKey: screenshotOneApiKey,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to capture screenshot');
        }

        const res = await response.json();
        doCreate([res.url], 'image');
      } catch (error) {
        console.error(error);
        toast.error(t('urlinput.screenshot_failed_error'));
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className='max-w-[90%] min-w-[40%] gap-y-2 flex flex-col'>
      <div className='text-gray-500 text-sm'>{t('urlinput.title')}</div>
      <Input
        placeholder={t('urlinput.placeholder')}
        onChange={(e) => setReferenceUrl(e.target.value)}
        value={referenceUrl}
      />
      <Button onClick={takeScreenshot} disabled={isLoading} className="bg-slate-400 capture-btn">
        {isLoading ? t('urlinput.capturing_button') : t('urlinput.capture_button')}
      </Button>
    </div>
  );
}
