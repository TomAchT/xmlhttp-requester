'use strict'
/* global self:false, onmessage:false, postMessage:false, Request:false, URL:false, XMLHttpRequest:false, Headers:false */

import {globalFlexioImport} from 'flexio-jshelpers'
import '../../../import'
import {ExecutorWithoutClb} from './ExecutorWithoutClb'

self.onmessage = (e) => {
  const requestMessageWorker = globalFlexioImport.io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder.fromObject(e.data)

  const requester = new globalFlexioImport.io.flexio.xmlhttp_requester.types.XmlHttpRequesterBuilder()
    .xmlhttpRequestDelegate(requestMessageWorker.requestDelegate())
    .executor(new ExecutorWithoutClb())
    .build()

  switch (requestMessageWorker.method()) {
    case 'GET':
      self.postMessage(requester.get(null))
      break
    case 'POST':
      self.postMessage(requester.post(null, requestMessageWorker.contentType(), requestMessageWorker.body()))
      break
    case 'PATCH':
      self.postMessage(requester.patch(null, requestMessageWorker.contentType(), requestMessageWorker.body()))
      break
    case 'PUT':
      self.postMessage(requester.patch(null, requestMessageWorker.contentType(), requestMessageWorker.body()))
      break
    case 'DELETE':
      self.postMessage(requester.delete(null))
      break
    case 'HEAD':
      self.postMessage(requester.head(null))
      break
  }
}
