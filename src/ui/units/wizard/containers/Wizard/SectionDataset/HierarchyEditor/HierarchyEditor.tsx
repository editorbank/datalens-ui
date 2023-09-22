import React from 'react';

import {i18n} from 'i18n';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {
    DATASET_FIELD_TYPES,
    DatasetFieldType,
    Field,
    HierarchyField,
    PlaceholderId,
    WizardVisualizationId,
    isPlaceholderSupportsAxisMode,
} from 'shared';
import {DatalensGlobalState, withHiddenUnmount} from 'ui';
import {setDrillDownLevel, updatePlaceholderSettings} from 'ui/units/wizard/actions/visualization';
import {getAxisModePlaceholderSettings} from 'ui/units/wizard/utils/placeholder';
import HierarchyEditor from 'units/wizard/components/HierarchyEditor/HierarchyEditor';
import {
    selectHierarchies,
    selectHierarchyEditorData,
    selectSort,
    selectSubVisualization,
} from 'units/wizard/selectors/visualization';
import {generateNextTitle} from 'units/wizard/utils/helpers';
import uuid from 'uuid/v1';

import {setHierarchies} from '../../../../actions/dataset';
import {closeHierarchyEditor} from '../../../../actions/hierarchyEditor';
import {updatePreviewAndClientChartsConfig} from '../../../../actions/preview';

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

interface Props extends StateProps, DispatchProps {}

interface State {
    value: string[];
    hierarchyName: string;
}

class HierarchyEditorContainer extends React.Component<Props, State> {
    private existedTitles: Record<string, string>;

    constructor(props: Props) {
        super(props);

        const value = (props.hierarchy?.fields || []).map((el) => el.title);

        this.existedTitles = [...props.hierarchies, ...props.fields].reduce(
            (acc: Record<string, string>, field) => {
                acc[field.title] = field.guid;
                return acc;
            },
            {},
        );

        const hierarchyName =
            props.hierarchy?.title ||
            generateNextTitle(
                Object.keys(this.existedTitles),
                i18n('wizard.hierarchy-editor', 'new_hierarchy'),
            );

        this.state = {
            value,
            hierarchyName,
        };
    }

    render() {
        const {value, hierarchyName} = this.state;
        const {fields, visible, hierarchy} = this.props;
        const fieldWithSameTitle = this.existedTitles[hierarchyName];
        const hierarchyNameError =
            fieldWithSameTitle && fieldWithSameTitle !== hierarchy?.guid
                ? i18n('wizard.hierarchy-editor', 'field_already_exists')
                : undefined;
        const hierarchyHasInvalidFields = this.getOrderedHierarchyFields().some(
            (field) => !field.valid,
        );

        return (
            <HierarchyEditor
                visible={visible}
                fields={fields}
                hierarchyName={hierarchyName}
                hierarchyNameError={hierarchyNameError}
                hierarchyHasInvalidFields={hierarchyHasInvalidFields}
                value={value}
                onClose={this.onClose}
                onApply={this.onApply}
                onChange={this.onChange}
                onHierarchyNameChange={this.onHierarchyNameChange}
            />
        );
    }

    onApply = () => {
        const {hierarchy} = this.props;

        if (hierarchy) {
            this.updateHierarchy();
        } else {
            this.addHierarchy();
        }

        this.onClose();
    };

    getOrderedHierarchyFields(): Field[] {
        const fieldsDict = this.props.fields.reduce((acc: Record<string, Field>, field) => {
            acc[field.title] = field;
            return acc;
        }, {});

        return this.state.value.map((fieldTitle) => fieldsDict[fieldTitle]).filter(Boolean);
    }

    updateHierarchy() {
        const {hierarchies, hierarchy, visualization, sort} = this.props;
        const {hierarchyName} = this.state;
        const orderedHierarchyFields = this.getOrderedHierarchyFields();

        if (visualization) {
            const placeholders = visualization.placeholders;

            const currentHierarchy = hierarchies.find((h) => h.guid === hierarchy?.guid);

            placeholders.forEach((placeholder) => {
                const firstField = placeholder.items[0];

                const isFirstFieldCurrentHierarchy =
                    currentHierarchy && firstField && currentHierarchy.guid === firstField.guid;

                const placeholderId = placeholder.id as PlaceholderId;
                const visualizationId = visualization.id as WizardVisualizationId;

                if (
                    !isPlaceholderSupportsAxisMode(placeholderId, visualizationId) ||
                    !isFirstFieldCurrentHierarchy
                ) {
                    return;
                }

                if (currentHierarchy) {
                    this.props.setDrillDownLevel({drillDownLevel: 0});
                    this.props.updatePlaceholderSettings(
                        placeholderId,
                        getAxisModePlaceholderSettings({
                            placeholder,
                            visualization,
                            sort,
                            firstField: {
                                ...currentHierarchy,
                                fields: orderedHierarchyFields,
                                title: hierarchyName,
                            },
                        }),
                    );
                }
            });
        }

        this.onHierarchiesUpdate(
            hierarchies.map(
                (el): HierarchyField =>
                    el.guid === hierarchy?.guid
                        ? {
                              ...el,
                              title: hierarchyName,
                              fields: orderedHierarchyFields,
                          }
                        : el,
            ),
        );
    }

    addHierarchy() {
        const {hierarchies} = this.props;
        const {hierarchyName} = this.state;
        const orderedHierarchyFields = this.getOrderedHierarchyFields();

        const guid = uuid();

        const newHierarchy: HierarchyField = {
            guid,
            title: hierarchyName,
            // TODO: we need to expand the types for fields - in the wizard there may be a className
            // @ts-ignore
            className: 'item dimension-item',
            type: DatasetFieldType.Pseudo,
            data_type: DATASET_FIELD_TYPES.HIERARCHY,
            valid: true,
            fields: orderedHierarchyFields,
        } as HierarchyField;

        this.onHierarchiesUpdate([...hierarchies, newHierarchy]);
    }

    private onChange = (value: string[]) => {
        this.setState({
            value,
        });
    };

    private onHierarchyNameChange = (hierarchyName: string) => {
        this.setState({
            hierarchyName,
        });
    };

    private onClose = () => {
        this.props.closeHierarchyEditor();
    };

    private onHierarchiesUpdate(hierarchies: HierarchyField[]) {
        this.props.setHierarchies({
            hierarchies,
        });

        this.props.updatePreviewAndClientChartsConfig({});
    }
}

const mapStateToProps = (state: DatalensGlobalState) => {
    const {fields, hierarchy, visible} = selectHierarchyEditorData(state);
    const hierarchies: HierarchyField[] = selectHierarchies(state);
    const visualization = selectSubVisualization(state);
    const sort = selectSort(state);

    return {
        fields,
        hierarchies,
        hierarchy,
        visible,
        visualization,
        sort,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            setHierarchies,
            updatePreviewAndClientChartsConfig,
            closeHierarchyEditor,
            updatePlaceholderSettings,
            setDrillDownLevel,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withHiddenUnmount(HierarchyEditorContainer));
