import {assertType, isNull, isString} from 'flexio-jshelpers'

export class URLSearchParamsExtended extends URLSearchParams {
  /**
   *
   * @return {Object}
   */
  toObject() {
    return {
      query: this.toString()
    }
  }

  /**
   *
   * @return {Object}
   */
  toJSON() {
    return this.toObject()
  }
}

export class URLSearchParamsExtendedBuilder {
  constructor() {
    /**
     *
     * @type {?string}
     * @private
     */
    this.__query = null
  }

  /**
   *
   * @param {?string} query
   * @return {URLSearchParamsExtendedBuilder}
   */
  query(query) {
    assertType(isNull(query) || isString(query), 'UrlExtendedBuilder:href: arg should be a string or null')
    this.__query = query
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {URLSearchParamsExtendedBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new URLSearchParamsExtendedBuilder()
    builder.query(jsonObject.query)
    return builder
  }

  /**
   * @param {string} json
   * @returns {URLSearchParamsExtendedBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {URLSearchParamsExtended} instance
   * @returns {URLSearchParamsExtendedBuilder}
   */
  static from(instance) {
    const builder = new URLSearchParamsExtendedBuilder()
    builder.query(instance.toString())
    return builder
  }

  /**
   * @returns {URLSearchParamsExtended}
   */
  build() {
    return new URLSearchParamsExtended(this.__query)
  }
}
