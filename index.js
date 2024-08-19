const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, to } = req.body;

  try {
    const response = await axios.post(
      "https://translate.google.com/_/TranslateWebserverUi/data/batchexecute",
      {},
      {
        params: {
          rpcids: "MkEWBc",
          "f.req": JSON.stringify([[[text, to]]]),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
