import React from 'react';

import {Button, Icon} from '@gravity-ui/uikit';

import {AdditionalButtonTemplate} from './types';

type UseAdditionalItemsArgs = {
    items: AdditionalButtonTemplate[] | undefined;
};

export const useAdditionalItems = (args: UseAdditionalItemsArgs) => {
    const {items} = args;

    if (!items) {
        return [];
    }

    return items
        .map((itemProps) => {
            if (itemProps.hidden) {
                return null;
            }
            return (
                <Button
                    key={itemProps.key}
                    className={itemProps.className}
                    view={itemProps.view || 'flat'}
                    size="m"
                    loading={itemProps.loading}
                    onClick={() => itemProps.action()}
                >
                    {itemProps.icon && <Icon {...itemProps.icon} />}
                    {itemProps.text && (
                        <span className={itemProps.textClassName}>{itemProps.text}</span>
                    )}
                </Button>
            );
        })
        .filter(Boolean);
};
