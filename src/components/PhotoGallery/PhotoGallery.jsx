import React, {useState, useEffect} from 'react'
import './PhotoGallery.css'
import {motion} from 'framer-motion'
import PhotoList from '../PhotoList/PhotoList'
import Pagination from '../Pagination/Pagination'
import getMediaItems from '../utils/Helpers'

export default function PhotoGallery({
  galleryPhotos,
  setGalleryPhotos,
  setNextPhotoSet,
  nextPhotoSet
}) {
  const [photo, setPhoto] = useState(null)
  const [displayPhotos, setDisplayPhotos] = useState([])
  const [leftPanelPhotos, setLeftPanelPhotos] = useState([])
  const [rightPanelPhotos, setRightPanelPhotos] = useState([])
  const [isLeftPanel, setIsLeftPanel] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [photosPerPage] = useState(10)
  const paginate = pageNumber => setCurrentPage(pageNumber)

  const assignPhotosToPanels = displayPhotosList => {
    const {length} = displayPhotosList
    if (length >= 10) {
      setLeftPanelPhotos(displayPhotosList.slice(0, 5))
      setRightPanelPhotos(displayPhotosList.slice(5, 10))
    } else if (length > 5 && length < 10) {
      setLeftPanelPhotos(displayPhotosList.slice(0, 5))
      setRightPanelPhotos(displayPhotosList.slice(5, length))
    } else {
      setLeftPanelPhotos(displayPhotosList)
      setRightPanelPhotos([])
    }
  }

  useEffect(() => {
    assignPhotosToPanels(displayPhotos)
  }, [displayPhotos])

  useEffect(() => {
    if (galleryPhotos) {
      const indexOfLastPhoto = currentPage * photosPerPage
      const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
      const currentPhotos = galleryPhotos.slice(
        indexOfFirstPhoto,
        indexOfLastPhoto
      )
      setDisplayPhotos(currentPhotos)
    }
  }, [currentPage, galleryPhotos, photosPerPage])

  const getNewPhotos = async () => {
    const {mediaItems, nextPageToken} = await getMediaItems(nextPhotoSet)
    setNextPhotoSet(nextPageToken)
    setGalleryPhotos(mediaItems)
    setCurrentPage(1)
  }

  return (
    <div className="galleryContainer">
      <div className="container">
        <PhotoList
          photos={leftPanelPhotos}
          selectPhoto={setPhoto}
          currentPage={currentPage}
          currentPhoto={photo}
          setIsLeftPanel={setIsLeftPanel}
          leftPanel
        />
        <div className="featureContainer">
          <motion.div
            key={photo}
            initial={{opacity: 0, x: isLeftPanel ? -300 : 300}}
            animate={{opacity: 1, x: 0}}
            className="feature"
            positionTransition
          >
            {!photo && <p className="featureText">Select A Photo To View!</p>}
            {photo && <img src={photo} alt="Selected Google Play Feature" />}
          </motion.div>
        </div>
        <PhotoList
          photos={rightPanelPhotos}
          selectPhoto={setPhoto}
          currentPage={currentPage}
          currentPhoto={photo}
          setIsLeftPanel={setIsLeftPanel}
          rightPanel
        />
      </div>
      <Pagination
        photosPerPage={photosPerPage}
        totalPhotos={galleryPhotos.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className="galleryButtonContainer">
        <motion.button
          className="btn-gradient blue mini"
          type="button"
          onClick={() => getNewPhotos()}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{scale: 0.9}}
        >
          Next Photos
        </motion.button>
      </div>
    </div>
  )
}
