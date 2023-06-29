// Import các module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect('mongodb+srv://tommy:tommy309@cluster0.rv695h6.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

// Định nghĩa Schema cho collection Books
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String
});

// Tạo model từ schema
const Book = mongoose.model('Book', bookSchema);

// Cấu hình body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Định nghĩa route cho trang chủ
app.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('index', { books: books });
  } catch (err) {
    console.log(err);
    res.render('index', { books: [] });
  }
});

// Định nghĩa route cho việc tạo sách mới
app.post('/', (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  });

  newBook.save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

// Định nghĩa route cho việc xóa sách
app.post('/delete', (req, res) => {
  const bookId = req.body.id;

  Book.findByIdAndDelete(bookId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

// Định nghĩa route cho việc cập nhật sách
app.post('/update', (req, res) => {
  const bookId = req.body.id;

  Book.findByIdAndUpdate(bookId, {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});
// Cấu hình template engine là Pug
app.set('view engine', 'pug');

app.use(express.static('public'));

// Khởi chạy server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
