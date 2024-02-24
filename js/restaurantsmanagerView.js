import { newDishValidation, newCategoryValidation } from "./validation.js";
// Symbol dónde se introducirá la vista de RestaurantManager
const EXECUTE_HANDLER = Symbol("executeHandler");

class RestaurantsManagerView {
  constructor() {
    this.initzone = document.getElementById("init_zone");
    this.centralzone = document.getElementById("central_zone");
    this.menu = document.querySelector(".navbar");
    this.breadcrumb = document.querySelector(".breadcrumb");
    this.dishWindows = new Map();
    this.id = 0;
  }

  // Recibe la función manejadora del Controller, los argumentos en un array,
  // la cadena que permite seleccionar el objeto contenedor de la Vista, el objeto
  // con los datos de restauración del estado, la url y el objeto de evento
  // para poder cancelar la acción por defecto
  [EXECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  // Función que permite visualizar platos en la zona inicial del HTML
  showRandomDishes(dishes) {
    if (this.initzone.children.length > 0) {
      this.initzone.children[0].remove();
    }
    // Creamos un nuevo div y le asignamos un id y las clases pertinentes
    const container = document.createElement("div");
    container.id = "random-list";
    container.classList.add("row", "mx-auto", "text-center");
    // Dentro del div ponemos una cabecera
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green bg__black my-3">Nuestros platos</h1>`
    );
    // Recorremos el array con los platos y le damos el formato necesario
    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 my-1">
          <a
            class="text--green"
            data-dish="${dish.dish.name}"
            href="#single-dish">
            <div>
              <img
                alt="${dish.dish.title}"
                src="${dish.dish.image}"
                class="img-fluid rounded mb-4">
            </div>
            <div>
              <h3>${dish.dish.name}</h3>
              <div>${dish.dish.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    // Insertamos el contenedor con el formato de platos en el html
    this.initzone.append(container);
  }

  // Función que permite imprimir en el HTML las categorías
  showCategories(categories) {
    if (this.centralzone.children.length > 0) {
      this.centralzone.children[0].remove();
    }
    // Crea un elemento div, se le asigna un id y las clases necesarias
    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("row", "mx-auto", "text-center");
    // Se inserta una cabecera dentro del div creado
    container.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green bg__black mt-5">Nuestras categorías</h1>`
    );
    // Recorremos las categorías y le damos un formato visible para el HTML
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="col-sm-4 col-lg-4 col-md-4 col-xl-4 bg__black my-3">
          <a class="text--green" data-category="${category.category.name}" href="#dish-list">
            <div class="border--green rounded p-3">
              <h3>${category.category.name}</h3>
              <div>${category.category.description}</div>
            </div>
          </a>
        </div>`
      );
    }
    // Inserta en el HTML el contenedor que hemos creado
    this.centralzone.append(container);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con las categorías
  showCategoriesInMenu(categories) {
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.category.name}" class="dropdown-item fw-bold" href="#dish-list">${category.category.name}</a></li>`
      );
    }
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los alérgenos
  showAllergensInMenu(allergens) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class=" dropdown-toggle"
        href="#"
        id="navAllergens"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Alérgenos
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los alérgenos y se insertarán dentro del desplegable
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-allergen="${allergen.allergen.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${allergen.allergen.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los menús registrados
  showMenusInNav(menus) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class=" dropdown-toggle"
        href="#"
        id="navMenus"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Menús
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los menús y se insertarán dentro del desplegable
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-menu="${menu.menu.name}"
            class="dropdown-item"
            href="#dish-list"
          >
            ${menu.menu.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con los restaurantes registrados
  showRestaurantsInMenu(restaurants) {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
        class="dropdown-toggle"
        href="#"
        id="navRests"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Restaurantes
      </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const container = document.createElement("div");
    container.classList.add("dropdown-menu");
    // Recorremos los restaurantes y se insertarán dentro del desplegable
    for (const rest of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <a
            data-rest="${rest.restaurant.name}"
            class="dropdown-item"
            href="#restaurant"
          >
            ${rest.restaurant.name}
          </a>`
      );
    }
    div.append(container);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Función que permite mostrar una tarjeta personalizada con la información de cada restaurante
  showRestaurant(res, page) {
    // Creación de las migas de pan, seleccionando el <ol> que las contiene y posteriormente sus <li>
    let ol = this.breadcrumb.closest("ol");
    let elements = ol.querySelectorAll("li");
    // Lo recorremos y eliminamos aquello que no sea el Inicio para limpiar en cada llamada las migas de pan
    for (const element of elements) {
      if (element !== ol.firstElementChild) element.remove();
    }
    // Elimina el atributo de aria-current
    ol.firstElementChild.removeAttribute("aria-current");
    // Creamos un elemento para el restaurante y le damos los estilos pertinentes
    let pageLi = document.createElement("li");
    pageLi.classList.add("breadcrumb-item", "text--green");
    pageLi.textContent = page;
    ol.appendChild(pageLi);

    // Creamos un li, le damos estilos y lo agregamos
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.ariaCurrent = "page";
    li.textContent = res.name;
    ol.append(li);

    this.centralzone.replaceChildren();
    // Crea el contenedor y le añade las clases
    const container = document.createElement("div");
    container.classList.add("container", "my-5");
    // Si se obtiene el plato correctamente, se le otorga un id y se da formato en HTML
    if (res) {
      container.id = "restaurant";
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-12 text-center">
                  <div class="p-4">
                    <div class="mb-5">
                      <h2 class="text-uppercase text--green fw-bold fst-italic">${res.name}</h2>
                    </div>
                    <div class="mb-5">
                      <h5 class="text-uppercase text--green fw-bold">Ubicación ${res.name}</h5>
                      <p class="text--green">${res.location}</p>
                    </div>
                    <div class="mb-1">
                      <h6 class="text-uppercase text--green fw-bold">Descripción</h6>
                      <p class="text--green">${res.description}</p>
                    </div>
                    <div class="cart mt-3 align-items-center">
                      <button
                        data-name="${res.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      // Le da una cabecera justo al principio
      container.insertAdjacentHTML(
        "afterbegin",
        `<h1 class="text--green my-3">Ficha de restaurante</h1>`
      );
      this.centralzone.append(container);
    }
  }

  // Función que permite listar los platos
  listDishes(dishes, title, page) {
    // Creación de las migas de pan, seleccionando el <ol> que las contiene y posteriormente sus <li>
    let ol = this.breadcrumb.closest("ol");
    let elements = ol.querySelectorAll("li");

    // Lo recorremos y eliminamos aquello que no sea el Inicio para limpiar en cada llamada las migas de pan
    for (const element of elements) {
      if (element !== ol.firstElementChild) element.remove();
    }
    // Elimina el atributo de aria-current
    ol.firstElementChild.removeAttribute("aria-current");
    // Creamos un elemento para la categoría, alérgeno o menú y le damos los estilos pertinentes
    let pageLi = document.createElement("li");
    pageLi.classList.add("breadcrumb-item", "text--green");
    pageLi.textContent = page;
    // Lo introducimos en el ol
    ol.appendChild(pageLi);

    // Creamos un li, le damos estilos y lo agregamos
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.ariaCurrent = "page";
    li.textContent = title;
    ol.append(li);
    // Borra la zona central
    this.centralzone.replaceChildren();

    // Crea un elemento, le asigna el id y las clases pertinentes
    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("container", "my-3");
    container.insertAdjacentHTML("beforeend", '<div class="row"> </div>');

    // Recorremos el array de platos
    for (const dish of dishes) {
      // Se crea un nuevo div, le damos formato con los platos
      const div = document.createElement("div");
      div.classList.add("col-md-4");
      div.insertAdjacentHTML(
        "beforeend",
        `<figure class="card bg__black">
            <a data-dish="${dish.dish.name}" href="#single-dish" class="text--green text-center">
              <img class="img-fluid" src="${dish.dish.image}">
              <figcaption class="my-3">${dish.dish.name}</figcaption>
            </a>
        </figure>`
      );
      // Insertamos el div creado
      container.children[0].append(div);
    }
    // Le da una cabecera justo al principio indicando el nombre de la categoría, alérgeno, menú...
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="text--green my-3">${title}</h1>`
    );
    this.centralzone.append(container);
  }

  // Función que permite mostrar una tarjeta personalizada con la información de cada plato
  showDish(dish, message) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = dish.name;
    ol.appendChild(li);
    this.centralzone.replaceChildren();
    // Crea el contenedor y le añade las clases
    const container = document.createElement("div");
    container.classList.add("container", "my-5");
    // Si se obtiene el plato correctamente, se le otorga un id y se da formato en HTML
    if (dish) {
      container.id = "single-dish";
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-6">
                  <div class="text-center p-4">
                    <img class="img-fluid rounded" src="${dish.image}" />
                  </div>
                </div>
                <div class="col-xl-6 text-center">
                  <div class="p-4">
                    <div class="mt-4 mb-3">
                      <h2 class="text-uppercase text--green fw-bold fst-italic">
                        ${dish.name}
                      </h2>
                    </div>
                    <div class="mt-4 mb-3">
                      <h6 class="text-uppercase text--green fw-bold">
                        Ingredientes
                      </h6>
                      <p class="text--green">${dish.stringIngredients}</p>
                    </div>
                    <div class="mt-5">
                      <h6 class="text-uppercase text--green fw-bold">
                        Descripción
                      </h6>
                      <p class="text--green">${dish.description}</p>
                    </div>
                    <div class="cart mt-4 align-items-center">
                      <button
                        data-dish="${dish.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Descubrir ahora
                      </button>
               <button id="b-open"
                        data-dish="${dish.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Abrir en nueva ventana
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      // Si no se encuentra el plato, lanza un mensaje de error
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center text--green">${message}</div>`
      );
    }
    this.centralzone.append(container);
  }

  // Función a la que pasamos un plato y la nueva ventana para mostrarlas
  showDishInNewWindow(dish, newWindow, message) {
    // Recoge el main y el header de dish.html y los limia
    const main = newWindow.document.querySelector("main");
    const header = newWindow.document.querySelector("header");
    main.replaceChildren();
    header.replaceChildren();
    // Formato para header
    header.classList.add("bg__grey", "p-3");

    // Crea un nuevo contenedor al que se le pasarán elementos si recoge un plato
    let container;

    if (dish) {
      // Formato de la nueva ventana con el plato correspondiente
      newWindow.document.title = `${dish.name} - ${dish.description}`;
      header.insertAdjacentHTML(
        "beforeend",
        `<h1 data-name="${dish.name}" class="text--green">${dish.name} - ${dish.description}</h1>`
      );
      container = newWindow.document.createElement("div");
      container.id = "single-dish";
      container.classList.add("container", "mt-5", "mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row">
          <div class="col-12">
            <div class="card bg__grey border--green">
              <div class="row align-items-center">
                <div class="col-xl-6">
                  <div class="text-center p-4">
                    <img class="img-fluid rounded" src="${dish.image}" />
                  </div>
                </div>
                <div class="col-xl-6 text-center">
                  <div class="p-4">
                    <div class="mt-4 mb-3">
                      <h2 class="text-uppercase text--green fw-bold fst-italic">
                        ${dish.name}
                      </h2>
                    </div>
                    <div class="mt-4 mb-3">
                      <h6 class="text-uppercase text--green fw-bold">
                        Ingredientes
                      </h6>
                      <p class="text--green">${dish.stringIngredients}</p>
                    </div>
                    <div class="mt-5">
                      <h6 class="text-uppercase text--green fw-bold">
                        Descripción
                      </h6>
                      <p class="text--green">${dish.description}</p>
                    </div>
                    <div class="cart mt-4 align-items-center">
                      <button
                        data-dish="${dish.name}"
                        class="newfood__content__button text-uppercase mr-2 px-4"
                      >
                        Descubrir ahora
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
      container.insertAdjacentHTML(
        "beforeend",
        '<button class="newfood__content__button text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>'
      );
      main.append(container);
      // Muestra mensaje de error si no se ha encontrado el plato
    } else {
      container = document.createElement("div");
      container.classList.add("container", "mt-5", "mb-5");
      container.classList.add("mt-5");
      container.classList.add("mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">${message}</div>`
      );
    }
  }

  // Función que muestra en el menú de navegación un enlace para poder cerras las ventanas abiertas
  showCloseWindowsInMenu() {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "navbar__menu");
    // Le insertamos el HTML necesario
    div.insertAdjacentHTML(
      "beforeend",
      `<a href="#"
        id="b-close"
        role="button"
        aria-expanded="false">
        Cerrar ventanas
      </a>`
    );
    this.menu.append(div);
  }

  // Función que permite mostrar en el menú de navegación un ítem dropdown con las categorías
  showAdminMenu() {
    // Crea un div y le asignamos formato de navegación
    const div = document.createElement("div");
    div.classList.add("nav-item", "dropdown", "navbar__menu");
    // Le insertamos el HTML que permite que sea dropdown
    div.insertAdjacentHTML(
      "beforeend",
      `<a
          class=" dropdown-toggle"
          href="#"
          id="navAdministration"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          Administración
        </a>`
    );

    // Crea un div y le asigna el formato que será el desplegable
    const subContainer = document.createElement("div");
    subContainer.classList.add("dropdown-menu");
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="newDish" class="dropdown-item text--green fw-bold" href="#new-dish">Crear plato</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="delDish" class="dropdown-item text--green fw-bold" href="#del-dish">Eliminar plato</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="updAssign" class="dropdown-item text--green fw-bold" href="#upd-assign">Modificar asignación</a> <li><hr class="dropdown-divider border--green1"></li>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="newCategory" class="dropdown-item text--green fw-bold" href="#new-category">Añadir categoría</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="delCategory" class="dropdown-item text--green fw-bold" href="#del-category">Eliminar categoría</a>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="updCategory" class="dropdown-item text--green fw-bold" href="#upd-category">Modificar categoría</a> <li><hr class="dropdown-divider border--green1"></li>'
    );
    subContainer.insertAdjacentHTML(
      "beforeend",
      '<a id="newRestaurant" class="dropdown-item text--green fw-bold" href="#new-restaurant">Crear restaurante</a>'
    );

    div.append(subContainer);
    // Inserta el menú de navegación creado
    this.menu.append(div);
  }

  // Muestra el formulario para la creación de un nuevo plato
  showNewDishForm(categories, allergens) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Crear plato";
    ol.appendChild(li);

    this.centralzone.replaceChildren();
    this.initzone.replaceChildren();

    // Crea un elemento form
    let form = document.createElement("form");
    form.name = "fNewDish";
    form.role = "form";
    form.classList.add("my-3");
    form.insertAdjacentHTML(
      "afterbegin",
      `
    <form class="row g-3" novalidate ></form>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="ncName">Nombre de plato: *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="fa-solid fa-font"></i></span>
					<input type="text" class="form-control" id="ncName" name="ncName"
						placeholder="Nombre del plato" required>
					<div class="invalid-feedback">Debes introducir el nombre del plato obligatoriamente.</div>
					<div class="valid-feedback">Correcto!</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
				<label class="form-label" for="ncIngredients">Ingredientes: </label>
				<div class="input-group">
					<span class="input-group-text"><i class="fa-solid fa-carrot"></i></span>
					<input type="text" class="form-control" id="ncIngredients" name="ncIngredients"
						placeholder="Ej: Pimienta,Sal,Patata">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto!</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
       <label for="ncImage" class="form-label">Foto del plato:</label>
       <input class="form-control form-control-sm" id="ncImage" name="ncImage" type="file">
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncCategories">Seleccionar categoría: (una opción)</label>
        <div class="input-group">
            <select id="selectCategories" name="ncCategories" class="form-select" size="3" aria-label="Multiple select categorys">
            </select>
        </div>
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncAllergens">Seleccionar alérgeno: (múltiples opciones)</label>
        <div class="input-group">
            <select id="selectAllergens" name="ncAllergens" class="form-select" size="3" multiple aria-label="Multiple select allergens">
            </select>
        </div>
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncDescription">Descripción:</label>
       <div class="input-group">
          <span class="input-group-text"><i class="fa-regular fa-rectangle-list"></i></span>
          <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
         <div class="invalid-feedback"></div>
          <div class="valid-feedback">Correcto.</div>
      </div>
    </div>
    
      <button class=" newfood__content__button" type="submit">Enviar</button>
      <button class=" newfood__content__button" type="reset">Cancelar</button>
    `
    );

    this.centralzone.append(form);

    // Recogemos los select del formulario para hacerlos dinámicos
    let selectCategory = document.getElementById("selectCategories");
    let selectAllergen = document.getElementById("selectAllergens");

    for (const category of categories) {
      selectCategory.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.category.name}">${category.category.name}</option>`
      );
    }

    for (const allergen of allergens) {
      selectAllergen.insertAdjacentHTML(
        "beforeend",
        `<option value="${allergen.allergen.name}">${allergen.allergen.name}</option>`
      );
    }

    // Inserta un título previo al formulario
    let div = document.createElement("div");
    div.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green fw-bold my-5 mx-2">Agregar un nuevo plato</h1>`
    );
    div.id = "new-dish";
    form.insertAdjacentElement("beforebegin", div);
  }

  showRemoveDishForm(dishes) {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Eliminar plato";
    ol.appendChild(li);

    this.centralzone.replaceChildren();
    this.initzone.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container", "my-3");
    container.id = "remove-dish";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5 text--green mt-5">Eliminar un plato</h1>'
    );

    const row = document.createElement("div");
    row.classList.add("row");

    for (const dish of dishes) {
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6 my-3">
          <a data-dish="${dish.dish.name}" href="#dish-list" class="text--green">
            <div>
              <img alt="${dish.dish.name}" src="${dish.dish.image}" class="img-fluid" />
            </div>
            <div>
              <h3 class="text--green fw-bold mt-2">${dish.dish.name}</h3>
              <div class="text--green">${dish.dish.description}</div>
            </div>
            <div>
              <button
                class="newfood__content__button"
                data-dish="${dish.dish.name}"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </a>
        </div>`
      );
    }
    container.append(row);
    this.centralzone.append(container);
  }

  // Muestra el formulario para la creación de una nueva categoría
  showNewCategoryForm() {
    // Realizamos la creación de las migas de pan, eliminando el atributo de aria-current al último elemento y también la fuente bold
    let ol = this.breadcrumb.closest("ol");
    ol.lastElementChild.removeAttribute("aria-current");
    ol.lastElementChild.classList.remove("fw-bolder");
    // Creamos un elemento con el nombre del plato y lo agrega a las migas de pan
    let li = document.createElement("li");
    li.classList.add("breadcrumb-item", "text--green", "fw-bolder");
    li.textContent = "Crear categoría";
    ol.appendChild(li);

    this.centralzone.replaceChildren();
    this.initzone.replaceChildren();

    // Crea un elemento form
    let form = document.createElement("form");
    form.name = "fNewCategory";
    form.role = "form";
    form.classList.add("my-3");
    form.insertAdjacentHTML(
      "afterbegin",
      `
    <form class="row g-3" novalidate ></form>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3">
				<label class="form-label" for="ncName">Nombre de Categoría: *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="fa-solid fa-font"></i></span>
					<input type="text" class="form-control" id="ncName" name="ncName"
						placeholder="Nombre de la categoría" required>
					<div class="invalid-feedback">Debes introducir el nombre de la categoría obligatoriamente.</div>
					<div class="valid-feedback">Correcto!</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncDescription">Descripción:</label>
       <div class="input-group">
          <span class="input-group-text"><i class="fa-regular fa-rectangle-list"></i></span>
          <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
         <div class="invalid-feedback"></div>
          <div class="valid-feedback">Correcto.</div>
      </div>
    </div>
    
      <button class=" newfood__content__button" type="submit">Enviar</button>
      <button class=" newfood__content__button" type="reset">Cancelar</button>
    `
    );

    this.centralzone.append(form);

    // Inserta un título previo al formulario
    let div = document.createElement("div");
    div.insertAdjacentHTML(
      "beforeend",
      `<h1 class="text--green fw-bold my-5 mx-2">Agregar una nueva categoría</h1>`
    );
    div.id = "new-category";
    form.insertAdjacentElement("beforebegin", div);
  }

  /** ----------- INICIO MODALES -----------  */

  // Modal que se abre cuando se crea un plato, indicando si se ha creado o no correctamente.
  showNewDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo plato";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i> El plato <strong>${dish.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.ncName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  // Modal que se abre cuando se realiza el intento de eliminar una categoría
  showRemoveDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de plato";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato
    <strong>${dish.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i> El plato <strong>${dish.name}</strong> no se ha podido
    borrar.</div>`
      );
    }
    messageModal.show();
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nueva Categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="fa-solid fa-triangle-exclamation"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  /** ----------- FIN MODALES -----------  */

  /** ------------------- MÉTODOS BIND ------------------- */

  /** --- PRACTICA 7 --- */

  bindAdminMenu(hNewDish, hRemoveDish, hNewCategory) {
    const newDishLink = document.getElementById("newDish");
    newDishLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hNewDish,
        [],
        "#new-dish",
        { action: "newDish" },
        "#",
        event
      );
    });
    const removeDishLink = document.getElementById("delDish");
    removeDishLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hRemoveDish,
        [],
        "#remove-dish",
        { action: "removeDish" },
        "#",
        event
      );
    });
    const newCategoryLink = document.getElementById("newCategory");
    newCategoryLink.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });
  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  // Vincula a cada botón de eliminar los platos el manejador, pasándole el plato a través del dataset
  bindRemoveDishForm(handler) {
    const removeContainer = document.getElementById("remove-dish");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.dish);
      });
    }
  }

  /** --- FIN PRACTICA 7  **/

  // Modificado el método para poder invocar a [EXECUTE_HANDLER]()
  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      // Creación de las migas de pan, seleccionando el <ol> que las contiene y posteriormente sus <li>
      let ol = this.breadcrumb.closest("ol");
      let elements = ol.querySelectorAll("li");

      // Lo recorremos y eliminamos aquello que no sea el Inicio para limpiar en cada llamada las migas de pan
      for (const element of elements) {
        if (element !== ol.firstElementChild) element.remove();
      }
      this[EXECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      // Creación de las migas de pan, seleccionando el <ol> que las contiene y posteriormente sus <li>
      let ol = this.breadcrumb.closest("ol");
      let elements = ol.querySelectorAll("li");

      // Lo recorremos y eliminamos aquello que no sea el Inicio para limpiar en cada llamada las migas de pan
      for (const element of elements) {
        if (element !== ol.firstElementChild) element.remove();
      }
      this[EXECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  // Manejador que se da cuando se realiza click en la zona con los platos aleatorios
  bindDishesRandomList(handler) {
    // Obtiene el elemento y aquellos que dentro se compongan con el tag <a>
    const randomList = document.getElementById("random-list");
    const links = randomList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#single-dish",
          { action: "dishesRandomList", dish },
          "#single-dish",
          event
        );
      });
    }
  }

  // Manejador que se da cuando se realiza click en la zona central de categorías
  bindDishesCategoryList(handler) {
    // Obtiene el elemento y aquellos que dentro se compongan con el tag <a>
    const categoryList = document.getElementById("dish-list");
    const links = categoryList.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado dataset.category
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [category],
          "#dish-list",
          { action: "dishesCategoryList", category },
          "#dish-list",
          event
        );
      });
    }
  }

  // Manejador que se da cuando se realiza click en la zona de navegación de categorías
  bindDishesCategoryListInMenu(handler) {
    // Obtiene el elemento de navCats y recoge el siguiente hermano con el tag <a>
    const navCats = document.getElementById("navCats");
    const links = navCats.nextElementSibling.querySelectorAll("a");
    // Los recorre y recupera el nombre de la categoría con el atributo personalizado dataset.category
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [category],
          "#dish-list",
          { action: "dishesCategoryList", category },
          "#dish-list",
          event
        );
      });
    }
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de alérgenos
  bindDishesAllergenListInMenu(handler) {
    // Obtiene el elemento de navAllergens y recoge los tag <a>
    const navAllergens = document.getElementById("navAllergens");
    const links = navAllergens.nextSibling.querySelectorAll("a");
    // Los recorre y añade el manejador para aquellos que tienen el atributo allergen
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { allergen } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [allergen],
          "#dish-list",
          { action: "dishesAllergenList", allergen },
          "#dish-list",
          event
        );
      });
    }
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de menús
  bindMenuListInNav(handler) {
    // Obtiene el elemento de navMenus y recoge los tag <a>
    const navMenus = document.getElementById("navMenus");
    const links = navMenus.nextSibling.querySelectorAll("a");
    // Los recorre y añade el manejador para aquellos que tienen el atributo menú
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [menu],
          "#dish-list",
          { action: "dishesMenuList", menu },
          "#dish-list",
          event
        );
      });
    }
  }

  // Manejador de unión que se da cuando se realiza click en la zona de navegación de restaurantes
  bindRestaurantListInMenu(handler) {
    // Obtiene el elemento de navRests y recoge los tag <a>
    const navRests = document.getElementById("navRests");
    const links = navRests.nextSibling.querySelectorAll("a");
    // Los recorre y añade un manejador de eventos para aquellos con el atributo rest
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { rest } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [rest],
          "#restaurant",
          { action: "restaurantList", rest },
          "#restaurant",
          event
        );
      });
    }
  }

  // Permite unir con el controlador el plato (de aquellos que formen parte de una lista, nunca de los platos iniciales aleatorios), añadiendo un manejador de eventos para cada plato
  bindShowDish(handler) {
    // Obtiene el elemento y los links
    const dishList = document.getElementById("dish-list");
    const links = dishList.querySelectorAll("a.text--green");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#single-dish",
          { action: "showDish", dish },
          "#single-dish",
          event
        );
      });
    }

    // También recoge las imágenes
    const images = dishList.querySelectorAll("figcaption a");
    for (const image of images) {
      image.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXECUTE_HANDLER](
          handler,
          [dish],
          "#single-dish",
          { action: "showDish", dish },
          "#single-dish",
          event
        );
      });
    }
  }

  // Enlaza con el controlador para que cierre las ventanas de las fichas abiertas
  bindCloseWindowsInMenu(handler) {
    // Coge el menú para cerrar las ventanas
    const bClose = document.getElementById("b-close");
    // Cuando se haga click, se cierran aquellas que estén abiertas
    bClose.addEventListener("click", () => {
      for (const [dish, window] of this.dishWindows) {
        // Se le pasa la ventana para que sea cerrada y el plato para que sea eliminado del mapa
        handler(window, dish);
      }
    });
  }

  // Enlace que se da cuando se hace click en el botón "abrir en una ventana nueva"
  bindShowProductInNewWindow(handler) {
    const bOpen = document.getElementById("b-open");

    // Siempre que se haga click, se crea una nueva ventana, a la que le asignaremos un ID
    bOpen.addEventListener("click", (event) => {
      // Si el plato ya existe, quiere decir que ya hay una ventana abierta
      if (this.dishWindows.has(event.currentTarget.dataset.dish)) {
        // Obtenemos la referencia y ponemos en ella el foco
        let w = this.dishWindows.get(event.currentTarget.dataset.dish);
        w.focus();
      } else {
        // Si el plato no existe, creamos la nueva ventana con un identificador único y la guardamos en el mapa
        const newWindow = window.open(
          "dish.html",
          "DishWindow" + this.id++,
          "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
        );
        // Guarda la referencia a la nueva ventana en el mapa
        this.dishWindows.set(event.target.dataset.dish, newWindow);

        // Recorre el mapa y pasa la referencia del plato y la nueva ventana al controlador
        for (const [dish, window] of this.dishWindows) {
          window.addEventListener("DOMContentLoaded", () => {
            handler(dish, window);
          });
        }
      }
    });
  }
}

export default RestaurantsManagerView;
