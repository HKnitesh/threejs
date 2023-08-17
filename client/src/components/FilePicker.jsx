/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import CustomButton from './CustomButton'


const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className='filepicker-container'>
      <div className="flex-1 flex flex-col">
        <input
          type="file"
          id="file-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          htmlFor='file-upload'
          className='filepicker-label hover:bg-green-400'
        >
          Upload File
        </label>
        <p className='mt-2 text-gray-700 text-xs truncate'>
          {file === '' ? "No file selected" : file.name}

        </p>
      </div>
      <div className="mt-4 flex flex-col flex-wrap gap-2">
        <CustomButton 
          type="outline"
          title="Set logo"
          handleClick={() => readFile('logo')}
          customStyle="text-xs "

        />
        <CustomButton 
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyle="text-xs"

        />
      </div>
    </div>
  )
}

export default FilePicker