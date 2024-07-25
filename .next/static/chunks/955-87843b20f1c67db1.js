"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[955],{622:function(e,t,n){/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s=n(2265),o=Symbol.for("react.element"),r=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,n){var s,r={},c=null,d=null;for(s in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)i.call(t,s)&&!l.hasOwnProperty(s)&&(r[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps)void 0===r[s]&&(r[s]=t[s]);return{$$typeof:o,type:e,key:c,ref:d,props:r,_owner:a.current}}t.Fragment=r,t.jsx=q,t.jsxs=q},7437:function(e,t,n){e.exports=n(622)},5654:function(e,t,n){var s,o,r,i,a,l,c,d,u,h,f,E,p,g,_,m;n.d(t,{$D:function(){return GoogleGenerativeAI},MN:function(){return o},OA:function(){return s}});/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let R=["user","model","function"];(u=s||(s={})).HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",u.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",u.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",u.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",u.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",(h=o||(o={})).HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",h.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",h.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",h.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",h.BLOCK_NONE="BLOCK_NONE",(f=r||(r={})).HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",f.NEGLIGIBLE="NEGLIGIBLE",f.LOW="LOW",f.MEDIUM="MEDIUM",f.HIGH="HIGH",(E=i||(i={})).BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",E.SAFETY="SAFETY",E.OTHER="OTHER",(p=a||(a={})).FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",p.STOP="STOP",p.MAX_TOKENS="MAX_TOKENS",p.SAFETY="SAFETY",p.RECITATION="RECITATION",p.OTHER="OTHER",(g=l||(l={})).TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",g.RETRIEVAL_QUERY="RETRIEVAL_QUERY",g.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",g.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",g.CLASSIFICATION="CLASSIFICATION",g.CLUSTERING="CLUSTERING",(_=c||(c={})).STRING="STRING",_.NUMBER="NUMBER",_.INTEGER="INTEGER",_.BOOLEAN="BOOLEAN",_.ARRAY="ARRAY",_.OBJECT="OBJECT";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let GoogleGenerativeAIError=class GoogleGenerativeAIError extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}};let GoogleGenerativeAIResponseError=class GoogleGenerativeAIResponseError extends GoogleGenerativeAIError{constructor(e,t){super(e),this.response=t}};(m=d||(d={})).GENERATE_CONTENT="generateContent",m.STREAM_GENERATE_CONTENT="streamGenerateContent",m.COUNT_TOKENS="countTokens",m.EMBED_CONTENT="embedContent",m.BATCH_EMBED_CONTENTS="batchEmbedContents";let RequestUrl=class RequestUrl{constructor(e,t,n,s,o){this.model=e,this.task=t,this.apiKey=n,this.stream=s,this.requestOptions=o}toString(){var e;let t=(null===(e=this.requestOptions)||void 0===e?void 0:e.apiVersion)||"v1",n=`https://generativelanguage.googleapis.com/${t}/${this.model}:${this.task}`;return this.stream&&(n+="?alt=sse"),n}};async function makeRequest(e,t,n){let s;try{if(!(s=await fetch(e.toString(),Object.assign(Object.assign({},function(e){let t={};if((null==e?void 0:e.timeout)>=0){let n=new AbortController,s=n.signal;setTimeout(()=>n.abort(),e.timeout),t.signal=s}return t}(n)),{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-client":"genai-js/0.3.0","x-goog-api-key":e.apiKey},body:t}))).ok){let e="";try{let t=await s.json();e=t.error.message,t.error.details&&(e+=` ${JSON.stringify(t.error.details)}`)}catch(e){}throw Error(`[${s.status} ${s.statusText}] ${e}`)}}catch(n){let t=new GoogleGenerativeAIError(`Error fetching from ${e.toString()}: ${n.message}`);throw t.stack=n.stack,t}return s}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function addHelpers(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){var t,n,s,o;if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),hadBadFinishReason(e.candidates[0]))throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(e)}`,e);return(null===(o=null===(s=null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)||void 0===s?void 0:s[0])||void 0===o?void 0:o.text)?e.candidates[0].content.parts.map(({text:e})=>e).join(""):""}if(e.promptFeedback)throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){var t,n,s,o;if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function call from the first candidate only. Access response.candidates directly to use the other candidates.`),hadBadFinishReason(e.candidates[0]))throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(e)}`,e);return null===(o=null===(s=null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)||void 0===s?void 0:s[0])||void 0===o?void 0:o.functionCall}if(e.promptFeedback)throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(e)}`,e)},e}let C=[a.RECITATION,a.SAFETY];function hadBadFinishReason(e){return!!e.finishReason&&C.includes(e.finishReason)}function formatBlockErrorMessage(e){var t,n,s;let o="";if((!e.candidates||0===e.candidates.length)&&e.promptFeedback)o+="Response was blocked",(null===(t=e.promptFeedback)||void 0===t?void 0:t.blockReason)&&(o+=` due to ${e.promptFeedback.blockReason}`),(null===(n=e.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);else if(null===(s=e.candidates)||void 0===s?void 0:s[0]){let t=e.candidates[0];hadBadFinishReason(t)&&(o+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(o+=`: ${t.finishMessage}`))}return o}function __await(e){return this instanceof __await?(this.v=e,this):new __await(e)}"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let O=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function getResponsePromise(e){let t=[],n=e.getReader();for(;;){let{done:e,value:s}=await n.read();if(e)return addHelpers(function(e){let t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(let t of e)if(t.candidates)for(let e of t.candidates){let t=e.index;if(n.candidates||(n.candidates=[]),n.candidates[t]||(n.candidates[t]={index:e.index}),n.candidates[t].citationMetadata=e.citationMetadata,n.candidates[t].finishReason=e.finishReason,n.candidates[t].finishMessage=e.finishMessage,n.candidates[t].safetyRatings=e.safetyRatings,e.content&&e.content.parts){n.candidates[t].content||(n.candidates[t].content={role:e.content.role||"user",parts:[]});let s={};for(let o of e.content.parts)o.text&&(s.text=o.text),o.functionCall&&(s.functionCall=o.functionCall),0===Object.keys(s).length&&(s.text=""),n.candidates[t].content.parts.push(s)}}return n}(t));t.push(s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function generateContentStream(e,t,n,s){let o=new RequestUrl(t,d.STREAM_GENERATE_CONTENT,e,!0,s),r=await makeRequest(o,JSON.stringify(n),s);return function(e){let t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=function(e){let t=e.getReader(),n=new ReadableStream({start(e){let n="";return function pump(){return t.read().then(({value:t,done:s})=>{let o;if(s){if(n.trim()){e.error(new GoogleGenerativeAIError("Failed to parse stream"));return}e.close();return}let r=(n+=t).match(O);for(;r;){try{o=JSON.parse(r[1])}catch(t){e.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${r[1]}"`));return}e.enqueue(o),r=(n=n.substring(r[0].length)).match(O)}return pump()})}()}});return n}(t),[s,o]=n.tee();return{stream:function(e){return function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(e,t||[]),r=[];return s={},verb("next"),verb("throw"),verb("return"),s[Symbol.asyncIterator]=function(){return this},s;function verb(e){o[e]&&(s[e]=function(t){return new Promise(function(n,s){r.push([e,t,n,s])>1||resume(e,t)})})}function resume(e,t){try{var n;(n=o[e](t)).value instanceof __await?Promise.resolve(n.value.v).then(fulfill,reject):settle(r[0][2],n)}catch(e){settle(r[0][3],e)}}function fulfill(e){resume("next",e)}function reject(e){resume("throw",e)}function settle(e,t){e(t),r.shift(),r.length&&resume(r[0][0],r[0][1])}}(this,arguments,function*(){let t=e.getReader();for(;;){let{value:e,done:n}=yield __await(t.read());if(n)break;yield yield __await(addHelpers(e))}})}(s),response:getResponsePromise(o)}}(r)}async function generateContent(e,t,n,s){let o=new RequestUrl(t,d.GENERATE_CONTENT,e,!1,s),r=await makeRequest(o,JSON.stringify(n),s),i=await r.json(),a=addHelpers(i);return{response:a}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function formatNewContent(e){let t=[];if("string"==typeof e)t=[{text:e}];else for(let n of e)"string"==typeof n?t.push({text:n}):t.push(n);return function(e){let t={role:"user",parts:[]},n={role:"function",parts:[]},s=!1,o=!1;for(let r of e)"functionResponse"in r?(n.parts.push(r),o=!0):(t.parts.push(r),s=!0);if(s&&o)throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new GoogleGenerativeAIError("No content is provided for sending chat message.");return s?t:n}(t)}function formatGenerateContentInput(e){if(e.contents)return e;{let t=formatNewContent(e);return{contents:[t]}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let A=["text","inlineData","functionCall","functionResponse"],T={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall"]},I={user:["model"],function:["model"],model:["user","function"]},N="SILENT_ERROR";let ChatSession=class ChatSession{constructor(e,t,n,s){this.model=t,this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(function(e){let t;for(let n of e){let{role:e,parts:s}=n;if(!t&&"user"!==e)throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${e}`);if(!R.includes(e))throw new GoogleGenerativeAIError(`Each item should include role field. Got ${e} but valid roles are: ${JSON.stringify(R)}`);if(0===s.length)throw new GoogleGenerativeAIError("Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0};for(let e of s)for(let t of A)t in e&&(o[t]+=1);let r=T[e];for(let t of A)if(!r.includes(t)&&o[t]>0)throw new GoogleGenerativeAIError(`Content with role '${e}' can't contain '${t}' part`);if(t){let n=I[e];if(!n.includes(t.role))throw new GoogleGenerativeAIError(`Content with role '${e}' can't follow '${t.role}'`)}t=n}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e){var t,n,s;let o;await this._sendPromise;let r=formatNewContent(e),i={safetySettings:null===(t=this.params)||void 0===t?void 0:t.safetySettings,generationConfig:null===(n=this.params)||void 0===n?void 0:n.generationConfig,tools:null===(s=this.params)||void 0===s?void 0:s.tools,contents:[...this._history,r]};return this._sendPromise=this._sendPromise.then(()=>generateContent(this._apiKey,this.model,i,this.requestOptions)).then(e=>{var t;if(e.response.candidates&&e.response.candidates.length>0){this._history.push(r);let n=Object.assign({parts:[],role:"model"},null===(t=e.response.candidates)||void 0===t?void 0:t[0].content);this._history.push(n)}else{let t=formatBlockErrorMessage(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}o=e}),await this._sendPromise,o}async sendMessageStream(e){var t,n,s;await this._sendPromise;let o=formatNewContent(e),r={safetySettings:null===(t=this.params)||void 0===t?void 0:t.safetySettings,generationConfig:null===(n=this.params)||void 0===n?void 0:n.generationConfig,tools:null===(s=this.params)||void 0===s?void 0:s.tools,contents:[...this._history,o]},i=generateContentStream(this._apiKey,this.model,r,this.requestOptions);return this._sendPromise=this._sendPromise.then(()=>i).catch(e=>{throw Error(N)}).then(e=>e.response).then(e=>{if(e.candidates&&e.candidates.length>0){this._history.push(o);let t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{let t=formatBlockErrorMessage(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}}).catch(e=>{e.message!==N&&console.error(e)}),i}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function countTokens(e,t,n,s){let o=new RequestUrl(t,d.COUNT_TOKENS,e,!1,{}),r=await makeRequest(o,JSON.stringify(Object.assign(Object.assign({},n),{model:t})),s);return r.json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function embedContent(e,t,n,s){let o=new RequestUrl(t,d.EMBED_CONTENT,e,!1,{}),r=await makeRequest(o,JSON.stringify(n),s);return r.json()}async function batchEmbedContents(e,t,n,s){let o=new RequestUrl(t,d.BATCH_EMBED_CONTENTS,e,!1,{}),r=n.requests.map(e=>Object.assign(Object.assign({},e),{model:t})),i=await makeRequest(o,JSON.stringify({requests:r}),s);return i.json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let GenerativeModel=class GenerativeModel{constructor(e,t,n){this.apiKey=e,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.requestOptions=n||{}}async generateContent(e){let t=formatGenerateContentInput(e);return generateContent(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools},t),this.requestOptions)}async generateContentStream(e){let t=formatGenerateContentInput(e);return generateContentStream(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools},t),this.requestOptions)}startChat(e){return new ChatSession(this.apiKey,this.model,Object.assign({tools:this.tools},e),this.requestOptions)}async countTokens(e){let t=formatGenerateContentInput(e);return countTokens(this.apiKey,this.model,t)}async embedContent(e){let t=function(e){if("string"==typeof e||Array.isArray(e)){let t=formatNewContent(e);return{content:t}}return e}(e);return embedContent(this.apiKey,this.model,t)}async batchEmbedContents(e){return batchEmbedContents(this.apiKey,this.model,e,this.requestOptions)}};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let GoogleGenerativeAI=class GoogleGenerativeAI{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new GoogleGenerativeAIError("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new GenerativeModel(this.apiKey,e,t)}}}}]);