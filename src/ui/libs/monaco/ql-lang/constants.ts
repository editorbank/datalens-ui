export const KEYWORDS = [
    'AS',
    'ASC',
    'BY',
    'CONCAT',
    'DATE',
    'DATETIME',
    'DAYOFYEAR',
    'DECIMAL',
    'DESC',
    'DISTINCT',
    'END',
    'FALSE',
    'FIRST',
    'FROM',
    'GROUP',
    'HAVING',
    'HOUR',
    'IF',
    'INT',
    'LIMIT',
    'OFFSET',
    'RANGE',
    'ROWCOUNT',
    'SET',
    'TIME',
    'TRUE',
    'UNIQUE',
    'VARCHAR',
    'WHERE',
    'SELECT',
    'ORDER',
];

export const FUNCTIONS = [
    // Aggregate
    'AVG',
    'ANY',
    'CHECKSUM_AGG',
    'COUNT',
    'COUNT_BIG',
    'COVARPOP',
    'COVARSAMP',
    'GROUPING',
    'GROUPING_ID',
    'MAX',
    'MIN',
    'SUM',
    'STDEV',
    'STDEVP',
    'STDDEVPOP',
    'STDDEVSAMP',
    'VAR',
    'VARP',
    'VARPOP',
    'VARSAMP',
    // Analytic
    'CUME_DIST',
    'FIRST_VALUE',
    'LAG',
    'LAST_VALUE',
    'LEAD',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PERCENT_RANK',
    // ClickHouse-specific aggregate functions
    'ANYHEAVY',
    'ANYLAST',
    'ARGMIN',
    'ARGMAX',
    'AVGWEIGHTED',
    'TOPK',
    'TOPKWEIGHTED',
    'GROUPARRAY',
    'GROUPUNIQARRAY',
    'GROUPARRAYINSERTAT',
    'GROUPARRAYMOVINGAVG',
    'GROUPARRAYMOVINGSUM',
    'GROUPBITAND',
    'GROUPBITOR',
    'GROUPBITXOR',
    'GROUPBITMAP',
    'GROUPBITMAPAND',
    'GROUPBITMAPOR',
    'GROUPBITMAPXOR',
    'SUMWITHOVERFLOW',
    'SUMMAP',
    'MINMAP',
    'MAXMAP',
    'SKEWSAMP',
    'SKEWPOP',
    'KURTSAMP',
    'KURTPOP',
    'UNIQ',
    'UNIQEXACT',
    'UNIQCOMBINED',
    'UNIQCOMBINED64',
    'UNIQHLL12',
    'QUANTILE',
    'QUANTILES',
    'QUANTILEEXACT',
    'QUANTILEEXACTLOW',
    'QUANTILEEXACTHIGH',
    'QUANTILEEXACTWEIGHTED',
    'QUANTILETIMING',
    'QUANTILETIMINGWEIGHTED',
    'QUANTILEDETERMINISTIC',
    'QUANTILETDIGEST',
    'QUANTILETDIGESTWEIGHTED',
    'QUANTILEBFLOAT16',
    'QUANTILEBFLOAT16WEIGHTED',
    'SIMPLELINEARREGRESSION',
    'STOCHASTICLINEARREGRESSION',
    'STOCHASTICLOGISTICREGRESSION',
    'CATEGORICALINFORMATIONVALUE',
    // Collation
    'COLLATE',
    'COLLATIONPROPERTY',
    'TERTIARY_WEIGHTS',
    // Azure
    'FEDERATION_FILTERING_VALUE',
    // Conversion
    'CAST',
    'CONVERT',
    'PARSE',
    'TRY_CAST',
    'TRY_CONVERT',
    'TRY_PARSE',
    // Cryptographic
    'ASYMKEY_ID',
    'ASYMKEYPROPERTY',
    'CERTPROPERTY',
    'CERT_ID',
    'CRYPT_GEN_RANDOM',
    'DECRYPTBYASYMKEY',
    'DECRYPTBYCERT',
    'DECRYPTBYKEY',
    'DECRYPTBYKEYAUTOASYMKEY',
    'DECRYPTBYKEYAUTOCERT',
    'DECRYPTBYPASSPHRASE',
    'ENCRYPTBYASYMKEY',
    'ENCRYPTBYCERT',
    'ENCRYPTBYKEY',
    'ENCRYPTBYPASSPHRASE',
    'HASHBYTES',
    'IS_OBJECTSIGNED',
    'KEY_GUID',
    'KEY_ID',
    'KEY_NAME',
    'SIGNBYASYMKEY',
    'SIGNBYCERT',
    'SYMKEYPROPERTY',
    'VERIFYSIGNEDBYCERT',
    'VERIFYSIGNEDBYASYMKEY',
    // Cursor
    'CURSOR_STATUS',
    // Datatype
    'DATALENGTH',
    'IDENT_CURRENT',
    'IDENT_INCR',
    'IDENT_SEED',
    'IDENTITY',
    'SQL_VARIANT_PROPERTY',
    // Datetime
    'CURRENT_TIMESTAMP',
    'DATEADD',
    'DATEDIFF',
    'DATEFROMPARTS',
    'DATENAME',
    'DATEPART',
    'DATETIME2FROMPARTS',
    'DATETIMEFROMPARTS',
    'DATETIMEOFFSETFROMPARTS',
    'DAY',
    'EOMONTH',
    'GETDATE',
    'GETUTCDATE',
    'ISDATE',
    'MONTH',
    'SMALLDATETIMEFROMPARTS',
    'SWITCHOFFSET',
    'SYSDATETIME',
    'SYSDATETIMEOFFSET',
    'SYSUTCDATETIME',
    'TIMEFROMPARTS',
    'TODATETIMEOFFSET',
    'YEAR',
    // Logical
    'CHOOSE',
    'COALESCE',
    'IIF',
    'NULLIF',
    // Mathematical
    'ABS',
    'ACOS',
    'ASIN',
    'ATAN',
    'ATN2',
    'CEILING',
    'COS',
    'COT',
    'DEGREES',
    'EXP',
    'FLOOR',
    'LOG',
    'LOG10',
    'PI',
    'POWER',
    'RADIANS',
    'RAND',
    'ROUND',
    'SIGN',
    'SIN',
    'SQRT',
    'SQUARE',
    'TAN',
    // Metadata
    'APP_NAME',
    'APPLOCK_MODE',
    'APPLOCK_TEST',
    'ASSEMBLYPROPERTY',
    'COL_LENGTH',
    'COL_NAME',
    'COLUMNPROPERTY',
    'DATABASE_PRINCIPAL_ID',
    'DATABASEPROPERTYEX',
    'DB_ID',
    'DB_NAME',
    'FILE_ID',
    'FILE_IDEX',
    'FILE_NAME',
    'FILEGROUP_ID',
    'FILEGROUP_NAME',
    'FILEGROUPPROPERTY',
    'FILEPROPERTY',
    'FULLTEXTCATALOGPROPERTY',
    'FULLTEXTSERVICEPROPERTY',
    'INDEX_COL',
    'INDEXKEY_PROPERTY',
    'INDEXPROPERTY',
    'OBJECT_DEFINITION',
    'OBJECT_ID',
    'OBJECT_NAME',
    'OBJECT_SCHEMA_NAME',
    'OBJECTPROPERTY',
    'OBJECTPROPERTYEX',
    'ORIGINAL_DB_NAME',
    'PARSENAME',
    'SCHEMA_ID',
    'SCHEMA_NAME',
    'SCOPE_IDENTITY',
    'SERVERPROPERTY',
    'STATS_DATE',
    'TYPE_ID',
    'TYPE_NAME',
    'TYPEPROPERTY',
    // Ranking
    'DENSE_RANK',
    'NTILE',
    'RANK',
    'ROW_NUMBER',
    // Replication
    'PUBLISHINGSERVERNAME',
    // Rowset
    'OPENDATASOURCE',
    'OPENQUERY',
    'OPENROWSET',
    'OPENXML',
    // Security
    'CERTENCODED',
    'CERTPRIVATEKEY',
    'CURRENT_USER',
    'HAS_DBACCESS',
    'HAS_PERMS_BY_NAME',
    'IS_MEMBER',
    'IS_ROLEMEMBER',
    'IS_SRVROLEMEMBER',
    'LOGINPROPERTY',
    'ORIGINAL_LOGIN',
    'PERMISSIONS',
    'PWDENCRYPT',
    'PWDCOMPARE',
    'SESSION_USER',
    'SESSIONPROPERTY',
    'SUSER_ID',
    'SUSER_NAME',
    'SUSER_SID',
    'SUSER_SNAME',
    'SYSTEM_USER',
    'USER',
    'USER_ID',
    'USER_NAME',
    // String
    'ASCII',
    'CHAR',
    'CHARINDEX',
    'CONCAT',
    'DIFFERENCE',
    'FORMAT',
    'LEFT',
    'LEN',
    'LOWER',
    'LTRIM',
    'NCHAR',
    'PATINDEX',
    'QUOTENAME',
    'REPLACE',
    'REPLICATE',
    'REVERSE',
    'RIGHT',
    'RTRIM',
    'SOUNDEX',
    'SPACE',
    'STR',
    'STUFF',
    'SUBSTRING',
    'UNICODE',
    'UPPER',
    // System
    'BINARY_CHECKSUM',
    'CHECKSUM',
    'CONNECTIONPROPERTY',
    'CONTEXT_INFO',
    'CURRENT_REQUEST_ID',
    'ERROR_LINE',
    'ERROR_NUMBER',
    'ERROR_MESSAGE',
    'ERROR_PROCEDURE',
    'ERROR_SEVERITY',
    'ERROR_STATE',
    'FORMATMESSAGE',
    'GETANSINULL',
    'GET_FILESTREAM_TRANSACTION_CONTEXT',
    'HOST_ID',
    'HOST_NAME',
    'ISNULL',
    'ISNUMERIC',
    'MIN_ACTIVE_ROWVERSION',
    'NEWID',
    'NEWSEQUENTIALID',
    'ROWCOUNT_BIG',
    'XACT_STATE',
    // TextImage
    'TEXTPTR',
    'TEXTVALID',
    // Trigger
    'COLUMNS_UPDATED',
    'EVENTDATA',
    'TRIGGER_NESTLEVEL',
    'UPDATE',
    // ChangeTracking
    'CHANGETABLE',
    'CHANGE_TRACKING_CONTEXT',
    'CHANGE_TRACKING_CURRENT_VERSION',
    'CHANGE_TRACKING_IS_COLUMN_IN_MASK',
    'CHANGE_TRACKING_MIN_VALID_VERSION',
    // FullTextSearch
    'CONTAINSTABLE',
    'FREETEXTTABLE',
    // SemanticTextSearch
    'SEMANTICKEYPHRASETABLE',
    'SEMANTICSIMILARITYDETAILSTABLE',
    'SEMANTICSIMILARITYTABLE',
    // FileStream
    'FILETABLEROOTPATH',
    'GETFILENAMESPACEPATH',
    'GETPATHLOCATOR',
    'PATHNAME',
    // ServiceBroker
    'GET_TRANSMISSION_STATUS',
    // ClickHouse Arrays
    'EMPTY',
    'NOTEMPTY',
    'LENGTH',
    'ARRAYCONCAT',
    'ARRAYELEMENT',
    'HAS',
    'HASALL',
    'HASANY',
    'HASSUBSTR',
    'INDEXOF',
    'ARRAYCOUNT',
    'COUNTEQUAL',
    'ARRAYENUMERATE',
    'ARRAYENUMERATEUNIQ',
    'ARRAYSORT',
    'ARRAYUNIQ',
    'ARRAYJOIN',
    'ARRAYDIFFERENCE',
    'ARRAYDISTINCT',
    'REVERSE',
    'ARRAYFLATTEN',
    'ARRAYCOMPACT',
    'ARRAYZIP',
    'ARRAYAUC',
    'ARRAYMAP',
    'ARRAYFILTER',
    'ARRAYFILL',
    'ARRAYREVERSEFILL',
    'ARRAYSPLIT',
    'ARRAYREVERSESPLIT',
    'ARRAYEXISTS',
    'ARRAYALL',
    'ARRAYFIRST',
    'ARRAYLAST',
    'ARRAYFIRSTINDEX',
    'ARRAYLASTINDEX',
    'ARRAYMIN',
    'ARRAYMAX',
    'ARRAYSUM',
    'ARRAYAVG',
    'ARRAYCUMSUM',
    'ARRAYCUMSUMNONNEGATIVE',
    'ARRAYPRODUCT',
];

export const OPERATORS = [
    // Logical
    'ALL',
    'AND',
    'ANY',
    'BETWEEN',
    'EQUALS',
    'GREATER',
    'GREATEROREQUALS',
    'EXISTS',
    'IN',
    'LESSOREQUALS',
    'LESS',
    'LIKE',
    'NOTLIKE',
    'NOT',
    'NOTEQUALS',
    'NOTIN',
    'OR',
    'SOME',
    // Set
    'EXCEPT',
    'INTERSECT',
    'UNION',
    // Join
    'APPLY',
    'CROSS',
    'FULL',
    'INNER',
    'JOIN',
    'LEFT',
    'OUTER',
    'RIGHT',
    // Predicates
    'CONTAINS',
    'FREETEXT',
    'IS',
    'NULL',
    // Pivoting
    'PIVOT',
    'UNPIVOT',
    // Merging
    'MATCHED',
    // Access Operators
    'ARRAYELEMENT',
    'TUPLEELEMENT',
    // Numeric Negation
    'NEGATE',
    // Multiplication and Division
    'MULTIPLY',
    'DIVIDE',
    'MODULO',
    // Dates and Times
    'DAY',
    'HOUR',
    'MINUTE',
    'MONTH',
    'QUARTER',
    'SECOND',
    'WEEK',
    'YEAR',
    // Concat
    'CONCAT',
    // Array
    'ARRAY',
    // Tuple
    'TUPLE',
];
