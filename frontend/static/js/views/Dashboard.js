import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
    /*to make sure page title is set to this view's title*/
  }
  async getHtml() {
    return `
        <h1>Dashboard view</h1>
        <p>
        This is the contents of the dashboard. Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
        </p>
        <p>
            <a href="/posts" data-link>View recent posts</a>. 
        </p>  
      `;
  }
}
