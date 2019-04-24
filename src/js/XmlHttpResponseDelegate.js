/*
global Headers
*/

import {assertType, isNull, isNumber, isString, deepFreezeSeal, StringArray} from 'flexio-jshelpers'
import {StringArrayMap, StringArrayMapBuilder} from './StringArrayMap'

/**
 * @implements {ResponseDelegate}
 */
export class XmlHttpResponseDelegate {
  /**
   *
   * @param {?number} [code=null]
   * @param {?string} [payload=null]
   * @param {?StringArrayMap} [headers=null]
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
     * @type {?StringArrayMap}
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
   * @type {?StringArrayMap}
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
    return this.__headers.get(name).length > 1 ? this.__headers.get(name) : this.__headers.get(name).first()
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
    const jsonObject = {}
    jsonObject.code = this.__code
    jsonObject.payload = this.__payload
    jsonObject.headers = this.__headers.toObject()
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
     * @type {?StringArrayMap}
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
    return this
  }

  /**
   * @param {?StringArrayMap} headers
   * @returns {XmlHttpResponseDelegateBuilder}
   */
  headers(headers) {
    assertType(isNull(headers) || headers instanceof StringArrayMap, 'XmlHttpResponseDelegateBuilder: `headers` should be a StringArrayMap')
    this.__headers = headers
    return this
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
      builder.headers(
        StringArrayMapBuilder
          .fromObject(jsonObject['headers'])
          .build()
      )
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
