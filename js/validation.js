// Muestra el feedback al usuario por si se ha equivocado al introducir algún dato o no es válido
function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}

function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

// Función de validación para la creación de los platos
function newDishValidation(handler) {
  const form = document.forms.fNewDish;

  form.setAttribute("novalidate", true);

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncName.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncName, false);
      firstInvalidElement = this.ncName;
    } else {
      showFeedBack(this.ncName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Transformación de los alérgenos seleccionadas en array
      let alls = Array.from(this.ncAllergens.selectedOptions).map(
        (option) => option.value
      );

      // La imagen la cogemos de forma local
      let img = this.ncImage.value.split("\\");
      img = "img/" + img[2];
      // Manda al controlador los datos necesarios para la creación de un plato
      handler(
        this.ncName.value,
        this.ncIngredients.value,
        this.ncCategories.value,
        alls,
        img,
        this.ncDescription.value
      );
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncName.focus();
  });

  form.ncName.addEventListener("change", defaultCheckElement);
}

// Función para la validación de una nueva categoría
function newCategoryValidation(handler) {
  const form = document.forms.fNewCategory;

  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncName.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncName, false);
      firstInvalidElement = this.ncName;
    } else {
      showFeedBack(this.ncName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncName.value, this.ncDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncName.focus();
  });
  form.ncName.addEventListener("change", defaultCheckElement);
}

// Función para la validación de un nuevo restaurante
function newRestaurantValidation(handler) {
  const form = document.forms.fNewRestaurant;

  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    // Expresiones regulares para, si recibe latitud o longitud, comprobar que sean correctas
    let regExLat = /^(-?[0-8]?\d(?:\.\d{1,6})?|-?90(?:\.0{1,6})?)$/;
    let regExLon =
      /^(-?(?:1[0-7]\d|\d{1,2})(?:\.\d{1,6})?|-?180(?:\.0{1,6})?)$/;

    let isValid = true;
    let firstInvalidElement = null;

    if (this.ncLatitude.value) {
      if (!regExLat.test(this.ncLatitude.value)) {
        isValid = false;
        showFeedBack(this.ncLatitude, false);
        firstInvalidElement = this.ncLatitude;
      } else {
        showFeedBack(this.ncLatitude, true);
      }
    }

    if (this.ncLongitude.value) {
      if (!regExLon.test(this.ncLongitude.value)) {
        isValid = false;
        showFeedBack(this.ncLongitude, false);
        firstInvalidElement = this.ncLongitude;
      } else {
        showFeedBack(this.ncLongitude, true);
      }
    }

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncName.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncName, false);
      firstInvalidElement = this.ncName;
    } else {
      showFeedBack(this.ncName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(
        this.ncName.value,
        this.ncDescription.value,
        this.ncLatitude.value,
        this.ncLongitude.value
      );
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncName.focus();
  });
  form.ncName.addEventListener("change", defaultCheckElement);
}

export { newDishValidation, newCategoryValidation, newRestaurantValidation };
