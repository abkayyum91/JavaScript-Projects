console.log('Implementing simple library using ES6 class: ');

// Book class
class Book {
    constructor(name, author, language) {
        this.name = name;
        this.author = author;
        this.language = language;
    }
}


// Display class 
class Display {
    storeInLocalStorage(book) {
        let myBook = {
            name: book.name,
            author: book.author,
            language: book.language
        }

        let allBooks = localStorage.getItem('books');
        let bookObj;
        if (allBooks == null){
            bookObj = [];
        }
        else{
            bookObj = JSON.parse(allBooks);
        }

        bookObj.push(myBook)
        localStorage.setItem('books', JSON.stringify(bookObj)); 
    }



    displayBook() {
        let tableBody = document.getElementById('allBooks');

        let allBooks = localStorage.getItem('books');
        let bookObj;
        if (allBooks == null){
            bookObj = [];
        }
        else{
            bookObj = JSON.parse(allBooks);
        }

        let uiString = '';
        bookObj.forEach(function(element, index){
            uiString += `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.language}</td>
                            <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-danger btn-sm">Delete</button></td>
                        </tr>`;
        });
        tableBody.innerHTML = uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 | book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(msgType, msg) {
        let message = document.querySelector('.messages');
        message.innerHTML = `<div class="alert alert-${msgType} alert-dismissible fade show" role="alert">
                                 <strong>${msgType}!</strong> ${msg}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`

        setTimeout(function () {
            message.innerHTML = '';
        }, 5000);
    }
}



// Displaying all presented book in the library
let display = new Display();
display.displayBook();


// Deleteting books
function deleteBook(idx) {
    let allBooks = localStorage.getItem('books');
    let bookObj;
    if(allBooks == null){
        bookObj = [];
    }
    else{
        bookObj = JSON.parse(allBooks);
    }
    bookObj.splice(idx, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));

    let display = new Display();
    display.displayBook();
}


// add submit event listner to libraryForm
let library = document.getElementById('libraryForm');
library.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let hindi = document.getElementById('language1');
    let english = document.getElementById('language2');
    let language;
    if (hindi.checked) {
        language = hindi.value;
    }
    else if (english.checked) {
        language = english.value;
    }

    let book = new Book(name, author, language);

    let display = new Display();
    if (display.validate(book)) {
        display.storeInLocalStorage(book);
        display.displayBook();
        display.clear();
        display.show('success', 'Your book is successfully added');
    }
    else {
        display.show('warning', 'Book and author name must be greater than 2 character.');
    }
}
