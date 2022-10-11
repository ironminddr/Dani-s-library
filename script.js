var myLibrary = JSON.parse(sessionStorage.getItem('books')) != null ? JSON.parse(sessionStorage.getItem('books')) : [];

function Book(id, author, title, numberOfPages, readed) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.readed = readed;
}
function addBookToLibrary(author, title, numberOfPages, readed) {

    let id = myLibrary.at(-1) !== undefined ? myLibrary.at(-1).id + 1 : 1;
    myLibrary.push(new Book(id, author, title, numberOfPages, readed));
    sessionStorage.setItem('books', JSON.stringify(myLibrary));
    goToHomePage()
}
function openAddBookScreen() {
    window.open("add-book-screen.html", "_self")
}
function goToHomePage() {
    window.open("index.html", "_self")
}

function getAllSavedBooks() {
    let htmlToReturn = '';
    myLibrary = JSON.parse(sessionStorage.getItem('books')) != null ? JSON.parse(sessionStorage.getItem('books')) : [];

    myLibrary.forEach(function (book) {
        htmlToReturn += `
        <div class="column">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.numberOfPages}</p>
            <input onclick="setReaded(${book.id})" type="checkbox" id="readed" name="readed" ${book.readed ? "checked" : ""}>
            <label for="readed">Readed</label>
            <br>
            <button onclick="deleteBook(${book.id})" class="delete">Delete</button>
        </div>
      `;
    });
    document.getElementById("booksDiv").innerHTML = htmlToReturn;
}

function setReaded(id) {

    var readed = myLibrary.find(book => { return book.id === id }).readed;
    myLibrary.find(book => { return book.id === id }).readed = !readed;
    sessionStorage.setItem('books', JSON.stringify(myLibrary));
}
function deleteBook(id) {
    var book = myLibrary.find(book => { return book.id === id })
    var indexOfBookToRemove = myLibrary.indexOf(book);
    myLibrary.splice(indexOfBookToRemove, 1);
    sessionStorage.setItem('books', JSON.stringify(myLibrary));
    getAllSavedBooks();
}

