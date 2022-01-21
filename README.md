# Archive Albums
Simple and easy-to-use WebApp for keeping track of albums you have listened to/want to listen to.

## Prereqs
Make sure you have Docker installed and running.

## To run locally

```bash
docker-compose up --build
```

## To run production server

```bash
docker build --rm . -t frontend:latest
docker run --rm -it -p 3001:8080 frontend:latest
```
