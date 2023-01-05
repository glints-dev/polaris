import {useContext} from 'react';

import {MissingAppProviderError} from '../errors';

import {I18nContext} from './context';

export function useI18n() {
  const i18n = useContext(I18nContext);

  return i18n;
}
