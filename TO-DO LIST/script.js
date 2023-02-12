let taskBody, taskTitle;
let workPages = ['home', 'New', 'preview']
let pages = {
    home: 'home.html',
    noti: 'noti.html',
    pending: 'pending.html',
    New: 'create.html',
    preview: 'preview.html'
}
let taskIds = []
let task;
let tasks = []
let id = 0;
let selectCount = 0;

function Task(id, title, content){
    this.body = content
    this.id = id
    this.title = title
}

function pageLoader(){
    document.querySelectorAll('.nav-item').forEach(tab => {
        tab.addEventListener('click', () => {
            let page = tab.getAttribute("id");
            let request = new XMLHttpRequest();
            request.onload = () => {
                document.querySelector('.main').innerHTML = request.response
                document.querySelectorAll('.nav-item').forEach(item => {
                    if(item.classList.contains('active-tab')){
                        item.classList.remove('active-tab')
                    }
                    tab.classList.add('active-tab')
                }) 
                if(workPages.includes(page)){
                    let functionCreator = value => {
                        value = eval(value)
                        value()
                    }
                    functionCreator(page)
                } else {
                    document.querySelector(`.${page}-container`).innerHTML = `${page} is under construction`.toUpperCase()
                }
            }
            request.open('GET', `./pages/${pages[page]}`)
            request.send()
        })
    })
}

function home(){
    document.querySelector('.add').addEventListener('click', () => {
        let request = new XMLHttpRequest()
        request.onload = () => {
            document.querySelector('.main').innerHTML = request.response
            create()
            document.querySelector('footer').classList.add('hidden')
        }
        request.open('GET', `./pages/${pages.New}`)
        request.send();
    })
    
    listDispaly()

    document.querySelector('#set').addEventListener('click', () => {
        document.querySelector('.overlay').classList.remove('hidden')
        document.querySelector(".overlay > span").addEventListener('click', () => {
            document.querySelector('.overlay').classList.add('hidden')
        })
    })
}

function create(){
    document.querySelector('.push').addEventListener('click', e => {
        e.preventDefault();
        taskTitle = document.querySelector('input').value
        taskBody = document.querySelector('textarea').value
        if(taskBody == '' || taskTitle == ''){
            document.querySelector('.warning').classList.remove('hidden')
            return
        }
        document.querySelector('input').value = ''
        document.querySelector('textarea').value = ''
        document.querySelector('footer').classList.remove('hidden')
        taskCreator()
        document.querySelector('#home').click()
    })
}

function taskCreator(){
    let item = new Task(id, taskTitle, taskBody)
    tasks.unshift(item)
    taskIds.unshift(id)
    id++
}

function listDispaly(){
    if(tasks.length == 0){
        setTimeout(() => {
            window.alert("No task created yet!")
        }, 100)
    } else {
        let list = document.createElement("ul");
        document.querySelector('.main').appendChild(list)
        tasks.map((element, index) => {
            if(taskIds.includes(element.id)){
                task = document.createElement('li');
                task.classList.add(element.id)
                task.innerHTML = `<div class="list-item" id="${element.id}">
                                        <span class="to-do-item">${element.title}</span>
                                        <span class="selector">
                                            <input type="checkbox" name = "${element.id}">
                                        </span>
                                    </div>
                                    <div class="hr"></div>`
                document.querySelector('ul').appendChild(task)
            }
            selectChecker()
            contentAccess()
        })
    }
}

function selectChecker(){
    document.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.addEventListener('click', () => {
            if(box.checked){
                document.querySelector('.alpha').classList.remove('hidden')
                box.classList.add('selected')
            } else {
                box.classList.remove('selected')
            }
            document.querySelector('.cancel').addEventListener('click', () => {
                document.querySelectorAll("input[type='checkbox']").forEach(element => {
                    if (element.classList.contains('selected')) {
                        element.classList.remove('selected')
                        element.checked = false
                        document.querySelector('.alpha').classList.add('hidden')
                    }
                })
            })
            document.querySelector('#all').addEventListener('click', () => {
                document.querySelectorAll("input[type='checkbox']").forEach(element => {
                    if (!element.classList.contains('selected')) {
                        element.classList.add('selected')
                        element.checked = true
                    }
                })
            })
            document.querySelector('#delete').addEventListener('click', () => {
                document.querySelectorAll("input[type='checkbox']").forEach(element => {
                    if (element.classList.contains('selected')) {
                        element.classList.remove('selected')
                        element.checked = false
                        let thisElement = element.getAttribute('name')
                        let toDelete = document.getElementsByClassName(`${thisElement}`).item(0).remove()
                        taskIds.splice(taskIds.indexOf(Number(thisElement)), 1)
                    }
                })
                document.querySelector('.alpha').classList.add('hidden')
            })
            if(box.checked){
                selectCount++
            } else {
                selectCount--
            }
            if(selectCount < 1){
                if (!(document.querySelector('.alpha').classList.contains('hidden'))) {
                    document.querySelector('.alpha').classList.add('hidden')
                }
            } else {
                document.querySelector('.alpha').classList.remove('hidden')
            }
        })
    })
}

function contentAccess(){
    document.querySelectorAll('li').forEach(item => {
        let target = item.getElementsByClassName('to-do-item').item(0)
        target.addEventListener('click', () => {
            let reference = item.getAttribute('class')
            let refered = tasks.filter((element, index) => {
                if(element.id == reference){
                    return element
                }
            })
            document.querySelector('#noti').click()
            document.querySelector('header').classList.add('hidden')
            let previewRequest = new XMLHttpRequest()
            previewRequest.onload = () => {
                document.querySelector('.main').innerHTML = previewRequest.response
                document.querySelector('.heading').innerHTML = refered[0].title
                document.querySelector('.preview-body').innerHTML = refered[0].body
                document.querySelectorAll('.nav-item').forEach(tab => {
                    tab.addEventListener('click', () => {
                        document.querySelector('header').classList.remove('hidden')
                    })
                })
            }
            previewRequest.open("GET", `./pages/${pages.preview}`)
            previewRequest.send()
        })
    })
}

pageLoader()
document.querySelector('#home').click()