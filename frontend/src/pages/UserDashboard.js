import axios from 'axios';
import { useEffect, useState } from 'react';
import BASE_URL from "../config";

export default function UserDashboard() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const headers = {
    headers: { Authorization: localStorage.getItem('token') }
  };

  // 🔥 LOAD BOOKS (FIXED)
  useEffect(() => {
    axios.get(`${BASE_URL}/books`, headers)
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔹 SEARCH FILTER
  const filtered = books.filter(b =>
    (b.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: 'Arial',
      background: '#f4f6fb',
      minHeight: '100vh'
    }}>

      {/* 🔹 HEADER */}
      <div style={{
        background: '#111',
        color: 'white',
        padding: '18px 30px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h2>My Library</h2>

        <button onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}>
          Logout
        </button>
      </div>

      {/* 🔹 SEARCH */}
      <div style={{ textAlign: 'center', padding: 25 }}>
        <input
          placeholder='Search by title or category'
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 12,
            width: 350,
            borderRadius: 10
          }}
        />
      </div>

      {/* 🔹 BOOK GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
        gap: 25,
        padding: 35
      }}>

        {filtered.map(book => (

          <div key={book._id}
            style={{
              background: 'white',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 6px 20px rgba(0,0,0,.15)'
            }}>

            {/* 🔥 FIXED IMAGE URL */}
            <img
              src={`${BASE_URL}/uploads/${book.coverImage}`}
              alt=''
              style={{
                width: '100%',
                height: 280,
                objectFit: 'cover'
              }}
            />

            <div style={{ padding: 18 }}>

              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.category}</p>

              {/* 🔥 READ */}
              <a
                href={`${BASE_URL}/uploads/${book.pdfUrl}`}
                target='_blank'
                rel='noreferrer'>
                Read
              </a>

              {' | '}

              {/* 🔥 DOWNLOAD */}
              <a href={`${BASE_URL}/download/${book.pdfUrl}`}>
                Download
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}