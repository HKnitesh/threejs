/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { CustomButton, AIPicker, ColorPicker, FilePicker, Tab } from '../components'

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFIlterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //  show tab content depending on the activeTab
  const generateTabContent = () => {

    switch (activeEditorTab) {


      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");


    try {
      //  call our backend to generate an  AI image!
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/hare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)

    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  // for FilePicker  start
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFIlterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {

    // this switch only switching the state
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFIlterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFIlterTab[tabName];
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, set the activeFilterTab is update

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }
  // for FilePicker  end and move in FilePicker Component

  return (
    <AnimatePresence>
      {!snap.intro && (

        <>
          {/* side tab button like color change */}
          <motion.div
            className='absolute top-0 left-0 z-10'
            key='custom'
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">

              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}

              </div>

            </div>

          </motion.div>

          {/* Go back button */}
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...slideAnimation('right')}
          >
            <CustomButton

              type="filled"
              title=" Go Back"
              handleClick={() => state.intro = true}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
            />

          </motion.div>

          {/* bottom customize button */}
          <motion.div
            className='filtertabs-container '
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFIlterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}

          </motion.div>


        </>
      )}

    </AnimatePresence>
  )
}

export default Customizer