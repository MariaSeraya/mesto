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

const elementTemplate = document.querySelector('.element__template').content;
const elementsItems = document.querySelector('.elements__items');


const dataElement = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

export {
  popupProfileEdit,
  popupCardAdd,
  popupImgCardView,
  editProfileButton,
  addCardButton,
  saveCardButton,
  formPopupProfileEdit,
  formPopupAddCard,
  profileUserName,
  profileUserDescription,
  formUserName,
  formUserDescription,
  formCardName,
  formCardImgLink,
  elementImgCardView,
  elementImgDescription,
  elementTemplate,
  elementsItems,
  dataElement
}