const authorData = document.querySelector('#author');

const titleData = document.querySelector('#title');

const shelf = document.querySelector('#bookshelf')

const pageNumber = document.querySelector('#page');

let finish = document.getElementById('finish');


const button = document.querySelector('#button');

let library = []


const container = document.querySelector('#container');



function Book(title, author, pages, read, key) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.key = key;




}


let key = library.length;


function newBook() {



    let bookData = new Book(titleData.value, authorData.value, pageNumber.value, finish.checked, library.length);

    library.push(bookData);



    let remove = document.createElement('button');

    let toggle = document.createElement('button');



    toggle.classList.add('toggle');

    toggle.innerHTML = '✔';

    remove.classList.add('remove');

    remove.innerHTML = '✖';



    let currentBook = library[library.length - 1]

    let book = document.createElement('div');

    let bookTitle = document.createElement('h1');

    let titleLabel = document.createElement('span');

    let authorLabel = document.createElement('span')

    let pageLabel = document.createElement('span')

    let statusValue = document.createElement('span')


    let bookAuthor = document.createElement('h2');

    let bookPages = document.createElement('h3');

    let statusLabel = document.createElement('p');


    bookTitle.textContent = currentBook.title;
    bookAuthor.textContent = currentBook.author;
    bookPages.textContent = currentBook.pages;


    console.log(statusLabel)


    titleLabel.textContent = 'Title: '

    authorLabel.textContent = 'Author: '

    pageLabel.textContent = 'Pages: '

    statusLabel.textContent = 'Status: '

    book.prepend(remove);

    book.append(toggle)

    statusCheck(currentBook, book, statusValue)

    remove.addEventListener('click', (e) => {

        book.remove();
        library.splice(bookData.key, 1);// This removes the book 
    })


    toggle.addEventListener('click', () => {






        statusCheck(currentBook, book, statusValue)




    })

    bookTitle.prepend(titleLabel);

    bookAuthor.prepend(authorLabel);

    bookPages.prepend(pageLabel);

    statusLabel.append(statusValue);

    book.append(bookTitle, bookAuthor, bookPages, statusLabel);

    shelf.appendChild(book)


    styleBook(bookData, book);



};

function statusCheck(status, target, content) {

    if (status.read == true) {
        content.textContent = 'Finished'
        target.classList.add('finished');
        status.read = false;

    } else if (status.read == false) {
        content.textContent = 'Pending'
        target.classList.remove('finished');
        status.read = true;
    }
}


function styleBook(bookD, bookR) {

    let children = bookR.querySelectorAll('h1, h2,h3, p')

    bookR.classList.add('book-container');
    children[0].classList.add('title');
    children[1].classList.add('author');
    children[2].classList.add('pages');
    children[3].classList.add('status');




    statusCheck(bookD, bookR)



}

button.addEventListener('click', newBook)




