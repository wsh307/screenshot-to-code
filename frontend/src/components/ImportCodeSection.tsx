// frontend/src/components/ImportCodeSection.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import OutputSettingsSection from './OutputSettingsSection';
import toast from 'react-hot-toast';
import { Stack } from '../lib/stacks';
import { useTranslation } from 'react-i18next';

interface Props {
  importFromCode: (code: string, stack: Stack) => void;
}

function ImportCodeSection({ importFromCode }: Props) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [stack, setStack] = useState<Stack | undefined>(undefined);

  const doImport = () => {
    if (code === '') {
      toast.error(t('importcode.error_empty_code'));
      return;
    }

    if (stack === undefined) {
      toast.error(t('importcode.error_select_stack'));
      return;
    }

    importFromCode(code, stack);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="import-from-code-btn" variant="secondary">
        {t('importcode.trigger_button')}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{t('importcode.dialog_title')}</DialogTitle>
          <DialogDescription>{t('importcode.dialog_description')}</DialogDescription>
        </DialogHeader>

        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className='w-full h-64'
          placeholder={t('importcode.textarea_placeholder')}
        />

        <OutputSettingsSection
          stack={stack}
          setStack={(config: Stack) => setStack(config)}
          label='Stack:'
          shouldDisableUpdates={false}
        />

        <DialogFooter>
        <Button className="import-btn" type="submit" onClick={doImport}>
            {t('importcode.import_button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImportCodeSection;
