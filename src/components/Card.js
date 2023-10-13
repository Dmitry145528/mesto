export default class Card {
  constructor({ name, link, _id }, templateSelector, { handleCardClick, handleDeleteClick }, isMyCard) {
    this._title = name;
    this._image = link;
    this._idCard = _id;
    this._isMyCard = isMyCard;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._delClickHandler = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__img");
    this._cardTitle = this._element.querySelector(".element__title");
    this._buttonLike = this._element.querySelector(".element__heart");
    this._buttonDelete = this._element.querySelector(".element__trash");

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    if (this._isMyCard) {
      this._buttonDelete.style.display = "block"; // Показываем корзину только на нашей карточке
    } else {
      this._buttonDelete.style.display = "none"; // Скрываем корзину на чужих карточках
    }

    this._setEventListeners();

    return this._element;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("element__heart_active");
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });

    this._buttonDelete.addEventListener("click", () => {
      this._delClickHandler(this._idCard);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._title,
        link: this._image,
      });
    });
  }
}