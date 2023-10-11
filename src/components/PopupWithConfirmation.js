import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, clbSubmit) {
    super(popupSelector);
    this._clbSubmit = clbSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
    this._isFormSubmitHandlerSet = false;
  }

  setEventListeners() {
    super.setEventListeners();

    if (!this._isFormSubmitHandlerSet) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._clbSubmit(this._Id, this._card);
        this._isFormSubmitHandlerSet = true;
      });
    }
  }

  open(Id, card) {
    this._Id = Id;
    this._card = card;
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}