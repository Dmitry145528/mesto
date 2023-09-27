import Popup from "./Popup.js";

export default class PopupWithImg extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupSelector.querySelector('.popup__image');
    this._captionElement = this._popupSelector.querySelector('.popup__caption');
  }

  open(data) {
    super.open();
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;
    this._captionElement.textContent = data.name;
  }
}