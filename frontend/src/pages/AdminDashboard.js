import axios from 'axios';
import { useEffect, useState } from 'react';
import BASE_URL from "../config";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    label: '',
    pdf: null,
    cover: null
  });

  const headers = {
    headers: { Authorization: localStorage.getItem('token') }
  };

  useEffect(() => {
    loadUsers();
    loadBooks();
  }, []);

  // 🔹 Load Users
  const loadUsers = () => {
    axios.get(`${BASE_URL}/admin/users`, headers)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  // 🔹 Load Books
  const loadBooks = () => {
    axios.get(`${BASE_URL}/books`, headers)
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  // 🔹 Add Book
  const addBook = async () => {
    try {
      const formData = new FormData();
      formData.append('title', book.title);
      formData.append('author', book.author);
      formData.append('category', book.category);
      formData.append('label', book.label);
      formData.append('pdf', book.pdf);
      formData.append('cover', book.cover);

      await axios.post(
        `${BASE_URL}/books/add`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      loadBooks();
      alert('Book Added ✅');

    } catch (err) {
      console.log(err);
      alert('Error adding book ❌');
    }
  };

  // 🔹 Update Book
  const updateBook = async () => {
    try {
      await axios.put(
        `${BASE_URL}/books/${editingId}`,
        {
          title: book.title,
          author: book.author,
          category: book.category,
          label: book.label
        },
        headers
      );

      setEditingId(null);
      loadBooks();
      alert('Updated ✅');

    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Delete Book
  const deleteBook = async (id) => {
    await axios.delete(`${BASE_URL}/books/${id}`, headers);
    loadBooks();
  };

  // 🔹 Block User
  const blockUser = async (id) => {
    await axios.put(`${BASE_URL}/admin/block/${id}`, {}, headers);
    loadUsers();
  };

  // 🔹 Unblock User
  const unblockUser = async (id) => {
    await axios.put(`${BASE_URL}/admin/unblock/${id}`, {}, headers);
    loadUsers();
  };

  // 🔹 Delete User
  const deleteUser = async (id) => {
    await axios.delete(`${BASE_URL}/admin/users/${id}`, headers);
    loadUsers();
  };

  return (
    <div style={{ background: '#f4f6fb', minHeight: '100vh', padding: 30 }}>

      <h1>Admin Dashboard</h1>

      <button onClick={() => {
        localStorage.clear();
        window.location.href = '/';
      }}>
        Logout
      </button>

      {/* 🔹 Add Book Section */}
      <div style={{ background: 'white', padding: 25, borderRadius: 20, marginTop: 20 }}>
        <h2>Add / Edit Book</h2>

        <input placeholder='Title'
          value={book.title}
          onChange={e => setBook({ ...book, title: e.target.value })} />
        <br /><br />

        <input placeholder='Author'
          value={book.author}
          onChange={e => setBook({ ...book, author: e.target.value })} />
        <br /><br />

        <input placeholder='Category'
          value={book.category}
          onChange={e => setBook({ ...book, category: e.target.value })} />
        <br /><br />

        <select value={book.label}
          onChange={e => setBook({ ...book, label: e.target.value })}>
          <option value=''>Select Label</option>
          <option>Trending</option>
          <option>Popular</option>
          <option>Recommended</option>
        </select>

        <br /><br />

        <label>Upload PDF</label><br />
        <input type='file'
          onChange={e => setBook({ ...book, pdf: e.target.files[0] })} />

        <br /><br />

        <label>Upload Cover Image</label><br />
        <input type='file'
          onChange={e => setBook({ ...book, cover: e.target.files[0] })} />

        <br /><br />

        <button onClick={addBook}>Add Book</button>
        <button onClick={updateBook}>Update Book</button>

      </div>

      {/* 🔹 Lists */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 30 }}>

        {/* Books */}
        <div style={{ background: 'white', padding: 25, borderRadius: 20 }}>
          <h2>Manage Books</h2>

          {books.map(b => (
            <div key={b._id}>
              <b>{b.title}</b><br />
              {b.author}<br />
              {b.category}<br />
              {b.label}<br />

              <button onClick={() => {
                setEditingId(b._id);
                setBook({
                  title: b.title,
                  author: b.author,
                  category: b.category,
                  label: b.label
                });
              }}>Edit</button>

              <button onClick={() => deleteBook(b._id)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>

        {/* Users */}
        <div style={{ background: 'white', padding: 25, borderRadius: 20 }}>
          <h2>Manage Users</h2>

          {users.map(u => (
            <div key={u._id}>
              {u.email}<br />

              <button onClick={() => blockUser(u._id)}>Block</button>
              <button onClick={() => unblockUser(u._id)}>Unblock</button>
              <button onClick={() => deleteUser(u._id)}>Delete</button>

              <hr />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}