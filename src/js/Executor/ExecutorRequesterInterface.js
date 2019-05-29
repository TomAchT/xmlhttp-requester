/**
 * @interface
 */
export class ExecutorRequesterInterface {
  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  get(xmlhttpRequestDelegate, callback) {
    throw new Error('Should be override')
  }

  /**
   * @callback ExecutorRequesterInterface~executionClb
   * @param  {ResponseDelegate} response
   */

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} [contentType=null]
   * @param {?string} [body=null]
   * @return {ResponseDelegate}
   */
  post(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    throw new Error('Should be override')
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  put(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    throw new Error('Should be override')
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @param {?string} contentType
   * @param {?string} body
   * @return {ResponseDelegate}
   */
  patch(xmlhttpRequestDelegate, callback, contentType = null, body = null) {
    throw new Error('Should be override')
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  delete(xmlhttpRequestDelegate, callback) {
    throw new Error('Should be override')
  }

  /**
   * @param {XmlHttpRequestDelegate} xmlhttpRequestDelegate
   * @param {ExecutorRequesterInterface~executionClb} callback
   * @return {ResponseDelegate}
   */
  head(xmlhttpRequestDelegate, callback) {
    throw new Error('Should be override')
  }
}
