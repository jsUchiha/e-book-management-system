import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import BASE_URL from "../config";

export default function Home() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const token = localStorage.getItem('token');

  // 🔥 LOAD BOOKS (FIXED)
  useEffect(() => {
    axios.get(`${BASE_URL}/books/public`)
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔹 Categories
  const categories = useMemo(() => {
    const arr = ['All'];

    books.forEach(b => {
      if (b.category && !arr.includes(b.category)) {
        arr.push(b.category);
      }
    });

    return arr;
  }, [books]);

  // 🔹 Filter
  const filtered = books.filter(b => {
    const q = search.toLowerCase();

    const matchSearch =
      (b.title || '').toLowerCase().includes(q) ||
      (b.author || '').toLowerCase().includes(q) ||
      (b.category || '').toLowerCase().includes(q);

    const matchCat =
      category === 'All' || b.category === category;

    return matchSearch && matchCat;
  });

  const section = (label) => filtered.filter(b => b.label === label);

  const trending = section('Trending');
  const popular = section('Popular');
  const recommended = section('Recommended');

  const isFiltering = search.trim() !== '' || category !== 'All';

  // 🔥 RENDER BOOKS (FIXED URLS)
  const renderBooks = (items) => (

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 25,
      padding: '20px 40px'
    }}>

      {items.map(book => (

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

            <p><b>Author:</b> {book.author}</p>
            <p><b>Category:</b> {book.category}</p>

            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>

              {/* 🔥 READ */}
              <a
                href={`${BASE_URL}/uploads/${book.pdfUrl}`}
                target='_blank'
                rel='noreferrer'
                style={{
                  padding: '10px 16px',
                  background: '#111',
                  color: 'white',
                  borderRadius: 10,
                  textDecoration: 'none'
                }}>
                Read
              </a>

              {/* 🔥 DOWNLOAD */}
              {token ? (

                <a
                  href={`${BASE_URL}/download/${book.pdfUrl}`}
                  style={{
                    padding: '10px 16px',
                    background: '#111',
                    color: 'white',
                    borderRadius: 10,
                    textDecoration: 'none'
                  }}>
                  Download
                </a>

              ) : (

                <Link
                  to='/login'
                  style={{
                    padding: '10px 16px',
                    background: '#111',
                    color: 'white',
                    borderRadius: 10,
                    textDecoration: 'none'
                  }}>
                  Login to Download
                </Link>

              )}

            </div>

          </div>

        </div>

      ))}

    </div>
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

        <h2>E-Book Store</h2>

        <div>

          {!token &&
            <Link to='/login' style={{ color: 'white', marginRight: 15 }}>
              Login
            </Link>
          }

          {!token &&
            <Link to='/register' style={{ color: 'white' }}>
              Register
            </Link>
          }

          {token &&
            <button onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}>
              Logout
            </button>
          }

        </div>

      </div>

      {/* 🔹 SEARCH */}
      <div style={{ textAlign: 'center', padding: 30 }}>

        <h1>Library</h1>

        <input
          placeholder='Search books'
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 12,
            width: 350,
            borderRadius: 10
          }}
        />

        <div style={{ marginTop: 18 }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                margin: 6,
                padding: '10px 14px',
                borderRadius: 20
              }}>
              {c}
            </button>
          ))}
        </div>

      </div>

      {/* 🔹 DISPLAY */}
      {isFiltering ? (
        <>
          <h2 style={{ paddingLeft: 40 }}>
            {search.trim() !== '' ? 'Search Results' : category}
          </h2>
          {renderBooks(filtered)}
        </>
      ) : (
        <>
          {trending.length > 0 && <>
            <h2 style={{ paddingLeft: 40 }}>🔥 Trending</h2>
            {renderBooks(trending)}
          </>}

          {popular.length > 0 && <>
            <h2 style={{ paddingLeft: 40 }}>⭐ Popular</h2>
            {renderBooks(popular)}
          </>}

          {recommended.length > 0 && <>
            <h2 style={{ paddingLeft: 40 }}>💡 Recommended</h2>
            {renderBooks(recommended)}
          </>}
        </>
      )}

    </div>
  );
}