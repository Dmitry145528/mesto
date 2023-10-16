import Popup from "./Popup.js";

export default class PopupWithImg extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__image');
    this._captionElement = this._popupElement.querySelector('.popup__caption');
  }

  open({link, name}) {
    super.open();
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
  }
}