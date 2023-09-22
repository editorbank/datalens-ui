import {makeDefaultEmpty} from '../../components/DefaultEmpty';

import {WizardActionPanelExtensionProps} from './types/components/WizardActionPanelExtension';

export const wizardComponentsMap = {
    WizardActionPanelExtension: makeDefaultEmpty<WizardActionPanelExtensionProps>(),
} as const;
