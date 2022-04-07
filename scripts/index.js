const initialCards = [
  {
    name: 'Архыз',
    link: 'https://i.imgur.com/W8yJFhR.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://i.imgur.com/u4o7H3E.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://i.imgur.com/3hGgk5O.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://i.imgur.com/xotlE9n.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://i.imgur.com/VlbWZ4b.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://i.imgur.com/YFbzfsI.jpg'
  }
];

const popupProfileEdit = document.querySelector('.popup_profile-info');
const popupCardAdd = document.querySelector('.popup_card-add');
const popupImgCardView = document.querySelector('.popup_img-card-view');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const saveCardButton = document.querySelector('.popup__save-button_add');

const formPopupProfileEdit = document.querySelector('.form_profile-info');
const formPopupAddCard = document.querySelector('.form_card-add');

const profileUserName = document.querySelector('.profile__name');
const profileUserDescription = document.querySelector('.profile__description');
const formUserName = document.querySelector('.form__input-name');
const formUserDescription = document.querySelector('.form__input-description');

const formCardName = document.querySelector('.form__input-name_card');
const formCardImgLink = document.querySelector('.form__input-description_card');

const elementImgCardView = document.querySelector('.popup__img-card');
const elementImgDescription = document.querySelector('.popup__description');

const elementsItems = document.querySelector('.elements__items');



//Close a popup
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
  popup.classList.remove('popup_opened');
}

//by esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const visiblePopup = document.querySelector('.popup_opened');
    closePopup(visiblePopup);
  }
}

//with overlay
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}



//Open a popup
function openPopup(popup) {
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
  popup.classList.add('popup_opened');
}

editProfileButton.addEventListener('click', () => {
  userData();
  openPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
  openPopup(popupCardAdd);
});



//Work with cards: create, show, delete and like
function renderCard(card) {
  const elementTemplate = document.querySelector('.element__template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementInfo = element.querySelector('.element__info');
  const elementName = elementInfo.querySelector('.element__name');
  const elementImgBox = element.querySelector('.element__img-box');
  const elementImg = elementImgBox.querySelector('.element__image');
  

  elementImg.alt = card.name;
  elementImg.src = card.link;
  elementName.textContent = card.name;

  //View
  elementImg.addEventListener('click', (evt) => {
    elementImgDescription.textContent = evt.target.alt;
    elementImgCardView.alt = evt.target.alt;
    elementImgCardView.src = evt.target.src;
    openPopup(popupImgCardView);
  });
  
  //Delete card
  const deleteElementButton = element.querySelector('.element__delete-button');
  deleteElementButton.addEventListener('click', () => {
    element.remove();
  });

  //Like card
  const likeButton = elementInfo.querySelector('.element__like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like_active');
  });

  return element;
}

const allCards = initialCards.map(renderCard);
allCards.forEach((item) => elementsItems.append(item));
userData();



//Save user data in the profile
function userData() {
  formUserName.value = profileUserName.textContent;
  formUserDescription.value = profileUserDescription.textContent;
}

function saveFormProfileEditSubmit (evt) {
  evt.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserDescription.textContent = formUserDescription.value;
  closePopup(popupProfileEdit);
  }
formPopupProfileEdit.addEventListener('submit', saveFormProfileEditSubmit);



//Save data in the card
function saveFormCardAddSubmit (evt) {
  evt.preventDefault();
  const dataCard = {
    name: formCardName.value,
    link: formCardImgLink.value,
  }
  elementsItems.prepend(renderCard(dataCard));
  closePopup(popupCardAdd);
  formPopupAddCard.reset();
  }
formPopupAddCard.addEventListener('submit', saveFormCardAddSubmit);

saveCardButton.classList.add('popup__save-button_disabled');
saveCardButton.disabled = true;


//Show errors
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
}

//Hide errors
const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

//Validation check
const checkInputValidity = (formElement, inputElement, {inputErrorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass);
  };
}

//Check all inputs and signal
const hasInvalidInput = (inputElements) => {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Change a submit button
const toggleButtonState = (inputElements, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//Adds a habdler
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputElements, buttonElement, inactiveButtonClass);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputElements, buttonElement, inactiveButtonClass);
    });
  });
}


const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => 
      evt.preventDefault());
    setEventListeners(formElement, rest);
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});