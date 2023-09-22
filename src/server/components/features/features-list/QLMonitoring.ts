import {Feature} from '../../../../shared';
import {createFeatureConfig} from '../utils';

export default createFeatureConfig({
    name: Feature.QLMonitoring,
    state: {
        development: true,
        production: true,
    },
});
