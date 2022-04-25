export default class Card {
  constructor(dataCard, cardSelector, openImgCardView) {
    this._name = dataCard.name;
    this._alt = dataCard.name;
    this._link = dataCard.link;
    this._elementImgCardView = openImgCardView;
    this._cardSelector = cardSelector;
}

_getTemplate() {
  const element = document.querySelector('.element__template').content.querySelector('.element').cloneNode(true);
  return element;
}

_generateCard() {
  this._element = this._getTemplate();
  const elementName = this._element.querySelector('.element__name');
  const elementImg = this._element.querySelector('.element__image');


  elementImg.alt = this._alt;
  elementImg.src = this._link;
  elementName.textContent = this._name;

  //View
  this._element.querySelector('.element__image').addEventListener('click', () => this._elementImgCardView(this._link, this._name));

  //Delete card
  const _deleteElementButton = this._element.querySelector('.element__delete-button');
  _deleteElementButton.addEventListener('click', () => {
    this._element.remove();
    this._element = null;
  });
  
  //Like card
  const _likeButton = this._element.querySelector('.element__like');
  _likeButton.addEventListener('click', () => {
    _likeButton.classList.toggle('element__like_active');
  });


  return this._element;
}

}