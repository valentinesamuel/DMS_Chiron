FROM postgres:latest

# Install dos2unix
RUN apt-get update && apt-get install -y dos2unix

# Copy the initialization script
COPY ./init-db.sh /docker-entrypoint-initdb.d/

# Convert the script to Unix format
RUN dos2unix /docker-entrypoint-initdb.d/init-db.sh
