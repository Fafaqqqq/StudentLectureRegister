const ApiError = require('../error/ApiError');
const { Lectur, Lecturer } = require('../models/models')

class LectureController {

  async create(req, res, next) {

    const { start, end, subject, email } = req.body
    const lecturer = Lecturer.findOne({
      where: {
        email
      }
    })
    console.log(lecturer)

    const lect = Lectur.create({ start, end, subject, lecturerId: lecturer.id })
    console.log(lect)

    if (!lect) {
      ApiError.internal('Не удалось создать лекцию')
    }

    return res.status(200)
  }

  async start(req, res, next) {
    const { start, end, subject, location_x, location_y } = req.body

    const lect = Lectur.findOne({ where: { start, end, subject } })

    if (!lect) {
      ApiError.internal('Не удалость начать лекцию')
    }

    const started_lect = Lectur.update(
      {
        location_x,
        location_y
      },
      {
        where:
        {
          id: lect.id
        }
      }
    )

    return res.status(200)
  }

  async register(req, res, next) {
    const { start, end, subject, location_x, location_y } = req.body

    const lect = Lectur.findOne({ start, end, subject })

    if (!lect) {
      ApiError.internal('Не удалось зарегистрироваться на лекции')
    }

    if (Math.abs(location_x - lect.location_x) > 0.0005 ||
      Math.abs(location_y - lect.location_y) > 0.0005) {
      return res.json({
        status: 400,
        message: "Вы находитесь не на лекции"
      })
    }

    return res.status(200)
  }
}

module.exports = new LectureController()
