import React, { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [tab, setTab] = useState('stats')
  const [user] = useState({
    name: 'Александра',
    age: 22,
    bio: '💖 Люблю путешествия'
  })
  const [stats] = useState({
    likes: 12,
    matches: 3,
    valentines: 5,
    rating: 4.8
  })

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    }
  }, [])

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="title">💕 Твой профиль</h1>
          <p className="subtitle">AlmetDating</p>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${tab === 'stats' ? 'active' : ''}`}
            onClick={() => setTab('stats')}
          >
            📊 Статистика
          </button>
          <button 
            className={`tab ${tab === 'likes' ? 'active' : ''}`}
            onClick={() => setTab('likes')}
          >
            ❤️ Лайки
          </button>
        </div>

        <div className="content">
          {tab === 'stats' ? (
            <div className="user-stats">
              <div className="profile-section">
                <div className="profile-avatar">👤</div>
                <h2>{user.name}, {user.age}</h2>
                <p>{user.bio}</p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">❤️</div>
                  <div className="stat-value">{stats.likes}</div>
                  <div className="stat-label">Лайки</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💞</div>
                  <div className="stat-value">{stats.matches}</div>
                  <div className="stat-label">Мэтчи</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💌</div>
                  <div className="stat-value">{stats.valentines}</div>
                  <div className="stat-label">Валентинки</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-value">{stats.rating.toFixed(1)}</div>
                  <div className="stat-label">Рейтинг</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="likes-section">
              <p>❤️ История лайков будет здесь</p>
              <p style={{fontSize: '14px', marginTop: '10px'}}>Никто вас ещё не оценил</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
