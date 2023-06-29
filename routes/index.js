var express = require('express');
var router = express.Router();
var Book = require('../modal/book.modal')
/* GET  create book. */
router.get('/', function (req, res, next) {
  res.render('index')
});

// Create books
router.post('/', function (req, res, next) {
  var newbook = new Book()
  newbook.title = req.body.title;
  newbook.description = req.body.description;
  newbook.author = req.body.author;
  newbook.save().then(function (err) {
    if (err) { console.log(err) }
  })
  res.redirect('/')
})

// Read books
router.get('/', async function (req, res, next) {
  try {
    let books = await Book.find();
    res.render('index', { books: books }); // Truyền giá trị của biến books vào template
  } catch (err) {
    console.log(err);
    res.render('index', { books: [] }); // Trường hợp xảy ra lỗi, truyền một mảng rỗng cho biến books
  }
});
// Update books
router.post("/update", function (req, res, next) {
  var id = req.body.id;
  Book.findById(id, function (err, book) {
    if (err) { console.log(err) }
    book.title = req.body.title
    book.description = req.body.description
    book.author = req.body.author
    book.save()
  })
  res.redirect('/')
})
// Delete books
router.post("/delete", function (req, res, next) {
  var id = req.body.id
  Book.findByIdAndDelete(id, function (err) {
    if (err) { console.log(err) }
  })
  res.redirect('/')
})
module.exports = router;
  
