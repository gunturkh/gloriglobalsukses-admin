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
  SelectField,
  SelectInput,
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

const trackingFilters = [
  <TextInput source="name" label="Search" alwaysOn />,
  <TextInput label="resi" source="resi" defaultValue="GGS-00000001" />,
];

const TrackingBulkActionButtons = (props) => (
  <React.Fragment>
    <BulkUpdateStatusButton label="Bulk Updata Status" {...props} />
  </React.Fragment>
);

const TrackingShowActions = ({ basePath, data, resource }) => {
  const handlePDFClick = async () => {
    const { id } = data;
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
        <SelectField
          source="label"
          choices={[
            { id: "retailgeneral", name: "Barang Retail/General" },
            { id: "kids", name: "Barang Anak" },
            { id: "cosmetic", name: "Cosmetic" },
          ]}
        />
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
          <TextField source="salesOrder" title="so" />
          <SelectField
            source="label"
            choices={[
              { id: "retailgeneral", name: "Barang Retail/General" },
              { id: "kids", name: "Barang Anak" },
              { id: "cosmetic", name: "Cosmetic" },
            ]}
          />
          <SelectField
            source="delay"
            choices={[
              { id: true, name: "Yes" },
              { id: false, name: "No" },
            ]}
          />
          <DateField label="Date Created" source="createdAt" />
          <DateField label="Date Updated" source="updatedAt" />
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
      <TextInput source="salesOrder" title="so" />
      <SelectInput
        source="label"
        choices={[
          { id: "retailgeneral", name: "Barang Retail/General" },
          { id: "kids", name: "Barang Anak" },
          { id: "cosmetic", name: "Cosmetic" },
        ]}
      />
      <SelectInput
        source="delay"
        choices={[
          { id: true, name: "Yes" },
          { id: false, name: "No" },
        ]}
      />
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
      <TextInput source="salesOrder" title="so" />
      <SelectInput
        source="label"
        choices={[
          { id: "retailgeneral", name: "Barang Retail/General" },
          { id: "kids", name: "Barang Anak" },
          { id: "cosmetic", name: "Cosmetic" },
        ]}
      />
      <SelectInput
        source="delay"
        choices={[
          { id: true, name: "Yes" },
          { id: false, name: "No" },
        ]}
      />
    </SimpleForm>
  </Create>
);
