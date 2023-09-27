export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      activity: this._infoElement.textContent,
    };
  }

  setUserInfo({ name, activity }) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = activity;
  }
}