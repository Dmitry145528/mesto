const cardContainer = document.querySelector('.elements__grid-items');

const elementEditButton = document.querySelector('.profile-info__edit-button');
const elementAddButton = document.querySelector('.profile__addbutton');
const popupSection = document.querySelector('.popup');

const mainName = document.querySelector('.profile-info__title');
const mainTitle = document.querySelector('.profile-info__subtitle');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function render() {
  initialCards.forEach(renderItem);
  }

const cardTemplate = document.querySelector('.templateEl').content;
  
function renderItem(item) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__img').src = item.link;
    cardElement.querySelector('.element__title').textContent = item.name;

    cardContainer.append(cardElement);
    }
  
  // Вызываем функцию render, чтобы отобразить карточки на странице
  render();

const elementHeart = document.querySelectorAll('.element__heart');

let elementActive = (event) => {
    event.target.classList.toggle('element__heart_active');
    }

  // Проходимся по каждому элементу и добавляем обработчик событий
elementHeart.forEach((element) => {
    element.addEventListener('click', elementActive);
});


const popupTemplate = document.querySelector('.popup-template').content;

function renderPopup() {
  const popupElement = popupTemplate.querySelector('.popup__container').cloneNode(true);
  popupElement.querySelector('.popup__header').textContent = 'Редактировать профиль';
  popupElement.querySelector('.popup__button').textContent = 'Сохранить';
  popupElement.querySelector('#name').placeholder = 'Имя и Фамилия';
  popupElement.querySelector('#activity').placeholder = 'Деятельность';

  const nameInput = popupElement.querySelector('#name');
  const jobInput = popupElement.querySelector('#activity');

  nameInput.value = mainName.textContent; 
  jobInput.value = mainTitle.textContent;

  // Добавляем новый попап
  popupSection.append(popupElement);

  const popupCloseSection = popupElement.querySelector('.popup__close');
  popupCloseSection.addEventListener('click', closed);

  const formElement = document.querySelector('.popup__form');
  formElement.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit (evt) {
    evt.preventDefault();
    
    mainName.textContent = nameInput.value;
    mainTitle.textContent = jobInput.value;
  
    closed();
  }
}

let opened = () => {
  renderPopup();
  popupSection.classList.add('popup_opened');
}

elementEditButton.addEventListener('click', opened);

let closed = () => {
  popupSection.classList.remove('popup_opened');
  // Удаляем попап.
  const existingPopup = popupSection.querySelector('.popup__container');
  popupSection.removeChild(existingPopup);
  }
