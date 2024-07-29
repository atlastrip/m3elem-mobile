import { getLocales } from "expo-localization";
import { I18n } from 'i18n-js';

import en from './en';
import fr from './fr';
// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
    en: en,
    fr: fr,
});



console.log('====================================');
console.log('chno how hadaaa', getLocales()[0].languageCode);
console.log('====================================');
i18n.locale = getLocales()[0].languageCode;


export default i18n;

