/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {StringArrayMapBuilder, StringArray, URLExtended} from '@flexio-oss/extended-flex-types'
import {XmlHttpResponseDelegateBuilder} from '../js/XmlHttpResponseDelegate'
import {Executor} from '../js/Executor/Executor'
import {HttpServerExtended} from './HttpServerExtended'
import {XmlHttpRequestDelegateBuilder} from '../js/types/XmlHttpRequestDelegate'

const assert = require('assert')

export class TestExecutor extends TestCase {
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

  testGet() {
    // const httpServer = new HttpServerExtended(this.responseDelegateInst).listen(8080)
    //
    // const executor = new Executor()
    // const response = executor.get(
    //   XmlHttpRequestDelegateBuilder
    //     .initEmpty()
    //     .path(new URLExtended('http://localhost:8080'))
    //     .header('bobo', 'bobobobo')
    //     .arrayHeader('string_array', new StringArray('bobo', 'bubu', 'bybyb'))
    //     .arrayHeader('array', ['bobo', 'bubu', 'bybyb'])
    //     .parameter('q', 'querry1')
    //     .arrayParameter('q_string_array', new StringArray('bobo', 'bubu', 'bybyb'))
    //     .arrayParameter('q_array', ['bobo', 'bubu', 'bybyb'])
    //     .build(),
    //   (resp) => {
    //     console.log('youpie')
    //     console.log(resp)
    //   }
    // )
    // console.log(response)
  }
}

runTest(TestExecutor)
