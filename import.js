import {globalFlexioImport, deepKeyAssigner} from 'flexio-jshelpers'
import {StringArrayMap, StringArrayMapBuilder} from './src/js/types/StringArrayMap'
import {URLExtended, URLExtendedBuilder} from './src/js/types/URLExtended'
import {XmlHttpRequestDelegate, XmlHttpRequestDelegateBuilder} from './src/js/types/XmlHttpRequestDelegate'
import {URLSearchParamsExtended, URLSearchParamsExtendedBuilder} from './src/js/types/URLSearchParamsExtended'
import {XmlHttpRequester, XmlHttpRequesterBuilder} from './src/js/XmlHttpRequester'
import {RequestMessageWorker, RequestMessageWorkerBuilder} from './src/js/types/RequestMessageWorker'

/**
 * @property {StringArrayMap} StringArrayMap
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.StringArrayMap', StringArrayMap)

/**
 * @property {StringArrayMapBuilder}  StringArrayMapBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.StringArrayMapBuilder', StringArrayMapBuilder)

/**
 * @property {URLExtended} URLExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.types.URLExtended', URLExtended)

/**
 * @property {URLExtendedBuilder}  URLExtendedBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.types.URLExtendedBuilder', URLExtendedBuilder)

/**
 * @property {URLSearchParamsExtended} URLSearchParamsExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.types.URLSearchParamsExtended', URLSearchParamsExtended)

/**
 * @property {URLSearchParamsExtendedBuilder}  URLSearchParamsExtendedBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.types.URLSearchParamsExtendedBuilder', URLSearchParamsExtendedBuilder)

/**
 * @property {XmlHttpRequestDelegate} XmlHttpRequestDelegate
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegate', XmlHttpRequestDelegate)

/**
 * @property {XmlHttpRequestDelegateBuilder}  XmlHttpRequestDelegateBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.XmlHttpRequestDelegateBuilder', XmlHttpRequestDelegateBuilder)

/**
 * @property {XmlHttpRequester} XmlHttpRequester
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.XmlHttpRequester', XmlHttpRequester)

/**
 * @property {XmlHttpRequesterBuilder}  XmlHttpRequesterBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.XmlHttpRequesterBuilder', XmlHttpRequesterBuilder)

/**
 * @property {RequestMessageWorker} RequestMessageWorker
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.RequestMessageWorker', RequestMessageWorker)

/**
 * @property {RequestMessageWorkerBuilder}  RequestMessageWorkerBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.RequestMessageWorkerBuilder', RequestMessageWorkerBuilder)
