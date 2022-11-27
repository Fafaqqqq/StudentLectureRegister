const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const lecturRouter = require('./lecturRouter')

router.use('/user', userRouter)
router.use('/lectur', lecturRouter)

module.exports = router
