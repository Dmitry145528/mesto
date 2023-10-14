import './index.css';
import Section from "../components/Section.js";
import PopupWithImg from "../components/PopupWithImg.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js"; // Импортируем класс валидации в index.js
import Api from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import {
  configForm,
  cardContainer,
  elementEditButton,
  elementAddButton,
  elementAvatarButton,
  cardEditForm,
  cardAddForm,
  updateAvatarForm,
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

const popupWithConfirm = new PopupWithConfirmation('#popup_delete-card', (_idCard, card) => {
  api.deleteCard(_idCard, card) // Принимает Id и экземпляр класса карточки.
    .then(() => {
      card.removeCard();
      popupWithConfirm.close();
    })
    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
});

function addCard(item) {
  const isMyCard = (item.owner._id === userId);
  const card = new Card(item, '.card-template', {
    handleCardClick: ({ link, name }) => {
      popupWithImg.open({ link, name });
    },
    handleDeleteClick: (_idCard) => {
      popupWithConfirm.open(_idCard, card);
    }
  }, isMyCard, item.likes, api, userId);

  return card.generateCard();
}

const addCardPopup = new PopupWithForm('#popup_add-card', (formData) => {
  api.addCard(formData)
    .then((newCard) => {
      const card = addCard(newCard);
      cardList.prependAddItem(card);
    })
    .catch((err) => console.log(`Ошибка при клонировании карточки: ${err}`));

  addCardPopup.close();
  addCardFormValidator.resetValidation();
});

let userId;

api.getMyInfo()
  .then((res) => {
    console.log('info = ', res);
    userId = res._id; // Сохраняем идентификатор текущего пользователя
    userInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.log('Ошибка запроса списка карточек', err);
  });

const userInfo = new UserInfo({
  nameSelector: ".profile-info__title",
  infoSelector: ".profile-info__subtitle",
  avatarSelector: ".profile__avatar"
});

const editProfilePopup = new PopupWithForm('#popup_edit-profile', (formData) => {
  setMyInfoOnServer(formData);
  editProfilePopup.close();
});

function setMyInfoOnServer(formData) {
  api.setMyInfo(formData)
    .then((res) => {
      console.log('info = ', res);
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log('Ошибка запроса списка карточек', err);
    });
}

function setUpdateAvatarOnServer(formData) {
  api.updateAvatar(formData)
    .then((res) => {
      console.log('avatar = ', res);
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log('Ошибка запроса списка карточек', err);
    });
}

function handleEditButtonClick() {
  const { name, about } = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = about;

  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
}

const updateAvatarPopup = new PopupWithForm('#popup_update-avatar', ({ avatar }) => {
  setUpdateAvatarOnServer({ avatar });
  updateAvatarPopup.close();
  updateAvatarFormValidator.resetValidation();
});

elementEditButton.addEventListener('click', handleEditButtonClick);

elementAddButton.addEventListener('click', () => {
  addCardPopup.open();
});

elementAvatarButton.addEventListener('click', () => {
  updateAvatarPopup.open();
});

// Создаём экземпляры FormValidator для обеих форм
const editProfileFormValidator = new FormValidator(configForm, cardEditForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configForm, cardAddForm);
addCardFormValidator.enableValidation();

const updateAvatarFormValidator = new FormValidator(configForm, updateAvatarForm);
updateAvatarFormValidator.enableValidation();