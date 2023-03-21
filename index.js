const http = require('http');
const express = require('express');
const { mongoose, connectionConfig, bookSchema } = require('./model');

const app = express();
app.use(express.json({ limit: '10mb' }));

app.post('/books', async (req, res) => {
    const { book } = req.body;

    const conn = mongoose.createConnection(connectionConfig);
    const Book = conn.model('Book', bookSchema);

    const newBook = await Book.create(book);

    await conn.destroy();

    res.status(200).json({ message: "ok", data: { newBook } });
    return;
});

app.get('/books/search', async (req, res) => {
    const filter = req.query;

    const conn = mongoose.createConnection(connectionConfig);
    const Book = conn.model('Book', bookSchema);

    const books = await Book.find().where({ ...filter });

    await conn.destroy();
    res.status(200).json({ message: "ok", data: { books } });
    return;
});

app.get('/books', async (req, res) => {
    const conn = mongoose.createConnection(connectionConfig);
    const Book = conn.model('Book', bookSchema);

    const books = await Book.find();

    await conn.destroy();
    res.status(200).json({ message: "ok", data: { books } });
    return;
});

app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { book } = req.body;

    const conn = mongoose.createConnection(connectionConfig);
    const Book = conn.model('Book', bookSchema);

    book.updateAt = new Date;
    const books = await Book.findByIdAndUpdate(id, { ...book });

    await conn.destroy();
    res.status(200).json({ message: "ok", data: { books } });
    return;
});

app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    const conn = mongoose.createConnection(connectionConfig);
    const Book = conn.model('Book', bookSchema);

    const book = await Book.findByIdAndRemove(id);

    await conn.destroy();
    res.status(200).json({ message: "ok", data: { book } });
    return;
});

const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
