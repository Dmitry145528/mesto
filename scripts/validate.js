
const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    // errorClass: 'popup__error_visible' Не используется 
  }

const showInputError = (errorElement, inputElement, configForm) => {
    inputElement.classList.add(configForm.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
const hideInputError = (errorElement, inputElement, configForm) => {
    inputElement.classList.remove(configForm.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
const checkInputValidity = (formElement, inputElement, configForm) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (inputElement.validity.valid) {
        hideInputError(errorElement, inputElement, configForm);
    } else {
        showInputError(errorElement, inputElement, configForm);
    }
  }

function toggleButtonState(buttonElement, isActive, configForm){
    if(isActive) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(configForm.inactiveButtonClass);
    } else {
        buttonElement.disabled = 'disabled';
        buttonElement.classList.add(configForm.inactiveButtonClass);
    }
  }
  
const setEventListeners = (formElement, configForm) => {
    const inputList = Array.from(formElement.querySelectorAll(configForm.inputSelector));
    const submitButtonElement = formElement.querySelector(configForm.submitButtonSelector);
    toggleButtonState(submitButtonElement, formElement.checkValidity(), configForm);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleButtonState(submitButtonElement, formElement.checkValidity(), configForm);
            checkInputValidity(formElement, inputElement, configForm);
        });
    });

    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
  }
  
const enableValidation = (configForm) => {
    const formList = Array.from(document.querySelectorAll(configForm.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, configForm);
    });
  }

enableValidation(configForm);
