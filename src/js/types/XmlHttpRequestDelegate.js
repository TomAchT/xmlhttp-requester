import {assertType, isString, isNull} from '@flexio-oss/assert'
import {StringArray} from '@flexio-oss/extended-flex-types'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {deepFreezeSeal} from '@flexio-oss/js-type-helpers'

class XmlHttpRequestDelegate {
  /**
   * @param {StringArrayMap} headers
   * @param {URLExtended} path
   * @param {URLSearchParamsExtended} parameters
   * @private
   */
  constructor(headers, path, parameters) {
    this._headers = headers
    this._path = path
    this._parameters = parameters
    deepFreezeSeal(this)
  }

  /**
   * @returns {StringArrayMap}
   */
  headers() {
    return this._headers
  }

  /**
   * @returns {URLExtended}
   */
  path() {
    return this._path
  }

  /**
   * @returns {URLSearchParamsExtended}
   */
  parameters() {
    return this._parameters
  }

  /**
   * @param { StringArrayMap } headers
   */
  withHeaders(headers) {
    var builder = XmlHttpRequestDelegateBuilder.from(this)
    builder.headers(headers)
    return builder.build()
  }

  /**
   * @param { URLExtended } path
   */
  withPath(path) {
    var builder = XmlHttpRequestDelegateBuilder.from(this)
    builder.path(path)
    return builder.build()
  }

  /**
   * @param { URLSearchParamsExtended } parameters
   */
  withParameters(parameters) {
    var builder = XmlHttpRequestDelegateBuilder.from(this)
    builder.parameters(parameters)
    return builder.build()
  }

  toObject() {
    var jsonObject = {}
    if (this._headers !== undefined) {
      jsonObject['headers'] = this._headers.toObject()
    }
    if (this._path !== undefined) {
      jsonObject['path'] = this._path.toObject()
    }
    if (this._parameters !== undefined) {
      jsonObject['parameters'] = this._parameters.toObject()
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

export {XmlHttpRequestDelegate}

class XmlHttpRequestDelegateBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._headers = null
    this._path = null
    this._parameters = null
  }

  /**
   * @static
   * @return {XmlHttpRequestDelegateBuilder}
   */
  static initEmpty() {
    return new XmlHttpRequestDelegateBuilder()
      .headers(new globalFlexioImport.io.flexio.extended_flex_types.StringArrayMap())
      .parameters(new globalFlexioImport.io.flexio.extended_flex_types.URLSearchParamsExtended())
  }

  /**
   * @param { StringArrayMap } headers
   * @returns {XmlHttpRequestDelegateBuilder}
   */
  headers(headers) {
    if (!isNull(headers)) {
      assertType(headers instanceof globalFlexioImport.io.flexio.extended_flex_types.StringArrayMap, 'headers should be a StringArrayMap')
    }
    this._headers = headers
    return this
  }

  /**
   * @param {string} name
   * @param {?string} value
   * @return {XmlHttpRequestDelegateBuilder}
   */
  header(name, value) {
    assertType(isString(name), 'XmlHttpRequestDelegateBuilder:arrayHeader: name should be string or null')
    this._headers.with(name, new StringArray(value))
    return this
  }

  /**
   * @param {string} name
   * @param {(Array<string>|StringArray)} values
   * @return {XmlHttpRequestDelegateBuilder}
   */
  arrayHeader(name, values) {
    assertType(isString(name), 'XmlHttpRequestDelegateBuilder:arrayHeader: name should be string or null')
    this._headers.with(name, new StringArray(...values))
    return this
  }

  /**
   * @param { URLExtended } path
   * @returns {XmlHttpRequestDelegateBuilder}
   */
  path(path) {
    if (!isNull(path)) {
      assertType(path instanceof globalFlexioImport.io.flexio.extended_flex_types.URLExtended, 'path should be a URLExtended')
    }
    this._path = path
    return this
  }

  /**
   * @param { URLSearchParamsExtended } parameters
   * @returns {XmlHttpRequestDelegateBuilder}
   */
  parameters(parameters) {
    if (!isNull(parameters)) {
      assertType(parameters instanceof globalFlexioImport.io.flexio.extended_flex_types.URLSearchParamsExtended, 'parameters should be a URLSearchParamsExtended')
    }
    this._parameters = parameters
    return this
  }

  /**
   * @param {string} name
   * @param {?string} value
   * @return {this}
   */
  parameter(name, value) {
    assertType(isString(name) && (isString(value) || isNull(value)), 'XmlHttpRequestDelegateBuilder:parameter: name and value should be string or null')
    this._parameters.set(name, value)
    return this
  }

  /**
   * @param {string} name
   * @param {Array<string>} values
   * @return {this}
   */
  arrayParameter(name, values) {
    assertType(isString(name), 'XmlHttpRequestDelegateBuilder:arrayParameter: name should be string or null')
    this._parameters.delete(name)
    for (const v of new StringArray(...values)) {
      this._parameters.append(name, v)
    }
    return this
  }

  /**
   * @returns {XmlHttpRequestDelegate}
   */
  build() {
    return new XmlHttpRequestDelegate(this._headers, this._path, this._parameters)
  }

  /**
   * @param {object} jsonObject
   * @returns {XmlHttpRequestDelegateBuilder}
   */
  static fromObject(jsonObject) {
    var builder = new XmlHttpRequestDelegateBuilder()
    if (jsonObject['headers'] !== undefined) {
      builder.headers(globalFlexioImport.io.flexio.extended_flex_types.StringArrayMapBuilder.fromObject(jsonObject['headers']).build())
    }
    if (jsonObject['path'] !== undefined) {
      builder.path(globalFlexioImport.io.flexio.extended_flex_types.URLExtendedBuilder.fromObject(jsonObject['path']).build())
    }
    if (jsonObject['parameters'] !== undefined) {
      builder.parameters(globalFlexioImport.io.flexio.extended_flex_types.URLSearchParamsExtendedBuilder.fromObject(jsonObject['parameters']).build())
    }
    return builder
  }

  /**
   * @param {string} json
   * @returns {XmlHttpRequestDelegateBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {XmlHttpRequestDelegate} instance
   * @returns {XmlHttpRequestDelegateBuilder}
   */
  static from(instance) {
    const builder = new XmlHttpRequestDelegateBuilder()
    builder.headers(instance.headers())
    builder.path(instance.path())
    builder.parameters(instance.parameters())
    return builder
  }
}

export {XmlHttpRequestDelegateBuilder}
