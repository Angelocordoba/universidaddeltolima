import express from "express";
import supabase from "../services/supabaseClient.js";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";

const router = express.Router();

// ===========================================================
// 📤 Export CSV
// ===========================================================
router.get("/csv/:vista", async (req, res) => {
  const { vista } = req.params;
  const { data, error } = await supabase.from(vista).select("*");
  if (error) return res.status(400).json({ error: error.message });

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment(`${vista}.csv`);
  return res.send(csv);
});

// ===========================================================
// 📊 Export Excel (.xlsx)
// ===========================================================
router.get("/excel/:vista", async (req, res) => {
  const { vista } = req.params;
  const { data, error } = await supabase.from(vista).select("*");
  if (error) return res.status(400).json({ error: error.message });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Datos");

  if (data.length > 0) {
    sheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));
    data.forEach(row => sheet.addRow(row));
  }

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${vista}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
});

export default router;
