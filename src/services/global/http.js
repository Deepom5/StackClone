import Qs from "qs";
import axios from "axios";

function shouldNotIncludeCredentials(url) {
  return (
    url.indexOf("search-staging") >= 0 ||
    url.indexOf("staging-websites") >= 0 ||
    url.indexOf("search-search-prod") >= 0
  );
}

function get(url, params, headers = undefined, body = {}) {
 
  if (params && params.params) {
    url = url + "?" + Qs.stringify(params.params);
  }
  return new Promise((success, failure) => {
    axios({
      url: url,
      params: params && params.params,
      responseType: "json",
      
      headers: { "Content-Type": "application/json", ...headers },
      ...body,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          success({ data: response.data });
        } else {
          failure({ data: response.data });
        }
      })
      .catch((error) => {
        failure({ data: error });
      });
  });
}



function post(url, data, headers = undefined, body = {}) {
  var isStaging = shouldNotIncludeCredentials(url);

  return new Promise((success, failure) => {
    axios({
      method: "post",
      url: url,
      data: data,
      responseType: "json",
      credentials: isStaging ? undefined : "include",
      headers: { ...headers },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          success({ data: response.data ?? response });
        } else {
          failure({ data: response.data ?? response });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          failure({ data: error.response.data });
        } else {
          failure({ data: error });
        }
      });
  });
}


export default {
  get,
  post,
 
};
