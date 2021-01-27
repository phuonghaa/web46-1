const { json } = require("express");

let idQuestion = ''
const question = document.querySelector('#question')

const getRandomQuestion = async () => {
    fetch('http://localhost:8080/get-random-question')
    .then(res => res.json())
    .then((res) => {
        question.innerHTML = res.content.content
        const { _id, content } = res.content
        idQuestion = _id
    });   
    
    // const res = await fetch('http://localhost:8080/get-random-question')
    // const jsonRes = await res.json();
    // if (jsonRes.success) {
    //     question.innerHTML = res.content.content
    // }
}

getRandomQuestion()
const otherBtn = document.querySelector('#other-ques-btn')

otherBtn.addEventListener('click', () => {
    window.location.reload()
    // getRandomQuestion()
})

const yesBtn = document.querySelector('#yes')

const handleVote = async (type) => {
    try {
        const res = await fetch(
            `http://localhost:8080/add-vote/${idQuestion}`, 
            {
              method: 'PUT',
              body: new URLSearchParams({ type: 'yes' })
            }
          );
          const jsonRes = await res.json();
          if (jsonRes.success){
              window.location.href = `/question/${jsonRes.content._id}`
          }
    } catch (err){
        console.log(err);
    }
    
}


yesBtn.addEventListener('click', async () => {
    const res = await fetch(
      `http://localhost:8080/add-vote/${idQuestion}`, 
      {
        method: 'PUT',
        body: new URLSearchParams({ type: 'yes' })
      }
    );
    const jsonRes = await res.json();
  })

const noBtn = document.querySelector('#no')

