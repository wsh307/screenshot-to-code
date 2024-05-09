import React, { useState, useEffect } from 'react';
import i18n from '../../i18n';
import './LanguageSelector.css';

type Languages = 'en' | 'zh';

const LanguageSelector: React.FC = () => {
  const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return (['en', 'zh'].includes(browserLang) ? browserLang : 'en') as Languages;
  };

  const [selectedLang, setSelectedLang] = useState<Languages>(i18n.language as Languages);

  useEffect(() => {
    const defaultLang = getBrowserLanguage();
    if (defaultLang !== i18n.language) {
      i18n.changeLanguage(defaultLang);
      setSelectedLang(defaultLang);
    }
  }, []);

  const handleLanguageChange = () => {
    const nextLang: Languages = selectedLang === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(nextLang);
    setSelectedLang(nextLang);
  };

  return (
    <button className="acss-yk1wp5" onClick={handleLanguageChange}>
      <span className={`acss-1nbrequ ${selectedLang === 'zh' ? 'active' : 'inactive'}`} style={{ right: 0 }}>
        中
      </span>
      <span className={`acss-1nbrequ ${selectedLang === 'en' ? 'active' : 'inactive'}`} style={{ right: 0 }}>
        En
      </span>
    </button>
  );
};

export default LanguageSelector;