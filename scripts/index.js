import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {initialCards} from './initialCards.js';
import {
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
} from './constants.js';



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

//Open a profile popup
editProfileButton.addEventListener('click', () => {
  setUserData();
  validationProfile.resetValidation();
  openPopup(popupProfileEdit);
});

//Open an add-card popup
addCardButton.addEventListener('click', () => {
  validationCardAdd.resetValidation();
  openPopup(popupCardAdd);
});

//Open a full-size-photo popup
function openImgCardView(link, name) {
  elementImgDescription.textContent = name;
  elementImgCardView.alt = name;
  elementImgCardView.src = link;
  openPopup(popupImgCardView);
}



//Popups validation check
const validationProfile = new FormValidator(dataElement, popupProfileEdit);
validationProfile.enableValidation();

const validationCardAdd = new FormValidator(dataElement, popupCardAdd);
validationCardAdd.enableValidation();



//Save user data in the profile
function setUserData() {
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
  renderCard(dataCard);
  closePopup(popupCardAdd);
  formPopupAddCard.reset();
  }
formPopupAddCard.addEventListener('submit', saveFormCardAddSubmit);


//Create cards
function createCard(dataCard) {
  const addNewCard = new Card(dataCard, elementTemplate, openImgCardView);
  const element = addNewCard.generateCard();
  return element;
}

//Render cards
function renderCard(dataCard) {
  elementsItems.prepend(createCard(dataCard));
}

initialCards.reverse().forEach((card)=>{
  renderCard(card, elementTemplate);
})


