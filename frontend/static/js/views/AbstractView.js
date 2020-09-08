/* all views/pages to load will inherit from this class */

export default class {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    /*page title*/
    document.title = title;
  }

  async getHtml() {
    return "";
  }
}
