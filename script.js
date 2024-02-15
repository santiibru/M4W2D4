//INPUT RICERCA
const inputSearch = document.getElementById("searchField");

//BUTTON RICERCA
const btnSearch = document.getElementById("searchBtn");

// BUTTON AGGIUNGERE AL CARRELLO
const btnAdd = document.getElementsByClassName("btn-add")

// CARRELLO RISULTATI DA APPENDERE

const cartArea = document.getElementById("offcanvas-body")

//CARD RISULTATI DA APPENDERE
const cardArea = document.getElementById("row");

//RISULTATI ATTIVI
let activeResults;

//window.location.html href
//html nuovo, con tutto il layout, collegare le pagine e poi fare il fetch

window.onload = () => {
    getBook()
}

function getBook() {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then((response) => response.json())
        .then((result) => cycleRes(result))
        .catch(err => console.error(err));
}



function cycleRes(res, savedResults = true) {   
    if (savedResults) {
        activeResults = res;
    }
    cardArea.innerHTML = "";
    res.forEach((element) => {
        createCards(element);

    });
}



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
    let cardPrice = document.createElement("h6");
    cardPrice.classList.add("card-subtitle", "text-center", "mt-2","mb-2");
    cardPrice.innerText = ("$") + book.price;
    let buttonsCointainer = document.createElement("div");
    buttonsCointainer.classList.add("d-flex", "justify-content-around");
    let skipButton = document.createElement("a");
    skipButton.classList.add("btn", "btn-outline-danger");
    skipButton.innerText = ("X");
    let detailsButton = document.createElement("a")
    detailsButton.classList.add("btn", "btn-outline-secondary", "px-3");
    detailsButton.innerText = ("See more")
    let cartButton = document.createElement("a");
    cartButton.classList.add("btn", "btn-outline-success");
    cartButton.role = ("button");
    cartButton.tabIndex = ("0")
    cartButton.setAttribute("data-bs-toggle", "popover");
    cartButton.setAttribute("data-bs-trigger", "focus");
    cartButton.setAttribute("data-bs-placement", "top");
    cartButton.setAttribute("data-bs-content", "Book added to cart successfully!");
    cartButton.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`

    cardArea.appendChild(cardsCol);
    cardsCol.appendChild(cards);
    cards.appendChild(covers);
    cards.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(buttonsCointainer);
    buttonsCointainer.appendChild(skipButton);
    buttonsCointainer.appendChild(detailsButton);
    buttonsCointainer.appendChild(cartButton);

    //INIZIALIZO POPOVER
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    
    //AGGIUNGO AL CARRELLO
    cartButton.addEventListener("click", () => {
    addToCart(book)
    })

    //ELIMINO LA CARD CHE NON VOGLIO
    skipButton.addEventListener("click", () => {
        skipBook(book)
    }) 

    function skipBook() {
        cardsCol.classList.add("d-none");
    }

}





function searchBook() {
    if (activeResults) {
        let searchValue = inputSearch.value;
        let findBook = activeResults.filter((elem) => {
            return elem.title.toLowerCase().includes(searchValue.toLowerCase().trim());
        });
        cycleRes(findBook, false);
    }
}

function addToCart(element) {
    let titleAdded = document.createElement("h5")
    titleAdded.classList.add("booksAdded-title")
    titleAdded.innerText = element.title
    let cartContainer = document.createElement("div")
    cartContainer.classList.add("d-flex", "justify-content-between", "align-items-center")
    let priceAdded = document.createElement("h6")
    priceAdded.classList.add("booksAdded-price", "text-center", "fs-5")
    priceAdded.innerText = ("$") + element.price
    let photoAdded = document.createElement("img")
    photoAdded.classList.add("booksAdded-img")
    photoAdded.src = element.img
    let hr = document.createElement("hr")
    hr.classList.add("hr")
    let cartEmpty = document.getElementById("cart-empty")
    cartEmpty.classList.add("d-none")
    let checkoutBtn = document.getElementById("checkout-btn")
    checkoutBtn.classList.remove("d-none")
    let totalPrice = document.getElementById("total-price")
    totalPrice.classList.remove("d-none")
    totalPrice.innerText = ("Total $") + (Number(totalPrice.innerText) + Number(element.price))
    
    
    cartArea.appendChild(titleAdded)
    cartArea.appendChild(cartContainer)
    cartContainer.appendChild(photoAdded)
    cartContainer.appendChild(priceAdded)
    cartArea.appendChild(hr)
    
    }


