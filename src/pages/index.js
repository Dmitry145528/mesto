import './index.css';
import Section from "../components/Section.js";
import PopupWithImg from "../components/PopupWithImg.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js"; // Импортируем класс валидации в index.js
import {
  initialCards,
  configForm,
  cardContainer,
  elementEditButton,
  elementAddButton,
  cardEditForm,
  cardAddForm,
  nameInput,
  jobInput
} from "../utils/constants.js"; // Импортируем статичные данные в index.js

const popupWithImg = new PopupWithImg('#popup_image');
popupWithImg.setEventListeners();

//Создание секции для карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = addCard(item);
    cardList.appendAddItem(cardElement);
  }
}, cardContainer);

cardList.renderItems();

function addCard(item) {
  const card = new Card(item, '.card-template', {
    handleCardClick: ({link, name}) => {
      popupWithImg.open({link, name});
    },
  });
  return card.generateCard();
}

const userInfo = new UserInfo({
  nameSelector: ".profile-info__title",
  infoSelector: ".profile-info__subtitle"
});

const editProfilePopup = new PopupWithForm('#popup_edit-profile', (formData) => {
  userInfo.setUserInfo(formData);
  editProfilePopup.close();
});

function handleEditButtonClick() {
  const { name, activity } = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = activity;

  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
}

elementEditButton.addEventListener('click', handleEditButtonClick);

const addCardPopup = new PopupWithForm('#popup_add-card', (formData) => {
  const cardElement = addCard(formData);
  cardList.prependAddItem(cardElement);

  addCardPopup.close();
  addCardFormValidator.resetValidation();
});

elementAddButton.addEventListener('click', () => {
  addCardPopup.open();
});

// Создаём экземпляры FormValidator для обеих форм
const editProfileFormValidator = new FormValidator(configForm, cardEditForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configForm, cardAddForm);
addCardFormValidator.enableValidation();