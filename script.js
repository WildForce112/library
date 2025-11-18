function Book(name, author, pages, read){
  if(!new.target){
    throw Error("Please initilize with new");
  }
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function generateRandomHexColor() {
  // Generate a random number between 0 and 16777215 (FFFFFF in decimal)
  const randomNum = Math.floor(Math.random() * 16777215); 
  
  // Convert the number to a hexadecimal string
  let hexColor = randomNum.toString(16); 
  
  // Pad with leading zeros if the hex string is less than 6 characters long
  while (hexColor.length < 6) {
    hexColor = "0" + hexColor;
  }
  
  // Prepend '#' to make it a valid CSS hex color code
  return "#" + hexColor;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const library = [];

function addBookToLibrary(book){
  library.push(book);
}

const book1 = new Book("12", "23", 53, false);
const book2 = new Book("23", "56", 99, true);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book1);
addBookToLibrary(book2);

const shelves = document.createElement('div');

const libraryContainer = document.createElement('div');
libraryContainer.style.textWrap = 'wrap';
libraryContainer.style.display = 'flex';
libraryContainer.style.alignItems = 'flex-end';

libraryContainer.style.height = '16vh';
libraryContainer.style.border = '1px solid brown';
for(book of library){
  const bookDisplay = document.createElement('div');
  bookDisplay.className = 'book';
  const bookName = document.createElement('div');
  bookName.textContent = book.name;
  const bookAuthor = document.createElement('div');
  bookAuthor.textContent = book.author;
  bookDisplay.style.backgroundColor = generateRandomHexColor();
  bookDisplay.style.color = generateRandomHexColor();
  bookDisplay.style.height = `${getRandomNumber(70, 90)}%`;
  bookDisplay.style.width = `${book.pages}px`;
  bookDisplay.appendChild(bookName);
  bookDisplay.appendChild(bookAuthor);

  // bookDisplay.textContent = `${book.name}\n${book.author}`;
  
  libraryContainer.appendChild(bookDisplay);
}
document.body.appendChild(libraryContainer);
for(book of library) console.log(book);
// console.log(library[0]);