import React from 'react';

import {IllustrationProps} from './types';
import {createIllustration} from './utils';

export const Illustration = ({illustrationStore, ...props}: IllustrationProps) => {
    const CreatedIllustration = createIllustration([illustrationStore]);

    return <CreatedIllustration {...props} />;
};
