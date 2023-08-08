let ind = 7;
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
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      ind: 1
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      ind: 2
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      ind: 3
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      ind: 4
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      ind: 5
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      ind: 6
    }
  ];



function render() {
  const reverseArray = initialCards.reverse();
  reverseArray.forEach(renderItem);
}

let elementActive = (evt) => {
  evt.target.classList.toggle('element__heart_active');
}

function deletedElement (evt){
  const currentItem = evt.target.closest('.element'); // получаем родителя кнопки
  currentItem.exist = false;
  currentItem.remove();
}


function renderItem(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  let isLink = true;
  if (!(item.link.startsWith('https://') || item.link.startsWith('http://') || item.link.startsWith('www.'))) isLink = false;
  if (!(item.link.endsWith('.png') || item.link.endsWith('.jpg') || item.link.endsWith('.jpeg') || item.link.endsWith('.svg'))) isLink = false;
  if (!isLink) {
    item.link = 'https://sun9-52.userapi.com/impg/rwuKgkkpRnDQYDx56xO9Kc9KKMkKNKZUxC2BsQ/UGG81lHQNeI.jpg?size=898x594&quality=96&sign=4f363299df63fdff53381468eee50134&c_uniq_tag=B7AMEwk0IsNlkyCjQ77bzDwSGi68fyS5aOHElmk9dXA&type=album';
  }
  cardElement.querySelector('.element__img').src = item.link;
  if (item.name == '') {
    item.name = 'Пустая карточка';
  }
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__img').alt = item.name;
  cardElement.setAttribute('exist', true);
  cardElement.setAttribute('ind', item.ind);
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

  return cardElement;
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
  popupSection.setAttribute('style', 'background-color: rgba(0,0,0,.5);');

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
  popupSection.classList.remove('popup_closed'); // Убираем класс анимации закрытия
  popupSection.classList.add('popup_opened'); // Добавляем класс открытия
}

elementEditButton.addEventListener('click', opened);

let closed = () => {
  const existingPopup = popupSection.querySelector('.popup__container');
  
  popupSection.addEventListener('animationend', () => {
    popupSection.classList.remove('popup_opened', 'popup_closed');
    if (existingPopup) {
      popupSection.removeChild(existingPopup);
    }
  }, { once: true });

  popupSection.classList.add('popup_closed');
};


function renderPopupAddCard() {
  const popupElement = popupTemplate.querySelector('.popup__container').cloneNode(true);
  popupElement.querySelector('.popup__header').textContent = 'Новое место';
  popupElement.querySelector('.popup__button').textContent = 'Создать';
  popupElement.querySelector('.popup__button').setAttribute('aria-label', 'Кнопка с надписью создать');
  popupElement.querySelector('#name').placeholder = 'Название';
  popupElement.querySelector('#activity').placeholder = 'Ссылка на картинку';
  popupSection.setAttribute('style', 'background-color: rgba(0,0,0,.5);');

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
      ind: ind
    };
    ind += 1;
    // Добавляем новый объект в массив initialCards
    initialCards.unshift(newCard);
  
    // Отображаем новую карточку на странице
    let card = renderItem(newCard);

    card.addEventListener('click', () => openedImgCard(newCard));
    closedAddCard();
  }
}

let openedAddCard = () => {
  renderPopupAddCard();
  popupSection.classList.add('popup_opened');
}

elementAddButton.addEventListener('click', openedAddCard);

let closedAddCard = () => {
  const existingPopup = popupSection.querySelector('.popup__container');
  
  popupSection.addEventListener('animationend', () => {
    popupSection.classList.remove('popup_opened', 'popup_closed');
    if (existingPopup) {
      popupSection.removeChild(existingPopup);
    }
  }, { once: true });

  popupSection.classList.add('popup_closed');
};


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
  const elementWithIndex = document.querySelectorAll('.element');
  function findElementWithMatchingIndex(elementWithIndex, ind) {
    for (let i = 0; i < elementWithIndex.length; i++) {
      const element = elementWithIndex[i];
      if (element.getAttribute('ind') === `${ind}`) {
        return element;
      }
    }
    return null; // Если нет подходящего элемента
  }
  const matchingElement = findElementWithMatchingIndex(elementWithIndex, item.ind);
  if (matchingElement != null) {
    renderPopupImgCard(item);
    popupSection.classList.add('popup_opened');
  }
}
  
const elementImgButtons = document.querySelectorAll('.element__img');

elementImgButtons.forEach((element) => {
  const imgItem = {
    name: element.alt,
    link: element.src,
    ind: element.parentElement.getAttribute('ind')
  };
  element.addEventListener('click', () => openedImgCard(imgItem));
});
  
let closedImgCard = () => {
  const existingPopup = popupSection.querySelector('.popup__container-img');
  
  popupSection.addEventListener('animationend', () => {
    popupSection.classList.remove('popup_opened', 'popup_closed');
    if (existingPopup) {
      popupSection.removeChild(existingPopup);
    }
  }, { once: true });

  popupSection.classList.add('popup_closed');
};