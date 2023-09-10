import { popupImgForm, popupImg, popupCaption } from "./index.js";
import { openPopup } from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._title = data.name;
    this._alt = data.name;
    this._image = data.link;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__img");
    this._cardTitle = this._element.querySelector(".element__title");
    this._buttonLike = this._element.querySelector(".element__heart");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._alt;
    this._cardTitle.textContent = this._title;

    return this._element;
  }

  _handleOpenPopup() {
    popupImg.src = this._image;
    popupImg.alt = this._alt;
    popupCaption.textContent = this._title;
    openPopup(popupImgForm);
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("element__heart_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup();
    });

    this._buttonLike.addEventListener("click", () => {
      this._toggleLike();
    });

    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });
  }
}
