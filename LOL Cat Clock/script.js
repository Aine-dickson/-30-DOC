let time = new Date();
let moment = time.getHours();
let timeState = false;
let state = false;
let timeframes = [0,1,2,3,4,5,6,7,8,9,10,11,12]

function clock(){
    let now = new Date();
    let min = now.getMinutes()
    let sec = now.getSeconds()
    let hrs = now.getHours()
    if(sec < 10){
        sec = '0'+ sec
    } else if(min < 10) {
        min = '0' + min
    } else if(hrs < 10){
        hrs = '0' + hrs
    }
    document.querySelector('.clock').innerHTML = `${hrs}:${min}:${sec}`
}

function timer(){
    document.querySelectorAll('select').forEach(field => {
        let option;
        let display = document.querySelector('.image');
        let id = field.getAttribute('id');
        field.addEventListener("change", () => {
            option = field.value
            setTimeout(timing, 100)
        })
        function timing(){
            switch(9){
                case 6:
                    if(id == 'wake'){
                        display.innerHTML = `<img src="../images/morning.png" alt="good-morning">`
                    } else {
                        display.innerHTML = `<img src="../images/cat-lunch.png" alt="cat-lunch">`
                    }
                    break;
                case 7:
                    if(id == 'eat'){
                        display.innerHTML = `<img src="../images/cat-lunch.png" alt="cat-lunch">`
                    } else {
                        display.innerHTML = `<img src="../images/cat-nap.png" alt="cat-nap">`
                    }
                    break;
                case 3:
                    if(id == 'nap'){
                        display.innerHTML = `<img src="../images/cat-nap.png" alt="cat-nap">`
                    } else {
                        display.innerHTML = `<img src="../images/cat-lunch.png" alt="cat-lunch">`
                    }
                    break;
                case 4:
                    display.innerHTML = `<img src="../images/cat-nap.png" alt="cat-nap">`
                    break;
                default:
                    console.log(option, id)
                    if(id == 'nap'){
                        display.innerHTML = `<img src="../images/cat-nap.png" alt="cat-nap">`
                    } else {
                        display.innerHTML = `<img src="../images/morning.png" alt="morning">`
                    }
            }
        }
    })
}

document.querySelector(".party").addEventListener('click', () => {
    if(!state){
        state = true;
        document.querySelector('.image').innerHTML = `<img src="../images/cat-dance.png" alt="dancing">`
        document.querySelector(".party").innerHTML = "Party done!"
    } else {
        state = false;
        document.querySelector('.party').innerHTML = 'Party Time?'
        showCase();
    }
})

function showCase(){
    let manager = timeframes.includes(moment)
    let imgShow = document.querySelector('.image')
    if(manager){
        if(timeState){
            if (moment >= 5 && moment > 6) {
                imgShow.innerHTML = `<img src="../images/morning.png" alt="good-morning">`
            } else if(moment > 12 || (moment >= 1 && moment < 4)){
                imgShow.innerHTML = `<img src="../images/cat-lunch.png" alt="cat-lunch">`
            } else if(moment >= 4 && moment < 6){
                imgShow.innerHTML = `<img src="../images/cat-nap.png" alt="cat-napping">`
            } else {
                console.log("Oops")
            }
        } else {
            imgShow = `<img src="../images/cat-nap.png" alt="cat-napping">`
        }
    } else {
        moment -= 12
        timeState = true;
        showCase()
    }
}

setInterval(clock, 1000);
timer()
showCase()