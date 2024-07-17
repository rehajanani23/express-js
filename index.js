const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.json());

const port = 3000;

const books = [
    { id: 1, author: 'Author1', title: 'Book1', year: 2001 },
    { id: 2, author: 'Author2', title: 'Book2', year: 2002 },
    { id: 3, author: 'Author3', title: 'Book3', year: 2003 }
];

app.get('/', (req, res) => {
    res.json(books);
});

app.post('/', (req, res) => {
    const { id, author, title, year } = req.body;
    books.push({ id, author, title, year });
    res.json("New book was created");
});

app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { author, title, year } = req.body;
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex !== -1) {
        books[bookIndex] = { id, author, title, year };
        res.json(`Book with id: ${id} is updated successfully`);
    } else {
        res.json("ID not found");
    }
});

app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.json(`Book with id: ${id} is deleted`);
    } else {
        res.json("ID not found");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});