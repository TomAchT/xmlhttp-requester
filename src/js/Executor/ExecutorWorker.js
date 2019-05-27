/* global XMLHttpRequest */

import {globalFlexioImport} from 'flexio-jshelpers'
import {XmlHttpResponseDelegateBuilder} from '../XmlHttpResponseDelegate'
import {Executor} from './Executor'
import Worker from './Executor.worker'

/**
 * @implements {ExecutorRequesterInterface}
 */
export class ExecutorWorker extends Executor {
  /**
   *
   * @param {RequestMessageWorker} requestMessageWorker
   * @return {Worker}
   * @protected
   */
  _initWorker(requestMessageWorker) {
    const worker = new Worker()
    worker.postMessage(
      requestMessageWorker
    )
    return worker
  }

  /**
   *
   * @param {Worker} worker
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @protected
   */
  _listenWorker(worker, callback) {
    worker.addEventListener('message', (event) => {
      worker.terminate()
      callback(XmlHttpResponseDelegateBuilder.fromObject(event).build())
    })
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  get(xmlhttpRequestDelegate, callback) {
    this._listenWorker(
      this._initWorker(
        new globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder()
          .method('GET')
          .requestDelegate(this._checkRequestType(xmlhttpRequestDelegate))
          .build()
      ),
      callback
    )
  }

  /**
   /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   */
  post(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    this._listenWorker(
      this._initWorker(
        new globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder()
          .method('POST')
          .requestDelegate(
            this._checkRequestType(
              this._ensureContentType(xmlhttpRequestDelegate, contentType)
            )
          )
          .body(body)
          .build()
      ),
      callback
    )
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   */
  put(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    this._listenWorker(
      this._initWorker(
        new globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder()
          .method('PUT')
          .requestDelegate(
            this._checkRequestType(
              this._ensureContentType(xmlhttpRequestDelegate, contentType)
            )
          )
          .body(body)
          .build()
      ),
      callback
    )
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   */
  patch(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    this._listenWorker(
      this._initWorker(
        new globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder()
          .method('PATCH')
          .requestDelegate(
            this._checkRequestType(
              this._ensureContentType(xmlhttpRequestDelegate, contentType)
            )
          )
          .body(body)
          .build()
      ),
      callback
    )
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  delete(xmlhttpRequestDelegate, callback) {
    this._listenWorker(
      this._initWorker(
        new globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder()
          .method('DELETE')
          .requestDelegate(this._checkRequestType(xmlhttpRequestDelegate))
          .build()
      ),
      callback
    )
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   */
  head(xmlhttpRequestDelegate, callback) {
    this._listenWorker(
      this._initWorker(
        new globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder()
          .method('HEAD')
          .requestDelegate(this._checkRequestType(xmlhttpRequestDelegate))
          .build()
      ),
      callback
    )
  }

}
