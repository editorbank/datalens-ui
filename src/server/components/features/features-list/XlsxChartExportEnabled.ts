import {Feature} from '../../../../shared';
import {createFeatureConfig} from '../utils';

export default createFeatureConfig({
    name: Feature.XlsxChartExportEnabled,
    state: {
        development: false,
        production: false,
    },
});
