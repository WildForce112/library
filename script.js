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

// Library Management Functions
const library = [];

function addBookToLibrary(book) {
  library.push(book);
}

function addBookToShelf(book, shelf) {
  const bookDisplay = document.createElement('div');
  bookDisplay.className = 'book';
  bookDisplay.style.backgroundColor = book.background;
  bookDisplay.style.color = book.color;
  bookDisplay.style.height = book.height;
  bookDisplay.style.width = book.width;
  bookDisplay.style.border = book.border;
  bookDisplay.style.fontSize = '1rem';

  const bookName = document.createElement('div');
  bookName.textContent = book.name;

  const bookAuthor = document.createElement('div');
  bookAuthor.textContent = book.author;

  bookDisplay.appendChild(bookName);
  bookDisplay.appendChild(bookAuthor);
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
