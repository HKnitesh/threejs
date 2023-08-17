/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from "@react-three/drei"

import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import Shirt from './Shirt';

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.5} />

      <Environment preset="city" />
      {/* <Environment/> */}

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>

    </Canvas>
  )
}

export default CanvasModel



