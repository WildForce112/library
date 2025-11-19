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

function addBookToShelf(book, shelf){
  const bookDisplay = document.createElement('div');
  bookDisplay.className = 'book';
  const bookName = document.createElement('div');
  bookName.textContent = book.name;
  const bookAuthor = document.createElement('div');
  bookAuthor.textContent = book.author;
  // bookAuthor.style.width = '30%';
  bookDisplay.style.backgroundColor = generateRandomHexColor();
  bookDisplay.style.color = generateRandomHexColor();
  bookDisplay.style.height = `${getRandomNumber(70, 90)}%`;
  bookDisplay.style.width = `${book.pages}px`;
  bookDisplay.style.border = `2px solid ${generateRandomHexColor()}`
  bookDisplay.appendChild(bookName);
  bookDisplay.appendChild(bookAuthor);
  shelf.appendChild(bookDisplay);
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
const newBookBtn = document.createElement('button');
newBookBtn.textContent = 'Add a Book';
newBookBtn.className = 'addBookBtn';
newBookBtn.style.justifySelf = 'center';
document.body.appendChild(newBookBtn);
const shelf1 = document.createElement('div');
shelf1.style.textWrap = 'wrap';
shelf1.style.display = 'flex';
shelf1.style.alignItems = 'flex-end';
shelf1.style.height = '16vh';
shelf1.style.width = '98vw';
shelf1.style.border = '1px solid brown';
for(book of library){
  addBookToShelf(book, shelf1);
}
// library.shift();
// console.log(library);

document.body.appendChild(shelf1);
for(book of library) console.log(book);
// console.log(library[0]);