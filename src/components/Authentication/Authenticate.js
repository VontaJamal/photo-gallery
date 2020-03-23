import React, {useEffect} from 'react'
import {motion} from 'framer-motion'
import getMediaItems from '../utils/Helpers'
import './Authenticate.css'

export default function Authenticate({
  setGalleryPhotos,
  setIsAuthenticated,
  isAuthenticated,
  setNextPhotoSet
}) {
  const clientId = process.env.REACT_APP_CLIENT_ID
  const scope = 'https://www.googleapis.com/auth/photoslibrary.readonly'
  const discoveryDocs = [
    'https://photoslibrary.googleapis.com/$discovery/rest?version=v1'
  ]

  useEffect(() => {
    const updateSigninStatus = async isSignedIn => {
      if (isSignedIn) {
        const {mediaItems, nextPageToken} = await getMediaItems()
        setGalleryPhotos(mediaItems)
        setNextPhotoSet(nextPageToken)
        setIsAuthenticated(isSignedIn)
      }
      setIsAuthenticated(isSignedIn)
    }

    const initClient = () => {
      // eslint-disable-next-line no-undef
      gapi.client
        .init({
          discoveryDocs,
          clientId,
          scope
        })
        .then(() => {
          // Listen for sign-in state changes.
          // eslint-disable-next-line no-undef
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

          // Handle the initial sign-in state.
          // eslint-disable-next-line no-undef
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        })
    }

    // eslint-disable-next-line no-undef
    if (gapi && !gapi.client) {
      // eslint-disable-next-line no-undef
      gapi.load('client:auth2', initClient)
    }
  }, [
    clientId,
    discoveryDocs,
    setGalleryPhotos,
    setIsAuthenticated,
    setNextPhotoSet
  ])

  function handleAuthClick(authenticated) {
    // eslint-disable-next-line no-unused-expressions
    authenticated
      ? // eslint-disable-next-line no-undef
        gapi.auth2.getAuthInstance().signIn()
      : // eslint-disable-next-line no-undef
        gapi.auth2.getAuthInstance().signOut()
  }

  return (
    <div className="titleContainer">
      {isAuthenticated && <p className="titleText">DJWS Google Photo Viewer</p>}
      <div
        className="titleButtonContainer"
        style={{textAlign: isAuthenticated ? 'right' : 'center'}}
      >
        <motion.button
          className={`btn-gradient ${
            isAuthenticated ? 'red mini' : 'green large'
          }`}
          type="button"
          onClick={() => handleAuthClick(!isAuthenticated)}
          whileHover={{
            scale: 1.1,
            transition: {duration: 1}
          }}
          whileTap={{scale: 0.9}}
        >
          {isAuthenticated ? 'Sign Out' : 'Sign in to start!'}
        </motion.button>
      </div>
    </div>
  )
}
