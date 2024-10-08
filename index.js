const express = require("express");
const { translate } = require("@vitalets/google-translate-api");
const app = express();

app.use(express.json());

app.post("/myTranslate", (req, res) => {
  const { text, fromLang, toLang } = req.body;

  // Perform the translation
  translate(text, { from: fromLang, to: toLang })
    .then((response) => {
      // Send the translated text as response
      res.status(200).json({ translatedText: response.text });
    })
    .catch((err) => {
      console.error("Error during translation:", err);
      res.status(500).json({ error: "Translation failed" });
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
