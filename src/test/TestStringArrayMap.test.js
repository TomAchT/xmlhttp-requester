/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {StringArray} from 'flexio-jshelpers'
import {StringArrayMapBuilder, StringArrayMap} from '../js/types/StringArrayMap'

const assert = require('assert')

export class TestStringArrayMap extends TestCase {
  testEncodeMap() {
    const a = new StringArrayMap()
    assert.throws(() => {
      a.set(1, 'a')
    })

    a.set(1, new StringArray(...['toto', 'titi', 'tutu']))
    a.set(2, new StringArray(...['toto', 'titi', 'tutu']))

    assert.strictEqual(JSON.stringify(a), '{"1":["toto","titi","tutu"],"2":["toto","titi","tutu"]}')
    assert.deepEqual(JSON.parse(JSON.stringify(a)), {'1': ['toto', 'titi', 'tutu'], '2': ['toto', 'titi', 'tutu']})
  }

  testEncodeDecodeMap() {
    const a = new StringArrayMap()
    a.set(1, new StringArray(...['toto', 'titi', 'tutu']))
    a.set(2, new StringArray(...['toto', 'titi', 'tutu']))

    const sa = JSON.stringify(a)

    const b = StringArrayMapBuilder.fromJson(sa).build()
    assert.deepEqual(a, b)
    console.log(a)
    console.log(b)
  }
}

runTest(TestStringArrayMap)
