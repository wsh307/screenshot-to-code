// frontend/src/components/Preview.tsx
import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import useThrottle from '../hooks/useThrottle';
import { useTranslation } from 'react-i18next';

interface Props {
  code: string;
  device: 'mobile' | 'desktop';
}

function Preview({ code, device }: Props) {
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Don't update code more often than every 200ms.
  const throttledCode = useThrottle(code, 200);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = throttledCode;
    }
  }, [throttledCode]);

  return (
    <div className='flex justify-center mx-2'>
      <iframe
        id={`preview-${device}`}
        ref={iframeRef}
        title={t('preview.title')}
        className={classNames(
          'border-[4px] border-black rounded-[20px] shadow-lg',
          'transform scale-[0.9] origin-top',
          {
            'w-full h-[832px]': device === 'desktop',
            'w-[400px] h-[832px]': device === 'mobile',
          }
        )}
      ></iframe>
    </div>
  );
}

export default Preview;
