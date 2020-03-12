import {assert, isNull, isString} from '@flexio-oss/assert'
import {deepFreezeSeal} from '@flexio-oss/js-type-helpers'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

class RequestMessageWorker {
  /**
   * @param {string} method
   * @param {XmlHttpRequestDelegate} requestDelegate
   * @param {string} body
   * @param {string} contentType
   * @private
   */
  constructor(method, requestDelegate, body, contentType) {
    this._method = method
    this._requestDelegate = requestDelegate
    this._body = body
    this._contentType = contentType
    deepFreezeSeal(this)
  }

  /**
   * @returns {string}
   */
  method() {
    return this._method
  }

  /**
   * @returns {XmlHttpRequestDelegate}
   */
  requestDelegate() {
    return this._requestDelegate
  }

  /**
   * @returns {string}
   */
  body() {
    return this._body
  }

  /**
   * @returns {string}
   */
  contentType() {
    return this._contentType
  }

  /**
   * @param { string } method
   */
  withMethod(method) {
    let builder = RequestMessageWorkerBuilder.from(this)
    builder.method(method)
    return builder.build()
  }

  /**
   * @param { XmlHttpRequestDelegate } requestDelegate
   */
  withRequestDelegate(requestDelegate) {
    let builder = RequestMessageWorkerBuilder.from(this)
    builder.requestDelegate(requestDelegate)
    return builder.build()
  }

  /**
   * @param { string } body
   */
  withBody(body) {
    let builder = RequestMessageWorkerBuilder.from(this)
    builder.body(body)
    return builder.build()
  }

  /**
   * @param { string } contentType
   */
  withContentType(contentType) {
    let builder = RequestMessageWorkerBuilder.from(this)
    builder.contentType(contentType)
    return builder.build()
  }

  toObject() {
    let jsonObject = {}
    if (this._method !== undefined) {
      jsonObject['method'] = this._method
    }
    if (this._requestDelegate !== undefined) {
      jsonObject['requestDelegate'] = this._requestDelegate.toObject()
    }
    if (this._body !== undefined) {
      jsonObject['body'] = this._body
    }
    if (this._contentType !== undefined) {
      jsonObject['contentType'] = this._contentType
    }
    return jsonObject
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject()
  }
}

export {RequestMessageWorker}

class RequestMessageWorkerBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._method = null
    this._requestDelegate = null
    this._body = null
    this._contentType = null
  }

  /**
   * @param { string } method
   * @returns {RequestMessageWorkerBuilder}
   */
  method(method) {
    if (!isNull(method)) {
      assert(isString(method), 'method should be a string')
    }
    this._method = method
    return this
  }

  /**
   * @param { XmlHttpRequestDelegate } requestDelegate
   * @returns {RequestMessageWorkerBuilder}
   */
  requestDelegate(requestDelegate) {
    if (!isNull(requestDelegate)) {
      assert(requestDelegate instanceof globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegate, 'requestDelegate should be a XmlHttpRequestDelegate')
    }
    this._requestDelegate = requestDelegate
    return this
  }

  /**
   * @param { string } body
   * @returns {RequestMessageWorkerBuilder}
   */
  body(body) {
    if (!isNull(body)) {
      assert(isString(body), 'body should be a string')
    }
    this._body = body
    return this
  }

  /**
   * @param { string } contentType
   * @returns {RequestMessageWorkerBuilder}
   */
  contentType(contentType) {
    if (!isNull(contentType)) {
      assert(isString(contentType), 'contentType should be a string')
    }
    this._contentType = contentType
    return this
  }

  /**
   * @returns {RequestMessageWorker}
   */
  build() {
    return new RequestMessageWorker(this._method, this._requestDelegate, this._body, this._contentType)
  }

  /**
   * @param {object} jsonObject
   * @returns {RequestMessageWorkerBuilder}
   */
  static fromObject(jsonObject) {
    let builder = new RequestMessageWorkerBuilder()
    if (jsonObject['method'] !== undefined) {
      builder.method(jsonObject['method'])
    }
    if (jsonObject['requestDelegate'] !== undefined) {
      builder.requestDelegate(globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegateBuilder.fromObject(jsonObject['requestDelegate']).build())
    }
    if (jsonObject['body'] !== undefined) {
      builder.body(jsonObject['body'])
    }
    if (jsonObject['contentType'] !== undefined) {
      builder.contentType(jsonObject['contentType'])
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {RequestMessageWorkerBuilder}
   */
  static fromJson(json) {
    let jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {RequestMessageWorker} instance
   * @returns {RequestMessageWorkerBuilder}
   */
  static from(instance) {
    let builder = new RequestMessageWorkerBuilder()
    builder.method(instance.method())
    builder.requestDelegate(instance.requestDelegate())
    builder.body(instance.body())
    builder.contentType(instance.contentType())
    return builder
  }
}

export {RequestMessageWorkerBuilder}
