/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * @module watson-speech/speech-to-text/get-custid
 */

/**
 Returns a promise that resolves to an array of objects representing the available customization id.  Example:

 ```js
 {"customizations": [
   {
      "owner": "44b5fe0c-a8a9-4792-97f7-f2e11bd910a6",
      "base_model_name": "ja-JP_BroadbandModel",
      "customization_id": "524c137b-e9ac-47ab-baa6-2643e360519a",
      "dialect": "ja-JP",
      "versions": ["ja-JP_BroadbandModel.v2020-09-10"],
      "created": "2022-02-19T05:43:53.686Z",
      "name": "B-WatsonCafe",
      "description": "B-WatsonCafe",
      "progress": 100,
      "language": "ja-JP",
      "updated": "2022-02-20T00:59:30.840Z",
      "status": "available"
   },
   {
      ...
      ...
   }
 ]}

 ```
 Requires fetch, pollyfill available at https://github.com/github/fetch

 * @todo define format in @return statement
 * @param {Object} options
 * @param {String} options.url=https://api.us-south.speech-to-text.watson.cloud.ibm.com URL for Watson Speech to Text API
 * @param {String} options.token auth token for CF services
 * @param {String} options.accessToken IAM access token for RC services
 * @return {Promise<T>}
 */
module.exports = function getCustId(options) {
  if (!options || (!options.token && !options.accessToken)) {
    throw new Error('Watson SpeechToText: missing required auth parameter: options.token (CF) or options.accessToken (RC)');
  }
  var reqOpts = {
    credentials: 'omit',
    headers: {
      accept: 'application/json'
    }
  };
  var url = options.url || 'https://api.us-south.speech-to-text.watson.cloud.ibm.com';
  if (options.accessToken) {
    url = url + '/v1/customization?access_token=' + options.accessToken;
  } else {
    url = url + '/v1/customization?watson-token=' + options.token;
  }
  return fetch(url, reqOpts)
    .then(function(response) {
      return response.json();
    })
    .then(function(obj) {
      return obj.models;
    });
};
