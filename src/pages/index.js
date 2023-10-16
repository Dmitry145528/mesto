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
popupWithImg.setEventListeners();

// Создание секции для карточек
const cardsSection = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsSection.appendItem(cardElement);
  }
}, cardContainer);

let userId;

Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    // Попадаем сюда, когда оба промиса будут выполнены успешно
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsSection.renderItems(initialCards);
  })
  .catch((err) => {
    // Попадаем сюда, если один из промисов завершается ошибкой
    console.log('Ошибка запроса', err);
  });

const popupWithConfirm = new PopupWithConfirmation('#popup_delete-card', (idCard, card) => {
  api.deleteCard(idCard, card) // Принимаем Id и экземпляр класса карточки.
    .then(() => {
      card.removeCard();
      popupWithConfirm.close();
    })
    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
});
popupWithConfirm.setEventListeners();

function createCard(item) {
  const isMyCard = item.owner._id === userId;
  const card = new Card(item, '.card-template', {
    handleCardClick: ({ link, name }) => {
      popupWithImg.open({ link, name });
    },
    handleDeleteClick: (idCard) => {
      popupWithConfirm.open(idCard, card);
    }
  }, isMyCard, item.likes, api, userId);

  return card.generateCard();
}

const addCardPopup = new PopupWithForm('#popup_add-card', (formData) => {
  addCardPopup.setSubmitButtonText('Добавление...');
  api.addCard(formData)
    .then((newCard) => {
      const card = createCard(newCard);
      cardsSection.prependItem(card);
      addCardPopup.close();
      addCardFormValidator.resetValidation();
    })
    .catch((err) => console.log(`Ошибка при клонировании карточки: ${err}`
    ))
    .finally(() => {
      addCardPopup.setSubmitButtonText('Создать');
    });
});
addCardPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile-info__title",
  infoSelector: ".profile-info__subtitle",
  avatarSelector: ".profile__avatar"
});

const editProfilePopup = new PopupWithForm('#popup_edit-profile', (formData) => {
  setMyInfoOnServer(formData);
});
editProfilePopup.setEventListeners();

function setMyInfoOnServer(formData) {
  editProfilePopup.setSubmitButtonText('Сохранение...');
  api.setProfileInfo(formData)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => {
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log('Ошибка запроса списка карточек', err);
    })
    .finally(() => {
      editProfilePopup.setSubmitButtonText('Сохранить');
    });
}

function setUpdateAvatarOnServer(formData) {
  updateAvatarPopup.setSubmitButtonText('Сохранение...');
  api.updateAvatar(formData)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => {
      updateAvatarPopup.close();
      updateAvatarFormValidator.resetValidation();
    })
    .catch((err) => {
      console.log('Ошибка запроса списка карточек', err);
    })
    .finally(() => {
      updateAvatarPopup.setSubmitButtonText('Сохранить');
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
});
updateAvatarPopup.setEventListeners();

elementEditButton.addEventListener('click', handleEditButtonClick);

elementAddButton.addEventListener('click', () => {
  addCardPopup.open();
});

elementAvatarButton.addEventListener('click', () => {
  updateAvatarPopup.open();
});

// Создаём экземпляры FormValidator для форм
const editProfileFormValidator = new FormValidator(configForm, cardEditForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configForm, cardAddForm);
addCardFormValidator.enableValidation();

const updateAvatarFormValidator = new FormValidator(configForm, updateAvatarForm);
updateAvatarFormValidator.enableValidation();