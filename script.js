//INPUT RICERCA
const inputSearch = document.getElementById("searchField");

//BUTTON RICERCA
const btnSearch = document.getElementById("searchBtn");

//CARD RISULTATI DA APPENDERE
const cardArea = document.getElementById("row");




function getBook() {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then((response) => response.json())
        .then((result) => cycleRes(result))
        .then((data) => searchBook(data))
        .catch((err) => console.error(err));
}
getBook()


function cycleRes(data) {
    data.map((element) => {
        createCards(element);
        return data
    });
}

// function searchBook(data) {
//     let searchValue = inputSearch.value;
//     const findBook = data.filter((elem) => elem.title);
//     if (findBook !== searchValue) {
//         createCards
//     }
    
//}


function createCards(book) {
    let cardsCol = document.createElement("div");
    cardsCol.classList.add("col-sm-6", "col-md-4", "col-lg-3", "px-2", "pt-2", "card-col"); 
            
    let cards = document.createElement("div");
    cards.classList.add("card");

    let covers = document.createElement("img");
    covers.classList.add("card-img-top");
    covers.setAttribute("src", book.img);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body")

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = book.title;
    let priceButton = document.createElement("a");
    priceButton.classList.add("btn", "btn-outline-secondary", "ms-3");
    priceButton.innerText = ("Skip");
    let cartButton = document.createElement("a");
    cartButton.classList.add("btn", "btn-outline-success", "ms-5");
    cartButton.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`

    cardArea.appendChild(cardsCol);
    cardsCol.appendChild(cards);
    cards.appendChild(covers);
    cards.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(priceButton);
    cardBody.appendChild(cartButton);

}

// function searchBook(resArray) {
//     //let searchValue = inputSearch.value;
//     [...resArray].filter((element) => console.log(element.title));
   



// btnSearch.addEventListener('click', (event) => {
//     let searchValue = inputSearch.value;
//     filteredBooks = book.title.filter((element) => element === searchValue)
    
//     console.log(filteredBooks)
// })





        
        
    
       



