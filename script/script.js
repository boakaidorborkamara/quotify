let random_quote = document.getElementById("random-quote");
let author_btn = document.getElementById("author-btn");
let author = document.getElementById("author");
let genre = document.getElementById("genre");
let next_btn = document.getElementById("next-btn");
let loading_screen = document.getElementById("loading-screen");
let quote_section = document.getElementById("quote-section");
let author_quotes_section = document.getElementById("author-quotes-section")

const BASE_URL = "https://quote-garden.onrender.com";


window.addEventListener("load", async ()=>{
    console.log("windows loaded");
    displayRandomQuote();
    next_btn.addEventListener("click", displayRandomQuote);
    author_btn.addEventListener("click", displayQuotesBaseOnAuthor)
})


const fetchData = async (url)=>{
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

const displayRandomQuote = async ()=>{
    
   let data =  await fetchData(BASE_URL+"/api/v3/quotes/random");
   

   if(data.statusCode === 200){
    loading_screen.classList.add("d-none");
    quote_section.classList.remove("d-none");
    author_quotes_section.classList.add("d-none");
   }

   

   data.data.forEach(ele => {
        console.log(ele);
        random_quote.innerText = ele.quoteText;
        author.innerText = ele.quoteAuthor;
        genre.innerText = ele.quoteGenre;
   });
}

const displayQuotesBaseOnAuthor = async ()=>{

    author_quotes_section.innerHTML = "";
    console.log("autorid")
    let author_name = author.innerText;
    console.log(author_name)
    
    let data =  await fetchData(BASE_URL+"/api/v3/quotes?author="+author_name);

    loading_screen.classList.remove("d-none");
    quote_section.classList.add("d-none");
    if(data){
        loading_screen.classList.add("d-none");
        author_quotes_section.classList.remove("d-none");
    }
    console.log("DATAss", data);

    

    let html_element_for_author_name = ` <!-- author name  -->
    <div class=" d-flex justify-content-between align-items-center my-5 p-4 btn" >
        <div>
            <h3 class="m-0 fw-bold"><span class="text-muted">Quotes from: </span>${author_name}</h3>
        </div>
    </div>
    `;

    author_quotes_section.insertAdjacentHTML("afterbegin", html_element_for_author_name)




    data.data.forEach((ele)=>{
        console.log(ele);
        let html_element_for_author_quotes = ` 
    
        <!-- list of all author quotes  -->
        <div class="border-start border-5 border-success mb-5">
            <p class="ps-4">"${ele.quoteText}"
            </p>
        </div>`;

        author_quotes_section.insertAdjacentHTML("beforeend", html_element_for_author_quotes)

    })
}





