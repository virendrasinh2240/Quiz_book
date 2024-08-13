const UserHistory = require("../models/UserHistory");
const Question = require("../models/questions");
const Chepter = require("../models/chepter");
const Subject = require("../models/subject");
const Std = require("../models/std");

const historyData = async (req, res) => {
    try {
        const { userId, stdId, subId, chepterId } = req.body;

        if (!userId || !stdId || !subId || !chepterId) {
            return res.status(400).json({ error: "All parameters are required" });
        }

        const data = await UserHistory.findAll({
            where: {
                userId: userId,
                stdId: stdId,
                subId: subId,
                chepterId: chepterId,
            },
            include: [
                {
                    model: Question,
                    include: [
                        {
                            model: Chepter,
                            include: [
                                {
                                    model: Subject,
                                    include: [
                                        {
                                            model: Std,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (data.length === 0) {
            return res.status(404).json({ message: "No records found" });
        }


        let totalCorrect = 0;
        let totalWrong = 0;
        const totalQuestions = data.length;

        const historyData = data.map(history => {
            console.log("Processing history record:", history);

            const isCorrect = history.correct_answer === history.user_answer;
            if (isCorrect) {
                totalCorrect += 1;
            } else {
                totalWrong += 1;
            }

            return {
                userId: history.userId,
                historyId: history.historyId,
                std: history.Question.Chepter.Subject.Std.std,
                subId: history.subId,
                subjectName: history.Question.Chepter.Subject.subjectName,
                chepterNo: history.Question.Chepter.chepterNo,
                content: history.Question.Chepter.content,
                questionNo: history.Question.questionNo,
                question: history.Question.questions,
                options: history.Question.options,
                user_answer: history.user_answer,
                correct_answer: history.Question.rightAns,
                is_correct: isCorrect
            };
        });

        console.log("Total Correct: ", totalCorrect);
        console.log("Total Wrong: ", totalWrong);

        res.status(200).json({ 
            historyData,
            summary: {
                totalQuestions: totalQuestions,
                totalCorrect: totalCorrect,
                totalWrong: totalWrong
            }
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: e.message });
    }
};

module.exports = historyData;
