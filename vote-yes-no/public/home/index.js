const question = document.querySelector('#question')


fetch('http://localhost:8080/get-random-question')
.then(res => res.json())
.then(res => question.innerHTML = res.content.content);

