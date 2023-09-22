import type {HighchartsWidgetData} from '@gravity-ui/chartkit/highcharts';

import {
    ChartkitHandlers,
    DEFAULT_CHART_LINES_LIMIT,
    Feature,
    GraphTooltipLine,
    PlaceholderId,
    ServerChartsConfig,
    ServerCommonSharedExtraSettings,
    StringParams,
    WizardVisualizationId,
    getIsNavigatorEnabled,
    isEnabledServerFeature,
} from '../../../../../shared';
import {registry} from '../../../../registry';

import {mapChartsConfigToServerConfig} from './utils/config-helpers';
import {getAllPlaceholderItems, isNeedToCalcClosestPointManually, log} from './utils/misc-helpers';

enum CommentsMatchType {
    Full = 'full',
    Contains = 'contains',
    Intersection = 'intersection',
}

interface Comments {
    feeds?: Feed[];
    matchedParams?: string[];
    matchType?: CommentsMatchType;
}

type Feed = {
    feed: string;
    matchedParams?: string[];
    matchType?: CommentsMatchType;
};

type BaseConfig = {
    drillDown?: {
        breadcrumbs: string[];
        level: number;
    };
};

type GraphConfig = BaseConfig &
    Pick<
        HighchartsWidgetData['config'],
        | 'title'
        | 'hideHolidaysBands'
        | 'linesLimit'
        | 'tooltip'
        | 'withoutLineLimit'
        | 'enableSum'
        | 'showPercentInTooltip'
    > & {
        manageTooltipConfig?:
            | ChartkitHandlers.WizardManageTooltipConfig
            | ((config: {lines: GraphTooltipLine[]}) => void);
        comments?: Comments;
        navigatorSettings?: ServerCommonSharedExtraSettings['navigatorSettings'];
        calcClosestPointManually?: boolean;
        enableGPTInsights?: ServerCommonSharedExtraSettings['enableGPTInsights'];
    };

type TableConfig = BaseConfig & {
    settings: {
        highlightRows?: boolean;
        externalSort?: boolean;
    };
    paginator?: {
        enabled: boolean;
        limit?: number;
    };
};

type MetricConfig = BaseConfig & {
    metricVersion?: number;
};

export type Config = GraphConfig | TableConfig | MetricConfig;

// eslint-disable-next-line complexity
export default (
    ...options: [
        {shared: ServerChartsConfig; params: StringParams} | ServerChartsConfig,
        StringParams,
    ]
) => {
    let shared;
    let params: StringParams;

    if ('shared' in options[0]) {
        shared = options[0].shared;
        params = options[0].params as StringParams;
    } else {
        shared = options[0];
        params = options[1];
    }

    shared = mapChartsConfigToServerConfig(shared);

    const {visualization} = shared;
    const app = registry.getApp();

    let hideHolidaysBands = !isEnabledServerFeature(app.nodekit.ctx, Feature.HolidaysOnChart);

    if (!hideHolidaysBands) {
        hideHolidaysBands = [visualization].concat(visualization.layers || []).some((layer) => {
            return layer.placeholders.some((placeholder) => {
                return (
                    placeholder.id === PlaceholderId.X &&
                    (placeholder.settings?.holidays || 'off') === 'off'
                );
            });
        });
    }

    const config: Config = {
        title: shared.title,
        hideHolidaysBands,
        linesLimit: DEFAULT_CHART_LINES_LIMIT,
        tooltip: {pin: {altKey: true}, sort: {enabled: true}},
    };

    if (shared.extraSettings) {
        if (shared.extraSettings.title && shared.extraSettings.titleMode === 'show') {
            config.title = shared.extraSettings.title;
        }

        const isPivotFallbackEnabled = shared.extraSettings?.pivotFallback === 'on';

        if (
            visualization.id === WizardVisualizationId.FlatTable ||
            (visualization.id === WizardVisualizationId.PivotTable && !isPivotFallbackEnabled)
        ) {
            const tableExtraSettings = shared.extraSettings;
            const items = getAllPlaceholderItems(shared.visualization.placeholders);
            const hasDimentions = items.some(({type}) => type === 'DIMENSION');

            // No pagination if all columns are measures
            (config as TableConfig).paginator = {
                enabled: hasDimentions && tableExtraSettings?.pagination === 'on',
                limit: tableExtraSettings?.limit && tableExtraSettings?.limit,
            };
        }

        config.comments = {
            matchType: CommentsMatchType.Intersection,
        };

        const matchedParams: string[] = [];
        if (shared.datasetsPartialFields) {
            shared.datasetsPartialFields.forEach((fields) =>
                fields.forEach((field) => params[field.title] && matchedParams.push(field.title)),
            );

            config.comments.matchedParams = matchedParams;
        }

        if (shared.extraSettings.feed) {
            config.comments.feeds = [
                {
                    feed: shared.extraSettings.feed,
                    matchedParams,
                    matchType: CommentsMatchType.Intersection,
                },
            ];
        }

        if (getIsNavigatorEnabled(shared)) {
            config.navigatorSettings = shared.extraSettings.navigatorSettings;
        }

        config.enableGPTInsights = shared.extraSettings.enableGPTInsights;
    }

    if (
        shared.visualization.id === 'line' ||
        shared.visualization.id === 'area' ||
        shared.visualization.id === 'area100p' ||
        shared.visualization.id === 'column' ||
        shared.visualization.id === 'column100p' ||
        shared.visualization.id === 'bar' ||
        shared.visualization.id === 'bar100p'
    ) {
        config.manageTooltipConfig = ChartkitHandlers.WizardManageTooltipConfig;

        const extraSettings = shared.extraSettings;
        if (extraSettings) {
            const {tooltipSum} = extraSettings;

            if (typeof tooltipSum === 'undefined' || tooltipSum === 'on') {
                config.enableSum = true;
            }
        }
    } else if (shared.visualization.id === 'pie' || shared.visualization.id === 'donut') {
        config.showPercentInTooltip = true;
    } else if (shared.visualization.id === 'metric') {
        (config as MetricConfig).metricVersion = 2;
    } else if (shared.visualization.id === 'pivotTable') {
        (config as TableConfig).settings = {
            highlightRows: false,
            externalSort: true,
        };
    }

    const visualizationId = shared.visualization.id;
    const placeholders = shared.visualization.placeholders;
    const colors = shared.colors;

    if (isNeedToCalcClosestPointManually(visualizationId, placeholders, colors)) {
        // Highcharts can't calculate column sizes automatically for different series.
        // Therefore, if we have a columns/bar visualization type and the colors contain a field, then we will calculate the fields ourselves
        // Because the data format without colors is {series: [{data: [...]}]}
        // And with colors {series: [{data: [...]}, {data: [...]}, {data: [...]}];
        config.calcClosestPointManually = true;
    }

    log('CONFIG:');
    log(config);

    return config;
};
