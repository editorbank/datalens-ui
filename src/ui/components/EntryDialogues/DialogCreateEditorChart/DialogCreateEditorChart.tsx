import React from 'react';

import {I18n} from 'i18n';
import {ResolveThunks, connect} from 'react-redux';
import {showToast} from 'store/actions/toaster';
import {DataLensApiError} from 'typings';
import {isEntryAlreadyExists} from 'utils/errors/errorByCode';

import type {CreateEditorChartResponse} from '../../../../shared/schema';
import {getSdk} from '../../../libs/schematic-sdk';
import {EntryDialogBase} from '../EntryDialogBase/EntryDialogBase';
import {EntryDialogResolveStatus} from '../constants';
import {EntryDialogProps} from '../types';

export interface DialogCreateEditorChartProps extends EntryDialogProps {
    initDestination: string;
    type: string;
    data?: Record<string, any>;
    initName?: string;
}

type DispatchProps = ResolveThunks<typeof mapDispatchToProps>;

type Props = DialogCreateEditorChartProps & DispatchProps;

const i18n = I18n.keyset('component.dialog-create-editor-chart.view');

class DialogCreateEditorChart extends React.Component<Props> {
    render() {
        return (
            <EntryDialogBase
                withInput
                onClose={this.onClose}
                onApply={this.onApply}
                onSuccess={this.onSuccess}
                onError={this.onError}
                visible={this.props.visible}
                path={this.props.initDestination}
                name={this.props.initName}
                defaultName={i18n('label_default-name')}
                caption={i18n('section_caption')}
                textButtonCancel={i18n('button_cancel')}
                textButtonApply={i18n('button_apply')}
                placeholder={i18n('label_placeholder')}
            />
        );
    }

    private onApply = async (key: string) => {
        const data = await getSdk().mix.createEditorChart({
            key,
            data: this.props.data || {},
            type: this.props.type,
        });
        return data;
    };

    private onError = (error: DataLensApiError) => {
        if (isEntryAlreadyExists(error)) {
            return {
                inputError: i18n('label_entry-name-already-exists'),
            };
        }
        this.props.showToast({
            title: i18n('toast_create-editor-chart-failed'),
            name: 'DialogCreateEditorChartFailed',
            error,
            withReport: true,
        });
        return null;
    };

    private onClose = () => {
        this.props.onClose({status: EntryDialogResolveStatus.Close});
    };

    private onSuccess = (data: CreateEditorChartResponse) => {
        this.props.onClose({status: EntryDialogResolveStatus.Success, data});
    };
}

const mapDispatchToProps = {
    showToast,
};

export default connect(null, mapDispatchToProps)(DialogCreateEditorChart);
