'use strict'
var gCreateIsOpen=true;

function onInit() {
    if (!gBooks) {
        gBooks = []
        createBooks();
    }
    renderBooks();
    doTrans()

    onSetLang(gCurrLang)
}

function renderBooks() {

    var books = (getBooks().length) ? getBooks() : gBooks;
    var strId = ''

    books.forEach(function (book) {
        strId += `<tr>
        <td>${book.id} </td><td>${book.name}
         </td><td>${formatNum(book.price)}$</td>
         <td>
         <button data-trans="read-btn" class="btn btn-info" onclick=onRead('${book.id}')>Read</button>
          
          
          <input data-trans="update-btn" class="btn btn-success for-${book.id}" type="number" name="" id="" placeholder="Update Price">
          <button data-trans="submit-btn" onclick="onUpdate('${book.id}')" class="btn btn-success">Submit</button>

          <button data-trans="delete-btn" class="btn btn-danger" onclick="onDeleteBook('${book.id}')">Delete</button>
          </td><td>${book.rating}/10</td>

        </tr>`
    })


    var elBooks = document.querySelector('.my-books');
    elBooks.innerHTML = strId;
    doTrans();
}

function onCreateBook(bookName, price, img) {
    bookName = $('#book-name-input').val();
    price = $('#book-price-input').val();
    gBooks.push(createBook(bookName, price, img))
    renderBooks();

hideCreateBooks()
gCreateIsOpen=!gCreateIsOpen
}


function onDeleteBook(id) {
    deleteBook(id)
    renderBooks()
    saveToStorage('books', gBooks)


}

function onUpdate(id) {
    var wantedPrice = $(`.for-${id}`).val()


    updatePrice(id, wantedPrice)
    renderBooks();
    saveToStorage('books', gBooks)
}


function onRead(id) {
    renderModal(id)
    doTrans();

}

function renderModal(id) {
    var bookToRead = getBooks().filter(function (book) { return (book.id === id) });
    var str = `
            <h1 class="book-name"> ${bookToRead[0].name}</h1>
            <h4 class="book-price"><span data-trans="book-price" >Price: </span> ${bookToRead[0].price}$</h4>
            <h6 class="book-img"><img src="${bookToRead[0].imgUrl}" alt="Book Image"></h6>
            <h5 data-trans="add-rate" class="book-rating">Add Rating:</h5>
            <div class="ratings">
            <input class="rating-${bookToRead[0].id}" type="number" min="0" max="10" placeholder="0-10" value="0">
            <button data-trans="submit-btn" class="btn btn-warning" onclick=onAddRating('${bookToRead[0].id}')>Submit!</button>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod vitae dolorum voluptatum,
            quas doloribus consequuntur, recusandae repudiandae ab qui velit suscipit in ratione 
            odio earum provident iure modi ipsa veniam!</p>
            `

    var elBookModal = document.querySelector('.bookinfo');
    elBookModal.style.display = 'block'
    elBookModal.innerHTML = str;
}

function onAddRating(id) {
    var elRating = document.querySelector(`.rating-${id}`);
    var ratingValue = elRating.value;
    addRating(id, ratingValue);
    renderBooks();
    saveToStorage('books', gBooks)

}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    renderBooks();
}


function onSortPrice() {
    sortByPrice()
    renderBooks()

}


function onSortName() {
    console.log('sorting');
    sortByName()
    renderBooks()

}

function onNextPage() {
    goNextPage()
    renderBooks();
}
function hideCreateBooks(){
    $('#book-price-input').hide()
    $('#book-name-input').hide()
    $('#book-submit').hide()
    $('#book-price-input').val('')
    $('#book-name-input').val('')
    $('#book-submit').val('')
}

function showCreateBooks(){
    $('#book-price-input').show()
    $('#book-name-input').show()
    $('#book-submit').show()
}

function openCreateBook() {
    if(gCreateIsOpen){
        showCreateBooks()
    }else{
        hideCreateBooks()
    }
    gCreateIsOpen=!gCreateIsOpen
}