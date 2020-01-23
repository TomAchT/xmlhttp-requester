/* global XMLHttpRequest */
import {StringArrayMapBuilder} from '@flexio-oss/extended-flex-types'
import {XmlHttpResponseDelegateBuilder} from '../js/XmlHttpResponseDelegate'
import {ExecutorRequesterInterface} from '../js/Executor/ExecutorRequesterInterface'
import {StringArray} from '@flexio-oss/flex-types'

/**
 * @implements {ExecutorRequesterInterface}
 */
export class FakeExecutor extends ExecutorRequesterInterface {
  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  get(xmlhttpRequestDelegate, callback) {
    callback(FakeExecutor.expectedResponse())
    return FakeExecutor.expectedResponse()
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {ResponseDelegate}
   */
  post(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    callback(FakeExecutor.expectedResponse())
    return FakeExecutor.expectedResponse()
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  put(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    callback(FakeExecutor.expectedResponse())
    return FakeExecutor.expectedResponse()
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  patch(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    callback(FakeExecutor.expectedResponse())
    return FakeExecutor.expectedResponse()
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  delete(xmlhttpRequestDelegate, callback) {
    callback(FakeExecutor.expectedResponse())
    return FakeExecutor.expectedResponse()
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  head(xmlhttpRequestDelegate, callback) {
    callback(FakeExecutor.expectedResponse())
    return FakeExecutor.expectedResponse()
  }

  /**
   * @return {XmlHttpResponseDelegate}
   */
  static expectedResponse() {
    return new XmlHttpResponseDelegateBuilder()
      .code(200)
      .payload(JSON.stringify({toto: 'toto', tutu: [1, 4, 6]}))
      .headers((new StringArrayMapBuilder())
        .entries(
          [
            ['toto', new StringArray('bibi', 'bubu')],
            ['titi', new StringArray('baba', 'bobo')],
            ['coucou', new StringArray('kangourou')]
          ]
        )
        .build())
      .build()
  }
}
