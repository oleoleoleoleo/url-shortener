# URL Shortener tech task

## Install

### Install back application

From back folder, run `npm install`

### Build and run DB container

From back folder,

Build DB image with:
`docker build -t shortenedurls-db .`

Run it with:
`docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=rootPassword -e MYSQL_DATABASE=ShortenedUrls -e MYSQL_USER=db_user -e MYSQL_PASSWORD=db_password shortenedurls-db`

### Start application

From back folder, run `npm start` to start application

## Swagger

For ease of testing, swagger ui can be reached on `http://localhost:3000/api-docs`

## Endpoints

### `POST '/'` :

With a body of `url` and options `slug`, will create a shortened url if slug or url is not yet present.

### `DELETE '/'`:

With a body of `slug`, will delete shortened Url if it exists.

### `GET '/{slug}'`:

Will redirect to url if slug exists.

### `GET '/info/{slug}'`:

Will give complete information of shortened url, if slug exists.

### `GET '/search?'`:

Will search for all shortened urls.
Available search params are:

##### `url=` - will match searched url

##### `slug=` will match searched slug

##### `limit=` will determine pagination limits, defaults to 10

##### `offset=` will determine pagination offset, defaults to 0

##### `sortBy=` will determine how the results are sorted, options are: `slug`, `url`, `hitCount`, `createdAt`, `updatedAt`,
