'use client'

import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Suspense } from 'react'

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={0.2}
        />
      </Sphere>
    </Float>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  )
}
