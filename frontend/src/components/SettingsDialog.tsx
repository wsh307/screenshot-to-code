// frontend/src/components/SettingsDialog.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaCog } from 'react-icons/fa';
import { EditorTheme, Settings } from '../types';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { capitalize } from '../lib/utils';
import { IS_RUNNING_ON_CLOUD } from '../config';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const SettingsDialog: React.FC<Props> = ({ settings, setSettings }) => {
  const { t } = useTranslation();

  const handleThemeChange = (theme: EditorTheme) => {
    setSettings((s) => ({
      ...s,
      editorTheme: theme,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FaCog />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">{t('settings.dialog_title')}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <Label htmlFor="image-generation">
            <div>{t('settings.image_generation')}</div>
            <div className="font-light mt-2 text-xs">{t('settings.image_generation_note')}</div>
          </Label>
          <Switch
            id="image-generation"
            checked={settings.isImageGenerationEnabled}
            onCheckedChange={() =>
              setSettings((s) => ({
                ...s,
                isImageGenerationEnabled: !s.isImageGenerationEnabled,
              }))
            }
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div>
            <Label htmlFor="openai-api-key">
              <div>{t('settings.openai_api_key')}</div>
              <div className="font-light mt-1 mb-2 text-xs leading-relaxed">
              {t('settings.openai_api_key_note')}
              </div>
            </Label>
            <Input
              id="openai-api-key"
              placeholder="OpenAI API key"
              value={settings.openAiApiKey || ""}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  openAiApiKey: e.target.value,
                }))
              }
            />
          </div>

          {!IS_RUNNING_ON_CLOUD && (
            <div>
              <Label htmlFor="openai-base-url">
                <div>{t('settings.openai_base_url')}</div>
                <div className="font-light mt-2 leading-relaxed">{t('settings.openai_base_url_note')}</div>
              </Label>
              <Input
                id="openai-base-url"
                placeholder={t('settings.openai_base_url')}
                value={settings.openAiBaseURL || ''}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    openAiBaseURL: e.target.value,
                  }))
                }
              />
            </div>
          )}
          <div>
            <Label htmlFor="anthropic-api-key">
              <div>Anthropic API key</div>
              <div className="font-light mt-1 text-xs leading-relaxed">
                Only stored in your browser. Never stored on servers. Overrides
                your .env config.
              </div>
            </Label>

            <Input
              id="anthropic-api-key"
              placeholder="Anthropic API key"
              value={settings.anthropicApiKey || ""}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  anthropicApiKey: e.target.value,
                }))
              }
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t('settings.screenshot_url')}</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="screenshot-one-api-key">
                  <div className="leading-normal font-normal text-xs">
                    {t('settings.screenshot_url_note')}{' '}
                    <a
                      href="https://screenshotone.com?via=screenshot-to-code"
                      className="underline"
                      target="_blank"
                    >
                      {t('settings.get_screenshot_key')}
                    </a>
                  </div>
                </Label>
                <Input
                  id="screenshot-one-api-key"
                  className="mt-2"
                  placeholder={t('settings.screenshot_api_key')}
                  value={settings.screenshotOneApiKey || ''}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      screenshotOneApiKey: e.target.value,
                    }))
                  }
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2">
              <AccordionTrigger>{t('settings.theme_settings')}</AccordionTrigger>
              <AccordionContent className="space-y-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-theme">
                    <div>{t('settings.app_theme')}</div>
                  </Label>
                  <div>
                    <button
                      className="flex rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50t"
                      onClick={() => {
                        document
                          .querySelector('div.mt-2')
                          ?.classList.toggle('dark'); // enable dark mode for sidebar
                        document.body.classList.toggle('dark');
                        document
                          .querySelector('div[role="presentation"]')
                          ?.classList.toggle('dark'); // enable dark mode for upload container
                      }}
                    >
                      {t('settings.toggle_dark_mode')}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="editor-theme">
                    <div>{t('settings.editor_theme')}</div>
                  </Label>
                  <div>
                    <Select
                      name="editor-theme"
                      value={settings.editorTheme}
                      onValueChange={(value) => handleThemeChange(value as EditorTheme)}
                    >
                      <SelectTrigger className="w-[180px]">
                        {capitalize(settings.editorTheme)}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cobalt">Cobalt</SelectItem>
                        <SelectItem value="espresso">Espresso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <DialogFooter>
          <DialogClose>{t('settings.dialog_save')}</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
