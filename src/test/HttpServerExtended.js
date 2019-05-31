'use strict'

import {isNull, assertType} from '@flexio-oss/assert'
import {XmlHttpResponseDelegate} from '../js/XmlHttpResponseDelegate'

const http = require('http')

export class HttpServerExtended {
  /**
   *
   * @param {XmlHttpResponseDelegate} responseDelegate
   */
  constructor(responseDelegate) {
    assertType(responseDelegate instanceof XmlHttpResponseDelegate,
      'HttpServerExtended:constructor: `responseDelegate` shouldbe an instanceof XmlHttpResponseDelegate')
    this._responseDelegate = responseDelegate
  }

  /**
   *
   * @param {ServerResponse} response
   * @return {this}
   * @protected
   */
  _buildResponseHeader(response) {
    this._responseDelegate.headers().forEach((value, key) => {
      response.setHeader(key, value)
    })
    return this
  }

  /**
   *
   * @param {ServerResponse} response
   * @return {this}
   * @protected
   */
  _buildCode(response) {
    if (!isNull(this._responseDelegate.code())) {
      response.statusCode = this._responseDelegate.code()
    }
    return this
  }

  /**
   *
   * @param {ServerResponse} response
   * @return {this}
   * @protected
   */
  _buildPayload(response) {
    if (!isNull(this._responseDelegate.payload())) {
      response.write(this._responseDelegate.payload())
    }
    return this
  }

  listen(port) {
    // console.log(http)
    console.log(http.createServer)

    http.createServer(
      (request, response) => {
        console.log(request)
        this._buildResponseHeader(response)
          ._buildCode(response)
          ._buildPayload(response)
        response.end()
      }).listen(port, function() {
      console.log('server start at port ' + port)
    })
  }
}
