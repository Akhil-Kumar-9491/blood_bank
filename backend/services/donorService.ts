import * as donorModel from "../models/donorModel.js";

export async function registerDonorService(data: any) {
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

  if (
    !name ||
    !donorId ||
    !phone ||
    !email ||
    !bloodGroup ||
    !department ||
    !year ||
    !gender
  ) {
    throw new Error("Missing required fields");
  }

  return await donorModel.createDonor({
    name,
    donorId,
    phone,
    email,
    bloodGroup,
    department,
    year,
    gender,
  });
}

export async function getAllDonorsService() {
  return await donorModel.getAllDonors();
}
