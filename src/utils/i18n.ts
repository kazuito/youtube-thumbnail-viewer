// Translation for user's YouTube language
const messages = {
  en: {
    thumbnailTooltip: "Thumbnail image",
  },
  es: {
    thumbnailTooltip: "Imagen en miniatura",
  },
  fr: {
    thumbnailTooltip: "Image miniature",
  },
  ja: {
    thumbnailTooltip: "サムネイル画像",
  },
  ko: {
    thumbnailTooltip: "썸네일 이미지",
  },
};

class I18N {
  data: any;
  fullLang: string;
  lang: string;
  country: string;

  constructor(messages: any) {
    this.data = messages;
    this.fullLang = "en_US";
    this.lang = "en";
    this.country = "US";
  }

  /**
   * Set user's YouTube language and country
   * @param {string} lang Language code - en
   * @param {string} country Country code - US
   */
  setLocale(lang: string, country: string) {
    let fullLang = `${lang}_${country}`;
    this.fullLang = fullLang;
    this.lang = lang;
    this.country = country;
  }

  getMessage(messageKey: string): string {
    if (this.data[this.fullLang]) {
      return this.data[this.fullLang][messageKey];
    } else if (this.data[this.lang]) {
      return this.data[this.lang][messageKey];
    } else {
      return this.data.en[messageKey];
    }
  }

  getLocalMessages() {
    if (this.data[this.fullLang]) {
      return this.data[this.fullLang];
    } else if (this.data[this.lang]) {
      return this.data[this.lang];
    } else {
      return this.data.en;
    }
  }
}

const i18n = new I18N(messages);
export default I18N;
export { i18n };
