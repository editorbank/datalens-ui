import {Feature} from '../../../../shared';
import {createFeatureConfig} from '../utils';

export default createFeatureConfig({
    name: Feature.CrawlerPromo,
    state: {
        development: true,
        production: true,
    },
});
