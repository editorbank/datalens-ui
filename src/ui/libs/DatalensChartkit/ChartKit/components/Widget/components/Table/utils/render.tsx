import React from 'react';

import {Minus, Plus} from '@gravity-ui/icons';
import DataTable, {Column, SortOrder} from '@gravity-ui/react-data-table';
import {Button, Icon, Link} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {isUndefined} from 'lodash';
import moment from 'moment';
import {
    BarTableCell,
    BarViewOptions,
    CommonTableColumn,
    DateTableColumn,
    DiffTableColumn,
    NumberTableColumn,
    NumberViewOptions,
    TableCell,
    TableColumn,
    TableHead,
    TableRow,
} from 'shared';

import {Markup} from '../../../../../../../../components/Markup';
import {ChartKitDataTable, DataTableData} from '../../../../../../types';
import {Bar} from '../Bar/Bar';
import {TableProps} from '../types';

import {
    camelCaseCss,
    generateName,
    getCellClickActionParams,
    getCellClickArgs,
    getCellWidth,
    getTreeSetColumnSortAscending,
    hasTreeSetColumn,
    isCellValueNullable,
    isMarkupItem,
    numberFormatter,
    prepareLinkHref,
    selectBarSettingValue,
} from './misc';

const b = block('chartkit-table');
const DATE_FORMAT_BY_SCALE = {
    d: 'DD.MM.YYYY',
    w: 'DD.MM.YYYY',
    m: 'MMMM YYYY',
    h: 'DD.MM.YYYY HH:mm',
    i: 'DD.MM.YYYY HH:mm',
    s: 'DD.MM.YYYY HH:mm:ss',
    q: 'YYYY',
    y: 'YYYY',
};
export const MiscQA = {
    TREE_NODE_STATE_OPENED: 'chartkit-tree-node-state-opened',
    TREE_NODE_STATE_CLOSED: 'chartkit-tree-node-state-closed',
};

type RestOptions = Omit<TableColumn, 'id' | 'name' | 'type' | 'css' | 'group' | 'autogroup'> & {
    tableWidth?: number;
};

type SortIconProps = {
    direction: 'asc' | 'desc';
};
const SortIcon = ({direction}: SortIconProps) => {
    return (
        <svg
            className={b('sort-icon', {[direction]: true})}
            viewBox="0 0 10 6"
            width="10"
            height="6"
        >
            <path fill="currentColor" d="M0 5h10l-5 -5z" />
        </svg>
    );
};

const diffFormatter = (
    value: number,
    {precision, diff_formatter: formatter}: Omit<DiffTableColumn, 'type'>,
) => {
    const diff = numberFormatter(value, {precision, formatter, view: 'number'});
    if (value > 0) {
        return <span className={b('diff', {pos: true})}>&#9650;{diff}</span>;
    }
    if (value < 0) {
        return <span className={b('diff', {neg: true})}>&#9660;{diff}</span>;
    }
    return <span className={b('diff')}>{diff}</span>;
};

// eslint-disable-next-line complexity
export function valueFormatter(
    columnType: CommonTableColumn['type'],
    cell: TableCell = {value: ''},
    options: RestOptions = {},
): React.ReactNode {
    let resultValue;
    let sortIcon = null;
    let type = columnType;

    if (typeof cell === 'object' && cell) {
        if ('type' in cell && cell.type) {
            type = cell.type;
        }

        // Fallback (needed to support already created ChartEditor charts).
        // type bar is deprecated was merged with number.
        // Now the number column has a prop view that determines whether to show a number or draw a bar
        if (type === 'bar') {
            type = 'number';
            (options as NumberTableColumn).view = 'bar';
        }

        const shouldUseBar =
            (options as NumberTableColumn).view === 'bar' || (cell as BarTableCell).view === 'bar';

        if ('formattedValue' in cell && cell.formattedValue && !shouldUseBar) {
            resultValue = cell.formattedValue;
        } else if (cell.value === null) {
            resultValue = 'null';
        } else if (isMarkupItem(cell.value)) {
            resultValue = (
                <Markup
                    item={cell.value}
                    externalProps={{
                        url: {
                            onClick: (event: React.SyntheticEvent) => {
                                // need to stop propagation for link components because it works incorrect with sorting by rows
                                // user click by link it leads to call both actions at the same time
                                // now clicking on the link will only open it without sorting table
                                event.stopPropagation();
                            },
                        },
                    }}
                />
            );
        } else if ('value' in cell) {
            resultValue = cell.value;

            if (type === 'text') {
                const {link: {href, newWindow = true} = {}} = cell;

                resultValue = href ? (
                    <Link
                        view="normal"
                        href={prepareLinkHref(href)}
                        target={newWindow ? '_blank' : '_self'}
                        className={b('link')}
                    >
                        {resultValue}
                    </Link>
                ) : (
                    numberFormatter(resultValue as string | number, options as NumberViewOptions)
                );
            }

            if (type === 'date') {
                const {
                    /** @deprecated use format */
                    scale,
                    format = 'DD.MM.YYYY',
                } = options as Pick<DateTableColumn, 'format' | 'scale'>;
                const resultFormat = scale ? DATE_FORMAT_BY_SCALE[scale] : format;
                const date = moment.utc(resultValue as number);
                resultValue = date.isValid() ? date.format(resultFormat) : resultValue;
            }

            if (type === 'number') {
                if (shouldUseBar) {
                    const barCell = cell as BarTableCell;
                    const columnOptions = options as BarViewOptions;
                    const min = isUndefined(barCell.min) ? columnOptions.min : barCell.min;
                    const max = isUndefined(barCell.max) ? columnOptions.max : barCell.max;

                    resultValue = (
                        <Bar
                            value={barCell.value as number}
                            formattedValue={barCell.formattedValue}
                            align={columnOptions.align || barCell.align}
                            barHeight={columnOptions.barHeight || barCell.barHeight}
                            min={min}
                            max={max}
                            showLabel={selectBarSettingValue(columnOptions, barCell, 'showLabel')}
                            showSeparator={selectBarSettingValue(
                                columnOptions,
                                barCell,
                                'showSeparator',
                            )}
                            debug={selectBarSettingValue(columnOptions, barCell, 'debug')}
                            color={barCell.barColor}
                            showBar={barCell.showBar}
                            offset={barCell.offset}
                        />
                    );
                } else {
                    resultValue = numberFormatter(
                        resultValue as number,
                        options as NumberViewOptions,
                    );
                }
            }

            if (type === 'diff') {
                const number = numberFormatter(
                    (resultValue as [number, number])[0],
                    options as NumberViewOptions,
                );

                const diff = diffFormatter(
                    (resultValue as [number, number])[1],
                    options as Omit<DiffTableColumn, 'type'>,
                );
                resultValue = (
                    <div>
                        {number} {diff}
                    </div>
                );
            }

            if (type === 'diff_only') {
                resultValue = diffFormatter(
                    resultValue as number,
                    options as Omit<DiffTableColumn, 'type'>,
                );
            }
        }

        if (cell.sortDirection) {
            sortIcon = <SortIcon direction={cell.sortDirection} />;
        }
    }

    let button = null;

    if (typeof cell !== 'string' && 'treeNodeState' in cell && cell.treeNodeState) {
        const opened = cell.treeNodeState === 'open';
        const qa = opened ? MiscQA.TREE_NODE_STATE_OPENED : MiscQA.TREE_NODE_STATE_CLOSED;
        button = (
            <span style={{marginLeft: 10 * (cell.treeOffset || 0), marginRight: 4}}>
                <Button qa={qa} className="table-action-btn" view="outlined" size="s">
                    <Icon data={opened ? Minus : Plus} size={12} />
                </Button>
            </span>
        );
    }

    return (
        <div
            className={b('content', {
                [type]: true,
                null: isCellValueNullable(cell),
                'with-fixed-height': Boolean(
                    'barHeight' in options && (options as BarViewOptions).barHeight,
                ),
            })}
            style={{
                width: getCellWidth(options.width, options.tableWidth),
                ...camelCaseCss(options.contentCss),
            }}
            key={Math.random()}
        >
            {button}
            {resultValue}
            {sortIcon}
        </div>
    );
}

export const getColumnsAndNames = ({
    onChange,
    head,
    rows,
    context,
    tableWidth,
    level = 0,
    shift = 0,
    topLevelWidth,
    tableRef,
}: {
    onChange: TableProps['onChange'];
    head: TableHead[];
    rows: TableRow[];
    context: {isHasGroups: boolean};
    tableRef: ChartKitDataTable | undefined;
    level?: number;
    shift?: number;
    tableWidth?: number;
    topLevelWidth?: number;
}) => {
    return head.reduce(
        (
            result: {
                columns: Column<DataTableData>[];
                names: string[];
                sortSettings: {
                    manualSortOrder: SortOrder | undefined;
                    shouldResetSortOrder: boolean;
                };
            },
            column: TableHead,
            index: number,
        ) => {
            if (column && 'sub' in column) {
                const currentColumnWidth = getCellWidth(column.width, tableWidth) || topLevelWidth;
                const {columns, names, sortSettings} = getColumnsAndNames({
                    tableRef,
                    head: column.sub,
                    rows,
                    context,
                    level: level + 1,
                    shift: index,
                    onChange,
                    tableWidth,
                    topLevelWidth: currentColumnWidth
                        ? currentColumnWidth / column.sub.length
                        : undefined,
                });
                const columnName = generateName({
                    id: column.id,
                    name: column.name,
                    level,
                    shift,
                    index,
                });

                const columnData: Column<DataTableData> = {
                    name: columnName,
                    header: (
                        <span className={b('head-cell', {'with-markup': Boolean(column.markup)})}>
                            {column.markup ? (
                                <Markup item={column.markup} />
                            ) : (
                                column.formattedName ?? column.name
                            )}
                        </span>
                    ),
                    customStyle: ({row, header, name}) => {
                        if (header) {
                            return camelCaseCss(column.css);
                        }
                        const cell = row && row[name];
                        return camelCaseCss((typeof cell === 'object' && cell?.css) || undefined);
                    },
                    align: DataTable.CENTER,
                    sub: columns,
                };

                result.sortSettings.shouldResetSortOrder =
                    result.sortSettings.shouldResetSortOrder || sortSettings.shouldResetSortOrder;
                result.sortSettings.manualSortOrder =
                    result.sortSettings.manualSortOrder || sortSettings.manualSortOrder;

                result.columns.push(columnData);
                result.names = result.names.concat(names);
            } else {
                const {id, name, type, css: columnCss, group, autogroup, ...options} = column;
                const columnWidth = topLevelWidth || column.width;
                const columnName = generateName({id, name, level, shift, index});

                const isColumnSortable =
                    typeof column.sortable === 'undefined' ? true : column.sortable;

                const isGroupSortAvailable = context.isHasGroups
                    ? Boolean(options.allowGroupSort)
                    : true;

                // These ifs have been added to manually control the display of sorting icons in the crosstabs
                // currentSortDirection prop means which sort direction the tables have now.
                // currentSortDirection: desc | asc | null.
                if (
                    column.custom?.nextSortDirection === 'desc' &&
                    column.custom?.currentSortDirection === null &&
                    tableRef?.table?.state.sortColumns.includes(columnName)
                ) {
                    result.sortSettings.shouldResetSortOrder = true;
                } else if (column.custom?.currentSortDirection) {
                    result.sortSettings.manualSortOrder = {
                        columnId: columnName,
                        order:
                            column.custom?.currentSortDirection === 'asc'
                                ? DataTable.ASCENDING
                                : DataTable.DESCENDING,
                    };
                }

                const columnData: Column<DataTableData> = {
                    name: columnName,
                    header: (
                        <span className={b('head-cell', {'with-markup': Boolean(column.markup)})}>
                            {column.markup ? (
                                <Markup item={column.markup} />
                            ) : (
                                column.formattedName ?? column.name
                            )}
                        </span>
                    ),
                    className: b('cell', {
                        type,
                        'with-fixed-width': Boolean(columnWidth),
                    }),
                    accessor: (row) => {
                        const column = row[columnName];
                        if (typeof column === 'object' && column && 'value' in column) {
                            const value = column.value;

                            if (typeof value === 'object') {
                                return JSON.stringify(value);
                            } else if (Array.isArray(value)) {
                                return value[0];
                            } else {
                                return value;
                            }
                        }
                        // there are cases when the number of columns and received values do not equal
                        return null;
                    },
                    render: ({row}) =>
                        valueFormatter(type, row[columnName], {
                            ...options,
                            width: columnWidth,
                            tableWidth,
                        }),
                    customStyle: ({row, header, name}) => {
                        if (header) {
                            return camelCaseCss(columnCss);
                        }
                        const cell = row && row[name];

                        let defaultStyles;

                        const cellClickArgs = getCellClickArgs(row, columnName);
                        const cellActionParams = getCellClickActionParams(row, columnName);

                        if (cellClickArgs || cellActionParams) {
                            defaultStyles = {
                                cursor: 'pointer',
                            };
                        }

                        return camelCaseCss(
                            (typeof cell === 'object' && cell?.css) || defaultStyles,
                        );
                    },
                    sortAccessor: (row) => {
                        const column = row[columnName];
                        if (typeof column === 'object' && column && 'value' in column) {
                            const value = column.value;
                            return Array.isArray(value) ? value[0] : value;
                        }
                        return null;
                    },
                    sortAscending: hasTreeSetColumn(rows[0])
                        ? getTreeSetColumnSortAscending(columnName, rows)
                        : undefined,
                    onClick: ({row}, {name: columnName}) => {
                        const cellClickArgs = getCellClickArgs(row, columnName);
                        const cellActionParams = getCellClickActionParams(row, columnName);

                        if ((cellClickArgs || cellActionParams) && onChange) {
                            const paramsData = cellClickArgs || {};
                            const actionParamsData = cellActionParams || {};
                            onChange(
                                {
                                    type: 'PARAMS_CHANGED',
                                    data: {params: {...paramsData, ...actionParamsData}},
                                },
                                {forceUpdate: true},
                                true,
                                true,
                            );
                        }
                    },
                    sortable: isGroupSortAvailable && isColumnSortable,
                    width: columnWidth,
                    group,
                    autogroup,
                };

                result.columns.push(columnData);
                result.names.push(columnName);
            }

            return result;
        },
        {
            columns: [],
            names: [],
            sortSettings: {manualSortOrder: undefined, shouldResetSortOrder: false},
        },
    );
};
