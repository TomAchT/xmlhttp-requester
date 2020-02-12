/* global XMLHttpRequest */

import {isNull} from '@flexio-oss/assert'
import {SyncExecutor} from './SyncExecutor'

/**
 * @implements {ExecutorRequesterInterface}
 */
export class ExecutorWithoutClb extends SyncExecutor {
  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  get(xmlhttpRequestDelegate, callback) {
    return this.exec(xmlhttpRequestDelegate, 'GET')
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {ResponseDelegate}
   */
  post(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return this.exec(xmlhttpRequestDelegate, 'POST', body)
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  put(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return this.exec(xmlhttpRequestDelegate, 'PUT', body)
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  patch(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    if (!isNull(contentType)) {
      this.header('content-type', contentType)
    }
    return this.exec(xmlhttpRequestDelegate, 'PATCH', body)
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  delete(xmlhttpRequestDelegate, callback) {
    return this.exec(xmlhttpRequestDelegate, 'DELETE')
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  head(xmlhttpRequestDelegate, callback) {
    return this.exec(xmlhttpRequestDelegate, 'HEAD')
  }
}
