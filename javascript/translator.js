class Translator {
  constructor(fetch) {
    this.fetch = fetch;
    this.options = { headers: { Host: "mysite.com", Referer: "mysite.com" } };
  }
  getUrl(target, text, source = "auto") {
    return `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}
    &dt=t&q=${encodeURI(text)}`;
  }
  async translate(target, text, source) {
    try {
      const result = await this.fetch(this.getUrl(target, text, source)).then((res) => res.json());
      return JSON.parse(result)[0][0][0];
    } catch (error) {
      return text;
    }
  }
}

module.exports = Translator;
