import {StringArray, assertType, FlexMap} from 'flexio-jshelpers'

/**
 * @extends {FlexMap<?StringArray>}
 */
export class StringArrayMap extends FlexMap {
  _validate(v) {
    console.log(v)
    assertType(v instanceof StringArray, 'StringArrayMap: input should be a StringArray')
  }
}

export class StringArrayMapBuilder {
  constructor() {
    /**
     *
     * @type {IterableIterator<(string|Symbol), StringArray>}
     * @private
     */
    this.__entries = null
  }

  /**
   *
   * @param {IterableIterator<(string|Symbol), StringArray>} entries
   * @return {StringArrayMapBuilder}
   */
  entries(entries) {
    this.__entries = entries
    return this
  }

  /**
   * @param {Object} jsonObject
   * @returns {StringArrayMapBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new StringArrayMapBuilder()
    const entries = Object.entries(jsonObject)
    for (const value of entries) {
      value[1] = new StringArray(...value[1])
    }
    builder.entries(entries)
    return builder
  }

  /**
   * @param {string} json
   * @returns {StringArrayMapBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {FlexMap} instance
   * @returns {StringArrayMapBuilder}
   */
  static from(instance) {
    const builder = new StringArrayMapBuilder()
    builder.entries(instance.entries())

    return builder
  }

  /**
   * @returns {StringArrayMap}
   */
  build() {
    return new StringArrayMap(this.__entries)
  }
}
