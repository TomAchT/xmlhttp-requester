import {assertType, isString, isNull, globalFlexioImport, HttpRequester} from 'flexio-jshelpers'
import {StringArrayMap} from './types/StringArrayMap'
import {ExecutorRequesterInterface} from './Executor/ExecutorRequesterInterface'
import {XmlHttpRequestDelegate} from './types/XmlHttpRequestDelegate'

/**
 * @implements {HttpRequester}
 */
export class XmlHttpRequester {
  /**
   *
   * @param {ExecutorRequesterInterface} executor
   * @param {?XmlHttpRequestDelegate} [xmlhttpRequestDelegate=null]
   */
  constructor(executor, xmlhttpRequestDelegate = null) {

    assertType(
      executor instanceof ExecutorRequesterInterface,
      'XmlHttpRequester:constructor: `executor` should be an instance of ExecutorRequesterInterface'
    )
    assertType(
      isNull(xmlhttpRequestDelegate) || xmlhttpRequestDelegate instanceof XmlHttpRequestDelegate,
      'XmlHttpRequester:constructor: `xmlhttpRequestDelegate` should be an instance of XmlHttpRequestDelegate or Null'
    )

    /**
     *
     * @type {ExecutorRequesterInterface}
     * @protected
     */
    this._executor = executor
    /**
     * @type {?XmlHttpRequestDelegate}
     * @protected
     */
    this._requestDelegate = xmlhttpRequestDelegate

    /**
     *
     * @type {XmlHttpRequestDelegateBuilder}
     * @protected
     */
    this._xmlhttpRequestDelegateBuilder = globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegateBuilder.initEmpty()
  }

  /**
   *
   * @return {XmlHttpRequestDelegate}
   */
  requestDelegate() {
    this._ensureHaveRequestDelegate()
    return this._requestDelegate
  }

  /**
   *
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  get(callback) {
    this._executor.get(this.requestDelegate(), callback)
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   */
  post(callback, contentType = null, body = null) {
    this._executor.post(this.requestDelegate(), callback, contentType, body)
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   */
  put(callback, contentType = null, body = null) {
    this._executor.put(this.requestDelegate(), callback, contentType, body)
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} callback
   * @param {?string} contentType
   * @param {?string} body
   */
  patch(callback, contentType = null, body = null) {
    this._executor.patch(this.requestDelegate(), callback, contentType, body)
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  delete(callback) {
    this._executor.delete(this.requestDelegate(), callback)
  }

  /**
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  head(callback) {
    this._executor.head(this.requestDelegate(), callback)
  }

  /**
   * @param {string} name
   * @param {?string} value
   * @return {this}
   */
  parameter(name, value) {
    this._xmlhttpRequestDelegateBuilder.parameter(name, value)
    return this
  }

  /**
   * @param {string} name
   * @param {Array<string>} values
   * @return {this}
   */
  arrayParameter(name, values) {
    this._xmlhttpRequestDelegateBuilder.arrayParameter(name, values)
    return this
  }

  /**
   * @param {string} name
   * @param {?string} value
   * @return {this}
   */
  header(name, value) {
    this._xmlhttpRequestDelegateBuilder.header(name, value)
    return this
  }

  /**
   *
   * @param {?string} account
   * @return {this}
   */
  XAccount(account) {
    return this.header('X-account', account)
  }

  /**
   *
   * @param {?string} token
   * @return {this}
   */
  AuthorizationBearer(token) {
    return this.header('Authorization', 'Bearer ' + token)
  }

  /**
   * @param {string} name
   * @param {(Array<string>|StringArray)} values
   * @return {this}
   */
  arrayHeader(name, values) {
    this._xmlhttpRequestDelegateBuilder.arrayHeader(name, values)
    return this
  }

  /**
   * @param {?string} path
   * @return {this}
   */
  path(path) {
    assertType(isString(path) || isNull(path), 'XmlHttpRequester:path: path should be string or null')
    this._xmlhttpRequestDelegateBuilder = new globalFlexioImport.io.flexio.xmlhttp_requester.types.URLExtended(path)
    return this
  }

  /**
   * @returns {object}
   */
  toObject() {
    return this.requestDelegate().toObject()
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }

  _ensureHaveRequestDelegate() {
    if (isNull(this._requestDelegate)) {
      this._requestDelegate = this._xmlhttpRequestDelegateBuilder.build()
    }
  }
}

export class XmlHttpRequesterBuilder {
  /**
   * @constructor
   */
  constructor() {
    /**
     *
     * @type {?XmlHttpRequestDelegate}
     * @private
     */
    this.__xmlhttpRequestDelegate = null
    /**
     *
     * @type {?ExecutorRequesterInterface}
     * @private
     */
    this.__executor = null
  }

  /**
   * @param {?XmlHttpRequestDelegate} [xmlhttpRequestDelegate=null]
   * @returns {XmlHttpRequesterBuilder}
   */
  xmlhttpRequestDelegate(xmlhttpRequestDelegate) {
    assertType(isNull(xmlhttpRequestDelegate) || xmlhttpRequestDelegate instanceof StringArrayMap, 'XmlHttpRequesterBuilder: `xmlhttpRequestDelegate` should be a StringArrayMap')
    this.__xmlhttpRequestDelegate = xmlhttpRequestDelegate
    return this
  }

  /**
   *
   * @param {ExecutorRequesterInterface} executor
   * @return {XmlHttpRequesterBuilder}
   */
  executor(executor) {
    this.__executor = executor
    return this
  }

  /**
   * @returns {XmlHttpRequester}
   */
  build() {
    return new XmlHttpRequester(this.__executor, this.__xmlhttpRequestDelegate)
  }

  /**
   * @param {object} jsonObject
   * @returns {XmlHttpRequesterBuilder}
   */
  static fromObject(jsonObject) {
    const xmlHttpRequestDelegate = globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegateBuilder.fromObject(jsonObject).build()

    const builder = new XmlHttpRequesterBuilder()
    builder.xmlhttpRequestDelegate(xmlHttpRequestDelegate)

    return builder
  }

  /**
   * @param {string} json
   * @returns {XmlHttpRequesterBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {XmlHttpRequester} instance
   * @returns {XmlHttpRequesterBuilder}
   */
  static from(instance) {
    const builder = new XmlHttpRequesterBuilder()
    builder.xmlhttpRequestDelegate(instance.requestDelegate())
    return builder
  }
}
