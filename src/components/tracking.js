import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import {
  Button,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  List,
  Show,
  ShowButton,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import BulkUpdateStatusButton from "./BulkUpdateStatusButton";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const TrackingTitle = ({ record }) => {
  return <span>Tracking {record ? `"${record.title}"` : ""}</span>;
};

const trackingFilters = [<TextInput source="name" label="Search" alwaysOn />];

const TrackingBulkActionButtons = (props) => (
  <React.Fragment>
    <BulkUpdateStatusButton label="Bulk Updata Status" {...props} />
  </React.Fragment>
);

const TrackingShowActions = ({ basePath, data, resource }) => {
  const handlePDFClick = async () => {
      const {id} = data;
    const pdf = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/tracking/getpdf/${id}`
    );
    const blob = await pdf.blob();
    const file = new Blob([blob], { type: "application/pdf" });
    //Build a URL from the file
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
  };
  return (
    <TopToolbar>
      <EditButton basePath={basePath} record={data} />
      <Button
        onClick={handlePDFClick}
        icon={<PictureAsPdfIcon />}
        label="Export to PDF"
      />
    </TopToolbar>
  );
};

export const TrackingShow = (props) => {
  //   const record = useListController(props);
  return (
    <Show actions={<TrackingShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="phone" />
        <TextField source="address" />
        <TextField source="item" />
        <TextField source="resi" />
        <TextField source="status" />
        <DateField label="Date Created" source="createdAt" />
        <DateField label="Date Updated" source="updatedAt" />
      </SimpleShowLayout>
    </Show>
  );
};

export const TrackingList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      filters={trackingFilters}
      {...props}
      bulkActionButtons={<TrackingBulkActionButtons />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => `${record.resi}`}
        />
      ) : (
        <Datagrid>
          <TextField source="name" />
          <TextField source="phone" />
          <TextField source="address" />
          <TextField source="item" />
          <TextField source="resi" />
          <ChipField source="status" />
          <EditButton />
          <ShowButton />
        </Datagrid>
      )}
    </List>
  );
};

export const TrackingEdit = (props) => (
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

export const TrackingCreate = (props) => (
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
