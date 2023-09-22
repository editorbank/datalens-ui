import {Feature} from '../../../../shared';
import {createFeatureConfig} from '../utils';

export default createFeatureConfig({
    name: Feature.UseComponentHeader,
    state: {
        development: false,
        production: false,
    },
});
