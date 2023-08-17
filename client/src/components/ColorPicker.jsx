/* eslint-disable no-unused-vars */
import React from 'react'
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha={true}
        renderers
        presetColors={[
          '#ccc', '#A8DF8E', '#FFE5E5', '#C23373', '#0C356A', '#279EFF', 
          '#EBE76C', '#F0B86E', '#E19898', '#974EC3', '#D0BFFF', '#5C4B99',
          '#A084E8', '#EAC696',
        ]}
        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker