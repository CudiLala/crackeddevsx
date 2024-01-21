

CREATE TABLE jobs (
  job_id INT PRIMARY KEY,
  title VARCHAR NOT NULL,
  company VARCHAR NOT NULL,
  min_salary_usd INT,
  max_salary_usd INT,
  location_iso VARCHAR,
  job_type VARCHAR,
  degree_required BOOLEAN DEFAULT FALSE,
  description VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  created_at TIMESTAMP,
  applications INT DEFAULT 0,
  views INT DEFAULT 0,
  technologies VARCHAR[],
  image_url VARCHAR
);

