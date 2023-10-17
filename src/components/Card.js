export default class Card {
  constructor({ name, link, _id }, templateSelector, { handleCardClick, handleDeleteClick, handleLikeClick }, isMyCard, likes, userId) {
    this._title = name;
    this._image = link;
    this._idCard = _id;
    this._isMyCard = isMyCard;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._delClickHandler = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._likes = likes;
    this._isLiked = this._likes.some((like) => like._id === userId);
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
    this._likeCount = this._element.querySelector(".element__heart_like-count");
    this._buttonDelete = this._element.querySelector(".element__trash");

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    if (!this._isMyCard) {
      this._buttonDelete.style.display = "none";
    }

    if (this._isLiked) {
      this._buttonLike.classList.add("element__heart_active");
    }

    this._likeCount.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._idCard;
  }

  isLiked() {
    return this._isLiked; // Просто возвращаем состояние isLiked
  }

  updateLikes(newLikes) {
    this._likeCount.textContent = newLikes.length;
    if (!this._isLiked) {
      this._buttonLike.classList.add("element__heart_active");
      this._isLiked = true;
    } else {
      this._buttonLike.classList.remove("element__heart_active");
      this._isLiked = false;
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
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