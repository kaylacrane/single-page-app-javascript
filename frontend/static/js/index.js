/*client side entry point*/
import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

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
    {
      path: "/settings",
      view: Settings,
    },
  ];

  // test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    }; /*if no route match then we define a default route (dashboard here but we can create custom 404)*/
  }

  const view = new match.route.view(); /*creates new instance of Dashboard at match route*/

  document.querySelector(
    "#app"
  ).innerHTML = await view.getHtml(); /*then we inject that instance into the correct place (div with app id)*/

  console.log(match.route.view()); /*calls view function*/
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
