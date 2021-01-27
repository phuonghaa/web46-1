const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

// client gửi lên với header application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// client gửi lên với header application/json
app.use(express.json());


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/home/index.html'))
})

app.get('/get-random-question', (req, res) => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    data= [];
  }
  const randomQues = data[Math.floor((Math.random()*data.length))]
  res.send({
    success: 1,
    content: randomQues,
  })

})

app.get('/ask', (req, res) => {  
  res.sendFile(path.resolve(__dirname, './public/ask/index.html'));
})

app.post('/create-question',  (req, res) => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    data= [];
  }
  
  const newQuestion = {
    _id: data.length + 1,
    content: req.body.content,
    yes: 0,
    no: 0
  };
  const newData = [...data, newQuestion];
  fs.writeFileSync('data.json', JSON.stringify(newData));
  res.send({
    success: 1,
    data: newQuestion
  })
})

app.get('/redirect-home', (req, res) => {
  res.redirect('')
})

app.put('/add-vote/:idQuestion', (req, res) => {
  const { idQuestion } = req.params;
  const { type } = req.body;
  let data;
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    data= [];
  }
  const foundQuestion = data.find(question => {
    const sameId = parseInt(question._id) === parseInt(idQuestion)
    return sameId
  })
  if(!foundQuestion){
    return res.send({
      success: 0,
      data: null
    }) 
  } 

  if (type === 'yes' || type === 'no') {
    foundQuestion[type]++;
  } else {
    return res.send({
      success: 0,
      data: null
    })
  }
  fs.writeFileSync('./data.json', JSON.stringify(data))

  return res.send({
    success: 1,
    data: foundQuestion,
  })
})

app.get('*',  (req, res) => {  
  res.sendFile(path.resolve(__dirname, './public/404/index.html'));
})



// app.get('/style.css', (req, res) => {  
//   res.sendFile(path.resolve(__dirname, './style.css'));
// })

// url + method
// url: /get-a-question method: get, post, put, delete

app.listen(8080, (err) => {
  if (err) throw err;
  console.log('Server started')
})
