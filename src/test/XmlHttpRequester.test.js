/* global runTest */
import {XmlHttpRequester} from '../js/XmlHttpRequester'
import {TestCase} from 'code-altimeter-js'
import {assertType, FlexArray, isNull, isString} from '../../../flexio-jshelpers'
import {StringArray} from 'flexio-jshelpers'

const assert = require('assert')

/**
 * @template TYPE, TYPE_OUT
 */
export class FlexMap extends Map {
  /**
   *
   * @param {...<TYPE>} args
   */
  constructor(...args) {
    super(...args)
    args.forEach(a => this._validate(a))
  }

  /**
   *
   * @param {*} v
   * @protected
   * @throws Error
   */
  _validate(v) {
    throw new TypeError('Should be implemented')
  }

  forEach(callbackfn, thisArg) {
    super.forEach()
  }

  /**
   *
   * @param key
   * @return {TYPE}
   */
  get(key) {
    return super.get(key)
  }

  /**
   *
   * @param key
   * @param {TYPE} value
   * @return {this}
   */
  set(key, value) {
    this._validate(value)
    return super.set(key, value)
  }

  /**
   *
   * @return {Object.<*, TYPE>}
   */
  toObject() {
    let obj = Object.create(null)
    for (let [k, v] of this) {
      if (v instanceof FlexMap) {
        v = v.toObject()
      }
      obj[k] = v
    }
    return obj
  }

  /**
   *
   * @return {Object<*, TYPE>}
   */
  toJSON() {
    return this.toObject()
  }
}

/**
 * @extends {FlexMap<?StringArray>}
 */
export class StringArrayMap extends FlexMap {
  _validate(v) {
    assertType(v instanceof StringArray, 'StringArrayMap: input should be a StringArray')
  }
}

export class TestXmlHttpRequester extends TestCase {
  testEncodeHeadersMap() {
    const a = new StringArrayMap()
    assert.throws(() => {
      a.set(1, 'a')
    })

    a.set(1, new StringArray(...['toto', 'titi', 'tutu']))
    a.set(2, new StringArray(...['toto', 'titi', 'tutu']))

    assert.strictEqual(JSON.stringify(a), '{"1":["toto","titi","tutu"],"2":["toto","titi","tutu"]}')
    assert.deepEqual(JSON.parse(JSON.stringify(a)), {'1': ['toto', 'titi', 'tutu'], '2': ['toto', 'titi', 'tutu']})
  }
}

runTest(TestXmlHttpRequester)
