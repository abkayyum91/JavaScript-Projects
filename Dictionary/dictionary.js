/* 
1- Take word as input from user
2- Fetch from api
3- Display on the dom
*/

console.log('Fetching data from word api');

// API parameters
/*
url = https://api.dictionaryapi.dev/api/v2/entries/en/<word>
*/

let wordSearchForm = document.getElementById('wordSearchForm');
wordSearchForm.addEventListener('submit', searchWordSubmit);

function searchWordSubmit(e){
    e.preventDefault();
    let searchWord = document.getElementById('search_word').value;

    // create xhr object
    let xhr = new XMLHttpRequest();
    // open object
    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`, true);

    // what to do when response is ready
    xhr.onload = function (){
        if(this.status === 200){
           let response = JSON.parse(this.response);
        
           let str = '';
           str = `<div class="word-result">
                    <p class="fs-4 lead">Search Result</p>
                    <hr>
                    <!-- word -->
                    <div class="word">
                        <h4>Word</h4>
                        <p id="word">${response[0].word}</p>
                    </div>
            
                    <!-- part of speach -->
                    <div class="pos">
                        <h4>Part Of Speach</h4>
                        <p id="pos">${response[0].meanings[0].partOfSpeech}</p>
                    </div>
            
                    <!-- Definition -->
                    <div class="definition">
                        <h4>Definition</h4>
                        <p id="definition">${response[0].meanings[0].definitions[0].definition}</p>
                    </div>
            
                    <!-- Example -->
                    <div class="example">
                        <h4>Example</h4>
                        <p id="example">${response[0].meanings[0].definitions[0].example}</p>
                    </div>
            
                    <!-- synonyms -->
                    <div class="synonyms">
                        <h4>Synonyms</h4>
                        <p id="synonyms">${response[0].meanings[0].definitions[0].synonyms}</p>
                    </div>
            
                    <!-- antonyms -->
                    <div class="antonyms">
                        <h4>Antonyms</h4>
                        <p id="antonyms">${response[0].meanings[0].definitions[0].antonyms}</p>
                    </div>
            
                    <!-- Phonetic -->
                    <!-- phonetic text -->
                    <div class="phText">
                        <h4>Phonetic Text</h4>
                        <p id="phText">${response[0].phonetics[0].text}</p>
                    </div>
                    <!-- audio -->
                    <div class="audio">
                        <h4>Audio</h4>
                        <audio controls autoplay>
                            <source src="${response[0].phonetics[0].audio}" type="audio/mpeg">
                        </audio>
                    </div>
                </div>`;

            document.getElementById('result').innerHTML = str;
        }
        else{
            console.log('some error is occured')
        }
    }

    // send the request
    xhr.send();
}


// clearing result
let clear = document.getElementById('reset');
clear.addEventListener('click', function(){
    let searchWord = document.getElementById('search_word');
    searchWord.value = '';
    document.getElementById('result').innerHTML = '';
})




/*  Testing code
let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/rise', true);

// what to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let word = JSON.parse(this.response);
        console.log(word);
        console.log(word[0].word);
        console.log(word[0].meanings);
        console.log(word[0].meanings[0]);
        console.log(word[0].meanings[0].definitions);
        console.log(word[0].meanings[0].definitions[2]);
        console.log(word[0].meanings[0].definitions[2].antonyms);
        console.log(word[0].meanings[0].definitions[2].definition);
        console.log(word[0].meanings[0].definitions[2].example);
        console.log(word[0].meanings[0].definitions[2].synonyms);

        console.log(word[0].phonetics);
        console.log(word[0].phonetics[0]);
        console.log(word[0].phonetics[0].text);
        console.log(word[0].phonetics[0].audio);

        let synonyms = word[0].meanings[0].definitions[2].synonyms;
        console.log(synonyms)
        synonyms.forEach(function(element){
            console.log(element);
        })
        console.log(synonyms[0])
        
    }
    else {
        console.log('some error is occured')
    }
}
// send the request
xhr.send();
*/