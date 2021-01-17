// Sử dụng các hàm đọc, ghi file đồng bộ để hoàn thiện các yêu cầu sau
const fs = require('fs');
let data = '';
try {
  data = JSON.parse(fs.readFileSync('data.json') )
} catch (err) {
  console.log('Lỗi', err);
}
if (!data) return;


// lấy thông tin học sinh có _id là jubuq3lfmjjmp0wrdeupt
function getDetailStudent() {
  return data.filter(student => student._id === 'jubuq3lfmjjmp0wrdeupt')[0]
}

// Lấy số lượng học sinh có từ Nguyễn
function getCountStudentWithLastName() {
  let count = 0;
  for (const [index, value] of Object.entries(data)) {
    let [lastName, firstName] = value.name.split(" ")
    if (lastName === "Nguyễn") count += 1
  }
  return count
}

// Tính điểm trung bình của toàn bộ sinh viên (làm tròn đến một chữ số sau dấu phẩy)
function calAverageMark() {
  let totalMark = data.reduce(function(sum, cur){
    return sum + cur.mark
  },0)
  return Math.round((totalMark/ data.length) *10)/10
}

// Ghi ra số lượng học sinh đạt điểm 10 ra file output.txt (sử dụng hàm ghi đồng bộ);
function writeCountStudentGet10MarkToFile() {
  let count = data.filter(student => student.mark === 10).length
  fs.writeFileSync("output.txt",`${count}`)
  console.log(count);
}
writeCountStudentGet10MarkToFile()

module.exports = {
  getDetailStudent,
  getCountStudentWithLastName,
  calAverageMark,
  writeCountStudentGet10MarkToFile
}