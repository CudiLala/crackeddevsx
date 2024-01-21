CREATE TABLE jobs (
  job_id INT PRIMARY KEY,
  title VARCHAR NOT NULL,
  company VARCHAR NOT NULL,
  min_salary INT,
  max_salary INT,
  location_iso VARCHAR,
  job_type job_type,
  degree_required BOOLEAN DEFAULT FALSE,
  description VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  created_at TIMESTAMP,
  applications INT DEFAULT 0,
  views INT DEFAULT 0,
  technologies VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
  image_url VARCHAR
);

CREATE TYPE job_type AS ENUM (
  'full_time', 'part_time', 'freelance', 'internship', 'co_founder'
);