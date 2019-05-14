/* global XMLHttpRequest */

import {assertType, globalFlexioImport, isNull, isString, StringArray, valueByKeys} from 'flexio-jshelpers'
import {StringArrayMap} from '../types/StringArrayMap'
import {XmlHttpResponseDelegate, XmlHttpResponseDelegateBuilder} from '../XmlHttpResponseDelegate'
import {Executor} from './Executor'
import Worker from 'Executor.worker'

import {_storeParams} from '../../../../hotballoon/src/js/Store/StoreBase'

/**
 * @implements {ExecutorRequesterInterface}
 */
export class ExecutorWorker extends Executor {

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  static get(xmlhttpRequestDelegate, callback) {
    const worker = new Worker()
    worker.postMessage(
      new globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder()
        .method('GET')
        .requestDelegate(xmlhttpRequestDelegate)
        .build()
    )
    worker.addEventListener('message', (event) => {
      worker.terminate()
      callback(XmlHttpResponseDelegateBuilder.fromObject(event).build())
    })
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {ResponseDelegate}
   */
  static post(xmlhttpRequestDelegate, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return new Executor(xmlhttpRequestDelegate).exec('POST', body)
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  static put(xmlhttpRequestDelegate, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return new Executor(xmlhttpRequestDelegate).exec('PUT', body)
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  static patch(xmlhttpRequestDelegate, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return new Executor(xmlhttpRequestDelegate).exec('PATCH', body)
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @return {ResponseDelegate}
   */
  static delete(xmlhttpRequestDelegate) {
    return new Executor(xmlhttpRequestDelegate).exec('DELETE')
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @return {ResponseDelegate}
   */
  static head(xmlhttpRequestDelegate) {
    return new Executor(xmlhttpRequestDelegate).exec('HEAD')
  }

  /**
   * @param {string} method
   * @param {?string} [body=null]
   * @return {XmlHttpResponseDelegate}
   * @protected
   */
  _exec(method, body = null) {
    assertType(isString(method), 'InitRequestBuilder:method value should be a string')
    assertType(['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD'].includes(method), 'InitRequestBuilder:method value should be in [\'GET\', \'POST\', \'PATCH\', \'PUT\', \'DELETE\', \'HEAD\']')
    /**
     *
     * @type {XMLHttpRequest}
     */
    const request = new XMLHttpRequest()
    request.open(method, this._buildPath(), false)
    this._setRequestHeaders(request)
    request.send(body)

    return new XmlHttpResponseDelegateBuilder()
      .code(request.status)
      .payload(request.responseText)
      .headers(this._responseHeaders(request))
      .build()
  }

  /**
   *
   * @param  {XMLHttpRequest} request
   * @protected
   */
  _setRequestHeaders(request) {
    this._requestDelegate.headers().forEach((value, header) => {
      if (header === 'content-type') {
        request.overrideMimeType(value)
      }
      if (value instanceof StringArray) {
        /**
         * @type {StringArray}
         */
        value.forEach((v) => {
          request.setRequestHeader(header, v)
        })
      } else {
        request.setRequestHeader(header, value)
      }
    })
  }

  /**
   *
   * @param {XMLHttpRequest} request
   * @return {StringArrayMap}
   * @protected
   */
  _responseHeaders(request) {
    const headers = request.getAllResponseHeaders()

    const arr = headers.trim().split(/[\r\n]+/)
    /**
     *
     * @type {StringArrayMap}
     */
    const headerMap = new StringArrayMap()

    arr.forEach(function(line) {
      const parts = line.split(': ')
      const header = parts.shift()
      const value = parts.join(': ')
      if (headerMap.has(header)) {
        headerMap.get(header).push(value)
      } else {
        headerMap.set(header, new StringArray(value))
      }
    })

    return headerMap
  }

  /**
   * @return {string}
   * @protected
   */
  _buildPath() {
    this._ensureHaveRequestDelegate()
    if (this._parameters.toString().length) {
      return new globalFlexioImport.io.flexio.xmlhttp_requester.types.URLExtended(this._requestDelegate.path().href + '?' + this._requestDelegate.parameters().toString())
        .toString()
    }
    return this._requestDelegate.path().toString()
  }
}
