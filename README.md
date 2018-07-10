# Groopy API

> Backend application for Groopy app

> [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

For the frontend repository refer to:

https://github.com/marlonbs/groopy-react

## Table of contents

- [Getting started](#getting-started)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Developer](#developer)
- [License](#license)

## Getting started

A few things you have to take in consideration before using Groopy Backend

After cloning the repo you'll have to :

### Install global and local dependencies:

- [Node](https://nodejs.org/en/): `brew install node`
- [Npm](https://www.npmjs.com/): `npm install`
- [Homebrew](https://brew.sh/)

### Install mongodb database

- Install MongoDB database, install Homebrew service and install:

```bash
brew install mongodb
brew tap homebrew/services
brew services start mongodb
```

- For more detailed info about installing MongoDB refer to official documentation:
  https://docs.mongodb.com/manual/administration/install-community/

- In order to correctly create the database, create an **.env** file in the root server folder with this structure:

```dotenv
ENV=development
PORT=<backend-port>
DB_HOST=<hostname>
DB_NAME=<database-name>
JWT_SECRET=<jwt-secret-string>
JWT_AUTH_LIFETIME=<jwt-lifetime>
S3_BUCKET=<s3-bucket-name>
S3_PUBLIC_URL=<s3-bucket-url>
AWS_ACCESS_KEY=<aws-access-key>
AWS_SECRET_ACCESS_KEY=<aws-secret-access-key>
DEFAULT_AVATAR=<default-avatar-img>
```

> When running the server it will automatically create a new database

## Usage

Start the server for development:

```bash
cd groopy-api
npm run dev
```

## Tech Stack

- [Koa](https://koajs.com/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com/)
- [AWS SDK](https://aws.amazon.com/es/sdk-for-node-js/)

## Developer

- Marlon Becker - [GitHub](https://github.com/marlonbs) - [LinkedIn](https://www.linkedin.com/in/marlon-becker-santos)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/marlonbs/groopy-backend/blob/master/LICENSE) file for details
