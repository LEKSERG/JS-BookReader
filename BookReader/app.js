
let text = '';
let book = null;

// From File
const fileInput = document.getElementById('chooseFile');
fileInput.addEventListener('change', (event) => {
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = event => {
        text = reader.result;
        start();     
    }
});

// From URL

const getFromUrl = document.getElementById('getFromUrl');
const url = document.getElementById('url');
getFromUrl.addEventListener('click', (event) => {   

    const request = async () => {       
        const response = await fetch(url.value);
        const txt = await response.text();       
        text = txt;
        start();
    }
    request();

    // Works fine too
    // fetch(url.value ) // ,{mode: no-cors}
    // .then(response => response.text())
    // .then(data => {
    // text = data;
    // start();
    // }); 

    url.value = '';
});

// From Direct Input

const getFromUser = document.getElementById('getFromUser');
const directInput = document.getElementById('directInput')
getFromUser.addEventListener('click', (event) => {
    console.log(directInput.value);  
    text = directInput.value;
    start();
    directInput.value = ''; 
});


// Functions
const controls = () => {

    const getFromFind = document.getElementById('findButton');
    const findInput = document.getElementById('find');
    getFromFind.addEventListener('click', (event) => {
        book.find(findInput.value);
        findInput.value = '';
    });

    const getFromJump = document.getElementById('jumpButton');
    const jumpInput = document.getElementById('jumpTo');
    getFromJump.addEventListener('click', (event) => {
        book.jumpTo(jumpInput.value);
        jumpInput.value = '';
    });
        
    document.getElementById('prev').addEventListener('click', (event) =>{
        book.prevPage();});   
    
    document.getElementById('continue').addEventListener('click', (event) =>{
        book.continue();});
      
    document.getElementById('next').addEventListener('click', (event) =>{
        book.nextPage();});       
}    

const start = () => {
    book = new Book(text);
    book.startReading();
    controls();
}



// Class
class Book {
    constructor(bookText) {
        this.char = bookText.split('');
    }
    authorName = 'Sergey Lekontsev';
    bookPrice = '3000$';
    char;
    numberOfPages = 1;
    pagesMap = new Map();
    currentPage = 1;
    lastPage=1;
    txt;

    startReading () {
        const perPage = 200; 
        this.numberOfPages = Math.ceil(this.char.length/perPage);
        for (let i=1; i <=this.numberOfPages; i++) {
          if(this.char.length >= perPage){              
            this.pagesMap.set(i, this.char.splice(0, perPage).join(''));
          } else {
            this.pagesMap.set(i, this.char.splice(0, this.char.length).join(''));
          }  
        }
        let firstPage = this.pagesMap.get(1);
        this.currentPage = 1;
        this.author();
        this.price();
        this.cP();
        this.numPages();
        return document.getElementById('output').textContent = firstPage;
    }

    nextPage () {
        if (this.currentPage < this.numberOfPages) {
            this.currentPage += 1;
        }
        this.lastPage = this.currentPage > this.lastPage ? this.currentPage : this.lastPage;
        this.txt = this.pagesMap.get(this.currentPage);
        this.cP();
        return document.getElementById('output').textContent = this.txt;
    }

    prevPage () {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
        }
        this.txt = this.pagesMap.get(this.currentPage);
        this.cP();
        return document.getElementById('output').textContent = this.txt;
    }

    jumpTo (to) {
        if (+to <= 0 || +to > this.numberOfPages) {
            this.txt = "Try pages from 1 to " + this.numberOfPages;
        } else{
        this.currentPage = +to;
        this.lastPage = this.currentPage > this.lastPage ? this.currentPage : this.lastPage;
        this.txt = this.pagesMap.get(this.currentPage);
        }
        this.cP();
        return document.getElementById('output').textContent = this.txt;
    }

    find (what) {
        const foundPages = [];
        for (let i=1; i<=this.pagesMap.size; i++) {
            
            let regex = new RegExp( what,'g');
            let count = (this.pagesMap.get(i).match(regex) || []).length
            
            if (count > 0) {
                foundPages.push(i);
            }
        }
        this.txt = 'Search result is on page(s): ' + foundPages.join(',');
        return document.getElementById('output').textContent = this.txt;
        
    }

    continue() {
        this.txt = this.pagesMap.get(this.lastPage);
        this.currentPage = this.lastPage;
        this.cP();
        return document.getElementById('output').textContent = this.txt;
    }

    author () {
        return document.getElementById('author').textContent = 'Author: ' + this.authorName;
    }

    price () {
        return document.getElementById('price').textContent = 'Price: ' + this.bookPrice;
    }
    numPages () {
        return document.getElementById('pages').textContent = 'Page(s): ' + this.numberOfPages;
    }
    cP () {
        return document.getElementById('cP').textContent = 'Page: ' + this.currentPage;
    }
}


