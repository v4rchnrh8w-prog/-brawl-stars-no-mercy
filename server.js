const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLUB_TAG = "#82982PR9C";
const API_BASE = "https://api.brawlstars.com/v1";

app.use(express.static(path.join(__dirname, "public")));

async function brawl(pathname) {
  if (!process.env.BRAWL_API_TOKEN) {
    throw new Error("BRAWL_API_TOKEN não configurado.");
  }
  const r = await fetch(API_BASE + pathname, {
    headers: { Authorization: `Bearer ${process.env.BRAWL_API_TOKEN}` }
  });
  const body = await r.text();
  if (!r.ok) throw new Error(`Brawl API ${r.status}: ${body}`);
  return JSON.parse(body);
}

app.get("/api/club", async (_req,res) => {
  try {
    const club = await brawl(`/clubs/${encodeURIComponent(CLUB_TAG)}`);
    res.json(club);
  } catch(e) {
    res.status(502).json({error:e.message});
  }
});

app.get("/api/club/members", async (_req,res) => {
  try {
    const data = await brawl(`/clubs/${encodeURIComponent(CLUB_TAG)}/members?limit=30`);
    res.json(data);
  } catch(e) {
    res.status(502).json({error:e.message});
  }
});

app.get("/api/health", (_req,res)=>res.json({ok:true, clubTag:CLUB_TAG}));

app.use((app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, ()=>console.log(`Dashboard em http://localhost:${PORT}`));
