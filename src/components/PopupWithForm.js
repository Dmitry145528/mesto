import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, clbSubmit) {
    super(popupSelector);
    this._clbSubmit = clbSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
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

  setEventListeners() {
    super.setEventListeners();

    if (!this._isFormSubmitHandlerSet) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const formData = this._getInputValues();
        this._clbSubmit(formData);
        this._isFormSubmitHandlerSet = true;
      });
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}