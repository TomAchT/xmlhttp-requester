import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {deepKeyAssigner} from '@flexio-oss/js-type-helpers'
import {
  StringArrayMap,
  StringArrayMapBuilder,
  URLExtended,
  URLExtendedBuilder,
  URLSearchParamsExtended,
  URLSearchParamsExtendedBuilder
} from '@flexio-oss/extended-flex-types'
import {XmlHttpRequestDelegate, XmlHttpRequestDelegateBuilder} from './src/js/types/XmlHttpRequestDelegate'
import {XmlHttpRequester, XmlHttpRequesterBuilder} from './src/js/XmlHttpRequester'
import {RequestMessageWorker, RequestMessageWorkerBuilder} from './src/js/types/RequestMessageWorker'

/**
 * @property {StringArrayMap} StringArrayMap
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.StringArrayMap', StringArrayMap)

/**
 * @property {StringArrayMapBuilder}  StringArrayMapBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.StringArrayMapBuilder', StringArrayMapBuilder)

/**
 * @property {URLExtended} URLExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.URLExtended', URLExtended)

/**
 * @property {URLExtendedBuilder}  URLExtendedBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.URLExtendedBuilder', URLExtendedBuilder)

/**
 * @property {URLSearchParamsExtended} URLSearchParamsExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.URLSearchParamsExtended', URLSearchParamsExtended)

/**
 * @property {URLSearchParamsExtendedBuilder}  URLSearchParamsExtendedBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.extended_flex_types.URLSearchParamsExtendedBuilder', URLSearchParamsExtendedBuilder)

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
