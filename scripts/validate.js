// Конфигурация формы и визуальных параметров
const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    // errorClass: 'popup__error_visible' Не используется 
  }

// Показать сообщение об ошибке в поле ввода
const showInputError = (errorElement, inputElement, configForm) => {
    inputElement.classList.add(configForm.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

// Скрыть сообщение об ошибке в поле ввода
const hideInputError = (errorElement, inputElement, configForm) => {
    inputElement.classList.remove(configForm.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
// Проверить валидность поля ввода
const checkInputValidity = (formElement, inputElement, configForm) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (inputElement.validity.valid) {
        hideInputError(errorElement, inputElement, configForm); // Скрываем ошибку, если поле валидно
    } else {
        showInputError(errorElement, inputElement, configForm); // Показываем ошибку, если поле невалидно
    }
  }

// Изменение состояния кнопки в зависимости от валидности формы
function toggleButtonState(buttonElement, isActive, configForm){
    if(isActive) {
        buttonElement.disabled = false; // Активируем кнопку
        buttonElement.classList.remove(configForm.inactiveButtonClass); // Убираем класс неактивности
    } else {
        buttonElement.disabled = 'disabled'; // Деактивируем кнопку
        buttonElement.classList.add(configForm.inactiveButtonClass); // Добавляем класс неактивности
    }
  }


// Установка обработчиков событий на форму
const setEventListeners = (formElement, configForm) => {
    const inputList = Array.from(formElement.querySelectorAll(configForm.inputSelector));
    const submitButtonElement = formElement.querySelector(configForm.submitButtonSelector);

    // Устанавливаем состояние кнопки при загрузке страницы
    toggleButtonState(submitButtonElement, formElement.checkValidity(), configForm);

    inputList.forEach((inputElement) => {
        // Обработчик изменения поля ввода
        inputElement.addEventListener('input', function () {
            toggleButtonState(submitButtonElement, formElement.checkValidity(), configForm);
            checkInputValidity(formElement, inputElement, configForm);
        });
    });
    // Обработчик отправки формы
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
  }

// Включение валидации на всех формах на странице
const enableValidation = (configForm) => {
    const formList = Array.from(document.querySelectorAll(configForm.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, configForm);
    });
  }

enableValidation(configForm);
