import { Card } from './Card.js'; // Ипортируем класс карточки в index.js
import { FormValidator } from './FormValidator.js'; // Импортируем класс валидации в index.js
import { initialCards, configForm } from './constants.js'; // Импортируем статичные данные в index.js

const popupEditForm = document.querySelector('#popup_edit-profile'); // Получаем доступ к попапу для ред. профиля 
const popupAddForm = document.querySelector('#popup_add-card'); // Получаем доступ к попапу для созд. карточек
const cardEditForm = popupEditForm.querySelector('.popup__form'); // Получаем доступ к форме внутри попапа ред. профиля
const cardAddForm = popupAddForm.querySelector('.popup__form'); // Получаем доступ к форме внутри попапа добавления карточки

const elementEditButton = document.querySelector('.profile-info__edit-button'); // Получаем доступ к кнопке ред. профиля
const elementAddButton = document.querySelector('.profile__addbutton'); // Получаем доступ к кнопке созд. карточек

const closeButtons = document.querySelectorAll('.popup__close'); // Получаем доступ к кнопке закрытия для оверлея

const nameInput = popupEditForm.querySelector('#name'); // Получаем доступ к вводу имени в профиле
const jobInput = popupEditForm.querySelector('#activity'); // Получаем доступ к вводу деятельности в профиле
const titleInput = popupAddForm.querySelector('#title'); // Получаем доступ к вводу названия добавляемой карточки 
const imgInput = popupAddForm.querySelector('#img-url'); // Получаем доступ к вводу картинки добавляемой карточки 

const mainName = document.querySelector('.profile-info__title'); // Получаем доступ к уже введённому имени
const mainTitle = document.querySelector('.profile-info__subtitle'); // Получаем доступ к уже введённой деятельности

// Функция генерации начальных карточек 
initialCards.forEach((item) => {
  renderInitialCards(item);
});

// Функция генерации карточки
function renderInitialCards(item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.elements__grid-items').prepend(cardElement);
}

// Получаем все формы на странице и создаём экземпляр FormValidator для каждой формы
const formElements = document.querySelectorAll(configForm.formSelector);
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(configForm, formElement);
  formValidator.enableValidation();
});

//Общая функция для открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');

  // Добавляем слушатель для закрытия попапов по кнопке Esc
  document.addEventListener('keyup', closeByEscape);
}

function openPopupWithForm(popupForm, formValidator) {

  // Находим кнопку отправки внутри формы
  const submitButtonElement = popupForm.querySelector(configForm.submitButtonSelector);

  // Проверяем валидность всех полей внутри формы, используя метод checkValidity() для каждого
  const inputList = Array.from(popupForm.querySelectorAll(configForm.inputSelector));
  const isFormValid = inputList.every((inputElement) => inputElement.checkValidity());

  // Передаем общую валидность формы в функцию для обновления состояния кнопки
  formValidator._toggleButtonState(submitButtonElement, isFormValid);
  
  openPopup(popupForm);
}

// Функция для открытия попапа "Редактировать профиль"
function openEditPopup() {
  nameInput.value = mainName.textContent;
  jobInput.value = mainTitle.textContent;
  const formValidator = new FormValidator(configForm, cardEditForm);
  openPopupWithForm(popupEditForm, formValidator);
}

// Функция для открытия попапа "Новое место"
function openAddPopup() {
  const formValidator = new FormValidator(configForm, cardAddForm);
  openPopupWithForm(popupAddForm, formValidator);
}

// Функция для отправки формы "Редактировать профиль"
function submitEditProfileForm (evt) {
  evt.preventDefault();
  
  mainName.textContent = nameInput.value;
  mainTitle.textContent = jobInput.value;
  
  closePopup(popupEditForm);
}

// Функция для отправки формы "Новое место"
function submitAddCardForm(evt) {
  evt.preventDefault();

  // Получаем значения из формы
  const nameValue = titleInput.value;
  const imgValue = imgInput.value;

  // Создаем новый объект с данными из формы
  const newCard = {
    name: nameValue,
    link: imgValue,
  };

  // Генерируем новую карточку
  renderInitialCards(newCard);

  // Обнуляем значения полей в форме
  cardAddForm.reset();

  // Закрываем попап
  closePopup(popupAddForm);
}

// Общая функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  // Удаляем слушатель для закрытия попапов по кнопке Esc
  document.removeEventListener('keyup', closeByEscape);
}

//// Находим все кнопки закрытия попапов и добавляем обработчики
closeButtons.forEach(btn => {
  const popup = btn.closest('.popup'); // Находим ближайший попап к кнопке
  popup.addEventListener('mousedown', popupCloseOverlay); // Добавляем обработчик на нажатие мыши на попапе
  btn.addEventListener('click', () => closePopup(popup)); // Добавляем обработчик клика на кнопку закрытия
});

// Функция для закрытия попапов через оверлей
function popupCloseOverlay(event) {
  if (event.target === event.currentTarget) {

    // Если событие произошло непосредственно на попапе (а не на его содержимом)
    closePopup(event.target); // Закрываем попапы
  }
}

// функция для закрытия попапа по кнопке Escape
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Слушатель для открытия попапа "Редактировать профиль"
elementEditButton.addEventListener('click', openEditPopup);

// Слушатель для открытия попапа "Новое место"
elementAddButton.addEventListener('click', openAddPopup);

// Слушатель для отправки формы "Редактировать профиль"
popupEditForm.addEventListener('submit', submitEditProfileForm);

// Слушатель для отправки формы "Новое место"
popupAddForm.addEventListener('submit', submitAddCardForm);