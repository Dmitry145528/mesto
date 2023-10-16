import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, clbSubmit) {
    super(popupSelector);
    this._clbSubmit = clbSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._clbSubmit(formData);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}