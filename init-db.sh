#!/bin/bash
set -e

# Connect to the default 'postgres' database to create the new databases
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
  CREATE DATABASE authdb;
  CREATE DATABASE patientdb;
EOSQL
