const express = require("express");
var cors = require("cors");

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  const { number } = req.body;

  let isPrime = true;
  let dividers = [];

  const calculateDividers = num => {
    if (num != 1) dividers.push(1);
    if (num == 1) isPrime = false;
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        dividers.push(i);
        isPrime = false;
      }
    }
    dividers.push(num);
  };

  calculateDividers(number);

  if (isPrime) {
    isPrime = " Sim";
  } else {
    isPrime = " Não";
  }

  return res.send({ resultPrime: isPrime, resultDividers: dividers });
});

app.listen(port, () => console.log(`Server running at port ${port}`));
