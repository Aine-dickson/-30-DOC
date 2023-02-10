let ball = document.querySelector('.ball8')
let responses = ['Absolutely', 'Easy', 'yes', 'no', 'Why', 'Not sure', 'Sure!', 'Probably', 'Excessively', 'Sometimes', 'Too bad', 'Come on', 'Hahaha', 'Just', 'Not now', 'Now!']
let mind = '5';
let counter = 0;
let upper = document.querySelector('#upper');
let lower = document.querySelector('#lower');

document.querySelector('button').addEventListener('click', () => {
    let query = document.querySelector('input').value
    if(query == ''){
        upper.innerHTML = 'Empty query!'
        lower.innerHTML = '(0_0)'
    } else {
        if(mind == query){
            if(counter == 2 || counter == 4){
                upper.innerHTML = 'Naye banage!'
                lower.innerHTML = 'Icant accept dat!'
            } else {
                upper.innerHTML = 'Same query!'
                lower.innerHTML = 'Why?'
            }
            counter++;
            return;
        }
        answer()
        mind = query;
    }
})

function answer(){
    let response1 = Math.floor(Math.random()*responses.length)
    let response2 = Math.floor(Math.random()*responses.length)
    upper.innerHTML = responses[response1]
    lower.innerHTML = responses[response2]
}