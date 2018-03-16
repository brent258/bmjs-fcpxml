const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const OAuth2 = google.auth.OAuth2;

let SCOPES = ['https://www.googleapis.com/auth/youtube.readonly','https://www.googleapis.com/auth/youtube.upload',
'https://www.googleapis.com/auth/youtube'];
let TOKEN_DIR = 'credentials';
let TOKEN_FILE = 'token.json';
let API_KEY = 'client_secret.json';
let API_DIR = '';

module.exports = function(videoParams,apiParams) {
  return new Promise((resolve,reject) => {
    if (!videoParams || typeof videoParams !== 'object' || !videoParams.file) {
      reject('Unable to upload video without video parameters.');
    }
    if (!videoParams.category) videoParams.category = '15';
    if (!videoParams.title) videoParams.title = 'My video';
    if (!videoParams.description) videoParams.description = 'This is a description of my video...';
    if (!videoParams.privacy) videoParams.privacy = 'private';
    if (!videoParams.keywords) videoParams.keywords = ['nodejs','javascript'];
    if (!apiParams) apiParams = {};
    if (apiParams.api) API_DIR = apiParams.api;
    if (apiParams.scopes) SCOPES = apiParams.scopes;
    if (apiParams.dir) TOKEN_DIR = apiParams.dir;
    if (apiParams.token) TOKEN_FILE = apiParams.token;
    if (apiParams.key) API_KEY = apiParams.key;
    TOKEN_DIR = API_DIR ? API_DIR + TOKEN_DIR : TOKEN_DIR;
    API_KEY = API_DIR ? API_DIR + API_KEY : API_KEY;

    let TOKEN_PATH = TOKEN_DIR + '/' + TOKEN_FILE;
    let credentials;
    try {
      credentials = JSON.parse(fs.readFileSync(API_KEY));
    }
    catch (err) {
      reject(err);
    }

    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId,clientSecret,redirectUrl);
    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client
    });

    function authorize(oauth2Client,callback) {
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
          getNewToken(oauth2Client,callback);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          callback(oauth2Client);
        }
      });
    }

    function getNewToken(oauth2Client,callback) {
      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      console.log('Authorize this app by visiting this url: ', authUrl);
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Enter the code from that page here: ', code => {
        rl.close();
        oauth2Client.getToken(code, (err,token) => {
          if (err) {
            reject(err);
          }
          oauth2Client.credentials = token;
          storeToken(token);
          callback(oauth2Client);
        });
      });
    }

    function storeToken(token) {
      try {
        fs.mkdirSync(TOKEN_DIR);
      } catch (err) {
        if (err.code != 'EEXIST') {
          reject(err);
        }
      }
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) {
          reject(err);
        }
        else {
          console.log('Token stored to: ' + TOKEN_PATH);
        }
      });
    }

    function upload(filename,callback) {
      console.log('Uploading video: ' + filename);
      console.log('Please wait...');
      youtube.videos.insert({
        part: 'id,snippet,status',
        notifySubscribers: false,
        resource: {
          snippet: {
            title: videoParams.title,
            description: videoParams.description,
            categoryId: videoParams.category,
            tags: videoParams.keywords
          },
          status: {
            privacyStatus: videoParams.privacy
          }
        },
        media: {
          body: fs.createReadStream(filename)
        }
      }, (err,res) => {
        if (err) {
          reject(err);
        }
        else {
          callback(res.data);
        }
      });
    }

    authorize(oauth2Client, () => {
      upload(videoParams.file, () => {
        resolve('Finished upload.');
      });
    });
  });
};
