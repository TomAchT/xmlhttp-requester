/* global URL,XMLHttpRequest */
import {assertType, isString, isNull, StringArray, isNumber} from 'flexio-jshelpers'
import {XmlHttpResponseDelegate, XmlHttpResponseDelegateBuilder} from './XmlHttpResponseDelegate'
import {StringArrayMap, StringArrayMapBuilder} from './types/StringArrayMap'


export class XmlHttpRequest {
  constructor() {
    /**
     *
     * @type {?StringArrayMap}
     * @protected
     */
    this._headers = new StringArrayMap()
    /**
     *
     * @type {?URL}
     * @protected
     */
    this._path = null
    /**
     *
     * @type {URLSearchParams}
     * @protected
     */
    this._parameters = new URLSearchParams()
  }



  /**
   * @return {URLSearchParams}
   */
  parameters() {
    return this._parameters
  }

  /**
   * @param {string} name
   * @param {Array<string>} values
   * @return {this}
   */
  arrayParameter(name, values) {
    assertType(isString(name), 'XmlHttpRequester:arrayParameter: name should be string or null')
    this._parameters.delete(name)
    for (const v in new StringArray(...values)) {
      this._parameters.append(name, v)
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
    this._headers.set(name, value)
    return this
  }



  /**
   * @param {?string} path
   * @return {this}
   */
  path() {
    assertType(isString(path) || isNull(path), 'XmlHttpRequester:path: path should be string or null')
    this._path = new URL(path)
    return this
  }

  /**
   * @returns {object}
   */
  toObject() {
    const jsonObject = {}
    jsonObject.headers = this._headers.toObject()
    jsonObject.parameters = this._parameters
    jsonObject.path = this._path
    return jsonObject
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }


}

export class XmlHttpRequestBuilder {
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

