import RestaurantsManager from "./restaurantsmanager.js";
import RestaurantsManagerController from "./restaurantsmanagerController.js";
import RestaurantsManagerView from "./restaurantsmanagerView.js";

const RestaurantManagerApp = new RestaurantsManagerController(
  RestaurantsManager.getInstance(),
  new RestaurantsManagerView()
);

export default RestaurantManagerApp;
