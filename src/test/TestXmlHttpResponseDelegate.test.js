/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {StringArray} from 'flexio-jshelpers'
import {StringArrayMapBuilder} from '../js/StringArrayMap'
import {XmlHttpResponseDelegateBuilder} from '../js/XmlHttpResponseDelegate'

const assert = require('assert')

export class TestXmlHttpResponseDelegate extends TestCase {
  setUp() {
    this.responseDelegateInst = (new XmlHttpResponseDelegateBuilder())
      .code(200)
      .payload('I am the payload')
      .headers((new StringArrayMapBuilder())
        .entries(
          [
            ['toto', new StringArray('bibi', 'bubu')],
            ['titi', new StringArray('baba', 'bobo')],
            ['coucou', new StringArray('kangourou')]
          ]
        )
        .build()
      )
      .build()
  }

  testSerializeDeserialize() {
    assert.deepEqual(this.responseDelegateInst, XmlHttpResponseDelegateBuilder.fromJson(JSON.stringify(this.responseDelegateInst)).build())
  }

  testToObjectFromObject() {
    assert.deepEqual(this.responseDelegateInst, XmlHttpResponseDelegateBuilder.fromObject(this.responseDelegateInst.toObject()).build())
  }

  testRetrieveHeader() {
    assert(this.responseDelegateInst.header('coucou') === 'kangourou')
    assert.deepEqual(this.responseDelegateInst.header('titi'), new StringArray('baba', 'bobo'))
    assert.deepEqual(this.responseDelegateInst.header('titi'), ['baba', 'bobo'])
  }

  testRetrieveProperties() {
    assert(this.responseDelegateInst.code() === 200)
    assert(this.responseDelegateInst.code() == '200')
    assert(this.responseDelegateInst.payload() === 'I am the payload')
  }
}

runTest(TestXmlHttpResponseDelegate)
