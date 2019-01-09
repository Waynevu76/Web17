const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/quyetde-17", { useNewUrlParser: true }, (err) => {
	if(err) console.log("DB connect fail!", err)
	else console.log("DB connect success!");
});

const QuestionModel = require("./models/questionModel");

app.use(bodyParser.urlencoded({ extended: false }));

// request GET => http://localhost:6969/
app.get("/", (req, res) => {
	// Lay ra cau hoi random
	// const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	// if(questions.length == 0) res.send("Chưa có câu hỏi nào!!!")
	// else {
	// 	const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
	// 	// res.send(
	// 	// 	`<h1> ${randomQuestion.content} </h1>
	// 	// 	<a href="/vote/${randomQuestion.id}/yes"><button>Đúng/Có/Phải</button></a>
	// 	// 	<a href="/vote/${randomQuestion.id}/no"><button>Sai/Không/Trái</button></a>`
	// 	// );
		
	// }
	// "abc" + variable + "xyz" == `abc${variable}xyz`
	res.sendFile(__dirname + "/view/answer.html");
});

app.get("/api/random", (req, res) => {
	// const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	// const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
	// res.send({ question: randomQuestion }); // data = { question: randomQuestion }

	// MongoDB
	// QuestionModel.find({}, (err, questions) => {
	// 	if(err) console.log(err)
	// 	else {
	// 		const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
	// 		res.send({ question: randomQuestion });
	// 	}
	// });

	QuestionModel.count({}, (err, totalQuestion) => {
		QuestionModel
			.findOne({})
			.skip(Math.floor(Math.random()*totalQuestion))
			.exec((err, randomQuestion) => {
				if(err) console.log(err)
				else res.send({ question: randomQuestion });
			});
	});
});

app.get("/api/question/:questionId", (req, res) => {
	const questionId = req.params.questionId;
	// let questionFound;
	// let questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	// questions.forEach(question => {
	// 	if(question.id == questionId) {
	// 		questionFound = question;
	// 	}
	// });
	
	// QuestionModel.findById(questionId, function(err, questionFound) {});
	QuestionModel.findOne({ _id: questionId }, function(err, questionFound) {
		if(err) console.log(err)
		else if(!questionFound || !questionFound._id) res.status(404).send({ message: "Question not exist!" })
		else res.send({ question: questionFound });
	});
});

// /vote/questionId/yes
app.get("/vote/:questionId/:vote", (req, res) => {
	// param
	const questionId = req.params.questionId;
	const vote = req.params.vote; // yes || no
	// let questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	// questions.forEach((question, index) => {
	// 	if(question.id == questionId) {
	// 		questions[index][vote] += 1;
	// 	}
	// });
	// fs.writeFileSync("./questions.json", JSON.stringify(questions));

	QuestionModel.findOneAndUpdate(
		{ _id: questionId },
		{ $inc: { [vote]: 1 } },
		function(err, questionUpdated) {
			if(err) console.log(err)
			else res.send({ message: "Success" });
		});

	// QuestionModel.findOne({ _id: questionId }, function(err, questionFound) {
	// 	if(err) console.log(err)
	// 	else if(!questionFound || !questionFound._id) res.status(404).send({ message: "Question not exist" })
	// 	else {
	// 		questionFound[vote] += 1;
	// 		questionFound.save(function(err) {
	// 			if(err) console.log(err)
	// 			else res.send({ message: "Success" });
	// 		});
	// 	}
	// });
});

// /question/:questionId
app.get("/question/:questionId", (req, res) => {
	res.sendFile(__dirname + "/view/question.html");
});

// app.get("/vote/:questionId/no", (req, res) => {
// 	console.log(req.params.questionId);
// });

app.get("/ask", (req, res) => {
	res.sendFile(__dirname + "/view/ask.html");
});

app.post("/addquestion", (req, res) => {
	// const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8" }));
	// console.log(questions);
	// const newQuestion = {
	// 	content: req.body.questionContent
	// };
	// questions.push(newQuestion);
	// console.log(questions);
	// fs.writeFileSync("./questions.json", JSON.stringify(questions));
	// res.redirect("/");
	QuestionModel.create(
		{
			content: req.body.questionContent
		},
		(err, questionCreated) => {
			if(err) console.log(err)
			else res.redirect("/");
		}
	);
});

// app.get("/about/ads", (req, res) => {
// 	// Show ra trang CV
// 	res.sendFile(__dirname + "/resource/index.html");
// });

// app.get("/style.css", (req, res) => {
// 	res.sendFile(__dirname + "/resource/style.css");
// });

// http://localhost:6969/about/....

app.use("/about", express.static("resource"));
app.use("/public", express.static("public"));

app.listen(6969, (err) => {
	if(err) console.log(err)
	else console.log("Server start success!");
});