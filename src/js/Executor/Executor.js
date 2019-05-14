/* global XMLHttpRequest */

import {assertType, globalFlexioImport, isNull, isString, StringArray} from 'flexio-jshelpers'
import {StringArrayMap} from '../types/StringArrayMap'
import {XmlHttpResponseDelegateBuilder} from '../XmlHttpResponseDelegate'
import {ExecutorRequesterInterface} from './ExecutorRequesterInterface'

/**
 * @implements {ExecutorRequesterInterface}
 */
export class Executor extends ExecutorRequesterInterface {
  /**
   *
   * @param {?XmlHttpRequestDelegate} [xmlhttpRequestDelegate=null]
   */
  constructor(xmlhttpRequestDelegate) {
    super()
    assertType(xmlhttpRequestDelegate instanceof globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegate, 'Executor:xmlhttpRequestDelegate arg should be an instance of XmlHttpRequestDelegate')
    /**
     * @type {?XmlHttpRequestDelegate}
     * @protected
     */
    this._requestDelegate = xmlhttpRequestDelegate
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  get(xmlhttpRequestDelegate, callback) {
    callback(this.exec(xmlhttpRequestDelegate, 'GET'))
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   */
  post(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    callback(this.exec(xmlhttpRequestDelegate, 'POST', body))
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   */
  put(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    callback(this.exec(xmlhttpRequestDelegate, 'PUT', body))
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   */
  patch(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    callback(this.exec(xmlhttpRequestDelegate, 'PATCH', body))
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  delete(xmlhttpRequestDelegate, callback) {
    callback(this.exec(xmlhttpRequestDelegate, 'DELETE'))
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  head(xmlhttpRequestDelegate, callback) {
    callback(this.exec(xmlhttpRequestDelegate, 'HEAD'))
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {string} method
   * @param {?string} [body=null]
   * @return {XmlHttpResponseDelegate}
   * @protected
   */
  exec(xmlhttpRequestDelegate, method, body = null) {
    assertType(isString(method), 'InitRequestBuilder:method value should be a string')
    assertType(['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD'].includes(method), 'InitRequestBuilder:method value should be in [\'GET\', \'POST\', \'PATCH\', \'PUT\', \'DELETE\', \'HEAD\']')
    /**
     *
     * @type {XMLHttpRequest}
     */
    const request = new XMLHttpRequest()
    request.open(method, this._buildPath(xmlhttpRequestDelegate), false)
    this._setRequestHeaders(request, xmlhttpRequestDelegate)
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
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @protected
   */
  _setRequestHeaders(request, xmlhttpRequestDelegate) {
    xmlhttpRequestDelegate.headers().forEach((value, header) => {
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
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @return {string}
   * @protected
   */
  _buildPath(xmlhttpRequestDelegate) {
    if (xmlhttpRequestDelegate.parameters().toString().length) {
      return new globalFlexioImport.io.flexio.xmlhttp_requester.types.URLExtended(xmlhttpRequestDelegate.path().href + '?' + xmlhttpRequestDelegate.parameters().toString())
        .toString()
    }
    return xmlhttpRequestDelegate.path().toString()
  }
}
