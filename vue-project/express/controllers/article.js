var Article = require('../models/articleModel')

module.exports.getArticleList = (req, res, next) => {
  let articles = {}
  if (!req.query.q) {
    let p1 = new Promise((resolve, reject) => {
      Article.find({}).skip(Number.parseInt(req.query.page - 1) * 5).limit(req.query.page && 5).exec((err, article) => {
        if (err) {
          reject(console.log(err))
        } else {
          articles.article = article
          resolve()
        }
      })
    })
    let p2 = new Promise((resolve, reject) => {
      Article.estimatedDocumentCount((err, count) => {
        if (err) {
          reject(console.log(err))
        } else {
          articles.count = count
          resolve()
        }
      })
    })
    Promise.all([p1, p2]).then(() => {
      res.json(articles)
    }).catch(e => e)
  } else {
    const findArticle = Article.find({$or: [{title: {$regex: req.query.q}}, {main: {$regex: req.query.q}}]})
    let p1 = new Promise((resolve, reject) => {
      Article.find({$or: [{title: {$regex: req.query.q}}, {main: {$regex: req.query.q}}]}).exec((err, article) => {
        if (err) {
          reject(console.log(err))
        } else {
          articles.count = article.length
          resolve()
        }
      })
    })
    let p2 = new Promise((resolve, reject) => {
      findArticle.skip(Number.parseInt(req.query.page - 1) * 5).limit(req.query.page && 5).exec(function (err, article) {
        if (err) {
          reject(console.log(err))
        } else {
          articles.article = article
          resolve()
        }
      })
    })
    Promise.all([p1, p2]).then(() => {
      res.json(articles)
    }).catch(e => e)
  }
}
module.exports.getArticle = (req, res, next) => {
  Article.findOne({_id: req.params.id}, function (err, article) {
    if (err) {
      console.log(err)
    }
    res.json(article)
  })
}
module.exports.addArticle = (req, res, next) => {
  let title = req.body.title
  let main = req.body.main
  let article = new Article({title, main})
  article.save()
  res.end()
}
module.exports.delArticle = (req, res, next) => {
  let id = req.body.id
  Article.remove({_id: id}).exec()
  res.end()
}
module.exports.modifyArticle = (req, res, next) => {
  let id = req.body.id
  let title = req.body.title
  let main = req.body.main
  Article.modify(id, title, main)
  res.end()
}
