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

// const postFilters = [
//     <TextInput source="q" label="Search" alwaysOn />,
//     <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
//         <SelectInput optionText="name" />
//     </ReferenceInput>,
// ]

export const TrackingList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List  {...props}>
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
