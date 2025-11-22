// Utility Functions
function generateRandomHexColor() {
  // Generate a random hex color code
  const randomNum = Math.floor(Math.random() * 16777215); 
  let hexColor = randomNum.toString(16); 
  while (hexColor.length < 6) {
    hexColor = "0" + hexColor;
  }
  return "#" + hexColor;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Book Class Constructor
function Book(name, author, pages, read) {
  if (!new.target) {
    throw Error("Please initialize with 'new'");
  }

  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.height = `${getRandomNumber(70, 90)}%`;
  this.width = `calc(${this.pages} * 0.1vw)`;
  this.color = generateRandomHexColor();
  this.background = generateRandomHexColor();
  this.border = `2px solid ${generateRandomHexColor()}`;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;  
}

// Library Management Functions
const library = [];

function addBookToLibrary(book) {
  library.push(book);
}

// Function to get a book by id
function getBookById(id) {
  return library.find(book => book.id === id);
}

function updateReadStatus(book, bookDisplay) {
  const readStatus = document.createElement('button');
  readStatus.className = 'read-status';
  readStatus.dataset.id = book.id;
  if(book.read == true) {
    readStatus.textContent = 'Read';
    readStatus.style.color = "green";
    readStatus.style.border = "0.2rem solid green";
  }
  else {
    readStatus.textContent = `Not Read`;
    readStatus.style.color = "red";
    readStatus.style.border = "0.2rem solid red";

  }
  bookDisplay.appendChild(readStatus);
}

function addBookToShelf(book, shelf) {
  const bookDisplay = document.createElement('div');
  bookDisplay.dataset.id = book.id;
  bookDisplay.className = 'book';
  // bookDisplay.style.display = 'flex';
  bookDisplay.style.backgroundColor = book.background;
  bookDisplay.style.color = book.color;
  bookDisplay.style.height = book.height;
  bookDisplay.style.width = book.width;
  bookDisplay.style.border = book.border;

  const bookName = document.createElement('div');
  bookName.className = 'book-name';
  bookName.textContent = book.name;

  const bookAuthor = document.createElement('div');
  bookAuthor.className = 'book-author';
  bookAuthor.textContent = book.author;

  bookDisplay.appendChild(bookName);
  bookDisplay.appendChild(bookAuthor);
  
  updateReadStatus(book, bookDisplay);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'removeBook';
  removeBtn.textContent = 'X';
  removeBtn.dataset.id = book.id;
  bookDisplay.appendChild(removeBtn);

  shelf.appendChild(bookDisplay);
}

// Event Handling for Book Dialog
const bookDialog = document.querySelector("#book-dialog");
const closeBtn = document.querySelector("#close-dialog");
const submitBtn = document.querySelector("#submit-book");
const input = document.querySelector("input");


// bookDialog.addEventListener('close', () => {
//   console.log(bookDialog.returnValue === "default" 
//     ? "No return value." 
//     : `ReturnValue: ${bookDialog.returnValue}.`);
// });

closeBtn.addEventListener("click", () => {
  bookDialog.close(); // Close the dialog
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Capture input values from the form
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

    // Create a new Book object
  const newBook = new Book(title, author, pages, read);

  // Log the new Book object
  console.log(newBook);

  // Add the new book to the library and display it on the shelf
  addBookToLibrary(newBook);
  addBookToShelf(newBook, shelf1);

  // Close the dialog after submission
  bookDialog.close();
});

// DOM Element Creation
const newBookBtn = document.createElement('button');
newBookBtn.textContent = 'Add a Book';
newBookBtn.className = 'addBookBtn';
newBookBtn.style.justifySelf = 'center';
document.body.appendChild(newBookBtn);

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

const shelves = document.createElement('div');
const shelf1 = document.createElement('div');
shelf1.style.textWrap = 'wrap';
shelf1.style.display = 'flex';
shelf1.style.alignItems = 'flex-end';
shelf1.style.height = '25vh';
shelf1.style.width = '98vw';
shelf1.style.border = '1px solid brown';

// Add Books to Library
const book1 = new Book("12", "23", 53, false);
const book2 = new Book("23", "56", 99, true);
addBookToLibrary(book1);
addBookToLibrary(book2);

// Add Books to Shelf
library.forEach(book => addBookToShelf(book, shelf1));

document.body.appendChild(shelf1); // Append the shelf to the body

// Example: Log Library and First Book
console.log(library); // Logs the library with books
console.log(library[0]); // Logs the first book in the library

document.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  const display = document.querySelector(`[data-id="${id}"]`);

  if(e.target.textContent == "X") {
    display.remove();
  }
  if(e.target.textContent == 'Read' || e.target.textContent == 'Not Read') {
    e.target.remove();
    const book = getBookById(id);
    book.toggleReadStatus();
    updateReadStatus(book, display);
  }
})