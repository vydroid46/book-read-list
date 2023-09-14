const authorData = document.querySelector('#author');

const titleData = document.querySelector('#title');

const shelf = document.querySelector('#bookshelf')

const pageNumber = document.querySelector('#page');

let finish = document.getElementById('finish');


const button = document.querySelector('#button');

let library = []


const container = document.querySelector('#container');


class Book {
    constructor(title, author, pages, read, key) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.key = key;

    }

    createComponent() {
        this.remove = document.createElement('button');
        this.toggle = document.createElement('button');
        this.currentBook = library[library.length - 1]

        this.book = document.createElement('div');

        this.bookTitle = document.createElement('h1');

        this.titleLabel = document.createElement('span');

        this.authorLabel = document.createElement('span')

        this.pageLabel = document.createElement('span')

        this.statusValue = document.createElement('span')


        this.bookAuthor = document.createElement('h2');

        this.bookPages = document.createElement('h3');

        this.statusLabel = document.createElement('p');
    }

    addData() {
        this.toggle.classList.add('toggle');

        this.toggle.innerHTML = '✔';

        this.remove.classList.add('remove');

        this.remove.innerHTML = '✖';

        this.bookTitle.textContent = this.title;

        this.bookAuthor.textContent = this.author;

        this.bookPages.textContent = this.pages;

        this.titleLabel.textContent = 'Title: '

        this.authorLabel.textContent = 'Author: '

        this.pageLabel.textContent = 'Pages: '

        this.statusLabel.textContent = 'Status: '

        this.remove.addEventListener('click', () => {

            this.book.remove();
            library.splice(this.key, 1);// This removes the book 
        })


        this.toggle.addEventListener('click', () => {
            this.statusCheck()
        })
    }
    appendData() {
        this.book.prepend(this.remove);
        this.book.append(this.toggle)
        this.bookTitle.prepend(this.titleLabel);

        this.bookAuthor.prepend(this.authorLabel);

        this.bookPages.prepend(this.pageLabel);

        this.statusLabel.append(this.statusValue);

        this.book.append(this.bookTitle, this.bookAuthor, this.bookPages, this.statusLabel);

        shelf.appendChild(this.book)

    }

    statusCheck() {

        if (this.read == true) {
            this.statusValue.textContent = 'Finished'
            this.book.classList.add('finished');
            this.read = false;

        } else if (this.read == false) {
            this.statusValue.textContent = 'Pending'
            this.book.classList.remove('finished');
            this.read = true;
        }
    }

    styleBook() {

        this.children = this.book.querySelectorAll('h1, h2,h3, p')

        this.book.classList.add('book-container');
        this.children[0].classList.add('title');
        this.children[1].classList.add('author');
        this.children[2].classList.add('pages');
        this.children[3].classList.add('status');
        this.statusCheck();

    }
}




let key = library.length;


function newBook() {


    let bookData = new Book(titleData.value, authorData.value, pageNumber.value, finish.checked, library.length);

    library.push(bookData);

    bookData.createComponent();

    bookData.addData();

    bookData.appendData();

    bookData.styleBook();



};





button.addEventListener('click', newBook)




