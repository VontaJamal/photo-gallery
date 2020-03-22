const getMediaItems = async token => {
  // eslint-disable-next-line no-undef
  const response = await gapi.client.photoslibrary.mediaItems.list({
    pageSize: '100',
    pageToken: token
  })

  const {mediaItems, nextPageToken} = response.result
  return {
    mediaItems,
    nextPageToken
  }
}

export default getMediaItems
