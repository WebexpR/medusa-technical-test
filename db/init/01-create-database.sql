-- Create additional database
CREATE DATABASE medusa_db_technical_test;

-- Connect to the newly created database
\c medusa_db_technical_test

-- Create schemas and extensions as needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE medusa_db_technical_test TO postgres; 