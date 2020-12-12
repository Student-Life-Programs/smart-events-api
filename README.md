# smart-events-api
Owned by SLP

## Install locally
* `bundle install`
* `touch .env`
* Add secrets to .env

## Nginx
This API uses Nginx, a reverse proxy server which sends requests from the server root to express
* Edit the config file: `sudo vi /etc/nginx/nginx.conf`
* Check the syntax: `sudo nginx -t`
* Restart the nginx reverse proxy: `sudo systemctl restart nginx`
* Check status: `sudo systemctl status nginx`

## API Routes
### Events
`/api/events`
- GET, POST

`/api/events/{id}`
- GET, PUT, DELETE

### Attractions
`/api/attractions`
- GET, POST

`/api/attractions/{id}`
- GET, PUT, DELETE

### Engagements
`/api/engagements`
- GET, POST

`/api/engagements/{id}`
- GET, PUT, DELETE

`/api/engagements/{id}/engagees`
- GET

### Engagees
`/api/engagees`
- GET, POST

`/api/engagees/{id}`
- GET, PUT, DELETE