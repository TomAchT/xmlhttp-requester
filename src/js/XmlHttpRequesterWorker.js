/* global URL,XMLHttpRequest */
import {assertType, isString, isNull, StringArray} from 'flexio-jshelpers'
import {XmlHttpResponseDelegateBuilder} from './XmlHttpResponseDelegate'
import {StringArrayMap} from './types/StringArrayMap'
import {XmlHttpRequester} from './XmlHttpRequester'

/**
 * @implements {HttpRequester}
 */
export class XmlHttpRequesterWorker extends XmlHttpRequester {
  constructor() {
    super()
    /**
     *
     * @type {Map<string, string|StringArray>}
     * @private
     */
    this.__headers = new Map()
    /**
     *
     * @type {?URL}
     * @private
     */
    this.__path = null
    /**
     *
     * @type {URLSearchParams}
     * @private
     */
    this.__parameters = new URLSearchParams()
  }

  /**
   * @return {ResponseDelegate}
   */
  get() {
    return this._exec('GET')
  }

  /**
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {ResponseDelegate}
   */
  post(contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return this._exec('POST', body)
  }

  /**
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  put(contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return this._exec('PUT', body)
  }

  /**
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  patch(contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return this._exec('PATCH', body)
  }

  /**
   * @return {ResponseDelegate}
   */
  delete() {
    return this._exec('DELETE')
  }

  /**
   * @return {ResponseDelegate}
   */
  head() {
    return this._exec('HEAD')
  }

  /**
   * @param {string} name
   * @param {?string} value
   * @return {this}
   */
  parameter(name, value) {
    assertType(isString(name) && (isString(value) || isNull(value)), 'XmlHttpRequester:parameter: name and value should be string or null')
    this.__parameters.set(name, value)
    return this
  }

  /**
   * @param {string} name
   * @param {Array<string>} values
   * @return {this}
   */
  arrayParameter(name, values) {
    assertType(isString(name), 'XmlHttpRequester:arrayParameter: name should be string or null')
    this.__parameters.delete(name)
    for (const v in new StringArray(...values)) {
      this.__parameters.append(name, v)
    }
    return this
  }

  /**
   * @param {string} name
   * @param {?string} value
   * @return {this}
   */
  header(name, value) {
    assertType(isString(name) && (isString(value) || isNull(value)), 'XmlHttpRequester:header: name and value should be string or null')
    this.__headers.set(name, value)
    return this
  }

  /**
   *
   * @param {?string} account
   * @return {this}
   */
  XAccount(account) {
    assertType(isString(account) || isNull(account), 'XmlHttpRequester:Account: `account` should be string or null')
    return this.header('X-account', account)
  }

  /**
   *
   * @param {?string} token
   * @return {this}
   */
  AuthorizationBearer(token) {
    assertType(isString(token) || isNull(token), 'XmlHttpRequester:Account: `token` should be string or null')
    return this.header('Authorization', 'Bearer ' + token)
  }

  /**
   * @param {string} name
   * @param {(Array<string>|StringArray)} values
   * @return {this}
   */
  arrayHeader(name, values) {
    assertType(isString(name), 'XmlHttpRequester:arrayHeader: name should be string or null')
    this.__headers.set(name, new StringArray(...values))
    return this
  }

  /**
   * @param {?string} path
   * @return {this}
   */
  path(path) {
    assertType(isString(path) || isNull(path), 'XmlHttpRequester:path: path should be string or null')
    this.__path = new URL(path)
    return this
  }

  /**
   * @param {string} method
   * @param {?string} [body=null]
   * @return {XmlHttpResponseDelegate}
   * @private
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
    this._requestHeaders(request)
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
   * @private
   */
  _requestHeaders(request) {
    this.__headers.forEach((value, header) => {
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
   * @private
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
   * @private
   */
  _buildPath() {
    if (this.__parameters.toString().length) {
      return new URL(this.__path.href + '?' + this.__parameters.toString()).toString()
    }
    return this.__path.toString()
  }
}
