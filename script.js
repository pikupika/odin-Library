class Book {
  constructor(title, author, pages, read = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

const Library = [];

class addBookToLibrary {
  constructor(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    Library.push(newBook);
    renderLibrary();
  }
}

class renderLibrary {
  constructor() {
    const container = document.getElementById("library-container");
    container.innerHTML = "";

    Library.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("book-card");
      card.dataset.id = book.id;

      card.innerHTML = `
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "✅ Read" : "❌ Not Read"}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

      container.appendChild(card);
    });
  }
}

const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const addBookForm = document.getElementById("add-book-form");

newBookBtn.addEventListener("click",() => {
  dialog.showModal();
})

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value.trim();
  const author = e.target.author.value.trim();
  const pages = e.target.pages.value;
  const read = e.target.read.checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
  }

  addBookForm.reset();
  dialog.close();
}
);

addBookForm.addEventListener("reset", () => {
  dialog.close();
});


document
  .getElementById("library-container")
  .addEventListener("click", (e) => {
    const card = e.target.closest(".book-card");
    if (!card) return;

    const bookId = card.dataset.id;
    const book = Library.find((b) => b.id === bookId);

    if (e.target.classList.contains("toggle-read")) {
      book.toggleRead();
      renderLibrary();   // to redraws the whole UI so the card now shows the updated status.
    }

    if (e.target.classList.contains("remove-book")) {
      const index = Library.findIndex((b) => b.id === bookId);
      Library.splice(index, 1);
      renderLibrary();
    }
  });


// Sample books to start with
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Potter", "J.K. Rowling", 500, false);
