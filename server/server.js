const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");

const { Controller } = require("./Components/TrafficController");
const Timer = require("./Components/Timer");
const { Status } = require("./Components/Model");
const { Logger } = require("./Components/Utils");

const controller = new Controller();
const timer = new Timer();
timer.addObserver(controller);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", function (request, response){
    response.status(200).send("Hello");
})


app.get("/state", function (request, response){
  response.status(200).send(controller.getState().toObject());
})

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));

(async () => {
    try {  
      Logger.info("started running...");

      await timer.startCountDown(5);
      controller.status = Status.STARTED;
      await timer.startTimer(1);
    } catch (error) {
      console.error(error);
    }
})();