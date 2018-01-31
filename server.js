const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

//Middleware: 每次執行server端動作時都會先執行此動作
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    })

    next();//完成middleware動作往下進行
});

/*app.use((req,res,next)=>{
    res.render('maintenance.hbs');//如果不呼叫next()，在執行完middleware之後就不會繼續執行其他動作，可用於網站維護公告
});*/

app.use(express.static(__dirname+'/public'));//express.static需擺在網站維護公告之後，才會一併在網站維護公告的範圍內




hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/',(req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        name: 'Tammy',
        likes : [
            'Traveling',
            'Dramas'
        ]
    });
});


app.get('/about',(req, res)=>{
    res.render('about.hbs');
});


app.get('/bad',(req, res)=>{
    res.send({
        statusCode: 404,
        errorMassgae: 'BADDDDDDD',
        link : [
            'http://aaa.bbb.com',
            'http://www.abc.com',
        ]
    });
});


app.listen(3000);