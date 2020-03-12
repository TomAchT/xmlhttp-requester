/* global runTest */
import {TestCase} from 'code-altimeter-js'
import '../../import'
import {URLExtended} from '@flexio-oss/extended-flex-types'
import {XmlHttpRequestDelegateBuilder} from '../js/types/XmlHttpRequestDelegate'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {XmlHttpRequester, XmlHttpRequesterBuilder} from '../js/XmlHttpRequester'
import {FakeExecutor} from './FakeExecutor'
import {StringArray} from '@flexio-oss/flex-types'

const assert = require('assert')

export class TestXmlHttpRequester extends TestCase {
  setUp() {
    this.requester = new XmlHttpRequester(
      new FakeExecutor()
    )

    this.requester
      .path('https://flexio.io/test')
      .header('bobo', 'bobobobo')
      .arrayHeader('string_array', new StringArray('bobo', 'bubu', 'bybyb'))
      .arrayHeader('array', ['bobo', 'bubu', 'bybyb'])
      .parameter('q', 'querry1')
      .arrayParameter('q_string_array', new StringArray('bobo', 'bubu', 'bybyb'))
      .arrayParameter('q_array', ['bobo', 'bubu', 'bybyb'])
  }

  /**
   *
   * @return {XmlHttpRequestDelegate}
   * @private
   */
  __requestDelegate() {
    return XmlHttpRequestDelegateBuilder
      .initEmpty()
      .path(new URLExtended('https://flexio.io/test'))
      .header('bobo', 'bobobobo')
      .arrayHeader('string_array', new StringArray('bobo', 'bubu', 'bybyb'))
      .arrayHeader('array', ['bobo', 'bubu', 'bybyb'])
      .parameter('q', 'querry1')
      .arrayParameter('q_string_array', new StringArray('bobo', 'bubu', 'bybyb'))
      .arrayParameter('q_array', ['bobo', 'bubu', 'bybyb'])
      .build()
  }

  /**
   *
   * @return {URLSearchParamsExtended}
   * @private
   */
  __parameters() {
    const parameters = new globalFlexioImport.io.flexio.extended_flex_types.URLSearchParamsExtended()

    parameters.set('q', 'querry1')
    for (const v of new StringArray(...new StringArray('bobo', 'bubu', 'bybyb'))) {
      parameters.append('q_string_array', v)
    }
    for (const v of new StringArray(...['bobo', 'bubu', 'bybyb'])) {
      parameters.append('q_array', v)
    }
    return parameters
  }

  /**
   *
   * @return {StringArrayMap}
   * @private
   */
  __headers() {
    const headers = new globalFlexioImport.io.flexio.extended_flex_types.StringArrayMap()

    headers.set('bobo', new StringArray('bobobobo'))
    headers.set('string_array', new StringArray(...new StringArray('bobo', 'bubu', 'bybyb')))
    headers.set('array', new StringArray(...['bobo', 'bubu', 'bybyb']))
    return headers
  }

  testRequesterPath() {
    this.requester.path('https://flexio.io//test/')
    assert.deepEqual(this.requester._xmlhttpRequestDelegateBuilder._path.href, 'https://flexio.io/test')

    this.requester.path('https://flexio.io//test//')
    assert.deepEqual(this.requester._xmlhttpRequestDelegateBuilder._path.href, 'https://flexio.io/test')

    this.requester.path('https://flexio.io//test://')
    assert.deepEqual(this.requester._xmlhttpRequestDelegateBuilder._path.href, 'https://flexio.io/test:')
  }

  testSerializeDeserialize() {
    assert(JSON.stringify(this.requester) === JSON.stringify(this.__requestDelegate()), 'fromJson equals')

    assert.throws(
      () => {
        XmlHttpRequesterBuilder.fromJson(JSON.stringify(this.requester)).build()
      },
      TypeError
    )

    assert.deepEqual(this.requester.toJSON(), XmlHttpRequesterBuilder.fromJson(JSON.stringify(this.requester)).executor(new FakeExecutor()).build().toJSON(), 'JSON rebuild')
  }

  testToObjectFromObject() {
    assert.throws(
      () => {
        XmlHttpRequesterBuilder.fromObject(this.requester.toObject()).build()
      },
      TypeError
    )

    assert.deepEqual(this.requester.toJSON(), XmlHttpRequesterBuilder.fromObject(this.requester.toObject()).executor(new FakeExecutor()).build().toJSON(), 'fromObject rebuild')
  }

  testFromRequestDelegate() {
    assert.deepEqual(this.requester.requestDelegate().toJSON(), new XmlHttpRequester(new FakeExecutor(), this.__requestDelegate()).requestDelegate().toJSON())
  }

  testRetrieveProperties() {
    assert.deepEqual(this.requester.requestDelegate().parameters(), this.__parameters(), 'should retrieve parameters')
    assert.deepEqual(this.requester.requestDelegate().path(), new URLExtended('https://flexio.io/test'), 'should retrieve path')
    assert.deepEqual(this.requester.requestDelegate().headers().entries(), this.__headers().entries(), 'should retrieve headers')
  }

  testRetrievePropertiesAfterSerialisation() {
    const requester = XmlHttpRequesterBuilder.fromJson(JSON.stringify(this.requester)).executor(new FakeExecutor()).build()
    assert.deepEqual(requester.requestDelegate().parameters(), this.__parameters(), 'should retrieve parameters')
    assert.deepEqual(requester.requestDelegate().path(), new URLExtended('https://flexio.io/test'), 'should retrieve path')
    assert.deepEqual(requester.requestDelegate().headers().entries(), this.__headers().entries(), 'should retrieve headers')
  }

  testMethodGET() {

    assert.throws(
      () => {
        this.requester.get((resp) => {
          assert.notDeepStrictEqual(resp.toJSON(), FakeExecutor.expectedResponse().toJSON())
        })
      })
  }

  testMethodPOST() {

    assert.throws(
      () => {
        this.requester.post((resp) => {
          assert.notDeepStrictEqual(resp.toJSON(), FakeExecutor.expectedResponse().toJSON())
        })
      })
  }

  testMethodPATCH() {

    assert.throws(
      () => {
        this.requester.patch((resp) => {
          assert.notDeepStrictEqual(resp.toJSON(), FakeExecutor.expectedResponse().toJSON())
        })
      })
  }

  testMethodPUT() {

    assert.throws(
      () => {
        this.requester.put((resp) => {
          assert.notDeepStrictEqual(resp.toJSON(), FakeExecutor.expectedResponse().toJSON())
        })
      })
  }

  testMethodDELETE() {

    assert.throws(
      () => {
        this.requester.delete((resp) => {
          assert.notDeepStrictEqual(resp.toJSON(), FakeExecutor.expectedResponse().toJSON())
        })
      })
  }

  testMethodHEAD() {
    assert.deepEqual(FakeExecutor.expectedResponse().toJSON(), this.requester.head(() => {
    }).toJSON())


  }
}

runTest(TestXmlHttpRequester)
