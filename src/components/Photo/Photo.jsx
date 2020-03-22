import React from 'react'
import {motion} from 'framer-motion'
import './Photo.css'

export default function Photo({
  src,
  alt,
  selectPhoto,
  currentPhoto,
  leftPanel,
  setIsLeftPanel
}) {
  if (!src) {
    return false
  }
  const isActivePhoto = currentPhoto === src
  return (
    <motion.div
      initial={{x: leftPanel ? -500 : 500}}
      animate={{x: 0}}
      transition={{ease: 'easeOut'}}
      whileTap={{scale: 0.95}}
      whileHover={{scale: 1.01}}
      className={`photo ${isActivePhoto ? 'activePhoto' : 'selectPhoto'}`}
    >
      <button
        onClick={() => {
          setIsLeftPanel(leftPanel)
          selectPhoto(src)
        }}
        type="button"
        className="buttonPhoto"
      >
        <img src={src} alt="" />
      </button>
    </motion.div>
  )
}
