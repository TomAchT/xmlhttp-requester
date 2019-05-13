import {assertType, isNull, isString} from 'flexio-jshelpers'

export class URLExtended extends URL {
  /**
   *
   * @return {Object}
   */
  toObject() {
    return {
      href: this.href
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

export class UrlExtendedBuilder {
  constructor() {
    /**
     *
     * @type {?string}
     * @private
     */
    this.__href = null
  }

  /**
   *
   * @param {?string} href
   * @return {UrlExtendedBuilder}
   */
  href(href) {
    assertType(isNull(href) || isString(href), 'UrlExtendedBuilder:href: arg should be a string or null')
    this.__href = href
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {UrlExtendedBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new UrlExtendedBuilder()
    builder.href(jsonObject.href)
    return builder
  }

  /**
   * @param {string} json
   * @returns {UrlExtendedBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {URLExtended} instance
   * @returns {UrlExtendedBuilder}
   */
  static from(instance) {
    const builder = new UrlExtendedBuilder()
    builder.href(instance.href)
    return builder
  }

  /**
   * @returns {URLExtended}
   */
  build() {
    return new URLExtended(this.__href)
  }
}
