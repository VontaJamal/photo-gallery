import React, {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import PhotoGallery from './PhotoGallery/PhotoGallery'
import Authenticate from './Authenticate'

export default function Main() {
  const [galleryPhotos, setGalleryPhotos] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [nextPhotoSet, setNextPhotoSet] = useState(null)

  return (
    <div className="App-header">
      <Authenticate
        setGalleryPhotos={setGalleryPhotos}
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        setNextPhotoSet={setNextPhotoSet}
      />
      <AnimatePresence>
        <motion.div
          key={isAuthenticated}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{
            opacity: 0,
            rotate: 300,
            scale: 0,
            transition: {duration: 0.5}
          }}
        >
          {isAuthenticated && (
            <PhotoGallery
              galleryPhotos={galleryPhotos}
              setGalleryPhotos={setGalleryPhotos}
              setNextPhotoSet={setNextPhotoSet}
              nextPhotoSet={nextPhotoSet}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
