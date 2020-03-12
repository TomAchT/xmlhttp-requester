/* global XMLHttpRequest */

import {assertType, isString} from '@flexio-oss/assert'
import {XmlHttpResponseDelegateBuilder} from '../XmlHttpResponseDelegate'
import {SyncExecutor} from './SyncExecutor'


/**
 * @implements {ExecutorRequesterInterface}
 */
export class Executor extends SyncExecutor {

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  get(xmlhttpRequestDelegate, callback) {
    this.exec(
      this._checkRequestType(xmlhttpRequestDelegate),
      'GET',
      null,
      callback
    )
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   */
  post(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    this.exec(
      this._checkRequestType(
        this._ensureContentType(xmlhttpRequestDelegate, contentType)
      ),
      'POST',
      body,
      callback
    )
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   */
  put(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    this.exec(
      this._checkRequestType(
        this._ensureContentType(xmlhttpRequestDelegate, contentType)
      ),
      'PUT',
      body,
      callback
    )

  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   */
  patch(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    this.exec(
      this._checkRequestType(
        this._ensureContentType(xmlhttpRequestDelegate, contentType)
      ),
      'PATCH',
      body,
      callback
    )
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  delete(xmlhttpRequestDelegate, callback) {
    this.exec(this._checkRequestType(xmlhttpRequestDelegate), 'DELETE', null, callback)
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  head(xmlhttpRequestDelegate, callback) {
    this.exec(
      this._checkRequestType(xmlhttpRequestDelegate),
      'HEAD', null, callback
    )
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {string} method
   * @param {?string} [body=null]
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @protected
   */
  exec(xmlhttpRequestDelegate, method, body = null, callback) {
    assertType(isString(method), 'InitRequestBuilder:method value should be a string')
    assertType(['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD'].includes(method), 'InitRequestBuilder:method value should be in [\'GET\', \'POST\', \'PATCH\', \'PUT\', \'DELETE\', \'HEAD\']')
    /**
     *
     * @type {XMLHttpRequest}
     */
    const request = new XMLHttpRequest()
    request.open(method, this._buildPath(xmlhttpRequestDelegate), true)
    this._setRequestHeaders(request, xmlhttpRequestDelegate)

    request.responseType = "blob";
    request.onload = (oEvent) =>{
      callback(new XmlHttpResponseDelegateBuilder()
        .code(request.status)
        .payload(request.response)
        .headers(this._responseHeaders(request))
        .build())
    };

    request.send(body)
  }

}
