//Переменные
let popup = document.querySelector ('.popup');
let popupEdit = document.querySelector('.profile__edit-button');
let popupСlose = document.querySelector ('.popup__profile-close-button');

let formPopup = document.querySelector('.form');
let formName = document.querySelector('.form__input-name');
let formDescription = document.querySelector('.form__input-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

//Закрыть попап через изменение класса
function popupCloseButton() {
  if(popup){
  popup.classList.remove('popup_opened');
}}
popupСlose.addEventListener('click', popupCloseButton);

//Открыть попап через изменение класса
function popupEditButton() {
  if(popup){
  popup.classList.add('popup_opened');
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}}
popupEdit.addEventListener('click', popupEditButton);

//Сохранить данные
function formSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  popupCloseButton();
  }
formPopup.addEventListener('submit', formSubmit);

