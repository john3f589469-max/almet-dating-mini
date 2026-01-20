import React, { useState, useEffect } from 'react'
import './LikesHistory.css'

function LikesHistory({ userId }) {
  const [likes, setLikes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLikesHistory()
  }, [userId])

  const fetchLikesHistory = async () => {
    try {
      setLoading(true)
      const initData = window.Telegram?.WebApp?.initData || 'test'
      
      const response = await fetch(`http://localhost:8000/api/user/likes-history`, {
        headers: {
          'Authorization': initData,
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json()
      setLikes(data.likes || [])
    } catch (error) {
      console.error('Error fetching likes:', error)
      // Mock data для разработки
      setLikes([
        {
          id: 1,
          name: 'Мария',
          age: 20,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          is_valentine: false,
          comment: null
        },
        {
          id: 2,
          name: 'Анна',
          age: 21,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          is_valentine: true,
          comment: '✨ Красивая и креативная!'
        },
        {
          id: 3,
          name: 'Дарья',
          age: 19,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          is_valentine: false,
          comment: null
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 60) return `${minutes}м назад`
    if (hours < 24) return `${hours}ч назад`
    if (days < 7) return `${days}д назад`
    
    return date.toLocaleDateString('ru-RU')
  }

  if (loading) {
    return (
      <div className="likes-history">
        <div className="spinner"></div>
      </div>
    )
  }

  if (likes.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">💭</span>
        <h3 className="empty-title">Пока нет лайков</h3>
        <p className="empty-text">Начни искать пару и получай лайки! 💘</p>
      </div>
    )
  }

  return (
    <div className="likes-history">
      <div className="likes-list">
        {likes.map((like, index) => (
          <div key={like.id || index} className="like-item" style={{
            animationDelay: `${index * 0.1}s`
          }}>
            <span className="like-icon">{like.is_valentine ? '💌' : '❤️'}</span>
            
            <div className="like-info">
              <div className="like-name">
                {like.name}, {like.age}
              </div>
              <div className="like-time">
                {formatTime(like.timestamp)}
              </div>
              {like.comment && (
                <div className="like-comment">
                  "{like.comment}"
                </div>
              )}
            </div>
            
            <div className="like-action">
              <button className="action-btn reply">💬</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LikesHistory
