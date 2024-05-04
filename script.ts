import { BookInterface } from "./interfaces.js";

export enum BookParamters {
  title = "title",
  author = "author",
  pages = "pages",
  status = "status",
}
const shelf: HTMLElement | null = document.querySelector("#bookshelf");

const titleData: HTMLInputElement | null = document.querySelector("#title");

const authorData: HTMLInputElement | null = document.querySelector("#author");

const pageNumber: HTMLInputElement | null = document.querySelector("#page");

const button: HTMLElement | null = document.querySelector("#button");

const saveBtn: HTMLElement | null = document.querySelector("#saveBtn");

const clearBtn: HTMLElement | null = document.querySelector("#clearBtn");

let finish = document.getElementById("finish") as HTMLInputElement;

let library: Book[] = [];

class Book implements BookInterface {
  title: string;
  author: string;
  pages: number;
  read: boolean;
  id: number;
  remove: HTMLButtonElement;
  toggle: HTMLButtonElement;
  book: HTMLDivElement;
  bookTitle: HTMLHeadingElement;
  titleLabel: HTMLSpanElement;
  authorLabel: HTMLSpanElement;
  pageLabel: HTMLSpanElement;
  statusValue: HTMLSpanElement;
  bookAuthor: HTMLHeadingElement;
  bookPages: HTMLHeadingElement;
  statusLabel: HTMLParagraphElement;
  children: NodeListOf<Element>;
  constructor(
    title: string = "",
    author: string = "",
    pages: number = 0,
    read: boolean,
  ) {
    this.title = title || "";
    this.author = author || "";
    this.pages = isNaN(pages) ? 0 : pages;
    this.read = read;
    this.id;
  }

  createComponent(): void {
    this.remove = document.createElement("button");
    this.toggle = document.createElement("button");
    this.book = document.createElement("div");
    this.bookTitle = document.createElement("h1");
    this.titleLabel = document.createElement("span");
    this.authorLabel = document.createElement("span");
    this.pageLabel = document.createElement("span");
    this.statusValue = document.createElement("span");
    this.bookAuthor = document.createElement("h2");
    this.bookPages = document.createElement("h3");
    this.statusLabel = document.createElement("p");
  }

  addData(): void {
    this.toggle.classList.add("toggle");
    this.toggle.innerHTML = "✔";
    this.remove.classList.add("remove");
    this.remove.innerHTML = "✖";
    this.bookTitle.textContent = this.title;
    this.bookAuthor.textContent = this.author;
    this.bookPages.textContent = this.pages?.toString() || "0";
    this.titleLabel.textContent = "Title: ";
    this.authorLabel.textContent = "Author: ";
    this.pageLabel.textContent = "Pages: ";
    this.statusLabel.textContent = "Status: ";

    this.remove.addEventListener("click", (): void => {
      library.splice(this.id, 1);
      this.book.remove();

      for (let i = 0; i < library.length; i++) {
        reAssign(library[i]);
      }
      isEmpty(library);
    });

    this.toggle.addEventListener("click", (): void => {
      if (this.read === true) {
        this.read = false;
        this.statusCheck();
      } else {
        this.read = true;
        this.statusCheck();
      }
    });
  }

  appendData(): void {
    this.book.prepend(this.remove);
    this.book.append(this.toggle);
    this.bookTitle.prepend(this.titleLabel);
    this.bookAuthor.prepend(this.authorLabel);
    this.bookPages.prepend(this.pageLabel);
    this.statusLabel.append(this.statusValue);
    this.book.append(
      this.bookTitle,
      this.bookAuthor,
      this.bookPages,
      this.statusLabel,
    );
    if (shelf) {
      shelf.appendChild(this.book);
    }
  }

  statusCheck(): void {
    if (this.read === true) {
      this.statusValue.textContent = "Finished";
      this.book.classList.add("finished");
    } else if (this.read === false) {
      this.statusValue.textContent = "Pending";
      this.book.classList.remove("finished");
    }
  }

  styleBook(): void {
    this.children = this.book.querySelectorAll("h1, h2,h3, p");
    this.book.classList.add("book-container");
    let ids = Object.values(BookParamters);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].classList.add(ids[i]);
    }
    this.statusCheck();
  }

  initIndex(library: Book[]) {
    this.id = library.indexOf(this);
  }
}

function reAssign(item: Book): void {
  item.id = library.indexOf(item);
}

function initBook(
  title: string = "",
  author: string = "",
  pages: number = 0,
  read: boolean,
): Book {
  let bookData = new Book(title, author, pages, read);
  return bookData;
}

function newBook(bookData: Book): void {
  library.push(bookData);
  loadBook(bookData, library);
}

function isEmpty(localStorage: Book[]): void {
  const bookContainer = shelf?.querySelectorAll(".book-container");
  if (
    (bookContainer && bookContainer.length === 0) ||
    localStorage.length == 0
  ) {
    if (shelf) {
      shelf.style.display = "none";
    }
  }
}

function loadBook(bookData: Book, library: Book[]): void {
  bookData.createComponent();
  bookData.addData();
  bookData.appendData();
  bookData.styleBook();
  bookData.initIndex(library);

  if (shelf) {
    shelf.style.display = "grid";
  }
}

function saveData(data: Book[]): void {
  window.localStorage.setItem("bookdata", JSON.stringify(data));
}

async function loadSavedBooks(): Promise<void> {
  try {
    let localStorage: Book[] = JSON.parse(
      window.localStorage.getItem("bookdata") || "[]",
    );

    if (localStorage.length > 0) {
      library = [];
      let newarr = [...localStorage];

      newarr.forEach((item) => {
        let bookData = initBook(item.title, item.author, item.pages, item.read);
        library.push(bookData);
        loadBook(bookData, library);
      });

      if (shelf) {
        shelf.style.display = "grid";
      }
    }
    isEmpty(localStorage);
  } catch (error) {
    return Promise.reject(error);
  }
}

button?.addEventListener("click", () => {
  let book = initBook(
    titleData?.value,
    authorData?.value,
    parseInt(pageNumber?.value || "0"),
    finish?.checked || false,
  );
  newBook(book);
});
saveBtn?.addEventListener("click", () => {
  saveData(library);
});

clearBtn?.addEventListener("click", () => {
  window.localStorage.clear();
  library.forEach((item) => item.book.remove());
  library = [];

  loadSavedBooks();
});

document.addEventListener("DOMContentLoaded", loadSavedBooks);
