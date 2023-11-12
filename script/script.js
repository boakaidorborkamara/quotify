// DOM ELEMENTS/////////////////////////////////////////////////////////////
let get_started_section = document.getElementById("get-started-section");
let header = document.getElementById("header");
let quote_section = document.getElementById("quote-section");
let category_dropdown_btn = document.getElementById("category-dropdown-btn");
let author = document.getElementById("author");
let category = document.getElementById("genre");
let quote = document.getElementById("quote");
let quote_ele = document.getElementById("quote-ele");
let loading_screen = document.getElementById("loading-screen");
let random_quote_btn = document.getElementById("random-quote-btn");
let previous_btn = document.getElementById("previous-btn");
let next_btn = document.getElementById("next-btn");
let author_quotes_section = document.getElementById("author-quotes-section");


//GLOBAL VARIABLES/////////////////////////////////////////////////////
let quote_index = 0;
let all_quotes = [];


// EVENT LISTENERS///////////////////////////////////////////////////
document.addEventListener("click", async (e)=>{
    let clickedElement = e.target;

    if(clickedElement.id === "get-started-btn"){
        startApp();
        return;
    }

    if(clickedElement.id === "random-quote-btn"){
        displayNextRandomQuote();
        return;
    }

    if(clickedElement.classList.contains("dropdown-item")){
        let selected_category = clickedElement.innerText;
        all_quotes = await displayQuotesBaseOnCategory(selected_category);
    }

    if(clickedElement.id === "next-btn"){
       displayNextQuote(all_quotes);
    }

    if(clickedElement.id === "previous-btn"){
        displayPreviousNextQuote(all_quotes);
    }

    if(clickedElement.id === "copy-btn"){
        copyQuote();
    }

    if(clickedElement.id === "btn-arrow"){
        displayQuotesBaseOnAuthor();
    }
})



//FUNCTIONS/////////////////////////////////////////////////////////
const startApp = async ()=>{
    hideElement(get_started_section);
    showElement(header);
    let random_quotes = await fetchData("https://quote-garden.onrender.com/api/v3/quotes/random");
    renderQuotesToDOM(random_quotes, quote_index, "random");
    displayDropDownItems();
}

// Get quotes from API 
const fetchData = async (url)=>{

    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(err){
        if(err){
            console.log(err);
        }
    } 
}

// displays quotes to dom 
const renderQuotesToDOM = async (quotes, index, category_name)=>{
    // showElement(loading_screen);
    console.log("p", quotes)
    
    hideElement(author_quotes_section);
    if(quote_section.classList.contains("d-flex")){
        showElement(loading_screen);
        hideElement(quote_section);
    }

    if(quotes){
        let quote = quotes.data[index];
        quote_ele.innerText = quote.quoteText;
        author.innerText = quote.quoteAuthor;
        category.innerText = category_name;
        hideElement(loading_screen);
        showElement(quote_section);
    }

}

// Displays a rondom quote each time 
const displayNextRandomQuote = async ()=>{
    let random_quotes = await fetchData("https://quote-garden.onrender.com/api/v3/quotes/random");
    renderQuotesToDOM(random_quotes, quote_index, "random");
}

// fetch quote category and display them in the dropdown element 
const displayDropDownItems = async ()=>{
    
    let category = await fetchData("https://quote-garden.onrender.com/api/v3/genres");
    category.data.forEach(ele => {
        let drop_down_element = `
        <a class="dropdown-item" href="#">${ele}</a>
        `;

        category_dropdown_btn.insertAdjacentHTML("beforeend", drop_down_element);
    });
}

// display quotes based on user prefer category 
const displayQuotesBaseOnCategory = async (category_name)=>{
    resetQuoteIndex();

    // update DOM to reflect selected category 
    category.innerText = category_name;  

    // modify api endpoint based on selected category 
    let quotes_per_category = "";
    if(category_name == "random"){
        quotes_per_category = await fetchData("https://quote-garden.onrender.com/api/v3/quotes/random");
    }
    else{
        quotes_per_category= await fetchData(`https://quote-garden.onrender.com/api/v3/quotes?genre=${category_name}`);
    }
     
    renderQuotesToDOM(quotes_per_category, quote_index, category_name);
    controlButtonsDisplay(category_name);

    return quotes_per_category;

}

//displays buttons based on the selected catgory
const controlButtonsDisplay = async(category)=>{
    if(category !== "random"){
        console.log("not random");
        hideElement(random_quote_btn);
        showElement(previous_btn);
        showElement(next_btn);
    }
    else if(category === "random"){
        showElement(random_quote_btn);
        hideElement(previous_btn);
        hideElement(next_btn);
    }
}

// displays next quotes 
const displayNextQuote = async(quotes, category)=>{
    // increase quote_index
    quote_index++
    renderQuotesToDOM(quotes, quote_index)

    let last_index = quotes.data.length-1;
    if(quote_index > 0){
        activateElement(previous_btn);
    }

    if(quote_index === last_index){
        disableElement(next_btn);
    }
     
}

// displays preious quotes
const displayPreviousNextQuote = async(quotes, category)=>{
    // increase quote_index
    quote_index--
    console.log("ii", quote_index)
    renderQuotesToDOM(quotes, quote_index)

    let last_index = quotes.data.length-1;
    if(quote_index === 0){
        disableElement(previous_btn);
    }

    if(quote_index === last_index-1){
        activateElement(next_btn);
    }
     
}

const displayQuotesBaseOnAuthor = async ()=>{

    console.log("working");
    // reset the content of author quotes section to nothing 
    author_quotes_section.innerHTML = "";

    // extract name of the current author 
    let author_name = author.innerText; 
    

    // display a loading screen as data loads 
    loading_screen.classList.remove("d-none");
    quote_section.classList.add("d-none");


    // get all quotes from current author 
    let data =  await fetchData(`https://quote-garden.onrender.com/api/v3/quotes?author=${author_name}`)
    // fetchData(BASE_URL+"/api/v3/quotes?author="+author_name);
    console.log(data);

    
    // stop displaying data when the data returns 
    if(data){
        loading_screen.classList.add("d-none");
        author_quotes_section.classList.remove("d-none");
    }
    
    // set author name in the HTML element 
    let html_element_for_author_name = ` <!-- author name  -->
    <div class=" d-flex justify-content-center align-items-center mt-2 p-4 btn" >
        <div>
            <h3 class="m-0 fw-bold"><span class="text-muted">Quotes by: </span>${author_name}</h3>
        </div>
    </div>
    `;

    // display author's name to the DOM 
    author_quotes_section.insertAdjacentHTML("afterbegin", html_element_for_author_name);

    // display each quote from current author 
    data.data.forEach((ele)=>{
        console.log(ele);
        let html_element_for_author_quotes = ` 
    
        <!-- list of all author quotes  -->
        <div class="border-start border-5 border-success py-4 mb-5 mx-4 shadow-sm">
            <p class="ps-4">"${ele.quoteText}"
            </p>
        </div>`;

        author_quotes_section.insertAdjacentHTML("beforeend", html_element_for_author_quotes)

    });
}

const copyQuote = async()=>{
    // extract quote and author text from DOM element
    let quote_details = `${quote_ele.innerText} ${author.innerText}`;

    //add to the clip board using writeText (copy text)
    if(navigator.clipboard){
        await navigator.clipboard.writeText(quote_details);
        alert("Quote Copied!")
    }
}

// make quote index zero for the first quote 
const resetQuoteIndex = ()=>{
    quote_index = 0;
    disableElement(previous_btn);
    activateElement(next_btn);
}

// accepts an HTML element node and hide the specific element from the DOM 
const hideElement = async (ele)=>{
    ele.classList.add("d-none");
}

// accepts an HTML hidden element node and display the specific element from the DOM 
const showElement = async (ele)=>{
    ele.classList.remove("d-none");
}

const disableElement = (ele)=>{
    ele.classList.add("disabled");
}

const activateElement = (ele)=>{
    ele.classList.remove("disabled");
}






