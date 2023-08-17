const cardContainer = document.querySelector('.elements__grid-items'); // Место куда рендерим карточки
const cardTemplate = document.querySelector('.card-template').content; // Получаем доступ к темплейт тегу, а точнее к его содержимому

const popupEditForm = document.querySelector('#popup_edit-profile'); // Получаем доступ к попапу для ред. профиля 
const popupAddForm = document.querySelector('#popup_add-card'); // Получаем доступ к попапу для созд. карточек
const popupImgForm = document.querySelector('#popup_image'); // Получаем доступ к попапу для дет. просмотра карточки
const cardForm = popupAddForm.querySelector('.popup__form'); // Получаем доступ к форме внутри попапа

const elementEditButton = document.querySelector('.profile-info__edit-button'); // Получаем доступ к кнопке ред. профиля
const elementAddButton = document.querySelector('.profile__addbutton'); // Получаем доступ к кнопке созд. карточек

const editProfileCloseButton = popupEditForm.querySelector('.popup__close'); // Получаем доступ к кнопке закрытия попапа для ред. профиля
const addCardCloseButton = popupAddForm.querySelector('.popup__close'); // Получаем доступ к кнопке закрытия попапа для созд. карточек
const imgCardCloseButton = popupImgForm.querySelector('.popup__close'); // Получаем доступ к кнопке закрытия попапа для дет. просмотра карточки
const closeButtons = document.querySelectorAll('.popup__close'); // Получаем доступ к кнопке закрытия для оверлея

const nameInput = popupEditForm.querySelector('#name'); // Получаем доступ к вводу имени в профиле
const jobInput = popupEditForm.querySelector('#activity'); // Получаем доступ к вводу деятельности в профиле
const titleInput = popupAddForm.querySelector('#title'); // Получаем доступ к вводу названия добавляемой карточки 
const imgInput = popupAddForm.querySelector('#img-url'); // Получаем доступ к вводу картинки добавляемой карточки 

const mainName = document.querySelector('.profile-info__title'); // Получаем доступ к уже введённому имени
const mainTitle = document.querySelector('.profile-info__subtitle'); // Получаем доступ к уже введённой деятельности

const popupImg = document.querySelector('.popup__image'); // Получаем доступ к картинке 
const popupCaption = document.querySelector('.popup__caption'); // Получаем доступ к подписи

// Функция перебора массива карточек
function createItems() {
  const reverseArray = initialCards.reverse();
  reverseArray.forEach(renderInitialCards);
}

// Функция генерации начальных карточек 
function renderInitialCards(items) {
  const item = createCard(items);
  addCard(item);
}

//Функция добавления карточки в разметку
function addCard (item) {
  cardContainer.prepend(item);
}

function createCard (items) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const titleCardElement = cardElement.querySelector('.element__title'); // Получаем доступ к заголовку
  const imgCardElement = cardElement.querySelector('.element__img'); // Получаем доступ к картинке
  
  // Заменяем значения значениями из массива объектов 
  titleCardElement.textContent = items.name;
  imgCardElement.alt = items.name;
  imgCardElement.src = items.link;

  // Проходимся по создаваемому элементу и добавляем обработчик событий на лайк
  cardElement.querySelector('.element__heart').addEventListener('click', toggleLike);
  
  // Проходимся по создаваемому элементу и добавляем обработчик событий на корзину
  cardElement.querySelector('.element__trash').addEventListener('click', deleteCard);

  // Проходимся по создаваемому элементу и добавляем обработчик событий на детальный просмотр
  cardElement.querySelector('.element__img').addEventListener('click', function() {
    openPopupImgForm(items.name, items.link);
  });

  return cardElement;
}

// Функция для изменения лайка
const toggleLike = (evt) => {
  evt.target.classList.toggle('element__heart_active');
}

// Функция для удаления карточки
function deleteCard (evt){
  const currentItem = evt.target.closest('.element'); // получаем родителя кнопки
  currentItem.remove();
}

//Общая функция для открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция для открытия попапа "Редактировать профиль"
function openEditPopup() {

  nameInput.value = mainName.textContent;
  jobInput.value = mainTitle.textContent;

  // Находим кнопку отправки внутри формы
  const submitButtonElement = popupEditForm.querySelector(configForm.submitButtonSelector);

  // Проверяем валидность всех полей внутри формы, используя метод checkValidity() для каждого
  const inputList = Array.from(popupEditForm.querySelectorAll(configForm.inputSelector));
  const isFormValid = inputList.every((inputElement) => inputElement.checkValidity());
 
  // Передаем общую валидность формы в функцию для обновления состояния кнопки
  toggleButtonState(submitButtonElement, isFormValid, configForm);
  openPopup(popupEditForm);
}

// Функция для открытия попапа "Новое место"
function openAddPopup() {
  openPopup(popupAddForm);
}

// Функция для открытия попапа "Детального просмотра"
function openPopupImgForm(itemName, itemImg) {
  popupImg.src = itemImg;
  popupImg.alt = itemName;
  popupCaption.textContent = itemName;
  openPopup(popupImgForm);
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

  // Отображаем новую карточку на странице
  renderInitialCards(newCard);

  // Обнуляем значения полей в форме
  cardForm.reset();

  // Закрываем попап
  closePopup(popupAddForm);
}

// Общая функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

// функция для закрытия каждого попапа по кнопке Escape
function closeWithKey (evt) {
  if (evt.key === "Escape") {
    closePopup(popupEditForm);
    closePopup(popupAddForm);
    closePopup(popupImgForm);
  }
}

// Функция закрытия попапа "Редактировать профиль"
function closeEditPopup() {
  closePopup(popupEditForm);
}

// Функция закрытия попапа "Новое место"
function closeAddPopup() {
  closePopup(popupAddForm);
}

// Функция закрытия попапа "Детальный просмотр"
function closeImgPopup() {
  closePopup(popupImgForm);
}

// Слушатель для открытия попапа "Редактировать профиль"
elementEditButton.addEventListener('click', openEditPopup);

// Слушатель для открытия попапа "Новое место"
elementAddButton.addEventListener('click', openAddPopup);

// Слушатель для закрытия попапа "Редактировать профиль"
editProfileCloseButton.addEventListener('click', closeEditPopup);

// Слушатель для закрытия попапа "Новое место"
addCardCloseButton.addEventListener('click', closeAddPopup);

// Слушатель для закрытия попапа "Детальный просмотр"
imgCardCloseButton.addEventListener('click', closeImgPopup);

// Слушатель для отправки формы "Редактировать профиль"
popupEditForm.addEventListener('submit', submitEditProfileForm);

// Слушатель для отправки формы "Новое место"
popupAddForm.addEventListener('submit', submitAddCardForm);

// Слушатель для закрытия попапов по кнопке Esc
document.addEventListener('keyup', closeWithKey);

// Вызываем функцию createItems, чтобы отобразить карточки на странице
createItems();