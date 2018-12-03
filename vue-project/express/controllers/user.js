var User = require('../models/userModel')
var sign = require('../common/sign')

// 注册
module.exports.register = (req, res, next) => {
  User.getUserByAccount(req.body.account)
    .then((doc) => {
      if (doc) {
        throw new Error('账户已存在')
      } else {
        let data = new User(req.body)
        data.save((err) => {
          if (err) {
            console.log(err)
          }
          res.send(true)
        })
      }
    })
    .catch((err) => {
      res.send(err.message)
    })
}

// 登录
module.exports.signIn = (req, res, next) => {
  let data = req.body
  User.getUserByAccount(data.account)
    .then((doc) => {
      return signInAccount(doc, data)
    })
    .then(({doc, token}) => {
      let {account, role} = doc
      res.cookie('token', token, { httpOnly: true })
      res.json({account, role})
    })
    .catch((err) => {
      res.send(err.message)
    })
}

// 退出账号
module.exports.exit = (req, res, next) => {
  User.getUserByAccount(req.body.account)
    .then((doc) => {
      res.clearCookie('token', { httpOnly: true })
      doc.token = ''
      doc.save()
      res.send('退出成功')
    })
    .catch((err) => {
      console.log(err)
    })
}

// 得到用户信息
module.exports.getUser = (req, res, next) => {
  User.getUserByAccount(req.query.account)
    .then((doc) => {
      let {account, github, web} = doc
      res.json({account, github, web})
    })
    .catch((err) => {
      console.log(err)
    })
}

// 更新用户信息
module.exports.updateUser = (req, res, next) => {
  User.getUserByAccount(req.body.account)
    .then((doc) => {
      doc.github = req.body.github
      doc.web = req.body.web
      doc.nickName = req.body.nickName
      doc.save()
      res.end()
    })
    .catch((err) => {
      console.log(err)
    })
}

// 修改用户密码
module.exports.updatePassword = (req, res, next) => {
  User.getUserByAccount(req.body.account)
    .then((doc) => {
      if (doc.password === sign.md5(req.body.oldpsw)) {
        doc.password = sign.md5(req.body.newpsw)
        doc.save()
        res.end()
      } else {
        res.send(1)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// get判断是否登录
module.exports.isSignIn = (req, res, next) => {
  let accountMsg = isRole(req, res)
  if (accountMsg) {
    // 更新token
    let {account, role} = accountMsg
    let newToken = sign.signToken({account, role})
    res.cookie('token', newToken, { httpOnly: true })
    User.getUserByAccount(account).then((doc) => {
      doc.token = newToken
      doc.save()
      res.json(accountMsg)
    })
  } else {
    res.end()
  }
}

// token是否正确
module.exports.isToken = (req, res, next) => {
  let accountMsg = isRole(req, res)
  if (accountMsg.role === 0 || accountMsg.role === 1) {
    console.log('token正确')
    next()
  } else {
    res.send(accountMsg)
  }
}

// 是否为管理员
module.exports.isAdmin = (req, res, next) => {
  let accountMsg = isRole(req, res)
  if (accountMsg.role === 1) {
    console.log('你是管理员')
    next()
  } else {
    console.log('你不是管理员')
    res.send('你不是管理员')
  }
}

// 得到友链
module.exports.getLinks = (req, res, next) => {
  User.getLinks()
    .then((doc) => {
      res.json(doc)
    })
    .catch((err) => {
      console.log(err)
    })
}

// 是否展示链接
module.exports.isShow = (req, res, next) => {
  User.getUserByAccount(req.body.account)
    .then((doc) => {
      doc.show = !doc.show
      doc.save()
      res.end()
    })
    .catch((err) => {
      console.log(err)
    })
}

// 判断token与管理员等级
function isRole (req, res) {
  let token = req.cookies.token
  if (token) {
    let accountMsg = sign.verifyToken(token)
    if (accountMsg === 'overdueToken') {
      console.log('token已过期,要跳转')
      return false
    } else {
      console.log('token正确,角色等级为' + accountMsg.role)
      return accountMsg
    }
  } else {
    console.log('用户未登录,要跳转')
    return false
  }
}

// 账户密码检测并返回doc and Token
function signInAccount (doc, data) {
  if (doc.password === sign.md5(data.password)) {
    let {account, role} = doc
    let token = sign.signToken({account, role})
    doc.token = token
    doc.save()
    return {doc, token}
  } else {
    throw new Error('密码错误')
  }
}
