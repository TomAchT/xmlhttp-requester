/* global XMLHttpRequest */

import {assertType, isNull, isString} from '@flexio-oss/assert'
import {StringArray, StringArrayMap} from '@flexio-oss/extended-flex-types'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {XmlHttpResponseDelegateBuilder} from '../XmlHttpResponseDelegate'
import {ExecutorRequesterInterface} from './ExecutorRequesterInterface'

/**
 * @implements {ExecutorRequesterInterface}
 */
export class Executor extends ExecutorRequesterInterface {
  /**
   *
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @return {XmlHttpRequestDelegate}
   * @throws {TypeError}
   * @protected
   */
  _checkRequestType(xmlhttpRequestDelegate) {
    assertType(xmlhttpRequestDelegate instanceof globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegate, 'Executor:xmlhttpRequestDelegate arg should be an instance of XmlHttpRequestDelegate')
    return xmlhttpRequestDelegate
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  get(xmlhttpRequestDelegate, callback) {
    const response = this.exec(
      this._checkRequestType(xmlhttpRequestDelegate),
      'GET'
    )
    callback(response)
    return response
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {ResponseDelegate}
   */
  post(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    const response = this.exec(
      this._checkRequestType(
        this._ensureContentType(xmlhttpRequestDelegate, contentType)
      ),
      'POST',
      body
    )
    callback(response)
    return response
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  put(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    const response = this.exec(
      this._checkRequestType(
        this._ensureContentType(xmlhttpRequestDelegate, contentType)
      ),
      'PUT',
      body
    )

    callback(response)
    return response
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  patch(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    const response = this.exec(
      this._checkRequestType(
        this._ensureContentType(xmlhttpRequestDelegate, contentType)
      ),
      'PATCH',
      body
    )
    callback(response)
    return response
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  delete(xmlhttpRequestDelegate, callback) {
    const response = this.exec(xmlhttpRequestDelegate, 'DELETE')
    callback(response)
    return response
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  head(xmlhttpRequestDelegate, callback) {
    const response = this.exec(
      this._checkRequestType(xmlhttpRequestDelegate),
      'HEAD'
    )
    callback(response)
    return response
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
    xmlhttpRequestDelegate.headers()
      .forEach((value, header) => {
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
      return new globalFlexioImport.io.flexio.xmlhttp_requester.types.URLExtendedBuilder()
        .href(xmlhttpRequestDelegate.path().href + '?' + xmlhttpRequestDelegate.parameters().toString())
        .build()
        .toString()
    }
    return xmlhttpRequestDelegate.path().toString()
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {string} name
   * @param {?string} value
   * @return {XmlHttpRequestDelegate}
   * @protected
   */
  _setHeader(xmlhttpRequestDelegate, name, value) {
    const builder = globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegateBuilder.from(xmlhttpRequestDelegate)
    builder.header(name, value)
    return builder.build()
  }

  /**
   *
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {?string} contentType
   * @return {XmlHttpRequestDelegate}
   * @protected
   */
  _ensureContentType(xmlhttpRequestDelegate, contentType) {
    if (!isNull(contentType)) {
      return this._setHeader(xmlhttpRequestDelegate, 'content-type', contentType)
    }
    return xmlhttpRequestDelegate
  }
}
