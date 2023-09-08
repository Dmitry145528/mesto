const popupImg = document.querySelector('.popup__image'); // Получаем доступ к картинке
const popupCaption = document.querySelector('.popup__caption'); // Получаем доступ к подписи
const popupImgForm = document.querySelector('#popup_image'); // Получаем доступ к попапу для дет. просмотра карточки

export class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._title = data.name;
        this._alt = data.name;
        this._image = data.link;
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
      this._setEventListeners();

      this._element.querySelector('.element__img').src = this._image;
      this._element.querySelector('.element__img').alt = this._alt;
      this._element.querySelector('.element__title').textContent = this._title;

      return this._element;
    }

    _handleOpenPopup() {
      popupImg.src = this._image;
      popupImg.alt = this._alt;
      popupCaption.textContent = this._title;
      popupImgForm.classList.add('popup_opened');
      // // Добавляем слушатель для закрытия попапов по кнопке Esc
      document.addEventListener('keyup', closeByEscape);
    }

    _toggleLike() {
        this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
    }

    _deleteCard() {
        const currentItem = this._element.querySelector('.element__trash').closest('.element'); // получаем родителя кнопки
        currentItem.remove();
    }
    
    _setEventListeners() {
        // Проходимся по создаваемому элементу и добавляем обработчик событий на детальный просмотр
        this._element.querySelector('.element__img').addEventListener('click', () => {
        this._handleOpenPopup();
        });

        // Проходимся по создаваемому элементу и добавляем обработчик событий на лайк
        this._element.querySelector('.element__heart').addEventListener('click', () => {
        this._toggleLike();
        });

        // Проходимся по создаваемому элементу и добавляем обработчик событий на корзину
        this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._deleteCard();
        });
    }
}

import { closeByEscape } from './index.js';