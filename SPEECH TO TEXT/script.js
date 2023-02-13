let speechRecognition = window.webkitSpeechRecognition;
let robot = new speechRecognition()
robot.continuous = true;
let startButton = document.querySelector('.start');
let stopButton = document.querySelector('.stop')
let guide = document.querySelector(".alert")

startButton.addEventListener('click', (e) => {
    if(speech.length){
        speech += ' '
    } else {
        speech = ''
    }
    robot.start()
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden')
})

stopButton.addEventListener('click', (event) => {
    stopButton.classList.add('hidden')
    startButton.classList.remove('hidden')
    robot.stop()  
})

robot.onstart = function(){
    guide.classList.remove('hidden')
    guide.textContent = 'Octopus robot is listening!'
    setTimeout(() => {
        guide.classList.add('hidden')
        guide.textContent = ''
    }, 2000)
}

robot.onspeechend = function(){
    guide.classList.remove('hidden')
    guide.textContent = 'Session ended!'
    setTimeout(() => {
        guide.classList.add('hidden')
        guide.textContent = ''
    }, 2000)
    if(startButton.classList.contains('hidden')){
        startButton.classList.remove('hidden')
        stopButton.classList.add('hidden')
    }
}
robot.onerror = function(){
    guide.classList.remove('hidden')
    guide.textContent = 'Error occured. Try again!'
    setTimeout(() => {
        guide.classList.add('hidden')
        guide.textContent = ''
    }, 2000)
    if(startButton.classList.contains('hidden')){
        startButton.classList.remove('hidden')
        stopButton.classList.add('hidden')
    }
}

robot.onresult = function(event){
    let detected = event.resultIndex;
    let transcript = event.results[detected][0].transcript;
    speech += transcript;

    guide.classList.remove('hidden')
    guide.textContent = 'Octopus is generating text'
    setTimeout(() => {
        guide.classList.add('hidden')
        guide.textContent = ''
        document.querySelector('.transcript-injection').textContent = speech;
    }, 1000)

}