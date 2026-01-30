import { db } from "../config/db.js";

export async function createDonor(data: any) {
  const {
    name,
    donorId,
    phone,
    email,
    bloodGroup,
    department,
    year,
    gender,
  } = data;

  const sql = `
    INSERT INTO donors
    (name, donor_id, phone, email, blood_group, department, year, gender)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    donorId,
    phone,
    email,
    bloodGroup,
    department,
    year,
    gender,
  ];

  const [result] = await db.execute(sql, values);
  return result;
}

export async function getAllDonors() {
  const [rows] = await db.execute("SELECT * FROM donors ORDER BY id DESC");
  return rows;
}
