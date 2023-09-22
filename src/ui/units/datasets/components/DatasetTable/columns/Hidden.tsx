import React from 'react';

import {EyeSlash} from '@gravity-ui/icons';
import DataTable, {Column} from '@gravity-ui/react-data-table';
import {Button, Icon} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {I18n} from 'i18n';
import {DATASET_FIELD_TYPES, DatasetField} from 'shared';

const b = block('dataset-table');
const i18n = I18n.keyset('dataset.dataset-editor.modify');

type GetHiddenColumnArgs = {
    onUpdate: (row: DatasetField) => void;
};

export const getHiddenColumn = ({onUpdate}: GetHiddenColumnArgs): Column<DatasetField> => ({
    name: 'hidden',
    className: b('column'),
    align: DataTable.CENTER,
    width: 70,
    sortable: true,
    header: <Icon className={b('header-icon')} data={EyeSlash} width="24" />,
    render: function HiddenColumnItem({value, index, row}) {
        const unsupported = row.initial_data_type === DATASET_FIELD_TYPES.UNSUPPORTED;

        return (
            <Button
                key={index}
                className={b('btn-hidden')}
                view="flat"
                title={value ? i18n('button_display-field') : i18n('button_hide-field')}
                disabled={unsupported}
                onClick={() => onUpdate(row)}
            >
                <Icon
                    className={b('hidden', {hidden: Boolean(value && !unsupported), unsupported})}
                    data={EyeSlash}
                    width="16"
                    height="16"
                />
            </Button>
        );
    },
});
