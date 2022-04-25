import FormValidator from './formValidator.js';
import Card from './card.js';
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
  validatorProfile.resetErrors();
  openPopup(popupProfileEdit);
});

//Open an add-card popup
addCardButton.addEventListener('click', () => {
  validatorCardAdd.resetErrors();
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
const validatorProfile = new FormValidator(dataElement, popupProfileEdit);
validatorProfile.enableValidation();

const validatorCardAdd = new FormValidator(dataElement, popupCardAdd);
validatorCardAdd.enableValidation();



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
  saveCardButton.classList.add('popup__save-button_disabled');
  saveCardButton.disabled = true;
  }
formPopupAddCard.addEventListener('submit', saveFormCardAddSubmit);



//Render cards
function renderCard(dataCard) {
  const addNewCard = new Card(dataCard, elementTemplate, openImgCardView);
  const element = addNewCard._generateCard();
  elementsItems.prepend(element);
}

initialCards.reverse().forEach((card)=>{
  renderCard(card);
})


