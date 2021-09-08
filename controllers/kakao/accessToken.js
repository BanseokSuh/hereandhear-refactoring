const { default: axios } = require("axios");
var qs = require("qs");

module.exports = {
  post: async (req, res) => {
    const { authorizationCode } = req.body;

    var data = qs.stringify({
      grant_type: "authorization_code",
      client_id: "486e2bb9e00eb478cc738f9c518eb926",
      redirect_uri: "https://hereandhear.kr/",
      code: authorizationCode,
    });
    var config = {
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.access_token);
        res.status(200).json({ accessToken: response.data.access_token });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
