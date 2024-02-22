import RestaurantManagerApp from "./restaurantsmanagerApp.js";

// Refactorización en objeto literal para ser invocado en base al nombre de la acción
const historyActions = {
  init: () => {
    RestaurantManagerApp.handleInit();
  },
  dishesRandomList: (event) =>
    RestaurantManagerApp.handleDishesRandomList(event.state.dish),
  showProduct: (event) => RestaurantManagerApp.handleShowDish(event.state.dish),
  dishesCategoryList: (event) =>
    RestaurantManagerApp.handleDishesCategoryList(event.state.category),
  dishesAllergenList: (event) =>
    RestaurantManagerApp.handleDishesAllergenList(event.state.allergen),
  dishesMenuList: (event) =>
    RestaurantManagerApp.handleDishesMenuList(event.state.menu),
  restaurantList: (event) =>
    RestaurantManagerApp.handleRestaurantsMenuList(event.state.rest),
  showDish: (event) => RestaurantManagerApp.handleShowDish(event.state.dish),
};

// Se define 'popstate' para restaurar el estado de la página en función del tipo de acción apilada
window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

history.replaceState({ action: "init" }, null);
