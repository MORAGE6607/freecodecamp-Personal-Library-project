'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Book schema + virtual for commentcount
const bookSchema = new Schema({
  title: { type: String, required: true },
  comments: [String]
});
bookSchema.virtual('commentcount').get(function() {
  return this.comments.length;
});
bookSchema.set('toObject', { virtuals: true });
bookSchema.set('toJSON',   { virtuals: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = function(app) {
  app.route('/api/books')

    // GET all books
    .get(async (req, res) => {
      try {
        const books = await Book.find({}, 'title comments').exec();
        res.json(
          books.map(b => ({
            _id: b._id,
            title: b.title,
            commentcount: b.comments.length
          }))
        );
      } catch (e) {
        res.status(500).send('server error');
      }
    })

    // POST a new book
    .post(async (req, res) => {
      const title = req.body.title;
      if (!title) return res.send('missing required field title');
      try {
        const newBook = new Book({ title, comments: [] });
        const saved = await newBook.save();
        res.json({ _id: saved._id, title: saved.title });
      } catch (e) {
        res.status(500).send('server error');
      }
    })

    // DELETE all books
    .delete(async (req, res) => {
      try {
        await Book.deleteMany({});
        res.send('complete delete successful');
      } catch (e) {
        res.status(500).send('server error');
      }
    });


  app.route('/api/books/:id')

    // GET one book by id
    .get(async (req, res) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) return res.send('no book exists');
      try {
        const book = await Book.findById(id).exec();
        if (!book) return res.send('no book exists');
        res.json({ _id: book._id, title: book.title, comments: book.comments });
      } catch (e) {
        res.status(500).send('server error');
      }
    })

    // POST comment to book
    .post(async (req, res) => {
      const { id } = req.params;
      const comment = req.body.comment;
      if (!comment) return res.send('missing required field comment');
      if (!mongoose.Types.ObjectId.isValid(id)) return res.send('no book exists');
      try {
        const book = await Book.findById(id).exec();
        if (!book) return res.send('no book exists');
        book.comments.push(comment);
        await book.save();
        res.json({ _id: book._id, title: book.title, comments: book.comments });
      } catch (e) {
        res.status(500).send('server error');
      }
    })

    // DELETE one book by id
    .delete(async (req, res) => {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) return res.send('no book exists');
      try {
        const deleted = await Book.findByIdAndDelete(id).exec();
        if (!deleted) return res.send('no book exists');
        res.send('delete successful');
      } catch (e) {
        res.status(500).send('server error');
      }
    });
};
