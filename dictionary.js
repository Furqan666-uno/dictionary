const input= document.querySelector('input')
const btn= document.querySelector('button')
const dictionary= document.querySelector('.dictionary-app')

// const url= 'https://api.dictionaryapi.dev/api/v2/entries/en/hello'

async function dictionaryFind(word) {
    const res= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data= await res.json();
    return data[0];//assuming 1st entry contains all the data
}

btn.addEventListener('click',fetchAndCreateCard);

async function fetchAndCreateCard() {
    const data1= await dictionaryFind(input.value)//here input= from 1st line var
    console.log(data1);

    let partOfSpeechArray= []
    for (let i=0; i<data1.meanings.length; i++)
    {
        partOfSpeechArray.push(data1.meanings[i].partOfSpeech)
    }

    dictionary.innerHTML= `
            <div class="card">
                <div class="property">
                    <span>Word:</span>
                    <span>${data1.word}</span>
                </div>

                <div class="property">
                    <span>Phonetics:</span>
                    <span>${data1.phonetic || 'N/A'}</span>
                </div>

                <div class="property">
                    <span>Defination:</span>
                    <span>${data1.meanings[0].definitions[0].definition || 'N/A'}</span>
                </div>

                <div class="property">
                    <span>Example:</span>
                    <span>${data1.meanings[0].definitions[0].example}</span>
                </div>

                <div class="property">
                    <span>Part of Speech:</span>
                    <span>${partOfSpeechArray.map(e => e).join(', ')}</span>
                </div>
            </div>
        `
}