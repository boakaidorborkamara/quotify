let get_started_btn = document.getElementById("get-started-btn");
let get_started_section = document.getElementById("get-started-section");
let header = document.getElementById("header");
let quote_section = document.getElementById("quote-section");
let category_dropdown_btn = document.getElementById("category-dropdown-btn");
const BASE_URL = "https://quote-garden.onrender.com";


window.addEventListener("load", async ()=>{
    console.log("windows loaded");
    getStarted(get_started_btn);
    
});


// get data from API 
const fetchData = async (url)=>{
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

// Enable user to leave the welcome screen and get started 
function getStarted(btn){
    btn.addEventListener("click", async ()=>{
        console.log(btn);
        hideElement(get_started_section);
        showElement(header);
        showElement(quote_section);

        // fetch and add items in the dropdown 
        await displayDropDownItems(category_dropdown_btn);
        getSelectedCategory(category_dropdown_btn);    


    })
}

// accepts an HTML element node and hide the specific element from the DOM 
function hideElement(ele){
    ele.classList.add("d-none");
}

// accepts an HTML hidden element node and display the specific element from the DOM 
function showElement(ele){
    ele.classList.remove("d-none");
    console.log(ele);
}

async function displayDropDownItems(html_dropdown){
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

getSelectedCategory = async (html_dropdown)=>{
    // HTML div containing dropdown items 
    let drop_down_container = await html_dropdown.children[1].children;

    //loop and add event listener to each dropdown item
    for(let i = 0; i < drop_down_container.length; i++){
        let dropdown_items = drop_down_container[i];
        dropdown_items.addEventListener("click", (e)=>{
            let category_name = e.target.innerText;
            console.log(category_name);
            return category_name;
        })
    }
    

}





// let random_quote = document.getElementById("random-quote");
// let author_btn = document.getElementById("author-btn");
// let author = document.getElementById("author");
// let genre = document.getElementById("genre");
// let next_btn = document.getElementById("next-btn");
// let loading_screen = document.getElementById("loading-screen");
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

// const displayRandomQuote = async ()=>{
    
//    let data =  await fetchData(BASE_URL+"/api/v3/quotes/random");
   

//    if(data.statusCode === 200){
//     loading_screen.classList.add("d-none");
//     quote_section.classList.remove("d-none");
//     author_quotes_section.classList.add("d-none");
//    }

   

//    data.data.forEach(ele => {
//         console.log(ele);
//         random_quote.innerText = ele.quoteText;
//         author.innerText = ele.quoteAuthor;
//         genre.innerText = ele.quoteGenre;
//    });
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





