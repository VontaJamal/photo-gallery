const getMediaItems = async token => {
  // eslint-disable-next-line no-undef
  const response = await gapi.client.photoslibrary.mediaItems.list({
    pageSize: '100',
    pageToken: token
  })

  const {mediaItems, nextPageToken} = response.result
  const filteredMediaItems = mediaItems.filter(mediaItem =>
    mediaItem.mimeType.includes('image')
  )

  return {
    mediaItems: filteredMediaItems,
    nextPageToken
  }
}

export default getMediaItems
