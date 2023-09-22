import {Feature} from '../../../../shared';
import {createFeatureConfig} from '../utils';

export default createFeatureConfig({
    name: Feature.HolidaysOnChart,
    state: {
        development: true,
        production: true,
    },
});
