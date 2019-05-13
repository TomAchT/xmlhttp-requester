/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {UrlExtendedBuilder, URLExtended} from '../js/types/URLExtended'

const assert = require('assert')

export class TestURLExtendedTest extends TestCase {
  testEncodeUrl() {
    const a = new URLExtended('https://monsite.com/truc?bibi=tagada')
    assert.strictEqual(JSON.stringify(a), '{"href":"https://monsite.com/truc?bibi=tagada"}')
  }

  testEncodeDecodeMap() {
    const a = new URLExtended('https://monsite.com/truc?bibi=tagada')
    const sa = JSON.stringify(a)
    const b = UrlExtendedBuilder.fromJson(sa).build()

    assert.deepEqual(a, b)
  }
}

runTest(TestURLExtendedTest)
