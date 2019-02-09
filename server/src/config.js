const general = {
  port: 3000,
};

const db = {
  username: 'int20hUser',
  password: '1234',
  host: '51.68.215.200',
  port: '27017',
  database: 'int20h-testdb',
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
  request: { frequency: 1500 },
};

module.exports = {
  general,
  db,
  flickr,
  facepp,
};
