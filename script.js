const authorData = document.querySelector('#author');

const clearBtn = document.querySelector('#clearBtn');
const titleData = document.querySelector('#title');
const shelf = document.querySelector('#bookshelf')

const pageNumber = document.querySelector('#page');

const saveBtn = document.querySelector('#saveBtn');

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

            library.splice(this.key, 1);// This removes the book 
            this.book.remove();

            for (let i = 0; i < library.length; i++) {

                reAssign(library[i])
            }
            console.log(library[this.key])
            console.log(library)
        })


        this.toggle.addEventListener('click', () => {
            console.log('clicked')

            console.log(library)
            console.log(library[this.key])
            if (this.read === true) {
                // library[this.key].read = false;
                this.read = false;
                console.log(this)
                this.statusCheck()
            } else {

                // library[this.key].read = true;
                this.read = true;
                console.log(this)
                this.statusCheck()
            }
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
        if (this.read === true) {
            this.statusValue.textContent = 'Finished';
            this.book.classList.add('finished');
        } else if (this.read === false) {
            this.statusValue.textContent = 'Pending';
            this.book.classList.remove('finished');
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
    initIndex() {
        this.key = library.indexOf(this);
    }
}

function reAssign(item) {
    item.key = library.indexOf(item)

}

function initBook(title, author, pages, read, key) {


    let bookData = new Book(title, author, pages, read, key);
    console.log(bookData)

    return bookData;
}

function newBook(bookData) {

    library.push(bookData);
    bookData.initIndex();
    console.log(library.indexOf(bookData))

    loadBook(bookData);

};

function loadBook(bookData) {


    bookData.createComponent();

    bookData.addData();

    bookData.appendData();

    bookData.styleBook();


    shelf.style.display = 'grid'
}


function saveData(data) {
    window.localStorage.setItem('bookdata', JSON.stringify(data))

    console.log(`Saved ` + localStorage.getItem('bookdata'));
}


async function loadContent() {

    let localStorage = JSON.parse(window.localStorage.getItem('bookdata')) !== null ? JSON.parse(window.localStorage.getItem('bookdata')) : [];
    console.log(`Loading ` + localStorage.length + ' Books')
    if (localStorage.length === 0) {
        console.log(`No data found`)
        shelf.style.display = 'none'

    }
    else if (window.localStorage.getItem('bookdata') !== null) {
        console.log('Getting the ' + localStorage.length + ' local data')
        library = []
        let bookData = await JSON.parse(window.localStorage.getItem('bookdata'))

        let newarr = [...bookData]
        newarr.forEach((item) => {

            let bookData = initBook(item.title, item.author, item.pages, item.read, item.key)
            loadBook(bookData);

            library.push(bookData)

        })


        shelf.style.display = 'grid';
    }


}

document.addEventListener('DOMContentLoaded', loadContent)



button.addEventListener('click', () => { newBook(initBook(titleData.value, authorData.value, pageNumber.value, finish.checked)) })


saveBtn.addEventListener('click', () => {
    saveData(library)
    console.log(library)
    console.log(window.localStorage.getItem('bookdata'))
    console.log('saved')
})


clearBtn.addEventListener('click', () => {
    window.localStorage.clear()
    library.forEach(item => item.book.remove())
    library = []

    loadContent()
});