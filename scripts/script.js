const cardContainer = document.querySelector('.elements__grid-items');
const cardTemplate = document.querySelector('.card-template').content;
const formElement = document.querySelector('.popup__form');

const popupEditForm = document.querySelector('#popup_edit-profile');
const popupAddForm = document.querySelector('#popup_add-card');
const popupImgForm = document.querySelector('#popup_image');

const elementEditButton = document.querySelector('.profile-info__edit-button');
const elementAddButton = document.querySelector('.profile__addbutton');

const editProfileCloseButton = popupEditForm.querySelector('.popup__close');
const addCardCloseButton = popupAddForm.querySelector('.popup__close');
const imgCardCloseButton = popupImgForm.querySelector('.popup__close');

const nameInput = popupEditForm.querySelector('#name');
const jobInput = popupEditForm.querySelector('#activity');

const mainName = document.querySelector('.profile-info__title');
const mainTitle = document.querySelector('.profile-info__subtitle');


function render() {
  const reverseArray = initialCards.reverse();
  reverseArray.forEach(renderItem);
}

const elementActive = (evt) => {
  evt.target.classList.toggle('element__heart_active');
}

function deletedElement (evt){
  const currentItem = evt.target.closest('.element'); // получаем родителя кнопки
  currentItem.remove();
}


function renderItem(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  if (item.link == '') {
    item.link = 'https://sun9-52.userapi.com/impg/rwuKgkkpRnDQYDx56xO9Kc9KKMkKNKZUxC2BsQ/UGG81lHQNeI.jpg?size=898x594&quality=96&sign=4f363299df63fdff53381468eee50134&c_uniq_tag=B7AMEwk0IsNlkyCjQ77bzDwSGi68fyS5aOHElmk9dXA&type=album';
  }
  cardElement.querySelector('.element__img').src = item.link;
  if (item.name == '') {
    item.name = 'Пустая карточка';
  }
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__img').alt = item.name;
  
  cardContainer.prepend(cardElement);

  const elementHeart = document.querySelectorAll('.element__heart');
  const elementDelete = document.querySelectorAll('.element__trash');
  const elementImgButton = document.querySelector('.element__img');

  // Проходимся по каждому элементу и добавляем обработчик событий на детальный просмотр
  elementImgButton.addEventListener('click', () => {
    openPopupImgForm(popupImgForm, item);
  });

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



// Функция для открытия попапа "Редактировать профиль"
function openPopupEditForm() {
  nameInput.value = mainName.textContent; 
  jobInput.value = mainTitle.textContent;
  popupEditForm.classList.add('popup_opened');
}

// Функция для открытия попапа "Новое место"
function openPopupAddForm() {
  popupAddForm.classList.add('popup_opened');
}

// Функция для открытия попапа "Детального просмотра"
function openPopupImgForm(popupElement, item) {
  const popupImg = popupElement.querySelector('.popup__image');
  const popupCaption = popupElement.querySelector('.popup__caption');
  popupElement.setAttribute('style', 'background-color: rgba(0,0,0,.9);');

  popupImg.src = item.link;
  popupImg.alt = item.name;
  popupCaption.textContent = item.name;

  popupElement.classList.add('popup_opened');
}

// Общая функция закрытия
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// Функция для отправки формы "Редактировать профиль"
function handleFormSubmit (evt) {
  evt.preventDefault();
  
  mainName.textContent = nameInput.value;
  mainTitle.textContent = jobInput.value;

  closePopup(popupEditForm);
}



// Слушатель для открытия попапа "Редактировать профиль"
elementEditButton.addEventListener('click', openPopupEditForm);

// Слушатель для открытия попапа "Новое место"
elementAddButton.addEventListener('click', openPopupAddForm);

// Слушатель для закрытия попапа "Редактировать профиль"
editProfileCloseButton.addEventListener('click', function() {
  closePopup(popupEditForm);
});

// Слушатель для закрытия попапа "Новое место"
addCardCloseButton.addEventListener('click', function() {
  closePopup(popupAddForm);
});

// Слушатель для закрытия попапа "Детальный просмотр"
imgCardCloseButton.addEventListener('click', function() {
  closePopup(popupImgForm);
});

// Слушатель для отправки формы "Редактировать профиль"
formElement.addEventListener('submit', handleFormSubmit);