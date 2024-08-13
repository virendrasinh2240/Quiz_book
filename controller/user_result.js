const Question = require("../models/questions");
const UserHistory = require("../models/UserHistory");
const UserResult = require("../models/UserResult");
const SignUp = require("../models/signUp");
const Chepter = require("../models/chepter");
const Std = require("../models/std");
const Subject = require("../models/subject");

const user_result = async (req, res) => {
    try {
        const { userId, stdId, subId, chepterId, questions } = req.body;

        let user;
        if (userId) {
            user = await SignUp.findByPk(userId);
            if (!user) {
                throw new Error("User not found");
            }
        }

        const dbQuestions = await Question.findAll({
            where: {
                stdId: stdId,
                subId: subId,
                chepterId: chepterId
            },
            include: [{
                model: Chepter,
                include: [{
                    model: Subject,
                    include: [Std]
                }]
            }]
        });

        if (dbQuestions.length === 0) {
            throw new Error("Data not found");
        }

        let totalCorrect = 0;
        let totalWrong = 0;
        const totalQuestions = questions.length;

        const questionDataArray = [];
        let stdName, subjectName, chepterNo, content;

        for (const userQuestion of questions) {
            const dbQuestion = dbQuestions.find(q => q.id === userQuestion.queid);
            if (!dbQuestion) {
                throw new Error(`Question with ID ${userQuestion.queid} not found in the database`);
            }

            const correct = dbQuestion.rightAns === userQuestion.user_answer;
            if (correct) {
                totalCorrect += 1;
            } else {
                totalWrong += 1;
            }

            const questionData = {
                questionNo: dbQuestion.questionNo,
                question: dbQuestion.questions,
                options: dbQuestion.options,
                user_answer: userQuestion.user_answer,
                correct_answer: dbQuestion.rightAns,
                is_correct: correct
            };

            questionDataArray.push(questionData);

            if (!stdName || !subjectName || !chepterNo || !content) {
                stdName = dbQuestion.Chepter.Subject.Std.std;
                subjectName = dbQuestion.Chepter.Subject.subjectName;
                chepterNo = dbQuestion.Chepter.chepterNo;
                content = dbQuestion.Chepter.content;
            }
        }

        const results = {
            stdName: stdName,
            subjectName: subjectName,
            chepterNo: chepterNo,
            content: content,
            questionsData: questionDataArray
        };

        for (const userQuestion of questions) {
            const dbQuestion = dbQuestions.find(q => q.id === userQuestion.queid);
            const correct = dbQuestion.rightAns === userQuestion.user_answer;

            await UserResult.create({
                userId: user.userId,
                stdId: stdId,
                subId: subId,
                chepterId: chepterId,
                queid: dbQuestion.id,
                user_answer: userQuestion.user_answer,
                correct_answer: dbQuestion.rightAns,
                is_correct: correct,
            });

            await UserHistory.create({
                userId: user.userId,
                stdId: stdId,
                subId: subId,
                chepterId: chepterId,
                queid: dbQuestion.id,
                user_answer: userQuestion.user_answer,
                correct_answer: dbQuestion.rightAns,
                is_correct: correct,
            });
        }

        res.status(200).json({ results, totalCorrect, totalWrong, totalQuestions });

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = user_result;
