/* moment 모듈 */
const moment = require('moment');

//var nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
//var nowDate2 = moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초');
//console.log(nowDate);
//ISO Date : 2020-10-20 21:04:10식의 날짜 표기법
//console.log(nowDate2);
//2020년 10월 20일 21시 04분 10초의 날짜 표기법

//console.log(new Date()); //자바스크립트식 날짜 표기법 : 2020-10-20T12:05:30.002Z

const nowDateIso = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');   
}
const nowDateKorean = () => {
    return moment().format('YYYY년 MM월 DD일 HH시 mm분 ss초');
}

/* const obj = {
    moment, //moment라는 변수에 moment를 담겠어요 moment : moment => es6에선 키와 값이 같을 땐 하나 생략가능
    nowDateIso,
    nowDateKorean
} */
//module.exports = obj;//나를 부르는 애한테 obj객체를 주겠어요 함수를 객체형태로 export
module.exports = {moment, nowDateIso, nowDateKorean};//easy version
