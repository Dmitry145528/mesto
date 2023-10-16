import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, clbSubmit) {
    super(popupSelector);
    this._clbSubmit = clbSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._clbSubmit(this._Id, this._card);
    });
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