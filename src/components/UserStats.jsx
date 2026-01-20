import React from 'react'
import './UserStats.css'

function UserStats({ user, stats }) {
  if (!user || !stats) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="user-stats">
      {/* Профиль */}
      <div className="profile-section">
        <div className="profile-avatar">
          <div className="avatar-placeholder">👤</div>
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-age">{user.age} лет</p>
        <p className="profile-bio">{user.bio}</p>
      </div>

      {/* Статистика */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">❤️</span>
          <div className="stat-value">{stats.likes}</div>
          <div className="stat-label">Лайки</div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">💞</span>
          <div className="stat-value">{stats.matches}</div>
          <div className="stat-label">Мэтчи</div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">💌</span>
          <div className="stat-value">{stats.valentines}</div>
          <div className="stat-label">Валентинки</div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-value">{stats.rating || 0}</div>
          <div className="stat-label">Рейтинг</div>
        </div>
      </div>
    </div>
  )
}

export default UserStats
