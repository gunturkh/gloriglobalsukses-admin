import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import {
    ChipField,
    Create,
    Datagrid,
    Edit,
    EditButton,
    // DataGrid,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    SimpleList,
    TextField,
    TextInput,
} from 'react-admin';

const TrackingTitle = ({ record }) => {
    return <span>Tracking {record ? `"${record.title}"` : ''}</span>
};

const trackingFilters = [
    <TextInput source="name" label="Search" alwaysOn />,
    // <ReferenceInput source="trackingId" label="Name" reference="tracking" allowEmpty 
    // >
    //     <SelectInput optionText="name" />
    // </ReferenceInput>,
]

export const TrackingList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List filters={trackingFilters} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `${record.resi}`}
                />
            ) : (
                <Datagrid >
                    <TextField source="name" />
                    <TextField source="phone" />
                    <TextField source="address" />
                    <TextField source="item" />
                    <TextField source="resi" />
                    <ChipField source="status" />
                    <EditButton />
                </Datagrid>
            )
            }
        </List>
    )
};

export const TrackingEdit = props => (
    <Edit title={<TrackingTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="phone" />
            <TextInput source="address" />
            <TextInput source="item" />
            <TextInput source="resi" />
            <TextInput source="status" />
        </SimpleForm>
    </Edit>
);

export const TrackingCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="phone" />
            <TextInput source="address" />
            <TextInput source="item" />
            <TextInput source="resi" />
            <TextInput source="status" />
        </SimpleForm>
    </Create>
);
