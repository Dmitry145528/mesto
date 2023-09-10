import { Card } from "./Card.js"; // Ипортируем класс карточки в index.js
import { FormValidator } from "./FormValidator.js"; // Импортируем класс валидации в index.js
import { initialCards, configForm } from "./constants.js"; // Импортируем статичные данные в index.js

const popupEditForm = document.querySelector("#popup_edit-profile"); // Получаем доступ к попапу для ред. профиля
const popupAddForm = document.querySelector("#popup_add-card"); // Получаем доступ к попапу для созд. карточек
const cardEditForm = popupEditForm.querySelector(".popup__form"); // Получаем доступ к форме внутри попапа ред. профиля
const cardAddForm = popupAddForm.querySelector(".popup__form"); // Получаем доступ к форме внутри попапа добавления карточки
const cardContainer = document.querySelector(".elements__grid-items");

export const popupImgForm = document.querySelector("#popup_image"); // Получаем доступ к попапу для дет. просмотра карточки
export const popupImg = document.querySelector(".popup__image"); // Получаем доступ к картинке
export const popupCaption = document.querySelector(".popup__caption"); // Получаем доступ к подписи

const elementEditButton = document.querySelector(".profile-info__edit-button"); // Получаем доступ к кнопке ред. профиля
const elementAddButton = document.querySelector(".profile__addbutton"); // Получаем доступ к кнопке созд. карточек

const closeButtons = document.querySelectorAll(".popup__close"); // Получаем доступ к кнопке закрытия для оверлея

const nameInput = popupEditForm.querySelector("#name"); // Получаем доступ к вводу имени в профиле
const jobInput = popupEditForm.querySelector("#activity"); // Получаем доступ к вводу деятельности в профиле
const titleInput = popupAddForm.querySelector("#title"); // Получаем доступ к вводу названия добавляемой карточки
const imgInput = popupAddForm.querySelector("#img-url"); // Получаем доступ к вводу картинки добавляемой карточки

const mainName = document.querySelector(".profile-info__title"); // Получаем доступ к уже введённому имени
const mainTitle = document.querySelector(".profile-info__subtitle"); // Получаем доступ к уже введённой деятельности

initialCards.forEach((item) => {
  renderCard(item);
});

function createCard(item, templateSelector) {
  const card = new Card(item, templateSelector);
  return card.generateCard();
}

function renderCard(item) {
  const cardElement = createCard(item, ".card-template");
  cardContainer.prepend(cardElement);
}

// Создаём экземпляры FormValidator для обеих форм
const editProfileFormValidator = new FormValidator(configForm, cardEditForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configForm, cardAddForm);
addCardFormValidator.enableValidation();

//Общая функция для открытия попапов
export function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keyup", handleCloseByClick);
}

// Функция для открытия попапа "Редактировать профиль"
function openEditPopup() {
  nameInput.value = mainName.textContent;
  jobInput.value = mainTitle.textContent;
  openPopup(popupEditForm);

  editProfileFormValidator.resetValidation();
}

// Функция для открытия попапа "Новое место"
function openAddPopup() {
  openPopup(popupAddForm);

  addCardFormValidator.resetValidation();
}

// Функция для отправки формы "Редактировать профиль"
function submitEditProfileForm(evt) {
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
  renderCard(newCard);

  // Обнуляем значения полей в форме
  cardAddForm.reset();

  // Закрываем попап
  closePopup(popupAddForm);
}

// Общая функция закрытия
function closePopup(popup) {
  popup.classList.remove("popup_opened");

  // Удаляем слушатель для закрытия попапов по кнопке Esc
  document.removeEventListener("keyup", handleCloseByClick);
}

//// Находим все кнопки закрытия попапов и добавляем обработчики
closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup"); // Находим ближайший попап к кнопке
  popup.addEventListener("mousedown", handleCloseByClick); // Добавляем обработчик на нажатие мыши на попапе
  btn.addEventListener("click", () => closePopup(popup)); // Добавляем обработчик клика на кнопку закрытия
});

// Функция для закрытия попапов через оверлей и 'Escape'
function handleCloseByClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

// Слушатель для открытия попапа "Редактировать профиль"
elementEditButton.addEventListener("click", openEditPopup);

// Слушатель для открытия попапа "Новое место"
elementAddButton.addEventListener("click", openAddPopup);

// Слушатель для отправки формы "Редактировать профиль"
popupEditForm.addEventListener("submit", submitEditProfileForm);

// Слушатель для отправки формы "Новое место"
popupAddForm.addEventListener("submit", submitAddCardForm);
