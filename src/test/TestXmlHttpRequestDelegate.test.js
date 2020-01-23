/* global runTest */
import {TestCase} from 'code-altimeter-js'
import '../../import'
import {URLExtended} from '@flexio-oss/extended-flex-types'
import {StringArray} from '@flexio-oss/flex-types'
import {XmlHttpRequestDelegateBuilder} from '../js/types/XmlHttpRequestDelegate'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

const assert = require('assert')

export class TestXmlHttpRequestDelegate extends TestCase {
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
    assert.deepEqual(this.requestDelegate.toJSON(), XmlHttpRequestDelegateBuilder.fromJson(JSON.stringify(this.requestDelegate)).build().toJSON())
  }

  testToObjectFromObject() {
    assert.deepEqual(this.requestDelegate.toJSON(), XmlHttpRequestDelegateBuilder.fromObject(this.requestDelegate.toObject()).build().toJSON())
  }

  testRetrieveProperties() {

    assert.deepEqual(this.requestDelegate.parameters(), this.__parameters(), 'should retrieve parameters')
    assert.deepEqual(this.requestDelegate.path(), new URLExtended('https://flexio.io/test'), 'should retrieve path')
    assert.deepEqual(this.requestDelegate.headers().entries(), this.__headers().entries(), 'should retrieve headers')

  }

  testRetrievePropertiesAfterSrialisation() {

    const requestDelegate = XmlHttpRequestDelegateBuilder.fromJson(JSON.stringify(this.requestDelegate)).build()

    assert.deepEqual(requestDelegate.parameters(), this.__parameters(), 'should retrieve parameters')
    assert.deepEqual(requestDelegate.path(), new URLExtended('https://flexio.io/test'), 'should retrieve path')
    assert.deepEqual(requestDelegate.headers().entries(), this.__headers().entries(), 'should retrieve headers')

  }
}

runTest(TestXmlHttpRequestDelegate)
