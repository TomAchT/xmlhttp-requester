/* global runTest */
import {TestCase} from 'code-altimeter-js'
import '../../import'
import {StringArray, URLExtended} from '@flexio-oss/extended-flex-types'
import {XmlHttpRequestDelegateBuilder} from '../js/types/XmlHttpRequestDelegate'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {XmlHttpRequester, XmlHttpRequesterBuilder} from '../js/XmlHttpRequester'
import {FakeExecutor} from './FakeExecutor'

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

  testSerializeDeserialize() {
    assert(JSON.stringify(this.requester) === JSON.stringify(this.__requestDelegate()), 'fromJson equals')

    assert.throws(
      () => {
        XmlHttpRequesterBuilder.fromJson(JSON.stringify(this.requester)).build()
      },
      TypeError
    )

    assert.deepEqual(this.requester, XmlHttpRequesterBuilder.fromJson(JSON.stringify(this.requester)).executor(new FakeExecutor()).build(), 'JSON rebuild')
  }

  testToObjectFromObject() {
    assert.throws(
      () => {
        XmlHttpRequesterBuilder.fromObject(this.requester.toObject()).build()
      },
      TypeError
    )

    assert.deepEqual(this.requester, XmlHttpRequesterBuilder.fromObject(this.requester.toObject()).executor(new FakeExecutor()).build(), 'fromObject rebuild')
  }

  testFromRequestDelegate() {
    assert.deepEqual(
      this.requester.requestDelegate(),
      new XmlHttpRequester(
        new FakeExecutor(),
        this.__requestDelegate()
      ).requestDelegate()
    )
  }

  testRetrieveProperties() {
    assert.deepEqual(this.requester.requestDelegate().parameters(), this.__parameters(), 'should retrieve parameters')
    assert.deepEqual(this.requester.requestDelegate().path(), new URLExtended('https://flexio.io/test'), 'should retrieve path')
    assert.deepEqual(this.requester.requestDelegate().headers(), this.__headers(), 'should retrieve headers')
  }

  testRetrievePropertiesAfterSrialisation() {
    const requester = XmlHttpRequesterBuilder.fromJson(JSON.stringify(this.requester)).executor(new FakeExecutor()).build()

    assert.deepEqual(requester.requestDelegate().parameters(), this.__parameters(), 'should retrieve parameters')
    assert.deepEqual(requester.requestDelegate().path(), new URLExtended('https://flexio.io/test'), 'should retrieve path')
    assert.deepEqual(requester.requestDelegate().headers(), this.__headers(), 'should retrieve headers')
  }
}

runTest(TestXmlHttpRequester)
