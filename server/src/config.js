const general = {
  port: 3000,
};

const firebase = {
  apiKey: 'AIzaSyCyaz-C8-KHmRPBf2c4SNl7T6KO9P1GncY',
  authDomain: 'int20h-test.firebaseapp.com',
  databaseURL: 'https://int20h-test.firebaseio.com',
  storageBucket: 'int20h-test.appspot.com',
  projectId: 'int20h-test',
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
