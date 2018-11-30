var Article = require('../controllers/article')
var User = require('../controllers/user')
var express = require('express')
var router = express.Router()

/* GET users listing. */

// 保持登录
// router.use(User.isToken)

// 判断是否登录
router.get('/', User.isSignIn)

// 文章
router.get('/article', Article.getArticleList)
router.get('/article/:id', Article.getArticle)
router.post('/article/add', User.isAdmin, Article.addArticle)
router.post('/article/del', User.isAdmin, Article.delArticle)
router.post('/article/modify', User.isAdmin, Article.modifyArticle)

// 用户
router.post('/user/register', User.register)
router.post('/user/signin', User.signIn)
router.post('/user/exit', User.exit)
router.post('/user/update', User.isToken, User.updateUser)
router.post('/user/updatePassword', User.isToken, User.updatePassword)
router.get('/user/account', User.getUser)
// router.get('/user/accountList', User.getUserList)

module.exports = router
