'use strict'
/* global self:false, onmessage:false, postMessage:false, Request:false, URL:false, XMLHttpRequest:false, Headers:false */

import '../../../import'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ExecutorWithoutClb} from './ExecutorWithoutClb'

self.onmessage = (e) => {

  const requestMessageWorker = globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder
    .fromObject(e.data)
    .build()

  const requester = new globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequesterBuilder()
    .xmlhttpRequestDelegate(requestMessageWorker.requestDelegate())
    .executor(new ExecutorWithoutClb())
    .build()

  switch (requestMessageWorker.method()) {
    case 'GET':
      self.postMessage(
        requester
          .get(null)
          .toObject()
      )
      break
    case 'POST':
      self.postMessage(
        requester
          .post(null, requestMessageWorker.contentType(), requestMessageWorker.body())
          .toObject()
      )
      break
    case 'PATCH':
      self.postMessage(
        requester
          .patch(null, requestMessageWorker.contentType(), requestMessageWorker.body())
          .toObject()
      )
      break
    case 'PUT':
      self.postMessage(
        requester
          .put(null, requestMessageWorker.contentType(), requestMessageWorker.body())
          .toObject()
      )
      break
    case 'DELETE':
      self.postMessage(
        requester
          .delete(null)
          .toObject()
      )
      break
    case 'HEAD':
      self.postMessage(
        requester
          .head(null)
          .toObject()
      )
      break
    default:
      self.postMessage(globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegateBuilder.build().toObject())
  }
}
