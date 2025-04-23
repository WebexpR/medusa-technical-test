# Database Initialization

This directory contains scripts that will be automatically executed when the PostgreSQL container starts for the first time.

## How it works

- PostgreSQL Docker image executes all `.sql`, `.sql.gz`, and `.sh` scripts found in the `/docker-entrypoint-initdb.d` directory.
- Scripts are executed in filename order.
- These scripts only run when the database is initialized for the first time. If the database volume already exists, these scripts will not run.

## Current Scripts

- `01-create-database.sql`: Creates the `medusa_test` database and configures necessary extensions.

## Adding New Scripts

To add more initialization scripts:

1. Create a new SQL or shell script in this directory
2. Name it with a numerical prefix to control execution order (e.g., `02-create-tables.sql`)
3. Make sure it's executable if it's a shell script (`chmod +x script.sh`)

**Note:** If you need to rebuild the database from scratch, you will need to remove the volume:
```bash
docker-compose down -v
docker-compose up
``` 