'use strict'

function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str)
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var val = JSON.parse(str)
    return val;
}

function saveInfo() {
    console.log('saveinfo running');
    saveToStorage('books', gBooks);
    ;
}

function getBooksFromStorage() {
    var toLoad = JSON.parse(localStorage.getItem('books'))
    return toLoad;
}