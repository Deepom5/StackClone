import QuestionsResource from "./QuestionsResource";

const QuestionsManager = function (QuestionsResource) {
  function getQuestions(params, successCallback, errorCallback) {
    QuestionsResource.getQuestions(params).then(
      function (logoutResponse) {
        successCallback(logoutResponse);
      },
      function (error) {
        errorCallback(error);
      }
    );
  }

  return {
    getQuestions,
  };
};

export default QuestionsManager(QuestionsResource);
