const general = {
  port: 3000,
};

const firebase = {
  apiKey: 'AIzaSyBrS-5hnPHKAzZhIbjv52j2nNYZLi9HDn4',
  authDomain: 'int20h-c53da.firebaseapp.com',
  databaseURL: 'https://int20h-c53da.firebaseio.com',
  storageBucket: 'bucket.appspot.com',
};

const flickr = {
  apiKey: 'ccae4d36e13dc2038bf32014adf1b64a',
  secret: 'bee23d631426ba3a',
  baseUrl: 'https://api.flickr.com/services/rest',
};

const facepp = {
  apiKey: 'x-q8iByG34SuZR3TFIh6UbWLIkSrrsyM',
  apiSecret: 'ymjVxDrcYSh7Z97g630zVm1WfZkfiokw',
  baseUrl: 'https://api-us.faceplusplus.com/facepp/v3/detect',
  request: { frequency: 0 },
};

module.exports = {
  general,
  firebase,
  flickr,
  facepp,
};
