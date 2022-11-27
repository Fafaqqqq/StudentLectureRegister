const database = require('../db')
const { DataTypes } = require('sequelize')

const Student = database.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, notNull: true },
    password: { type: DataTypes.STRING, notNull: true },
    name: { type: DataTypes.STRING, notNull: true },
    surname: { type: DataTypes.STRING, notNull: true },
    patronymic: { type: DataTypes.STRING, },
    group: { type: DataTypes.STRING }
})

const Lecturer = database.define('lecturer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, notNull: true },
    password: { type: DataTypes.STRING, notNull: true },
    name: { type: DataTypes.STRING, notNull: true },
    surname: { type: DataTypes.STRING, notNull: true },
    patronymic: { type: DataTypes.STRING, }

})

const Lectur = database.define('lectur', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    start: { type: DataTypes.DATE, allowNull: false },
    end: { type: DataTypes.DATE, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    location_x: { type: DataTypes.FLOAT, allowNull: false, defaultValue: -1.0 },
    location_y: { type: DataTypes.FLOAT, allowNull: false, defaultValue: -1.0 }
})

const Answer = database.define('answer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, notNull: true }
})

const Question = database.define('question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, notNull: true }
})

const RightAnswer = database.define('right_answer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question_id: { type: DataTypes.INTEGER, allowNull: false },
    answer_id: { type: DataTypes.INTEGER, allowNull: false }
})

const Quiz = database.define('quiz', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false }
})

const VisitStatistic = database.define('visit_statistics', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Lecturer.hasMany(Lectur)
Lectur.belongsTo(Lecturer)

Student.hasMany(VisitStatistic)
VisitStatistic.belongsTo(Student)

Lectur.hasMany(VisitStatistic)
VisitStatistic.belongsTo(Lectur)

Lectur.hasMany(Quiz)
Quiz.belongsTo(Lectur)

Quiz.hasMany(Question)
Question.belongsTo(Quiz)


Question.hasMany(Answer)
Answer.belongsTo(Question)

Question.hasOne(RightAnswer)
RightAnswer.belongsTo(Question)

module.exports = {
    Student,
    Lecturer,
    Lectur,
    VisitStatistic,
    Answer,
    Question,
    RightAnswer,
    Quiz
}
