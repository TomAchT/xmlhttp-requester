/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {StringArrayMapBuilder} from '@flexio-oss/extended-flex-types'
import {XmlHttpResponseDelegateBuilder} from '../js/XmlHttpResponseDelegate'
import {StringArray} from '@flexio-oss/flex-types'
import {FakeExecutor} from './FakeExecutor'

const assert = require('assert')

export class TestXmlHttpResponseDelegate extends TestCase {
  setUp() {
    this.responseDelegateInst = FakeExecutor.expectedResponse()
  }

  // testSerializeDeserialize() {
  //   assert.deepEqual(this.responseDelegateInst.toJSON(), XmlHttpResponseDelegateBuilder.fromJson(JSON.stringify(this.responseDelegateInst)).build().toJSON())
  // } TODO verifier si on peut toujours utiliser les workers

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
    assert.deepEqual(this.responseDelegateInst.payload(), new Blob('{"toto":"toto","tutu":[1,4,6]}'))
  }
}

runTest(TestXmlHttpResponseDelegate)
