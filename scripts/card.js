export default class Card {
  constructor(dataCard, template, openImgCardView) {
    this._name = dataCard.name;
    this._alt = dataCard.name;
    this._link = dataCard.link;
    this._elementImgCardView = openImgCardView;
    this._elementTemplate = template;
}

_getTemplate() {
  const element = this._elementTemplate.querySelector('.element').cloneNode(true);
  return element;
}

generateCard() {
  this._element = this._getTemplate();
  const elementName = this._element.querySelector('.element__name');
  const elementImg = this._element.querySelector('.element__image');


  elementImg.alt = this._alt;
  elementImg.src = this._link;
  elementName.textContent = this._name;


  //View
  this._elementImg = this._element.querySelector('.element__image');

  //Delete card
  this._deleteElementButton = this._element.querySelector('.element__delete-button');

  //Like card
  this._likeButton = this._element.querySelector('.element__like');


  this._setEventListeners();

  return this._element;
}

_setEventListeners() {
  //Img(view) listener
  this._elementImg.addEventListener('click', () => {
    this._clickButtonShowFullSize();
  });

  //Delete listener
  this._deleteElementButton.addEventListener('click', () => {
    this._clickButtonDelete();
  });
  
  //Like listener
  this._likeButton.addEventListener('click', () => {
    this._clickButtonLike();
  });
}

//View functionality
_clickButtonShowFullSize(){
  this._elementImgCardView(this._link, this._name);
}

//Delete functionality
_clickButtonDelete(){
  this._element.remove();
  this._element = null;
}

//Like functionality
_clickButtonLike(){
  this._likeButton.classList.toggle('element__like_active');
}
}