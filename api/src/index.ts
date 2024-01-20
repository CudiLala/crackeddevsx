import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool();

const app = express();

app.use(express.json());

app.get("/get-jobs", async (req, res) => {
  let q = req.query.q?.toString().trim() || "";

  let on = (
    req.query.on?.toString().trim().split(",") || [
      "company",
      "title",
      "technologies",
    ]
  ).filter((e) => ["company", "title", "technologies"].includes(e));

  let min_salary_usd = Number(req.query.min_salary_usd?.toString().trim()) || 0;

  let max_salary_usd = Number(req.query.max_salary_usd?.toString().trim()) || 0;

  let job_type = (
    req.query.job_type?.toString().trim().split(",") || []
  ).filter((e) =>
    [
      "full_time",
      "part_time",
      "freelance",
      "internship",
      "co_founder",
    ].includes(e)
  );

  let degree_required = req.query.degree_required?.toString().trim() || "false";

  let sort_by = req.query.sort_by?.toString().trim() || "";

  let limit = Number(req.query.limit?.toString().trim()) || 10;

  let page = Number(req.query.page?.toString().trim()) || 1;

  let querytext = "SELECT * FROM jobs WHERE ";
  let queryvalues = [];

  let i = 1;

  if (min_salary_usd) {
    querytext += `min_salary = $${i++} AND `;
    queryvalues.push(min_salary_usd);
  }
  if (max_salary_usd) {
    querytext += `max_salary = $${i++} AND `;
    queryvalues.push(max_salary_usd);
  }
  if (job_type.length > 0) {
    querytext += `job_type =  ANY ($${i++}) AND `;
    queryvalues.push(job_type);
  }
  if (degree_required == "true") {
    querytext += `degree_required = $${i++} AND `;
    queryvalues.push(degree_required);
  }

  if (q && on.length > 0) {
    querytext += "( ";
    if (on.includes("company")) querytext += `company ~* $${i} OR `;
    if (on.includes("title")) querytext += `title ~* $${i} OR `;
    if (on.includes("technologies"))
      querytext += `array_to_string(technologies, ',') ~* $${i} OR `;

    if (querytext.endsWith("OR "))
      querytext = querytext.slice(0, querytext.length - 3);

    querytext += ") AND ";

    queryvalues.push(q.replace(/\W+/g, "|"));

    i++;
  }

  querytext += "true ";

  let sort = sort_by.split(":");

  if (sort[1] != "desc") sort[1] = "asc";

  if (sort[0] == "salary" && sort[1] == "desc")
    querytext += "ORDER BY max_salary_usd DESC NULLS LAST ";
  else if (sort[0] == "salary" && sort[1] == "asc")
    querytext += "ORDER BY min_salary_usd ASC NULLS LAST ";
  else if (sort[0] == "applications" && sort[1] == "asc")
    querytext += "ORDER BY applications ASC NULLS LAST ";
  else if (sort[0] == "applications" && sort[1] == "desc")
    querytext += "ORDER BY applications DESC NULLS LAST ";
  else if (sort[0] == "views" && sort[1] == "asc")
    querytext += "ORDER BY views ASC NULLS LAST ";
  else if (sort[0] == "views" && sort[1] == "desc")
    querytext += "ORDER BY views DESC NULLS LAST ";
  else if (sort[0] == "created_at" && sort[1] == "asc")
    querytext += "ORDER BY created_at ASC NULLS LAST ";
  else if (sort[0] == "created_at" && sort[1] == "desc")
    querytext += "ORDER BY created_at DESC NULLS LAST ";

  querytext += `LIMIT $${i++} OFFSET $${i++} `;

  queryvalues.push(limit, (page - 1) * limit);

  const client = await pool.connect();

  let rows;

  try {
    const query = {
      text: querytext,
      values: queryvalues,
    };

    rows = (await client.query(query)).rows;
  } catch (error) {
    return res.status(500).json({ success: false, error });
  } finally {
    client.release();
  }

  res.status(200).json({ succes: true, data: rows });
});

app.post("/refresh-jobs", async (req, res) => {
  let page = 1;
  let jobs: any[];

  const client = await pool.connect();

  try {
    do {
      const jobsRes = await fetch(
        `https://api.crackeddevs.com/api/get-jobs?limit=30&page=${page}`,
        {
          headers: {
            "api-key": process.env.CRACKED_DEVS_API_KEY!,
          },
        }
      );

      jobs = await jobsRes.json();

      for (const job of jobs) {
        const query = {
          name: "refreshjobs",
          text: `INSERT INTO jobs 
             (job_id, title, company, min_salary_usd, max_salary_usd, location_iso, job_type, degree_required, description, url, created_at, applications, views, technologies, image_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT (job_id) DO NOTHING`,
          values: [
            job.id,
            job.title,
            job.company,
            job.min_salary_usd,
            job.max_salary_usd,
            job.location,
            job.job_type,
            job.degree_required,
            job.description,
            job.url,
            job.created_at,
            job.applications,
            job.views,
            job.technologies,
            job.image_url,
          ],
        };

        await client.query(query);
      }

      page++;
    } while (jobs.length != 0);

    client.release();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ success: false, message: "Path not found" });
});

app.listen(process.env.PORT || 9000, () =>
  console.log(`app running on port ${process.env.PORT || 9000}`)
);
