import './index.css';
import Section from "../components/Section.js";
import PopupWithImg from "../components/PopupWithImg.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js"; // Импортируем класс валидации в index.js
import Api from '../components/Api.js'
import {
  configForm,
  cardContainer,
  elementEditButton,
  elementAddButton,
  cardEditForm,
  cardAddForm,
  nameInput,
  jobInput
} from "../utils/constants.js"; // Импортируем статичные данные в index.js

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'e846f2e4-830c-4594-a8d1-58fb2c77ff48',
    'Content-Type': 'application/json'
  }
});

const popupWithImg = new PopupWithImg('#popup_image');
popupWithImg.setEventListeners();

// Создание секции для карточек
const cardList = new Section({
  renderer: (item) => {
    const cardElement = addCard(item);
    cardList.appendAddItem(cardElement);
  }
}, cardContainer);

//Генерация начальных карточек
api.getInitialCards()
  .then((cards) => {
    console.log('cards = ', cards);

    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log('Ошибка запроса списка карточек', err);
  });

function addCard(item) {
  const card = new Card(item, '.card-template', {
    handleCardClick: ({ link, name }) => {
      popupWithImg.open({ link, name });
    },
    handleDeleteClick: (id) => {
      console.log('handleDeleteClick, id=', id);

      api.deleteCard(id)
        .then(() => {
          card.removeCard()
        })
        .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
    }
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
  const cardElement = api.addCard(formData)
    .then((newCard) => {
      const card = addCard(newCard);
      cardList.prependAddItem(card);
    })
    .catch((err) => console.log(`Ошибка при клонировании карточки: ${err}`));
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