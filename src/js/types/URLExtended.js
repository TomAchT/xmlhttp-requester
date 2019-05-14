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

export class URLExtendedBuilder {
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
   * @return {URLExtendedBuilder}
   */
  href(href) {
    assertType(isNull(href) || isString(href), 'URLExtendedBuilder:href: arg should be a string or null')
    this.__href = href
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {URLExtendedBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new URLExtendedBuilder()
    builder.href(jsonObject.href)
    return builder
  }

  /**
   * @param {string} json
   * @returns {URLExtendedBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {URLExtended} instance
   * @returns {URLExtendedBuilder}
   */
  static from(instance) {
    const builder = new URLExtendedBuilder()
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
