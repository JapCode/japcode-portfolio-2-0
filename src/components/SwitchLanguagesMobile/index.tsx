import { INavigationContent } from '@/types/navigation';
import { FC } from 'react';
import { Locale } from '../../../i18n.config';

interface ISwitchLanguagesMobileProps {
  page: INavigationContent;
  lang: Locale;
}

const SwitchLanguagesMobile: FC<ISwitchLanguagesMobileProps> = ({
  page,
  lang,
}): JSX.Element => {
  return <div>languages: {lang}</div>;
};

export default SwitchLanguagesMobile;
