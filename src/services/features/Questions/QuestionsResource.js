import $http from "../../global/http";

const QuestionsResource = function ($http) {
  function getQuestions(params) {
    var url = `https://api.stackexchange.com/2.3/questions?page=${
      params.page || 1
    }&pagesize=${params.pagesize || 10}&order=${params?.order || "desc"}&sort=${
      params.sort || "hot"
    }&tagged=${params.tag || "nodejs"}&site=stackoverflow`;

    console.log("getQuestions URL==>", url);
    console.log("getQuestions params==>", params);
    return $http.get(url, params, params?.headers);
  }

  return {
    getQuestions,
  };
};

export default QuestionsResource($http);
