import React, { useEffect, useRef } from 'react'
import './HeartAnimation.css'

function HeartAnimation() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Попытаемся инициализировать Three.js
    const initThree = async () => {
      try {
        const THREE = await import('three')
        
        // Scene setup
        const scene = new THREE.Scene()
        
        const camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000
        )
        camera.position.z = 50

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        renderer.setClearColor(0x000000, 0)
        containerRef.current.appendChild(renderer.domElement)

        // Lighting
        const light = new THREE.PointLight(0xFFB3D9, 1.5)
        light.position.set(50, 50, 50)
        scene.add(light)

        const ambientLight = new THREE.AmbientLight(0xFFB3D9, 0.8)
        scene.add(ambientLight)

        // Функция для создания сердца
        const createHeart = () => {
          const shape = new THREE.Shape()
          
          const x = 0, y = 0
          shape.moveTo(x + 25, y + 25)
          shape.bezierCurveTo(x + 25, y + 25, x + 20, y, x + 0, y)
          shape.bezierCurveTo(x - 20, y, x - 25, y + 25, x - 25, y + 25)
          shape.bezierCurveTo(x - 25, y + 35, x - 20, y + 40, x + 0, y + 50)
          shape.bezierCurveTo(x + 20, y + 40, x + 25, y + 35, x + 25, y + 25)
          
          const geometry = new THREE.ShapeGeometry(shape)
          geometry.translate(0, -25, 0)
          
          const material = new THREE.MeshPhongMaterial({
            color: 0xFF6B9D,
            emissive: 0xFFB3D9,
            shininess: 100
          })
          
          const mesh = new THREE.Mesh(geometry, material)
          mesh.scale.set(0.3, 0.3, 0.3)
          mesh.position.x = (Math.random() - 0.5) * 100
          mesh.position.y = (Math.random() - 0.5) * 100
          mesh.position.z = (Math.random() - 0.5) * 50
          mesh.rotation.x = Math.random() * Math.PI
          mesh.rotation.y = Math.random() * Math.PI
          
          mesh.userData = {
            rotationSpeed: Math.random() * 0.02,
            floatSpeed: Math.random() * 0.01 + 0.005,
            floatRange: Math.random() * 20 + 10,
            originalY: mesh.position.y,
            time: Math.random() * Math.PI * 2
          }
          
          return mesh
        }

        // Создаем сердца
        const hearts = []
        for (let i = 0; i < 5; i++) {
          const heart = createHeart()
          scene.add(heart)
          hearts.push(heart)
        }

        // Animation loop
        let animationId
        const animate = () => {
          animationId = requestAnimationFrame(animate)

          hearts.forEach(heart => {
            heart.rotation.x += heart.userData.rotationSpeed
            heart.rotation.y += heart.userData.rotationSpeed
            heart.userData.time += heart.userData.floatSpeed
            heart.position.y = heart.userData.originalY + Math.sin(heart.userData.time) * heart.userData.floatRange
          })

          renderer.render(scene, camera)
        }
        animate()

        // Resize handler
        const handleResize = () => {
          if (!containerRef.current) return
          const width = containerRef.current.clientWidth
          const height = containerRef.current.clientHeight
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize)
          cancelAnimationFrame(animationId)
          renderer.dispose()
          if (containerRef.current?.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement)
          }
        }
      } catch (error) {
        console.error('Error with Three.js hearts:', error)
        // Fallback: просто розовый фон
        if (containerRef.current) {
          containerRef.current.style.background = 'linear-gradient(135deg, rgba(255,107,157,0.05) 0%, rgba(255,179,217,0.05) 100%)'
        }
      }
    }

    const cleanup = initThree()
    
    return () => {
      if (cleanup instanceof Promise) {
        cleanup.then(fn => fn && fn())
      }
    }
  }, [])

  return <div ref={containerRef} className="heart-animation"></div>
}

export default HeartAnimation
