// Importado de los módulos necesarios
import RestaurantsManager, {
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
} from "./restaurantsmanager.js";

// Modelo y vista como constantes privadas
const MODEL = Symbol("RestaurantsManagerModel");
const VIEW = Symbol("RestaurantsManagerView");
// Se instanciarán aquí los objetos que nos hagan falta para una carga inicial de datos
const LOAD_MANAGER_OBJECTS = Symbol("Load Manager Objects");

class RestaurantsManagerController {
  constructor(model, view) {
    this[MODEL] = model;
    this[VIEW] = view;

    this.onLoad();
    this.onInit();
    this[VIEW].bindInit(this.handleInit);
  }

  [LOAD_MANAGER_OBJECTS]() {
    // Creación de categorías
    const cat1 = this[MODEL].createCategory(
      "Burger principales",
      RestaurantsManager.Category
    );
    cat1.description = "Hamburguesas especiales";

    const cat2 = this[MODEL].createCategory(
      "Acompañamientos",
      RestaurantsManager.Category
    );
    cat2.description = "Acompañamientos increíbles";

    const cat3 = this[MODEL].createCategory(
      "Postres",
      RestaurantsManager.Category
    );
    cat3.description = "Postres impresionantes";

    // Creación de platos
    let dish1 = this[MODEL].createDish("Croquetas", RestaurantsManager.Dish);
    dish1.ingredients = ["Jamón", "Pollo", "Sal", "Sazonador"];
    dish1.description = "Croquetas de cocido caseras";
    dish1.image = "img/a4.jpg";

    let dish2 = this[MODEL].createDish(
      "Doble Carne Pepinillo",
      RestaurantsManager.Dish
    );
    dish2.ingredients = [
      "Queso",
      "Ternera",
      "Lechuga",
      "Pepinillo",
      "Ketchup",
      "Mayonesa",
      "Mostaza",
    ];
    dish2.description =
      "Hamburguesa doble carne con pepinillo pinchado en el pan de la hamburguesa";
    dish2.image = "img/b1.jpeg";

    let dish3 = this[MODEL].createDish(
      "Carne y Bacon",
      RestaurantsManager.Dish
    );
    dish3.ingredients = [
      "Ternera",
      "Bacon",
      "Cheddar",
      "Ghouda",
      "Pan bizcocho",
    ];
    dish3.description =
      "Burger tradicional americana con ternera de vacuno y doble de bacon";
    dish3.image = "img/b2.jpg";

    let dish4 = this[MODEL].createDish(
      "Carne y Huevo",
      RestaurantsManager.Dish
    );
    dish4.ingredients = [
      "Ternera",
      "Lechuga",
      "Tomate",
      "Huevo Frito",
      "Cheddar",
      "Ghouda",
    ];
    dish4.description = "Burguer con huevo frito, especialidad de la casa";
    dish4.image = "img/b3.jpg";

    let dish5 = this[MODEL].createDish(
      "Desmenuzada con cebolla",
      RestaurantsManager.Dish
    );
    dish5.ingredients = [
      "Cerdo",
      "Cebolla",
      "Mayonesa",
      "Lechuga",
      "Cebolla caramelizada",
      "Mostaza",
    ];
    dish5.description =
      "Burguer con cerdo desmenuzado, nuestra hamburguesa más artesana";
    dish5.image = "img/b4.jpg";

    let dish6 = this[MODEL].createDish(
      "Tiras de pollo",
      RestaurantsManager.Dish
    );
    dish6.ingredients = ["Pollo frito", "Pimienta negra", "Sal"];
    dish6.description = "Tiras de pollo tradicionales al estilo Kentucky";
    dish6.image = "img/a1.jpg";

    let dish7 = this[MODEL].createDish(
      "Fingers de pollo",
      RestaurantsManager.Dish
    );
    dish7.ingredients = ["Tiras de pollo", "Aceite", "Sazonador"];
    dish7.description =
      "Fingers de pollo americanos recién sacados de la freidora";
    dish7.image = "img/a2.jpg";

    let dish8 = this[MODEL].createDish(
      "Bravas españolas",
      RestaurantsManager.Dish
    );
    dish8.ingredients = ["Patata", "Tabasco", "Tomate", "Sal"];
    dish8.description = "El acompañamiento más tradicional español";
    dish8.image = "img/a3.jpg";

    let dish9 = this[MODEL].createDish(
      "Helado casero",
      RestaurantsManager.Dish
    );
    dish9.ingredients = ["Vainilla", "Azúcar", "Sirope de chocolate"];
    dish9.description = "Artesano y delicioso";
    dish9.image = "img/helado.jpg";

    let dish10 = this[MODEL].createDish("Contesa", RestaurantsManager.Dish);
    dish10.ingredients = ["Nata", "Chocolate", "Azúcar"];
    dish10.description = "Postre tradicional español";
    dish10.image = "img/contesa.jpg";

    let dish11 = this[MODEL].createDish(
      "Natillas de la abuela",
      RestaurantsManager.Dish
    );
    dish11.ingredients = [
      "Leche",
      "Canela",
      "Vaina de vainilla",
      "Yema de huevo",
      "Azúcar",
      "Galleta",
    ];
    dish11.description = "Tradicional, casero y auténtico";
    dish11.image = "img/natillas.jpg";

    let dish12 = this[MODEL].createDish(
      "Arroz con leche",
      RestaurantsManager.Dish
    );
    dish12.ingredients = [
      "Leche",
      "Azúcar",
      "Corteza de naranja",
      "Vainilla",
      "Arroz",
      "Canela",
    ];
    dish12.description = "Postre al estilo Karlos Arguiñano";
    dish12.image = "img/arrozleche.jpg";

    // Creación de alérgenos
    let all1 = this[MODEL].createAllergen(
      "Lactosa",
      RestaurantsManager.Allergen
    );
    let all2 = this[MODEL].createAllergen(
      "Gluten",
      RestaurantsManager.Allergen
    );
    let all3 = this[MODEL].createAllergen("Soja", RestaurantsManager.Allergen);
    let all4 = this[MODEL].createAllergen(
      "Frutos Secos",
      RestaurantsManager.Allergen
    );

    this[MODEL].addAllergen(all1, all2, all3, all4);
    this[MODEL].assignAllergenToDish(
      all1,
      dish11,
      dish12,
      dish10,
      dish9,
      dish4,
      dish3,
      dish2
    );

    this[MODEL].assignAllergenToDish(all2, dish3, dish4, dish5, dish7, dish10);
    this[MODEL].assignAllergenToDish(all3, dish5, dish6, dish7);
    this[MODEL].assignAllergenToDish(all4, dish2, dish3, dish4);

    // Creación de menús
    let menu1 = this[MODEL].createMenu(
      "Classic Arthur Menu",
      RestaurantsManager.Menu
    );
    let menu2 = this[MODEL].createMenu(
      "Funny Flavours",
      RestaurantsManager.Menu
    );
    let menu3 = this[MODEL].createMenu("New and Old", RestaurantsManager.Menu);

    // Asignación de platos a categorías y menús
    this[MODEL].assignCategoryToDish(cat1, dish2, dish3, dish4, dish5);
    this[MODEL].assignCategoryToDish(cat2, dish1, dish6, dish7, dish8);
    this[MODEL].assignCategoryToDish(cat3, dish9, dish10, dish11, dish12);

    this[MODEL].assignDishToMenu(menu1, dish2, dish1, dish9);
    this[MODEL].assignDishToMenu(menu2, dish3, dish6, dish10);
    this[MODEL].assignDishToMenu(menu3, dish4, dish7, dish11);

    // Creación de restaurantes
    let res1 = this[MODEL].createRestaurant(
      "KAB Madrid",
      RestaurantsManager.Restaurant
    );
    res1.description =
      "KAB situado en Madrid, donde todo aquel que va con prisa, se para aquí.";
    res1.location = new Coordinate("40.437842", "-3.686273");

    let res2 = this[MODEL].createRestaurant(
      "KAB Ciudad Real",
      RestaurantsManager.Restaurant
    );
    res2.description =
      "KAB situado en Ciudad Real. Un soplo de aire fresco en una ciudad agricultora.";
    res2.location = new Coordinate("38.98626", "-3.92907");

    let res3 = this[MODEL].createRestaurant(
      "KAB Parla",
      RestaurantsManager.Restaurant
    );
    res3.description =
      "KAB situado en Parla. Nunca hay que olvidar los orígenes ni de donde venimos.";
    res3.location = new Coordinate("40.23604", "-3.76752");

    this[MODEL].addRestaurant(res1, res2, res3);
  }

  // Funciones que solo se ejecutan una sola vez
  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();
    this.onAddCategory();
    this.onAddAllergen();
    this.onAddMenu();
    this.onAddRestaurant();
    this.onAddClose();
  };

  // Funciones que se ejecutan al clickear inicio
  onInit = () => {
    this[VIEW].showCategories(this[MODEL].categories);
    this[VIEW].showRandomDishes(this[MODEL].getRandomDishes());
    this[VIEW].bindDishesCategoryList(this.handleDishesCategoryList);
    this[VIEW].bindDishesRandomList(this.handleDishesRandomList);
  };

  handleInit = () => {
    this.onInit();
  };

  // Mostrado de categorías en navegación y manejador
  onAddCategory = () => {
    this[VIEW].showCategoriesInMenu(this[MODEL].categories);
    this[VIEW].bindDishesCategoryListInMenu(this.handleDishesCategoryList);
  };

  // Mostrado de alérgenos en navegación y manejador
  onAddAllergen = () => {
    this[VIEW].showAllergensInMenu(this[MODEL].allergens);
    this[VIEW].bindDishesAllergenListInMenu(this.handleDishesAllergenList);
  };

  // Mostrado de menú en navegación y manejador
  onAddMenu = () => {
    this[VIEW].showMenusInNav(this[MODEL].menus);
    this[VIEW].bindMenuListInNav(this.handleDishesMenuList);
  };

  // Mostrado de restaurantes en navegación y manejador
  onAddRestaurant = () => {
    this[VIEW].showRestaurantsInMenu(this[MODEL].restaurants);
    this[VIEW].bindRestaurantListInMenu(this.handleRestaurantsMenuList);
  };

  // ----- PRACTICA 6 -> OnAddClose & handleCloseWindowsInMenu -----
  // Mostrado de enlace para cerrar ventanas y manejador
  onAddClose = () => {
    this[VIEW].showCloseWindowsInMenu();
    this[VIEW].bindCloseWindowsInMenu(this.handleCloseWindowsInMenu);
  };

  // Manejador que permite cerrar la ventana y eliminarlo de las referencias guardadas
  handleCloseWindowsInMenu = (window, dish) => {
    window.close();
    this[VIEW].dishWindows.delete(dish);
    // Resetea los ID que se asignan a las ventanas
    this[VIEW].id = 0;
  };

  // Manejador para mostrar fichas de los platos aleatorios
  handleDishesRandomList = (name) => {
    const dish = this[MODEL].createDish(name, RestaurantsManager.Dish);
    this.handleShowDish(dish.name);
  };

  // Manejador de los platos de una categoría en la barra de navegación o en la sección central
  handleDishesCategoryList = (name) => {
    const category = this[MODEL].createCategory(
      name,
      RestaurantsManager.Category
    );
    this[VIEW].listDishes(
      this[MODEL].getDishesInCategory(category),
      category.name,
      "Categorías"
    );
    this[VIEW].bindShowDish(this.handleShowDish);
  };

  // Manejador para los alérgenos en la barra de navegación
  handleDishesAllergenList = (name) => {
    const allergen = this[MODEL].createAllergen(
      name,
      RestaurantsManager.Allergen
    );
    this[VIEW].listDishes(
      this[MODEL].getDishesWithAllergen(allergen),
      allergen.name,
      "Alérgenos"
    );
    this[VIEW].bindShowDish(this.handleShowDish);
  };

  // Manejador para platos de un menú en barra de navegación
  handleDishesMenuList = (name) => {
    const menu = this[MODEL].createMenu(name, RestaurantsManager.Menu);
    this[VIEW].listDishes(
      this[MODEL].getDishesInMenu(menu),
      menu.name,
      "Menús"
    );
    this[VIEW].bindShowDish(this.handleShowDish);
  };

  // Manejador para mostrar el restaurante desde la barra de navegación
  handleRestaurantsMenuList = (name) => {
    const rest = this[MODEL].createRestaurant(
      name,
      RestaurantsManager.Restaurant
    );
    this[VIEW].showRestaurant(rest, "Restaurantes");
  };

  // Manejador para el mostrado de platos
  handleShowDish = (name) => {
    try {
      const dish = this[MODEL].createDish(name, RestaurantsManager.Dish);
      this[VIEW].showDish(dish);
      this[VIEW].bindShowProductInNewWindow(this.handleShowDishInNewWindow);
    } catch (error) {
      this[VIEW].showDish(
        null,
        "No existe este plato actualmente en la página."
      );
    }
  };

  // ----- PRACTICA 6 -----
  // Manejador para el mostrado de platos en una nueva ventana
  handleShowDishInNewWindow = (name, newWindow) => {
    try {
      const dish = this[MODEL].createDish(name, RestaurantsManager.Dish);
      this[VIEW].showDishInNewWindow(dish, newWindow);
    } catch (error) {
      this[VIEW].showDishInNewWindow(
        null,
        "No existe este producto en la página."
      );
    }
  };
}

export default RestaurantsManagerController;
