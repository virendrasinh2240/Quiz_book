const question = require("../models/questions");

const getQuestions = async (req, res) => {
    try {
        const { stdId, subId, chepterId } = req.body;

        const data = await question.findAll({
            where: {
                stdId: stdId,
                subId: subId,
                chepterId: chepterId
            }
        });

        if (data.length === 0) {
            throw new Error("data not found");
        }

        const response = {
            stdId: stdId,
            subId: subId,
            chepterId: chepterId,
            questions: data.map(item => ({
                id: item.id,
                questionNo: item.questionNo,
                questions: item.questions,
                options: item.options,
                rightAns: item.rightAns,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }))
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = getQuestions;
