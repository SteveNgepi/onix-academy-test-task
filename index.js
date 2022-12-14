const { response } = require("express");
const express = require("express");
const axios = require("axios").default;

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/rates", (req, res) => {
  const crypto = req.query.currency;

  if (!crypto) {
    res.status(404).send({ message: "Enter cryptocurrency!" });
  }

  const config = {
    method: "get",
    url: `http://api.coincap.io/v2/assets/${crypto}`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      const { priceUsd } = response.data.data;
      res.send(`"usd": "${priceUsd}"`);
    })
    .catch(() => {
      res.status(404).send({ message: "Non-existent cryptocurrency!" });
    });
});

app.listen(PORT, () => {
  console.log("Сервер начал прослушивание запросов на порту " + PORT);
});
