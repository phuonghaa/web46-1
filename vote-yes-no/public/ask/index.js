const createForm = document.getElementById('form-question');
const textAreaQuestion = document.getElementById('create-textarea');
const charCount = document.querySelector('#char-count')

createForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const content = textAreaQuestion.value;

  const question = { content }

  if (content.trim().length === 0){
    alert('Cannot leave this blank!')
  } else {
    fetch('http://localhost:8080/create-question', {
      method: 'POST',
      body: new URLSearchParams(question)
    })
    .then(() => {
      alert('New question added successfully!')
      window.open('/', '_self')
      // window.location.href = "/"
    })
  }
})


//Count the characters in texarea
textAreaQuestion.onkeyup = () => {
  const charNum = textAreaQuestion.value.length;
  charCount.innerHTML = charNum;

}

// textAreaQuestion.addEventListener(input, () => {
//   const charNum = textAreaQuestion.value.length;
//   charCount.innerHTML = charNum;

// })