export default class FormValidator {

  constructor(dataElement, formElement) {
    this._dataElement = dataElement;
    this._formElement = formElement;
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._dataElement.inputSelector));
    this._formList = Array.from(this._formElement.querySelectorAll(this._dataElement.formSelector));
    this._buttonElement = this._formElement.querySelector(this._dataElement.submitButtonSelector);
  }


//Show errors
_showInputError(inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._dataElement.inputErrorClass);
  errorElement.classList.add(this._dataElement.errorClass);
  errorElement.textContent = errorMessage;
}

//Hide errors
_hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._dataElement.inputErrorClass);
  errorElement.classList.remove(this._dataElement.errorClass);
  errorElement.textContent = '';
}

//Validation check
_checkInputValidity (inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  }
  else {
    this._hideInputError(inputElement);
  };
}

//Check all inputs and signals
_hasInvalidInput() {
  return this._inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Change a submit button
_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._dataElement.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  else {
    this._buttonElement.classList.remove(this._dataElement.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
}

//Adds a habdler
_setEventListeners() {
  this._toggleButtonState();
  this._inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });

  this._formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

}

//Validation
enableValidation() {
  this._setEventListeners();
}

//Reset errors
resetValidation() {
  this._toggleButtonState();
  this._inputElements.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
}

}