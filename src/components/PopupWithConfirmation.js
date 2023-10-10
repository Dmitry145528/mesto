import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, clbSubmit) {
    super(popupSelector);
    this._clbSubmit = clbSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
    this._isFormSubmitHandlerSet = false; // Флаг для обработчика отправки формы
  }

  setEventListeners() {
    super.setEventListeners();

    if (!this._isFormSubmitHandlerSet) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const cardId = this._cardId; // Получаем ID карточки
        this._clbSubmit(cardId); // Вызываем колбэк с ID карточки
        this._isFormSubmitHandlerSet = true;
      });
    }
  }

  open(cardId) {
    this._cardId = cardId; // Сохраняем ID карточки
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}