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
  setUserData();
  openPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
  openPopup(popupCardAdd);
});



//Work with cards: create, show, delete and like
function renderCard(card) {
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

initialCards.forEach((item)=>{
  elementsItems.append(renderCard(item))
}) 



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
  elementsItems.prepend(renderCard(dataCard));
  closePopup(popupCardAdd);
  formPopupAddCard.reset();
  saveCardButton.classList.add('popup__save-button_disabled');
  saveCardButton.disabled = true;
  }
formPopupAddCard.addEventListener('submit', saveFormCardAddSubmit);