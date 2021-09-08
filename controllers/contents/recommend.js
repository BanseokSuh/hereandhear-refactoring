const { Op } = require("sequelize");
const { content } = require("../../models");

module.exports = {
  post: async (req, res) => {
    let { weather, month } = req.body;

    let foundData;

    if (weather) {
      foundData = await content
        .findAll({
          where: {
            weather: weather,
          },
          // plain: true
        })
        .catch((err) => res.json(err));
    } else if (month) {
      foundData = await content
        .findAll({
          where: {
            month: month,
          },
        })
        .catch((err) => res.json(err));
    }

    if (!foundData) {
      res.send("찾는 데이터가 없습니다.");
    }

    // 데이터 깔끔하게
    let arrangedData = foundData.map((el) => el.get({ plain: true }));

    let result = arrangedData[Math.floor(Math.random() * arrangedData.length)];

    // // 계절, 월, 위치 데이터 배열
    // let weatherResults = [];
    // let monthResults = [];
    // let locationResults = [];

    // // 각 배열에 할당
    // for (let el of arrangedData) {
    //   if (el.weather === weather) {
    //     weatherResults.push(el)
    //   }
    //   if (Number(el.month) === month) {
    //     monthResults.push(el);
    //   }
    //   if (el.location === location) {
    //     locationResults.push(el);
    //   }
    // }

    // // 각 배열에서 랜덤한 값 추출
    // let weatherData = weatherResults[Math.floor(Math.random() * weatherResults.length)]
    // let monthData = monthResults[Math.floor(Math.random() * monthResults.length)]
    // let locationData = locationResults[Math.floor(Math.random() * locationResults.length)]

    // // [날씨, 월, 위치]
    // let result = [weatherData, monthData, locationData];

    res.status(200).send(result);
  },
};
