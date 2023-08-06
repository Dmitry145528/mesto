const cardContainer = document.querySelector('.elements__grid-items');
const cardTemplate = document.querySelector('.card-template').content;
const popupTemplate = document.querySelector('.popup-template').content;
const imgTemplate = document.querySelector('.popup-img').content;

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
  const reverseArray = initialCards.reverse();
  reverseArray.forEach(renderItem);
  }

let elementActive = (evt) => {
  evt.target.classList.toggle('element__heart_active');
  }


  
function renderItem(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__img').src = item.link;
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__img').alt = item.name;
  

  cardContainer.prepend(cardElement);

  const elementHeart = document.querySelectorAll('.element__heart');
  const elementDelete = document.querySelectorAll('.element__trash');

      // Проходимся по каждому элементу и добавляем обработчик событий на лайк
  elementHeart.forEach((element) => {
    element.addEventListener('click', elementActive);
    });

      // Проходимся по каждому элементу и добавляем обработчик событий на корзину 
  elementDelete.forEach((element) => {
    element.addEventListener('click', deletedElement);
    });

  function deletedElement (evt){
    const currentItem = evt.target.closest('.element') // получаем родителя кнопки
    currentItem.remove();
    }
  }
  
  // Вызываем функцию render, чтобы отобразить карточки на странице
  render();


function renderPopup() {
  const popupElement = popupTemplate.querySelector('.popup__container').cloneNode(true);
  popupElement.querySelector('.popup__header').textContent = 'Редактировать профиль';
  popupElement.querySelector('.popup__button').textContent = 'Сохранить';
  popupElement.querySelector('.popup__button').setAttribute('aria-label', 'Кнопка с надписью сохранить');
  popupElement.querySelector('#name').placeholder = 'Имя и Фамилия';
  popupElement.querySelector('#activity').placeholder = 'Деятельность';
  popupSection.setAttribute('style', 'background-color: rgba(0,0,0,.5);')

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


function renderPopupAddCard() {
  const popupElement = popupTemplate.querySelector('.popup__container').cloneNode(true);
  popupElement.querySelector('.popup__header').textContent = 'Новое место';
  popupElement.querySelector('.popup__button').textContent = 'Создать';
  popupElement.querySelector('.popup__button').setAttribute('aria-label', 'Кнопка с надписью создать');
  popupElement.querySelector('#name').placeholder = 'Название';
  popupElement.querySelector('#activity').placeholder = 'Ссылка на картинку';
  popupSection.setAttribute('style', 'background-color: rgba(0,0,0,.5);')

  const nameInput = popupElement.querySelector('#name');
  const imgInput = popupElement.querySelector('#activity');

  // Добавляем новый попап
  popupSection.append(popupElement); 

  const popupCloseSection = popupElement.querySelector('.popup__close');
  popupCloseSection.addEventListener('click', closedAddCard);

  const formElement = document.querySelector('.popup__form');
  formElement.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(evt) {
    evt.preventDefault();
  
    // Получаем значения из формы
    const nameValue = nameInput.value;
    const imgValue = imgInput.value;
  
    // Создаем новый объект с данными из формы
    const newCard = {
      name: nameValue,
      link: imgValue,
    };
  
    // Добавляем новый объект в массив initialCards
    initialCards.unshift(newCard);
  
    // Отображаем новую карточку на странице
    renderItem(newCard);

    closedAddCard();
  }
}

let openedAddCard = () => {
  renderPopupAddCard();
  popupSection.classList.add('popup_opened');
}

elementAddButton.addEventListener('click', openedAddCard);

let closedAddCard = () => {
  popupSection.classList.remove('popup_opened');
  // Удаляем попап.
  const existingPopup = popupSection.querySelector('.popup__container');
  popupSection.removeChild(existingPopup);
  }



function renderPopupImgCard(item) {
  const popupImgElement = imgTemplate.querySelector('.popup__container-img').cloneNode(true);
  popupImgElement.querySelector('.popup__image').src = item.link;
  popupImgElement.querySelector('.popup__caption').textContent = item.name;
  popupImgElement.querySelector('.popup__image').alt = item.name;
  popupSection.setAttribute('style', 'background-color: rgba(0,0,0,.9);');

  // Добавляем новый попап
  popupSection.append(popupImgElement);
  
  const popupCloseSection = popupImgElement.querySelector('.popup__close');
  popupCloseSection.addEventListener('click', closedImgCard);
  }
  
let openedImgCard = (item) => {
  renderPopupImgCard(item);
  popupSection.classList.add('popup_opened');
  }
  
const elementImgButtons = document.querySelectorAll('.element__img');

elementImgButtons.forEach((element) => {
const imgItem = {
  name: element.alt,
  link: element.src
  };
element.addEventListener('click', () => openedImgCard(imgItem));
});

let closedImgCard = () => {
  popupSection.classList.remove('popup_opened');
  // Удаляем попап.
  const existingPopup = popupSection.querySelector('.popup__container-img');
  popupSection.removeChild(existingPopup);
  }