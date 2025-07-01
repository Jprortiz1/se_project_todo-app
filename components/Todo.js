export default class Todo {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._id = data.id;
    this._completed = data.completed;
    this._due = data.due || null;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._checkboxLabel.classList.toggle("todo__label_checked");
    });

    this._deleteBtn.addEventListener("click", () => {
      this._element.remove();
    });
  }

  getView() {
    this._element = this._getTemplate();
    this._checkbox = this._element.querySelector(".todo__checkbox");
    this._checkboxLabel = this._element.querySelector(".todo__label");
    this._deleteBtn = this._element.querySelector(".todo__delete");

    this._checkbox.id = `checkbox-${this._id}`;
    this._checkbox.checked = this._completed;
    this._checkboxLabel.setAttribute("for", this._checkbox.id);
    this._checkboxLabel.textContent = this._name;

    if (this._completed) {
      this._checkboxLabel.classList.add("todo__label_checked");
    }

    if (this._due) {
      const dateEl = this._element.querySelector(".todo__date");
      dateEl.textContent = this._due;
    }

    this._setEventListeners();

    return this._element;
  }
}
