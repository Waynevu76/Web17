const express = require("express");
const app = express();
var path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    const question = JSON.parse(fs.readFileSync("./question.json", {encoding: "utf-8"}));
    if(question.length == 0) {res.send("Chưa có câu hỏi nào!!!")}
    else {
        const randomQuestion = question[Math.floor(Math.random()*question.length)];
        // res.send(`<h1>${ randomQuestion['content'] }</h1>

        //     <a href="/vote/${randomQuestion.id}/yes"><button>Đúng/Có/Phải</button> </a>
        //     <a href="/vote/${randomQuestion.id}/no"><button>Sai/Không/Trái</button> </a>`
         res.sendFile(__dirname + "/view/answer.html");
    };
    
});

app.get("/api/random", (req, res) => {
    const question = JSON.parse(fs.readFileSync("./question.json", {encoding: "utf-8"}));
    const randomQuestion = question[Math.floor(Math.random()*question.length)];
    res.send({ question: randomQuestion });
});

app.get("/vote/:questionID/:vote", (req, res) => {
    const vote = req.params.vote;
    const questionID = req.params.questionID;
    const question = JSON.parse(fs.readFileSync("./question.json", {encoding: "utf-8"}));
    question.forEach((quest, index) => {
        if(quest.id == questionID) {
            // if(vote == 'yes') question[index].yes += 1;
            // else question[index].no += 1;
            question[index][vote] += 1;
        }
    });
    fs.writeFileSync("./question.json", JSON.stringify(question));
    res.redirect("/");
})

app.get("/question/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    const question = JSON.parse(fs.readFileSync("./question.json", {encoding: "utf-8"}));
    res.send(question[questionId])
})

// app.get("/vote/:questionID/no", (rep, res) => {
//     console.log(req.params.questionID);

// app.post("/vote/:id", (res, req) => {
//     var idQuestion = req.params.id;
//     var vote = req.body.vote;
//     const question = JSON.parse(fs.readFileSync("./question.json", {encoding: "utf-8"}));
//     for(let i = 0; i < question.length; i++) {
//         if(question.id == idQuestion) {
//             if (vote == "yes") {
//                 question.yes += 1;
//             }
//             if (vote == "no") {
//                 question.no += 1;
//             }
//         }
//     }
//     fs.writeFileSync("/question.json", JSON.stringify(question));
//     res.redirect("/")
// });

app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/view/ask.html");
});

app.post("/addquestion", (req, res) => {
    // console.log(req.body.questionContent)
    const question = JSON.parse(fs.readFileSync("./question.json", {encoding: "utf-8"}));
    console.log(question);
    const newQuestion = {
        content: req.body.questionContent,
        yes: 0,
        no: 0,
        id: question.length
    };
    question.push(newQuestion);
    console.log(question);
    fs.writeFileSync("./question.json", JSON.stringify(question));
    // req.on("data", (rawData) => {
    //     console.log(rawData + "")
    // });
    res.redirect("/")
});


app.listen(6969, (err) => { 
    if(err) console.log(err);
    else console.log("Server start success");
});