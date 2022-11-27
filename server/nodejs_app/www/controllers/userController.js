const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Student, Lecturer } = require('../models/models')
var sleep = require('thread-sleep');

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

class UserController {
  async registration(req, res, next) {
    const { email, password, fullname } = req.body
    if (!email || !password || !fullname) {
      return next(ApiError.badRequest('Некоторые данные необходимые для регистрции не заданы!'))
    }

    const candidate_stud = await Student.findOne({ where: { email } })
    const candidate_lect = await Lecturer.findOne({ where: { email } })

    const fullname_ = fullname.split(' ')

    if (candidate_stud || candidate_lect) {
      return next(ApiError.badRequest('Такой пользователь уже существует!'))
    }

    const user = await Student.create({ email, password, name: fullname_[0], surname: fullname_[1], patronymic: fullname_[2] })

    const token = generateJwt(user.id, user.email, user.role, user.name, user.surname)
    return res.json({ token })
  }

  async login(req, res, next) {
    const { role, email, password } = req.body
    let user

    if (role === 'student') {
      user = await Student.findOne({ where: { email } })
    }
    else if (role === 'lecturer') {
      console.log(role)

      user = await Lecturer.findOne({ where: { email } })
    }

    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }

    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async check(req, res, next) {
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

}

module.exports = new UserController()
