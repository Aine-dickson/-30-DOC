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

setInterval(clock, 1000)