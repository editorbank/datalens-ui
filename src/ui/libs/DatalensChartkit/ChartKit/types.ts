import type {ChartKitProps, ChartKitType} from '@gravity-ui/chartkit';
import type {Highcharts} from '@gravity-ui/chartkit/highcharts';

import type {CombinedError, LoadedWidgetData, OnChangeData, OnLoadData} from '../types';

import YandexMap from './modules/yandex-map/yandex-map';
import type {HighchartsMapWidgetData, MetricWidgetData, YandexMapWidgetData} from './plugins';

export type ChartKitAdapterProps = {
    loadedData?: LoadedWidgetData;
    lang?: string;
    isMobile?: boolean;
    splitTooltip?: boolean;
    nonBodyScroll?: boolean;
    onLoad?: (args: OnLoadData) => void;
    onError?: ({error}: {error: CombinedError}) => void;
    onChange?: (
        data: OnChangeData,
        state: {forceUpdate: boolean},
        callExternalOnChange?: boolean,
        callChangeByClick?: boolean,
    ) => void;
    requestId?: string;
    noControls?: boolean;
} & Pick<ChartKitProps<ChartKitType>, 'onRender' | 'onChartLoad' | 'renderPluginLoader'>;

declare module '@gravity-ui/chartkit' {
    interface ChartKitWidget {
        metric: {
            data: MetricWidgetData;
            widget: never;
        };
        highchartsmap: {
            data: HighchartsMapWidgetData;
            widget: Highcharts.Chart;
        };
        yandexmap: {
            data: YandexMapWidgetData;
            widget: YandexMap;
        };
    }
}
