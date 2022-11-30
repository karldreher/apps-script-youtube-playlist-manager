regex = new RegExp(config.query, 'i')

function addToPlaylist(video) {
  if (typeof video === "undefined") {

  }
  else {
    videoId = String(video)
    PlaylistResponse = YouTube.PlaylistItems.insert(
      {
        "kind": "youtube#playlistItem",
        "snippet": {
          "playlistId": config.playlistID,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": videoId,
          }
        }
      }, 'snippet');
    Logger.log(PlaylistResponse)
  }
}

function searchByKeyword() {
  const today = new Date();
  let dateRange = new Date();
  dateRange.setDate(today.getDate() - 1);
  let isodate = dateRange.toISOString();
  let l = YouTube.Search.list('id,snippet', {
    q: config.query,
    channelId: config.targetChannel,
    type: 'video',
    maxResults: 50,
    "publishedAfter": isodate
  });

  for (let j = 0; j < l.items.length; j++) {
    let playlistItem = l.items[j];
    let title_string = String(playlistItem.snippet.title);
    if (title_string.match(regex)) {
      Logger.log(`Title "${title_string}" matches "${config.query}", adding to playlist.`)
      addToPlaylist(playlistItem.id.videoId)
    };
  }
}

function deletePrivateItems() {
  let response = YouTube.PlaylistItems.list('status', {
    "playlistId": config.playlistID,
    maxResults: 50
  });

  privateItems = response.items.filter(item => item.status.privacyStatus == 'private')
  if (privateItems.length == 0) {
    console.log('No private items found for playlist ID ' + config.playlistID)
  }
  privateItems.forEach(function (item) {
    console.log("deleting item:  " + item)
    YouTube.PlaylistItems.remove(item.id)
  })
}
