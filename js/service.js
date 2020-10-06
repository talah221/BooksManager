'use strict'

var gBooks = JSON.parse(localStorage.getItem('books'))
const PAGE_SIZE = 5;
var gPageIdx = 0;


function createBooks() {
    for (var i = 0; i < 3; i++) {
        gBooks.push(createBook())
    }
    saveToStorage('books', gBooks)
}

function createBook(name = getRandomBookName(), price = getRandomPrice()) {
    var bookInfo = {
        id: getRandomString(),
        name: name,
        price: price,
        imgUrl: 'img/book.jpg',
        rating: 0
    }
    return bookInfo;

}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function getRandomString(length = 5) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function deleteBook(id) {
    gBooks = gBooks.filter(function (book) {
        return book.id !== id
    })
    saveToStorage('books', gBooks)

}

function updatePrice(id, price) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === id;

    })
    gBooks[bookIdx].price = price;
    saveToStorage('books', gBooks)


}

// function readBook(id) {
//     var book = gBooks.find(function (book) {
//         return book.id === id;
//     })
// }

function addRating(id, ratingValue) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === id
    })
    gBooks[bookIdx].rating = ratingValue;

    saveToStorage('books', gBooks)

}

function getRandomBookName() {
    var randomBooks = ['Harry Potter', 'Rich Dad Poor Dad', 'Bad Wolf', 'Queen Elizabeth', 'Ice Peaks 3',
        'Superman', 'Batman', 'AVENGERS', 'OXFORD', 'Learn Javascript', 'Learn CSS', 'The Jewish Bible Explained', 'Moby Dick - The Whale',
        'Harry Potter - Prince from Azkaban', 'How to be a Succesful Chef', 'Math for children', 'Learn Spanish', 'Learn France',
        'Learn Russian', 'How to code', 'Tzuk-Eitan Stories', 'Binyamin Netanyahu Bio', 'Albert Einstein Bio']

    var randIndex = Math.floor(Math.random() * randomBooks.length);
    return randomBooks[randIndex]
}

function getRandomPrice() {
    var randomPrice = Math.floor(Math.random() * 150) + 20
    return randomPrice;
}


function sortByPrice() {
    gBooks.sort(function (a, b) {
        return a.price - b.price
    })
    return gBooks;

}

function sortByName() {
    gBooks.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })
    return gBooks;
}


function goNextPage() {
    if (gBooks.length === PAGE_SIZE) return;
    var pageCount = gBooks.length / PAGE_SIZE;
    gPageIdx = (gPageIdx + 1 <= pageCount) ? gPageIdx + 1 : 0
}
