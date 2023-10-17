import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setCallback(submitCb) {
    this._handleSubmit = submitCb;
 }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._card);
    });
  }

  open(card) {
    this._card = card;
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}