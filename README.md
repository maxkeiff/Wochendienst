# Wochendienst

This website displays the tasks of the weekly service of our student community and who is currently assigned.
The project includes a website and a NodeJS server which accesses a MySQL database. The server can be run in a Docker with port 5000 mapped outside:

```bash
# Build docker image and save it as file
docker build . -t max/plex-db-api
docker save max/plex-db-api -o plex-db-api.tar

# Run container from image and map port
docker run -p 5000:5000 -d max/plex-db-api
```
