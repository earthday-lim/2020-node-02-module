const path = require('path');
const express = require('express');

//export시킨 함수를 담은 객체를 require로 불러올 수 있음
const dt = require('./modules/date');//.js는 다 생략하도록 탐색창 설정 바꿈
//console.log(dt.nowDateIso());
//console.log(dt.nowDateKorean()); 

//비구조화 버전, 구조분해 할당
const {moment, nowDateIso, nowDateKorean} = require('./modules/date');//.js는 다 생략하도록 탐색창 설정 바꿈
//console.log(moment);
//console.log(nowDateIso());
//console.log(nowDateKorean()); 

const memberRouter = require('./routes/member');
const notFound = path.join(__dirname, './public/404.html');
const app = express();
app.listen(3000, () => { console.log('http://127.0.0.1:3000') }); //서버 구동 : 3000번 포트를 열어라

// app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
	req.greeting = 'Hello';
	next();
});

app.use('/', express.static(path.join(__dirname, './public')));
app.get('/sample', (req, res, next) => {
	// res.send('');
	// res.sendFile('절대경로');
	// res.redirect('/member');
	res.render('./sample.pug', {title: "pug 연습"});
});

app.get('/diliveryfoods', (req, res, next)=> {
    const pug = {
        foods : [
        {id : 1, title : "rolling pasta", content : "Paik's"},
        {id : 2, title : "bbq chicken", content : "BBQ"},
        {id : 3, title : "tgi friday", content : "TGI"},
        ]
    };
    res.render('./diliveryfoods.pug', pug);/* pug를 해석해서 html로 바꿔서 내보내줘 */
});

app.use((req,res,next)=>{//use미들언어
    req.greeting = 'hello';
    next();
});

app.use('/', express.static(path.join(__dirname, './public')));//root로 요청이 들어오면 public폴더('./public')로 보내서 index.html을 찾겠다(join(__dirname)

app.use('/member', memberRouter);

app.get('/time', (req, res, next) => { //root로 요청이 들어오면.get('/' 콜백함수(req, res)를 실행하겠다
    //res.send('hi!~ how are u?'); //node app으로 터미널에서 부르면 매번 서버를 껐다 켜야만 수정이 반영되므로 nodemon app으로 호출하면 아까 npm i -g nodemon을 했기때문에 저장할 때마다 수정이 반영된다
    res.send('<h1> ${req.greeting} / ${nowDateIso()} </h1>');
    //next();
});

//app.use, app.get의 root의 처리 순서 : use는 root로 들어가서 index파일을 찾음 없으면 다음인 get으로 가서 res를 실행 res는 응답해주면 끝나니까 다시 use로 되돌아오지 않음

app.use((req, res, next) => { //함수만 존재
    //res.sendFile(path.join(__dirname, './public/404.html'));//서버상에 있는 file을 send해 단, path.join은 절대경로(내 위치가 어디건 풀 경로명)로 표현을 해줘야함
    res.sendFile(notFound); //파일을 보내주니까 경로까지 잡아서 보내므로 1차 res에 돌아옴 redirect처럼 위에 선언한 경로를 받아오기 위해 다시 req하지 않음 
    //res.redirect('/404.html');//루트가 위에서부터 실행되어오다가(1차 req) 없으면 없다고 서버가 응답(res)해주면 다시 use로 redirect를 명령함(2차 req) 이때 위에 선언한 use와 엮여 public경로를 루트경로로 받아옴
}); 