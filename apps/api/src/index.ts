import express from "express";

const app = express();

app.get("/health", (_req, res) => res.type("text/plain").send("ok"));

const PORT = Number(process.env.PORT ?? 3333);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[API] Online em http://0.0.0.0:${PORT}`);
});
