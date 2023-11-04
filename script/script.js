let get_started_btn = document.getElementById("get-started-btn");
let get_started_section = document.getElementById("get-started-section");
let header = document.getElementById("header");
let quote_section = document.getElementById("quote-section");
let category_dropdown_btn = document.getElementById("category-dropdown-btn");
let author = document.getElementById("author");
let genre = document.getElementById("genre");
let quote = document.getElementById("quote");
let loading_screen = document.getElementById("loading-screen");
let random_quote_btn = document.getElementById("random-quote-btn");
let previous_btn = document.getElementById("previous-btn");
let next_btn = document.getElementById("next-btn");


console.log(author, genre, quote);

const BASE_URL = "https://quote-garden.onrender.com";
let current_category = "random";
let quote_index = 0;


window.addEventListener("load", async ()=>{
    getStarted(get_started_btn);
    generateRandomQuote(random_quote_btn);
});

// get data from API 
const fetchData = async (url)=>{
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

// Enable user to leave the welcome screen and get started 
const getStarted = (btn)=>{
    btn.addEventListener("click", async ()=>{
        hideElement(get_started_section);
        showElement(header);
        showElement(loading_screen);
        await displayDropDownItems(category_dropdown_btn);
        displayQuote(current_category);
        getSelectedCategory(category_dropdown_btn);

    })
}

const displayQuote = async (category)=>{
    // customize url based on selected category 
    let url = "";
    if(category === "random"){
        url = BASE_URL+"/api/v3/quotes/"+category;
    }
    else{
        url = BASE_URL+"/api/v3/quotes?genre="+category;
        console.log("URL", url);
        console.log("not random");
    }

    // get data from API using the customized url 
    let quotes =  await fetchData(url);
    let number_of_quotes = quotes.data.length;
    console.log("number of quote", number_of_quotes);
    
    if(quotes.statusCode === 200){
     // stop showing loading screen when data from API arrive 
     hideElement(loading_screen);
 
    //  loop through and display quote if it's a random  quote 
     if(current_category === "random" && number_of_quotes === 1){
        quotes.data.forEach(ele => {
            quote.innerText = ele.quoteText;
            author.innerText = ele.quoteAuthor;
            genre.innerText = current_category;
       });
     }
     //  only display the first quote 
     else if(current_category !== "random" && number_of_quotes >= 1){
            let first_quote = quotes.data[0];
            console.log(first_quote);
            quote.innerText = first_quote.quoteText;
            author.innerText = first_quote.quoteAuthor;
            genre.innerText = current_category;
            displayNextQuote(next_btn, quotes);
            displayPreviousQuote(previous_btn, quotes);
     }
    

     controlButtonsDisplay();
     showElement(quote_section);
    }
 
 }

// accepts an HTML element node and hide the specific element from the DOM 
const hideElement = async (ele)=>{
    ele.classList.add("d-none");
}

// accepts an HTML hidden element node and display the specific element from the DOM 
const showElement = async (ele)=>{
    ele.classList.remove("d-none");
    console.log(ele);
}

// fetch quote genres and display them in the dropdown element 
const displayDropDownItems = async (html_dropdown)=>{
    // HTML div containing dropdown items 
    let drop_down_container = html_dropdown.children[1];
    let genres = await fetchData(BASE_URL+"/api/v3/genres");
    // dynamicly add dropdown items to dropdown container in the DOM 
    genres.data.forEach(ele => {
        let drop_down_element = `
        <a class="dropdown-item" href="#">${ele}</a>
        `;
        drop_down_container.insertAdjacentHTML("beforeend", drop_down_element);
    });

}

//get 
const getSelectedCategory = async (html_dropdown)=>{
    // HTML div containing dropdown items 
    let drop_down_container = await html_dropdown.children[1].children;

    //loop and add event listener to each dropdown item
    for(let i = 0; i < drop_down_container.length; i++){
        let all_dropdown_items = drop_down_container[i];
        all_dropdown_items.addEventListener("click", (e)=>{
            let category_name = e.target.innerText;
            console.log(category_name);
            changeCategory(category_name);
            // return category_name;
        })
    }
    

}

const generateRandomQuote = (btn)=>{
    btn.addEventListener("click", async ()=>{
        displayQuote(current_category);
    });
}

const changeCategory = async(selected_category)=>{
    current_category = selected_category;
    genre.innerText = current_category;
    displayQuote(selected_category);
}

const controlButtonsDisplay = async()=>{
    if(current_category !== "random"){
        hideElement(random_quote_btn);
        showElement(previous_btn);
        showElement(next_btn);
    }
    else if(current_category === "random"){
        showElement(random_quote_btn);
        hideElement(previous_btn);
        hideElement(next_btn);
    }
}

const displayNextQuote = async(btn, all_quotes)=>{
    
    let total_quote_amount = all_quotes.data.length;
    // amount of undisplayed quotes 
    let remaining_quote_amount = total_quote_amount-1;
    console.log("NUM", total_quote_amount, remaining_quote_amount);
    
    btn.addEventListener("click", ()=>{
        remaining_quote_amount-=1;
        if(remaining_quote_amount <= -1){
            console.log("all quotes displayed");
            next_btn.classList.add("disabled")
            return
        } 
        
        quote_index+=1;
            let next_quote = all_quotes.data[quote_index];
            quote.innerText = next_quote.quoteText;
            author.innerText = next_quote.quoteAuthor;
            genre.innerText = current_category;
        });
}


const displayPreviousQuote = async(btn, all_quotes)=>{
    console.log("all q", all_quotes);
    let total_quote_amount = all_quotes.data.length;
    // amount of undisplayed quotes 
    // let remaining_quote_amount = total_quote_amount-1;
    // console.log("NUM", total_quote_amount, remaining_quote_amount);

    if(quote_index < total_quote_amount){
        console.log("no previous quote");
    }


    btn.addEventListener("click", ()=>{
        quote_index-=1;
        let next_quote = all_quotes.data[quote_index];
        // quote.innerText = next_quote.quoteText;
        // author.innerText = next_quote.quoteAuthor;
        // genre.innerText = current_category;
            
        
    })
}





// let author_btn = document.getElementById("author-btn");

// let next_btn = document.getElementById("next-btn");
// let author_quotes_section = document.getElementById("author-quotes-section");



// window.addEventListener("load", async ()=>{
//     console.log("windows loaded");
//     displayRandomQuote();
//     next_btn.addEventListener("click", displayRandomQuote);
//     author_btn.addEventListener("click", displayQuotesBaseOnAuthor)
// })


// const fetchData = async (url)=>{
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data);
//     return data;
// }



// const displayQuotesBaseOnAuthor = async ()=>{

//     author_quotes_section.innerHTML = "";
//     console.log("autorid")
//     let author_name = author.innerText;
//     console.log(author_name)
    
//     let data =  await fetchData(BASE_URL+"/api/v3/quotes?author="+author_name);

//     loading_screen.classList.remove("d-none");
//     quote_section.classList.add("d-none");
//     if(data){
//         loading_screen.classList.add("d-none");
//         author_quotes_section.classList.remove("d-none");
//     }
//     console.log("DATAss", data);

    

//     let html_element_for_author_name = ` <!-- author name  -->
//     <div class=" d-flex justify-content-between align-items-center  p-4 btn" >
//         <div>
//             <h3 class="m-0 fw-bold"><span class="text-muted">Quotes by: </span>${author_name}</h3>
//         </div>
//     </div>
//     `;

//     author_quotes_section.insertAdjacentHTML("afterbegin", html_element_for_author_name)




//     data.data.forEach((ele)=>{
//         console.log(ele);
//         let html_element_for_author_quotes = ` 
    
//         <!-- list of all author quotes  -->
//         <div class="border-start border-5 border-success mb-5">
//             <p class="ps-4">"${ele.quoteText}"
//             </p>
//         </div>`;

//         author_quotes_section.insertAdjacentHTML("beforeend", html_element_for_author_quotes)

//     })
// }





