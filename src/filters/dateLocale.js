export default (value, locales = "ru") =>  new Date(value).toLocaleString(locales);
