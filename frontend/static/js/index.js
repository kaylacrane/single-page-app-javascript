/*client side entry point*/
import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";
import PostView from "./views/PostView.js";

const pathToRegex = (path) =>
  new RegExp(
    "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
  ); /* ^ is the start of string and we are going to replace each / with the regEx equivalent of the match ( \/ basically)*/

const getParams = (match) => {
  /* set up key and value for each path */
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  ); /*matchAll iterates through the path and grabs the key, which is essentially the :id, puts it into an array and then sets it into a new entry*/
  //   console.log("keys", keys);
  return Object.fromEntries(
    keys.map((key, i) => {
      return [
        key,
        values[i],
      ]; /*matches up keys with their values and put them in an object*/
    })
  );
};

const navigateTo = (url) => {
  /*this will be run instead of default refresh page action*/
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    {
      path: "/" /*route path for webpage*/,
      view: Dashboard /*this runs when path / is visited*/,
    },
    {
      path: "/posts",
      view: Posts,
    },
    { path: "/posts/:id", view: PostView },
    {
      path: "/settings",
      view: Settings,
    },
  ];

  // test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    }; /*if no route match then we define a default route (dashboard here but we can create custom 404)*/
  }
  //   console.log(match.route.path);
  const view = new match.route.view(
    getParams(match)
  ); /*creates new instance of Dashboard at match route*/

  document.querySelector(
    "#app"
  ).innerHTML = await view.getHtml(); /*then we inject that instance into the correct place (div with app id)*/

  //   console.log(match.route.view()); /*calls view function*/
}; /*async because we might need to make request for some settings before loading page*/

window.addEventListener(
  "popstate",
  router
); /*this ensure routing is correct when user navigates through history (back button)*/

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      /* if clicked link has a data-link attribute then prevent page reload and run navigateTo function*/
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });
  router();
});
