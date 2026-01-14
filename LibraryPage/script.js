// create variable for storing book (array)
let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

//create variable to interact with DOM
const modal = document.querySelector('#book_modal');
const openBtn = document.querySelector('#open_modal');
const closeBtn = document.querySelector('#close_modal');
const addBtn = document.querySelector('.btn_add');
const searchInput = document.getElementById('search');

// variable for input's 
const title = document.getElementById('title');
const authorBook = document.getElementById('author');
const yearPublication = document.getElementById('yearPublication');
const numPages = document.getElementById('numPages');

searchInput.addEventListener('input', (e) => {
    // Make str to lowercase
    const searchText = e.target.value.toLowerCase();

    //filtr array
    const filteredBooks = myLibrary.filter(book => {
        // check book's name
        const titleMatch = book.name.toLowerCase().includes(searchText);
        // check author's name
        const authorMatch = book.author.toLowerCase().includes(searchText);
        
        return titleMatch || authorMatch;
    });
    renderLibrary(filteredBooks);
});
// When loading a page, we immediately draw what is in memory.
renderLibrary();

// Open/close modal window
openBtn.addEventListener('click', () => modal.showModal());
closeBtn.addEventListener('click', () => modal.close());

// add a book
addBtn.addEventListener('click', (e) => {
    const form = document.querySelector('.form_modal');

    // checking pattern validation 
    if (!form.checkValidity()) {
        form.reportValidity(); 
        return; 
    }
    e.preventDefault(); 

    if (!title.value || !authorBook.value) {
        alert('Fill in the title and author!');
        return;
    }

    // Creating obj book
    const newBook = {
        name: title.value,
        author: authorBook.value,
        publication: yearPublication.value,
        pages: numPages.value,
        isRead: false, // status by default 
        id: crypto.randomUUID() // using random UUID just to make add and remove easy
    };

    myLibrary.push(newBook);
    
    saveToLocal(); 
    renderLibrary();
    clearInputs();
    modal.close();
});

function clearInputs() {
    title.value = '';
    authorBook.value = '';
    yearPublication.value = '';
    numPages.value = '';
}

// creating func for saving to local store
function saveToLocal() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function renderLibrary(booksToRender = myLibrary) {
    const container = document.getElementById('library_container');
    const template = document.querySelector('#book_card_template'); 
    if (!template) return;
    container.innerHTML = '';

    booksToRender.forEach((book) => {
        // making clone of card's book scructure
        const cardClone = template.content.cloneNode(true);
    
        cardClone.querySelector('.book_name').textContent = book.name;
        cardClone.querySelector('.author_name').textContent = book.author;
        cardClone.querySelector('.year').textContent = book.publication || '-';
        cardClone.querySelector('.pages_num').textContent = book.pages + " pages";

        // logic for removing book's card
        const deleteBtn = cardClone.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            removeBook(book.id);
        });

        // logic for book's status
        const checkbox = cardClone.querySelector('.read_checkbox');
        const statusText = cardClone.querySelector('.status');
        
        checkbox.checked = book.isRead;
        statusText.textContent = book.isRead ? 'READ' : 'NOT READ';
        statusText.style.background = book.isRead ? 'hsl(145, 80%, 92%)' : '#ffcccc';
        statusText.style.color = book.isRead ? 'hsl(145, 80%, 25%)' : '#cc0000';

        // listen to the changes
        checkbox.addEventListener('change', (e) => {
            book.isRead = e.target.checked;
            saveToLocal(); 
            renderLibrary(); 
        });

        container.appendChild(cardClone);
    });
}


function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);
    saveToLocal();
    renderLibrary(); 
}