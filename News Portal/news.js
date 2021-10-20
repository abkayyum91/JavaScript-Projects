/*
1- Fetch news using api 
2- Display on the dom
*/

console.log('Fetching news using api');

/*
API_KEY = b5f936cf151f4f318fa30ed6bfc9ab74;
url =" https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=API_KEY";
*/


// create xhr object
let xhr = new XMLHttpRequest();

// open object
xhr.open('GET', 'https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=b5f936cf151f4f318fa30ed6bfc9ab74', true);

// onporess
xhr.onprogress = function(){
        let str = `<h3>News is loading...</>`;
        document.getElementById('articles').innerHTML = str;
}


// handle after response is ready
xhr.onload = function () {
    if (this.status === 200) {
        setTimeout(() => {
            
            let articleList = JSON.parse(this.response);
            let articles = articleList.articles;
            let str = '';
            articles.forEach(function (element, index) {
                str += `
                        <div class="col-md-5 mx-auto my-2">
                        <div class="card" style="width: 100%;">
                            <img src="${element.urlToImage}" class="card-img-top" alt="post image">
                            <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.content}</p>
                            <a href="${element.url}" class="btn btn-primary text-end" target="_blank">Read more</a>
                            </div>
                        </div>
                        </div>`
            });
            document.getElementById('articles').innerHTML = str;
        }, 3000);
    }
    else {
        console.log('some error occured');
    }
}

// send request to the api
xhr.send();




// search news
let searchBtn = document.getElementById('search_news');
searchBtn.addEventListener('input', searchInput);

function searchInput(){
    let news = document.getElementsByClassName('col-md-5');
    Array.from(news).forEach(function(element){
        let description = element.getElementsByTagName('p')[0].innerText;
        if(description.toLowerCase().includes(searchBtn.value.toLowerCase())){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    });
}
