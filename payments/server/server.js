import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});

app.post("/api/donations", async (req, res) => {
  try {
    const {
      trees,
      amount,
      donor_name,
      email,
      phone,
      address,
      pan_number,
      tax_benefit,
      location,
      project_type,
      is_gift
    } = req.body;

    const donation = await pool.query(
      `INSERT INTO donations
      (
        trees,
        amount,
        donor_name,
        email,
        phone,
        address,
        pan_number,
        tax_benefit,
        location,
        project_type,
        is_gift,
        payment_status
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'SUCCESS'
      )
      RETURNING *`,
      [
        trees,
        amount,
        donor_name,
        email,
        phone,
        address,
        pan_number,
        tax_benefit,
        location,
        project_type,
        is_gift
      ]
    );

    res.json(donation.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save donation"
    });
  }
});

app.post("/api/donations/update", async (req, res) => {
  try {
    const {
      email,
      transaction_id,
      donation_id,
      payment_method,
      payment_status,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE donations
      SET
        transaction_id = $1,
        donation_id = $2,
        payment_method = $3,
        payment_status = $4
      WHERE email = $5
      RETURNING *
      `,
      [
        transaction_id,
        donation_id,
        payment_method,
        payment_status,
        email,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});