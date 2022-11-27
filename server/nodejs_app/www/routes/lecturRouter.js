const Router = require('express')
const router = new Router()
const lecturController = require('../controllers/lecturController')

router.post('/registration', lecturController.register)
router.post('/create', lecturController.create)
router.post('/start', lecturController.start)

module.exports = router
