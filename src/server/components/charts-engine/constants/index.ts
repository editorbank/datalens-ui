const CONFIG_TYPE = {
    GRAPH_NODE: 'graph_node',
    TABLE_NODE: 'table_node',
    MAP_NODE: 'map_node',
    METRIC_NODE: 'metric_node',
    YMAP_NODE: 'ymap_node',
    CONTROL_NODE: 'control_node',
    MARKDOWN_NODE: 'markdown_node',

    GRAPH_WIZARD_NODE: 'graph_wizard_node',
    TABLE_WIZARD_NODE: 'table_wizard_node',

    GRAPH_QL_NODE: 'graph_ql_node',

    // deprecated
    TEXT_NODE: 'text_node',
} as const;

export const config = {
    ITS_FINE: 'EE_OK',
    CONFIG_LOADING_ERROR: 'ERR.CHARTS.CONFIG_LOADING_ERROR',
    DEPS_RESOLVE_ERROR: 'ERR.CHARTS.DEPS_RESOLVE_ERROR',
    DATA_FETCHING_ERROR: 'ERR.CHARTS.DATA_FETCHING_ERROR',
    RUNTIME_ERROR: 'ERR.CHARTS.RUNTIME_ERROR',
    RUNTIME_TIMEOUT_ERROR: 'ERR.CHARTS.RUNTIME_TIMEOUT',
    HOOKS_ERROR: 'ERR.CHARTS.HOOKS',

    ROWS_NUMBER_OVERSIZE: 'ERR.CHARTS.ROWS_NUMBER_OVERSIZE',
    TABLE_OVERSIZE: 'ERR.CHARTS.TABLE_OVERSIZE',
    SEGMENTS_OVERSIZE: 'ERR.CHARTS.SEGMENTS_OVERSIZE',

    // 60 seconds
    DEFAULT_FETCHING_TIMEOUT: 60 * 1000,

    // 50 seconds
    DEFAULT_SINGLE_FETCHING_TIMEOUT: 50 * 1000,

    // 100 MB
    ALL_REQUESTS_SIZE_LIMIT: 100 * 1e6,

    // 50 MB
    REQUEST_SIZE_LIMIT: 50 * 1e6,

    CONCURRENT_REQUESTS_LIMIT: 10,

    DEFAULT_RUNTIME_ERROR_STATUS: 420,
    DEFAULT_RUNTIME_TIMEOUT_STATUS: 408,
    DEFAULT_OVERSIZE_ERROR_STATUS: 422,
    DEFAULT_SOURCE_FETCHING_ERROR_STATUS_500: 424,
    DEFAULT_SOURCE_FETCHING_ERROR_STATUS_400: 427,

    OVERALL_TIMEOUT_EXCEEDED: 'ERR.CHARTS.OVERALL_TIMEOUT_EXCEEDED',
    INVALID_SOURCE_FORMAT: 'ERR.CHARTS.INVALID_SOURCE_FORMAT',
    SOURCE_IS_CIRCULAR: 'ERR.CHARTS.SOURCE_IS_CIRCULAR',
    INVALID_SOURCES_FORMAT: 'ERR.CHARTS.INVALID_SOURCES_FORMAT',
    UNKNOWN_SOURCE: 'ERR.CHARTS.UNKNOWN_SOURCE',
    EMPTY_RESPONSE: 'ERR.CHARTS.EMPTY_RESPONSE',
    REDIRECT: 'ERR.CHARTS.REDIRECT',
    UNHANDLED_INTERNAL_SERVER_ERROR: 'ERR.CHARTS.UNHANDLED_INTERNAL_SERVER_ERROR',

    REQUEST_CANCELLED: 'ERR.CHARTS.REQUEST_CANCELLED',
    REQUEST_SIZE_LIMIT_EXCEEDED: 'ERR.CHARTS.REQUEST_SIZE_LIMIT_EXCEEDED',
    ALL_REQUESTS_SIZE_LIMIT_EXCEEDED: 'ERR.CHARTS.ALL_REQUESTS_SIZE_LIMIT_EXCEEDED',
    REQUEST_TIMEOUT_EXCEEDED: 'ERR.CHARTS.REQUEST_TIMEOUT_EXCEEDED',
    ALL_REQUESTS_TIMEOUT_EXCEEDED: 'ERR.CHARTS.ALL_REQUESTS_TIMEOUT_EXCEEDED',

    CONFIG_TYPE,

    REDACTED_DATA_PLACEHOLDER: '[REDACTED]',
} as const;

// TODO: Will be deleted after switching to typescript.
export default config;
