import {globalFlexioImport, deepKeyAssigner} from 'flexio-jshelpers'
import {StringArrayMap, StringArrayMapBuilder} from 'src/js/types/StringArrayMap'
import {URLExtended, URLExtendedBuilder} from 'src/js/types/URLExtended'
import {URLSearchParamsExtended, URLSearchParamsExtendedBuilder} from 'src/js/types/URLSearchParamsExtended'

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
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.URLExtended', URLExtended)

/**
 * @property {URLExtendedBuilder}  URLExtendedBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.URLExtendedBuilder', URLExtendedBuilder)

/**
 * @property {URLSearchParamsExtended} URLSearchParamsExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.URLSearchParamsExtended', URLSearchParamsExtended)

/**
 * @property {URLSearchParamsExtendedBuilder}  URLSearchParamsExtendedBuilder
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.xmlhttp_requester.types.URLSearchParamsExtendedBuilder', URLSearchParamsExtendedBuilder)

export {XmlHttpRequester} from './src/js/XmlHttpRequester'
