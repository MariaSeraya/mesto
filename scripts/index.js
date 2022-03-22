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
const closeButtonProfileEdit = document.querySelector('.popup__close-button_profile');
const closeButtonCardAdd = document.querySelector('.popup__close-button_add');
const closeButtonImgCardView = document.querySelector('.popup__close-button_view');

const formPopupProfileEdit = document.querySelector('.form_profile-info');
const formPopupAddCard = document.querySelector('.form_card-add');

const profileUserName = document.querySelector('.profile__name');
const profileUserDescription = document.querySelector('.profile__description');
const formUserName = document.querySelector('.form__input-name');
const formUserDescription = document.querySelector('.form__input-description');

const formCardName = document.querySelector('.form__input-name_card');
const formCardImgLink = document.querySelector('.form__input-description_card');

const elementsItems = document.querySelector('.elements__items');

const elementImgCardView = document.querySelector('.popup__img-card');
const elementImgDescription = document.querySelector('.popup__description');


//Close a popup
function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

closeButtonProfileEdit.addEventListener('click', () => {
  popupClose(popupProfileEdit);
});

closeButtonCardAdd.addEventListener('click', () => {
  popupClose(popupCardAdd);
});

closeButtonImgCardView.addEventListener('click', () => {
  popupClose(popupImgCardView);
});


//Open a popup
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

editProfileButton.addEventListener('click', () => {
  popupOpen(popupProfileEdit);
  formUserName.value = profileUserName.textContent;
  formUserDescription.value = profileUserDescription.textContent;
});

addCardButton.addEventListener('click', () => {
  popupOpen(popupCardAdd);
});


//Work with cards: create, show, delete and like
function renderCard(card) {
  const elementTemplate = document.querySelector('.element__template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementInfo = element.querySelector('.element__info');
  const elementImg = element.querySelector('.element__image');
  const elementName = elementInfo.querySelector('.element__name');

  elementImg.alt = card.name;
  elementImg.src = card.link;
  elementName.textContent = card.name;

  //View
  elementImg.addEventListener('click', (evt) => {
    popupOpen(popupImgCardView);
    elementImgDescription.textContent = evt.target.alt;
    elementImgCardView.alt = evt.target.alt;
    elementImgCardView.src = evt.target.src;
  });
  
  //Delete card
  const deleteElementButton = element.querySelector('.element__delete-button');
  deleteElementButton.addEventListener('click', () => {
    element.remove();
  });

  //Like card (не находит файл, ищет по пути Desktop/dev/mesto/blocks/images/like_active.svg)
  const likeButton = elementInfo.querySelector('.element__like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like_active');
  });

  return element;
}

const allCards = initialCards.map(renderCard);
allCards.forEach((item) => elementsItems.append(item));


//Save user data in the profile
function formProfileEditSubmit (evt) {
  evt.preventDefault();
  profileUserName.textContent = formUserName.value;
  profileUserDescription.textContent = formUserDescription.value;
  popupClose(popupProfileEdit);
  }
formPopupProfileEdit.addEventListener('submit', formProfileEditSubmit);


//Save data in the card
function formCardAddSubmit (evt) {
  evt.preventDefault();
  const dataCard = {
    name: formCardName.value,
    link: formCardImgLink.value,
  }
  elementsItems.prepend(renderCard(dataCard));
  popupClose(popupCardAdd);
  }
formPopupAddCard.addEventListener('submit', formCardAddSubmit);
