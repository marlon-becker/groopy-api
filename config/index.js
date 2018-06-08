module.exports = {
  development: {
    PORT: 3000,
    DB_HOST: 'localhost',
    DB_NAME: 'groopy',
    JWT_SECRET: '8414915588',
    JWT_AUTH_LIFETIME: 21600,
    S3_BUCKET: 'groopy',
    S3_PUBLIC_URL: 'https://s3.eu-west-3.amazonaws.com/groopy/',
    AWS_ACCESS_KEY: 'AKIAJ6IQXCVKNDYWHCCQ',
    AWS_SECRET_ACCESS_KEY: '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',
    DEFAULT_AVATAR: 'https://s3.eu-west-3.amazonaws.com/groopy/default_avatar.jpg',
  },
  production: {

  }
};
