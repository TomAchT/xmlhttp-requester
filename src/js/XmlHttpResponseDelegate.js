/*
global Headers
*/

import {assertType, isNull, isNumber, isString, deepFreezeSeal, StringArray} from 'flexio-jshelpers'

/**
 * @implements {ResponseDelegate}
 */
export class XmlHttpResponseDelegate {
  /**
   *
   * @param {?number} [code=null]
   * @param {?string} [payload=null]
   * @param {?Map<string, (StringArray|string)>} [headers=null]
   * @readonly
   */
  constructor(code = null, payload = null, headers = null) {
    /**
     *
     * @type {?number}
     * @private
     */
    this.__code = code
    /**
     *
     * @type {?string}
     * @private
     */
    this.__payload = payload
    /**
     *
     * @type {?Map<string, (StringArray|string)>}
     * @private
     */
    this.__headers = headers

    return deepFreezeSeal(this)
  }

  /**
   * @return {?number}
   */
  code() {
    return this.__code
  }

  /**
   * @return {?string}
   */
  payload() {
    return this.__payload
  }

  /**
   *
   * @type {?Map<string, (StringArray|string)>}
   */
  headers() {
    return this.__headers
  }

  /**
   *
   * @param {string} name
   * @return {?(string|StringArray)}
   */
  header(name) {
    return this.__headers.get(name)
  }

  /**
   *
   * @return {?string}
   */
  contentType() {
    return this.header('content-type')
  }

  /**
   * @returns {object}
   */
  toObject() {
    var jsonObject = {}
    return jsonObject
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }
}

export class XmlHttpResponseDelegateBuilder {
  /**
   * @constructor
   */
  constructor() {
    /**
     *
     * @type {?number}
     * @private
     */
    this.__code = null
    /**
     *
     * @type {?string}
     * @private
     */
    this.__payload = null
    /**
     *
     * @type {?Map<string, (StringArray|string)>}
     * @private
     */
    this.__headers = null
  }

  /**
   * @param {?number} [code=null]
   * @returns {XmlHttpResponseDelegateBuilder}
   */
  code(code) {
    assertType(isNull(code) || isNumber(code), 'XmlHttpResponseDelegateBuilder: `code` should be a number')

    this.__code = code
    return this
  }

  /**
   * @param {?string} [payload=null]
   * @returns {XmlHttpResponseDelegateBuilder}
   */
  payload(payload) {
    assertType(isNull(payload) || isString(payload), 'XmlHttpResponseDelegateBuilder: `payload` should be a string')
    this.__payload = payload
  }

  /**
   * @param {?Map<string, (StringArray|string)>} [headers=null]
   * @returns {XmlHttpResponseDelegateBuilder}
   */
  headers(headers) {
    assertType(isNull(headers) || headers instanceof Map, 'XmlHttpResponseDelegateBuilder: `headers` should be a Map')
    this.__headers = headers
  }

  /**
   * @returns {XmlHttpResponseDelegate}
   */
  build() {
    return new XmlHttpResponseDelegate(this.__code, this.__payload, this.__headers)
  }

  /**
   * @param {object} jsonObject
   * @returns {XmlHttpResponseDelegateBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new XmlHttpResponseDelegateBuilder()
    if (jsonObject['code'] !== undefined) {
      builder.code(jsonObject['code'])
    }
    if (jsonObject['payload'] !== undefined) {
      builder.payload(jsonObject['payload'])
    }
    if (jsonObject['headers'] !== undefined) {
      builder.headers(jsonObject['headers'])
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {XmlHttpResponseDelegateBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {XmlHttpResponseDelegate} instance
   * @returns {XmlHttpResponseDelegateBuilder}
   */
  static from(instance) {
    const builder = new XmlHttpResponseDelegateBuilder()
    builder.code(instance.code())
    builder.headers(instance.headers())
    builder.code(instance.code())

    return builder
  }
}
