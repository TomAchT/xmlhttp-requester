/* global fetch, Headers,Request,URL,Response */
import {InitRequestBuilder} from './InitRequestBuilder'
import {assertType, isString, isNull, StringArray} from 'flexio-jshelpers'
import {XmlHttpResponseDelegate} from './XmlHttpResponseDelegate'

/**
 * @implements {HttpRequester}
 */
export class XmlHttpRequester {
  constructor() {
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
    return this.__exec('GET')

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
    return this.__exec(
      this.__buildRequest(
        this.__buildInit('POST').body(body)
      )
    )
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
    return this.__exec(
      this.__buildRequest(
        this.__buildInit('PUT').body(body)
      )
    )
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
    return this.__exec(
      this.__buildRequest(
        this.__buildInit('PATCH').body(body)
      )
    )
  }

  /**
   * @return {ResponseDelegate}
   */
  delete() {
    return this.__exec(
      this.__buildRequest(
        this.__buildInit('DELETE')
      )
    )
  }

  /**
   * @return {ResponseDelegate}
   */
  head() {
    return this.__exec(
      this.__buildRequest(
        this.__buildInit('HEAD')
      )
    )
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
   * @return {XmlHttpResponseDelegate}
   * @private
   */
  __exec(method) {
    assertType(isString(value), 'InitRequestBuilder:method value should be a string')
    assertType(['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD'].includes(value), 'InitRequestBuilder:method value should be in [\'GET\', \'POST\', \'PATCH\', \'PUT\', \'DELETE\', \'HEAD\']')
    /**
     *
     * @type {XMLHttpRequest}
     */
    const oReq = new XMLHttpRequest()
    oReq.open(method, this.__buildPath())
    // oReq.setRequestHeader(header, value)
    // oReq.overrideMimeType(mimeType)

    oReq.send()
    return new XmlHttpResponseDelegate(oReq.status, oReq.responseText, new Map())

  }

  /**
   *
   * @param {XMLHttpRequest} request
   * @return {Map<string, StringArray|string>}
   * @private
   */
  __responseHeaders(request) {
    const headers = request.getAllResponseHeaders()

    const arr = headers.trim().split(/[\r\n]+/)
    /**
     *
     * @type {Map<string, (StringArray|string)>}
     */
    const headerMap = new Map
    arr.forEach(function(line) {
      const parts = line.split(': ')
      const header = parts.shift()
      const value = parts.join(': ')
      if (headerMap.has(header)) {
        if (headerMap.get(header) instanceof ArrayString) {
          headerMap.get(header).push(value)
        } else {
          headerMap.set(header, new ArrayString(headerMap.get(header), value))
        }
      } else {
        headerMap.set(header, value)
      }
    })
    return headerMap
  }

  /**
   * @return {string}
   * @private
   */
  __buildPath() {
    if (this.__parameters.toString().length) {
      return new URL(this.__path.href + '?' + this.__parameters.toString()).toString()
    }
    return this.__path.toString()
  }

}
