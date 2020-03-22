import React from 'react'
import {motion} from 'framer-motion'
import './PhotoList.css'
import Photo from '../Photo/Photo'

const empty = {
  hidden: {opacity: 0, y: 50},
  visible: {opacity: 1, y: 0}
}

export default function PhotoList({
  photos,
  selectPhoto,
  leftPanel,
  currentPhoto,
  setIsLeftPanel
}) {
  if (photos && photos.length) {
    const photoList = photos.map(photo => {
      const {id, baseUrl} = photo
      return (
        <Photo
          key={id}
          src={baseUrl}
          selectPhoto={selectPhoto}
          currentPhoto={currentPhoto}
          setIsLeftPanel={setIsLeftPanel}
          leftPanel={leftPanel}
        />
      )
    })

    return <div className="photoListContainer">{photoList}</div>
  }

  return (
    <motion.div key="empty" initial="hidden" animate="visible">
      <motion.div className="empty" variants={empty}>
        <p>No More </p>
        <div style={{display: 'flex'}}>
          <span role="img" aria-label="camera">
            📷
          </span>
          &apos;s
        </div>
        <p>!!</p>
      </motion.div>
    </motion.div>
  )
}
