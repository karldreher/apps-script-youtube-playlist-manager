# Apps Script Youtube Playlist Manager

This is a utility which automatically adds videos to a playlist in **your** youtube account, and has a capability for deleting private videos.

The utility is intended to run in Google Apps Script, which is one of the easiest ways for authentication of automated utilities like this when using the Youtube API.  (No, really)

The utility searches based on title match, then adds matching videos to a playlist you specify.  This is a great way to build and continuously maintain playlists for a channel you're a big fan of!


# Configuration

1.  Copy the file `.config.js.example` to `.config.js`.  Fill in the relevant values.

```
cp .config.js.example .config.js
```


2.  (Optional) Change the `timeZone` in appsscript.json to one relevant for you.

# Deployment - Finer Points Coming Soon
## Deployment - Prerequisites
Deployment is done using `clasp`.  Install this using `yarn`.  This is specified as a project dependency so from project root you can simply:

```
yarn install
```

## Deployment - Apps Script
Now that you've configured the project for your needs, you can deploy this to Apps Script by:

1.  ???
2.  ???
3.  `clasp push`
4.  Profit!

## Deployment - Testing the new install
Try running the `searchByKeyword()` function from the Apps Script console.

## Deployment - Scheduling

`searchByKeyword()` and `deletePrivateItems()` should be scheduled for daily execution, ideally at opposing times (e.g. 1 AM/1 PM; 1:00/13:00.)

This cannot be done through the `clasp` deployment steps for reasons detailed below.

# Limitations

Apps Script API [cannot create scheduled triggers](https://developers.google.com/apps-script/api/how-tos/execute#limitations) so this must be done by-hand.
