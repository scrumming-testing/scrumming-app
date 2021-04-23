const defaultOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const defaultLanguage = 'es-MX';

class DateUtil {
  constructor(options = defaultOptions, language = defaultLanguage) {
    this.options = options;
    this.language = language;
  }

  today() {
    return this.format(Date.now());
  }

  format(utcDate) {
    const formatDate = new Date(utcDate);
    return formatDate.toLocaleDateString(this.language, this.options);
  }
}

export default DateUtil;
