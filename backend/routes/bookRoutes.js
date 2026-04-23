const router = require('express').Router();
const Book = require('../models/Book');
const multer = require('multer');
const { auth, admin } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// 🔥 PUBLIC ROUTE
router.get('/public', async (req, res) => {
  res.send(await Book.find());
});

// 🔥 USER ROUTE
router.get('/', auth, async (req, res) => {
  res.send(await Book.find());
});

// 🔥 ADD BOOK
router.post('/add', auth, admin,
  upload.fields([{ name: 'pdf' }, { name: 'cover' }]),
  async (req, res) => {

    const pdf = req.files.pdf[0].filename;
    const cover = req.files.cover[0].filename;

    await Book.create({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      pdfUrl: pdf,
      coverImage: cover
    });

    res.send('Book Added');
  }
);

module.exports = router;