/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {StringArrayMapBuilder} from '@flexio-oss/extended-flex-types'
import {XmlHttpResponseDelegateBuilder} from '../js/XmlHttpResponseDelegate'
import {StringArray} from '@flexio-oss/flex-types'

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
    assert.deepEqual(this.responseDelegateInst.toJSON(), XmlHttpResponseDelegateBuilder.fromJson(JSON.stringify(this.responseDelegateInst)).build().toJSON())
  }

  testToObjectFromObject() {
    assert.deepEqual(this.responseDelegateInst.toJSON(), XmlHttpResponseDelegateBuilder.fromObject(this.responseDelegateInst.toObject()).build().toJSON())
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
