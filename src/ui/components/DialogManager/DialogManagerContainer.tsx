import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import type {DatalensGlobalState} from 'ui';
import {useEffectOnce} from 'ui';
import {closeDialog} from 'ui/store/actions/dialog';
import history from 'ui/utils/history';

import DialogManager from './DialogManager';

export const DialogManagerContainer = () => {
    const dispatch = useDispatch();
    const dialogs = useSelector((state: DatalensGlobalState) => state.dialog.dialogs);

    useEffectOnce(() => {
        const unregister = history.listen(() => {
            dispatch(closeDialog());
        });

        return () => {
            unregister();
        };
    });

    return (
        <>
            {dialogs.map((el, index) => {
                const DialogComponent = (DialogManager.dialogs as any)[el.id];

                if (!DialogComponent) {
                    return null;
                }

                return <DialogComponent {...el.props} key={index} />;
            })}
        </>
    );
};

export default DialogManagerContainer;
