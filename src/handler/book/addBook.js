const { nanoid } = require('nanoid');
const books = require('../../data/books');
const { apiResponse, isBlank } = require('../../utils');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (isBlank(name)) {
    const response = h.response(apiResponse({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }));

    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response(apiResponse({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }));

    response.code(400);

    return response;
  }

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response(apiResponse({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }));

    response.code(201);

    return response;
  }

  return h.response(apiResponse({ status: 'fail', message: 'Gagal menambahkan buku' }));
};

module.exports = addBookHandler;
