'use strict'
var gTrans = {
    title: {
        en: 'My Books',
        he: 'הספרים שלי'
    },
    'next-btn':{
        en:'Next Page',
        he:'עמוד הבא'
    },

    'read-btn': {
        en: 'Read',
        he: 'קרא'
    },
    'update-btn': {
        en: 'Update Price',
        he: 'עדכן מחיר'
    },
    'delete-btn': {
        en: 'Delete ',
        he: 'מחק'
    },
    'add-btn': {
        en: 'Add Book',
        he: 'הוסף ספר חדש'
    },
    'book-name': {
        en: 'Book Name:',
        he: 'שם הספר:'
    },
    'book-price' :{
        en: 'Price:',
        he: 'מחיר הספר:',
    },
    'add-rate': {
        en: 'Rate this book:',
        he: 'דרג את הספר'
    },
    'submit-btn': {
        en: 'Submit',
        he: 'שלח'
    },
    'alert-add-name':{
        en:'Enter Book Name',
        he:'הכנס את שם הספר'
    },
    'alert-add-price':{
        en:'Enter Book Price',
        he:'הכנס מחיר לספר',
    },
    id:{
        en:'ID:',
        he:'מספר סידורי:'
    },
    actions:{
        en:'Actions:',
        he:'פעולות:'
    },
    'book-rate':{
        en:'Book Rate:',
        he:'דירוג הספר:'
    },
    'new-price':{
        en:'New price:',
        he:'הכנס מחיר חדש'
    },
    'price-edit':{
        en:'Price Edit:',
        he:'עדכון מחיר',
    },

    'save':{
        en:'Save Changes',
        he:'שמור'
    },
    'close':{
        en:'Close',
        he:'סגור'
    }
}


var gCurrLang = loadFromStorage('lang') || 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var trans = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = trans
        } else {
            el.innerText = trans
        }
    })

}

function getTrans(transKey) {
    var translation = gTrans[transKey][gCurrLang]
    if (!translation) return gTrans[transKey].en
    return translation
}


function setLang(lang) {
    gCurrLang = lang;
    saveToStorage('lang',gCurrLang)
}


function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}