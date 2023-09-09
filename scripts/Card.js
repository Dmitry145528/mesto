import { closeByEscape } from './index.js'; // импортируем функцию закрытия из index.js

const popupImg = document.querySelector('.popup__image'); // Получаем доступ к картинке
const popupCaption = document.querySelector('.popup__caption'); // Получаем доступ к подписи
const popupImgForm = document.querySelector('#popup_image'); // Получаем доступ к попапу для дет. просмотра карточки

// Создаём класс карточки и экспортируем
export class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._title = data.name;
        this._alt = data.name;
        this._image = data.link;
    }

    // Метод для получения доступа к темплейт тегу, а точнее к его содержимому
    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
    }

    // Метод генерации карточки
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      this._element.querySelector('.element__img').src = this._image;
      this._element.querySelector('.element__img').alt = this._alt;
      this._element.querySelector('.element__title').textContent = this._title;

      return this._element;
    }

    // Метод для открытия попапа Детального просмотра карточки
    _handleOpenPopup() {
      popupImg.src = this._image;
      popupImg.alt = this._alt;
      popupCaption.textContent = this._title;
      popupImgForm.classList.add('popup_opened');

      // Добавляем слушатель для закрытия попапов по кнопке Esc
      document.addEventListener('keyup', closeByEscape);
    }

    // Метод для добавления обработчика событий на лайк
    _toggleLike() {
        this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
    }

    // Метод для добавления обработчика событий на корзину
    _deleteCard() {
        const currentItem = this._element.querySelector('.element__trash').closest('.element'); // получаем родителя кнопки
        currentItem.remove();
    }
    
    // Метод добаления слушателей класса
    _setEventListeners() {

        // Добавляем слушатель событий на детальный просмотр
        this._element.querySelector('.element__img').addEventListener('click', () => {
        this._handleOpenPopup();
        });

        // Добавляем слушатель событий на лайк
        this._element.querySelector('.element__heart').addEventListener('click', () => {
        this._toggleLike();
        });

        // Добавляем слушатель событий на корзину
        this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._deleteCard();
        });
    }
}