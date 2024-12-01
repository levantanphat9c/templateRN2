/**
 * @format
 */

//@ts-ignore
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AppRegistry, LogBox } from 'react-native';

import 'react-native-gesture-handler';

import App from '@/Containers/App';
import { LANG } from '@/Constants';
import enDefault from '@/Services//I18n/locales/en.json';
import koDefault from '@/Services/I18n/locales/ko.json';
import viDefault from '@/Services/I18n/locales/vi.json';

import { name as appName } from './app.json';

i18next
  .use(initReactI18next)
  .init(
    {
      lng: 'vi',
      fallbackLng: LANG.VI,
      resources: {
        en: {
          translation: enDefault,
        },
        vi: {
          translation: viDefault,
        },
        ko: {
          translation: koDefault,
        },
      },
      react: {
        useSuspense: false, //in case you have any suspense related errors
      },
      //Fix / cannot be shown
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: 'v3', // temporary, see more here https://www.i18next.com/misc/migration-guide
    },
    err => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
  )
  .finally(() => {
    AppRegistry.registerComponent(appName, () => App);
  });

LogBox.ignoreLogs([
  '[Reanimated] Reduced motion setting is overwritten with mode',
  '[Reanimated] Reduced motion setting is enabled on this device.',
  'TNodeChildrenRenderer',
  'Non-serializable values were found in the navigation state.',
  `There is no custom renderer registered for tag "quillbot-extension-portal" which is not part of the HTML5 standard. The tag will not be rendered. If you don't want this tag to be rendered, add it to "ignoredDomTags" prop array. If you do, register an HTMLElementModel for this tag with "customHTMLElementModels" prop.`,
  `The "meta" tag is a valid HTML element but is not handled by this library. You must extend the default HTMLElementModel for this tag with "customHTMLElementModels" prop and make sure its content model is not set to "none". If you don't want this tag to be rendered, add it to "ignoredDomTags" prop array.`,
]);
