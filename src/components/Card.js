export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__img");
    this._cardTitle = this._element.querySelector(".element__title");
    this._buttonLike = this._element.querySelector(".element__heart");

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    this._setEventListeners();

    return this._element;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("element__heart_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector(".element__trash").addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._title,
        link: this._image,
      });
    });
  }
}