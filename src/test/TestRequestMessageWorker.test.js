/* global runTest */
import {TestCase} from 'code-altimeter-js'
import '../../import'
import {URLExtended} from '@flexio-oss/extended-flex-types'
import {RequestMessageWorkerBuilder} from '../js/types/RequestMessageWorker'
import {XmlHttpRequestDelegateBuilder} from '../js/types/XmlHttpRequestDelegate'
import {StringArray} from '@flexio-oss/flex-types'

const assert = require('assert')

export class TestRequestMessageWorker extends TestCase {
  setUp() {
    this.requestDelegate = XmlHttpRequestDelegateBuilder
      .initEmpty()
      .path(new URLExtended('https://flexio.io/test'))
      .header('bobo', 'bobobobo')
      .arrayHeader('string_array', new StringArray('bobo', 'bubu', 'bybyb'))
      .arrayHeader('array', ['bobo', 'bubu', 'bybyb'])
      .parameter('q', 'querry1')
      .arrayParameter('q_string_array', new StringArray('bobo', 'bubu', 'bybyb'))
      .arrayParameter('q_array', ['bobo', 'bubu', 'bybyb'])
      .build()

    this.requestMessageWorker = new RequestMessageWorkerBuilder()
      .method('POST')
      .body(JSON.stringify({toto: 'toto', tutu: [1, 4, 6]}))
      .contentType('application/json')
      .requestDelegate(this.requestDelegate)
      .build()
  }

  testSerializeDeserialize() {
    assert.deepEqual(this.requestMessageWorker.toJSON(), RequestMessageWorkerBuilder.fromJson(JSON.stringify(this.requestMessageWorker)).build().toJSON())
  }

  testToObjectFromObject() {
    assert.deepEqual(this.requestMessageWorker.toJSON(), RequestMessageWorkerBuilder.fromObject(this.requestMessageWorker.toObject()).build().toJSON())
  }

  testRetrieveProperties() {
    assert(this.requestMessageWorker.method() === 'POST')
    assert.deepEqual(this.requestDelegate.toJSON(), this.requestMessageWorker.requestDelegate().toJSON())
    assert(this.requestMessageWorker.body() === JSON.stringify({toto: 'toto', tutu: [1, 4, 6]}))
    assert(this.requestMessageWorker.contentType() === 'application/json')
  }

  testRetrievePropertiesAfterSerialisation() {
    const requestMessageWorker = RequestMessageWorkerBuilder.fromJson(JSON.stringify(this.requestMessageWorker)).build()

    assert(requestMessageWorker.method() === 'POST')
    assert.deepEqual(requestMessageWorker.requestDelegate().toJSON(), this.requestMessageWorker.requestDelegate().toJSON())
    assert(requestMessageWorker.body() === JSON.stringify({toto: 'toto', tutu: [1, 4, 6]}))
    assert(requestMessageWorker.contentType() === 'application/json')
  }
}

runTest(TestRequestMessageWorker)
