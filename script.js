var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var BookParamters;
(function (BookParamters) {
    BookParamters["title"] = "title";
    BookParamters["author"] = "author";
    BookParamters["pages"] = "pages";
    BookParamters["status"] = "status";
})(BookParamters || (BookParamters = {}));
const shelf = document.querySelector("#bookshelf");
const titleData = document.querySelector("#title");
const authorData = document.querySelector("#author");
const pageNumber = document.querySelector("#page");
const button = document.querySelector("#button");
const saveBtn = document.querySelector("#saveBtn");
const clearBtn = document.querySelector("#clearBtn");
let finish = document.getElementById("finish");
let library = [];
class Book {
    constructor(title = "", author = "", pages = 0, read) {
        this.title = title || "";
        this.author = author || "";
        this.pages = isNaN(pages) ? 0 : pages;
        this.read = read;
        this.id;
    }
    createComponent() {
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
    addData() {
        var _a;
        this.toggle.classList.add("toggle");
        this.toggle.innerHTML = "✔";
        this.remove.classList.add("remove");
        this.remove.innerHTML = "✖";
        this.bookTitle.textContent = this.title;
        this.bookAuthor.textContent = this.author;
        this.bookPages.textContent = ((_a = this.pages) === null || _a === void 0 ? void 0 : _a.toString()) || "0";
        this.titleLabel.textContent = "Title: ";
        this.authorLabel.textContent = "Author: ";
        this.pageLabel.textContent = "Pages: ";
        this.statusLabel.textContent = "Status: ";
        this.remove.addEventListener("click", () => {
            console.log(library);
            console.log(this.id);
            library.splice(this.id, 1);
            this.book.remove();
            for (let i = 0; i < library.length; i++) {
                reAssign(library[i]);
            }
            isEmpty(library);
        });
        this.toggle.addEventListener("click", () => {
            if (this.read === true) {
                this.read = false;
                this.statusCheck();
            }
            else {
                this.read = true;
                this.statusCheck();
            }
        });
    }
    appendData() {
        this.book.prepend(this.remove);
        this.book.append(this.toggle);
        this.bookTitle.prepend(this.titleLabel);
        this.bookAuthor.prepend(this.authorLabel);
        this.bookPages.prepend(this.pageLabel);
        this.statusLabel.append(this.statusValue);
        this.book.append(this.bookTitle, this.bookAuthor, this.bookPages, this.statusLabel);
        if (shelf) {
            shelf.appendChild(this.book);
        }
    }
    statusCheck() {
        if (this.read === true) {
            this.statusValue.textContent = "Finished";
            this.book.classList.add("finished");
        }
        else if (this.read === false) {
            this.statusValue.textContent = "Pending";
            this.book.classList.remove("finished");
        }
    }
    styleBook() {
        this.children = this.book.querySelectorAll("h1, h2,h3, p");
        this.book.classList.add("book-container");
        let ids = Object.values(BookParamters);
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].classList.add(ids[i]);
        }
        this.statusCheck();
    }
    initIndex(library) {
        this.id = library.indexOf(this);
    }
}
function reAssign(item) {
    item.id = library.indexOf(item);
}
function initBook(title = "", author = "", pages = 0, read) {
    let bookData = new Book(title, author, pages, read);
    return bookData;
}
function newBook(bookData) {
    library.push(bookData);
    loadBook(bookData, library);
}
function isEmpty(localStorage) {
    const bookContainer = shelf === null || shelf === void 0 ? void 0 : shelf.querySelectorAll(".book-container");
    if ((bookContainer && bookContainer.length === 0) ||
        localStorage.length == 0) {
        if (shelf) {
            shelf.style.display = "none";
        }
    }
}
function loadBook(bookData, library) {
    bookData.createComponent();
    bookData.addData();
    bookData.appendData();
    bookData.styleBook();
    bookData.initIndex(library);
    if (shelf) {
        shelf.style.display = "grid";
    }
}
function saveData(data) {
    window.localStorage.setItem("bookdata", JSON.stringify(data));
}
function loadSavedBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let localStorage = JSON.parse(window.localStorage.getItem("bookdata") || "[]");
            if (localStorage.length > 0) {
                library = [];
                console.log("i am the local storage", localStorage);
                let newarr = [...localStorage];
                newarr.forEach((item) => {
                    let bookData = initBook(item.title, item.author, item.pages, item.read);
                    console.log(bookData);
                    console.log("i am a library", library);
                    library.push(bookData);
                    loadBook(bookData, library);
                });
                if (shelf) {
                    shelf.style.display = "grid";
                }
            }
            isEmpty(localStorage);
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    let book = initBook(titleData === null || titleData === void 0 ? void 0 : titleData.value, authorData === null || authorData === void 0 ? void 0 : authorData.value, parseInt((pageNumber === null || pageNumber === void 0 ? void 0 : pageNumber.value) || "0"), (finish === null || finish === void 0 ? void 0 : finish.checked) || false);
    newBook(book);
    console.log(book);
});
saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.addEventListener("click", () => {
    saveData(library);
});
clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener("click", () => {
    window.localStorage.clear();
    library.forEach((item) => item.book.remove());
    library = [];
    loadSavedBooks();
});
document.addEventListener("DOMContentLoaded", loadSavedBooks);
