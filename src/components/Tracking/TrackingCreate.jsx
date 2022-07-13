import * as React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import moment from "moment";
import {
  Create,
  BooleanInput,
  DateInput,
  DateTimeInput,
  ImageField,
  ImageInput,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { FormDataConsumer } from "react-admin";
import { daysToSendReminderDefaultValue } from "../../utils";
import { CustomAutoCompleteUserInput } from "../Inputs";
import { rupiah } from "../../utils";

export const TrackingCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm warnWhenUnsavedChanges>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} spacing={2}>
              <Grid container spacing={2}>
                <CustomAutoCompleteUserInput />
                <Grid md={6} paddingX={2}>
                  <TextInput fullWidth source="item" label="Barang" />
                </Grid>
                <Grid md={6} paddingX={2}>
                  <TextInput
                    fullWidth
                    source="itemDetail"
                    label="Keterangan Barang"
                    defaultValue={"-"}
                  />
                </Grid>
                <Grid md={6} paddingX={2}>
                  <NumberInput
                    fullWidth
                    source="cartonAmount"
                    label="Jumlah Carton"
                    defaultValue={1}
                  />
                </Grid>
                <Grid md={6} paddingX={2}>
                  <TextInput fullWidth source="resi" label="No Resi" />
                </Grid>
                <Grid md={6} paddingX={2}>
                  <TextInput
                    fullWidth
                    source="salesOrder"
                    title="Sales Order"
                  />
                </Grid>
                <Grid md={12} paddingX={2}>
                  <SelectInput
                    fullWidth
                    source="label"
                    choices={[
                      { id: "retailgeneral", name: "Barang Retail/General" },
                      { id: "kids", name: "Barang Anak" },
                      { id: "cosmetic", name: "Cosmetic" },
                    ]}
                  />
                </Grid>
                <Grid md={6} paddingX={2}>
                  <DateInput
                    fullWidth
                    source="customerOrderDate"
                    label="Tanggal Customer Order"
                  />
                </Grid>
                <Grid md={6} paddingX={2}>
                  <DateInput
                    fullWidth
                    source="orderArrivedToWarehouseDate"
                    label="Tanggal Terima Gudang"
                  />
                </Grid>
                <Grid md={6} paddingX={2}>
                  <TextInput
                    fullWidth
                    source="cargoName"
                    label="Nama Cargo"
                    defaultValue={"-"}
                  />
                </Grid>
                <Grid md={6} paddingX={2}>
                  <DateInput
                    fullWidth
                    source="shipoutDate"
                    label="Tanggal Ship Out"
                  />
                </Grid>
                {/* <Grid md={6} paddingX={2}>
                <SelectInput
                  fullWidth
                  source="delay"
                  choices={[
                    { id: true, name: "Yes" },
                    { id: false, name: "No" },
                  ]}
                />
              </Grid> */}
                <Grid md={12} paddingX={2}>
                  <ImageInput
                    multiple
                    source="images"
                    label="Upload Gambar Bukti"
                    accept="image/*"
                  >
                    <ImageField source="images" title="bukti" />
                  </ImageInput>
                </Grid>
                <Grid md={12} paddingX={2}>
                  <BooleanInput
                    fullWidth
                    label={"Set status secara manual"}
                    source="setStatusManually"
                  />
                </Grid>
                <FormDataConsumer>
                  {({ formData }) =>
                    !formData.setStatusManually ? (
                      <Grid md={12} paddingX={2}>
                        <SelectInput
                          fullWidth
                          source="status"
                          helperText={
                            formData?.status !==
                            "BARANG KOMPLIT ITEM & SUDAH CLEAR DP"
                              ? `Sistem akan mereset warna data tracking pada tanggal ${moment()
                                  .add(
                                    daysToSendReminderDefaultValue(formData),
                                    "days"
                                  )
                                  .startOf("day")
                                  .format(
                                    "DD MMM YYYY HH:mm a"
                                  )} (${daysToSendReminderDefaultValue(
                                  formData
                                )} hari dari sekarang)`
                              : ""
                          }
                          choices={[
                            {
                              id: "STATUS ORDERAN SUDAH DITERIMA",
                              name: "STATUS ORDERAN SUDAH DITERIMA",
                            },
                            {
                              id: "SUDAH DIPESAN DAN BARANG READY",
                              name: "SUDAH DIPESAN DAN BARANG READY",
                            },
                            {
                              id: "SUDAH DIPESAN DAN BARANG PRODUKSI",
                              name: "SUDAH DIPESAN DAN BARANG PRODUKSI",
                            },
                            {
                              id: "SUDAH DIKIRIM VENDOR KE GUDANG CHINA",
                              name: "SUDAH DIKIRIM VENDOR KE GUDANG CHINA",
                            },
                            {
                              id: "SUDAH TIBA DIGUDANG CHINA",
                              name: "SUDAH TIBA DIGUDANG CHINA",
                            },
                            {
                              id: "BARANG LOADING CHINA - JAKARTA",
                              name: "BARANG LOADING CHINA - JAKARTA",
                            },
                            {
                              id: "BARANG KOMPLIT ITEM & SUDAH CLEAR DP",
                              name: "BARANG KOMPLIT ITEM & SUDAH CLEAR DP",
                            },
                            {
                              id: "BARANG KOMPLIT ITEM & BELUM CLEAR DP",
                              name: "BARANG KOMPLIT ITEM & BELUM CLEAR DP",
                            },
                            {
                              id: "DELAY - RANDOM CHECK CHINA",
                              name: "DELAY - RANDOM CHECK CHINA",
                            },
                            {
                              id: "DELAY - STATUS BARANG OVERLOAD",
                              name: "DELAY - STATUS BARANG OVERLOAD",
                            },
                          ]}
                        />
                      </Grid>
                    ) : (
                      <>
                        <Grid md={12} paddingX={2}>
                          <SelectInput
                            required
                            fullWidth
                            source="status"
                            helperText={
                              formData?.status !==
                              "BARANG KOMPLIT ITEM & SUDAH CLEAR DP"
                                ? `Sistem akan mereset warna data tracking pada tanggal ${moment()
                                    .add(
                                      daysToSendReminderDefaultValue(formData),
                                      "days"
                                    )
                                    .startOf("day")
                                    .format(
                                      "DD MMM YYYY HH:mm a"
                                    )} (${daysToSendReminderDefaultValue(
                                    formData
                                  )} hari dari sekarang)`
                                : ""
                            }
                            choices={[
                              {
                                id: "STATUS ORDERAN SUDAH DITERIMA",
                                name: "STATUS ORDERAN SUDAH DITERIMA",
                              },
                              {
                                id: "SUDAH DIPESAN DAN BARANG READY",
                                name: "SUDAH DIPESAN DAN BARANG READY",
                              },
                              {
                                id: "SUDAH DIPESAN DAN BARANG PRODUKSI",
                                name: "SUDAH DIPESAN DAN BARANG PRODUKSI",
                              },
                              {
                                id: "SUDAH DIKIRIM VENDOR KE GUDANG CHINA",
                                name: "SUDAH DIKIRIM VENDOR KE GUDANG CHINA",
                              },
                              {
                                id: "SUDAH TIBA DIGUDANG CHINA",
                                name: "SUDAH TIBA DIGUDANG CHINA",
                              },
                              {
                                id: "BARANG LOADING CHINA - JAKARTA",
                                name: "BARANG LOADING CHINA - JAKARTA",
                              },
                              {
                                id: "BARANG KOMPLIT ITEM & SUDAH CLEAR DP",
                                name: "BARANG KOMPLIT ITEM & SUDAH CLEAR DP",
                              },
                              {
                                id: "BARANG KOMPLIT ITEM & BELUM CLEAR DP",
                                name: "BARANG KOMPLIT ITEM & BELUM CLEAR DP",
                              },
                              {
                                id: "DELAY - RANDOM CHECK CHINA",
                                name: "DELAY - RANDOM CHECK CHINA",
                              },
                              {
                                id: "DELAY - STATUS BARANG OVERLOAD",
                                name: "DELAY - STATUS BARANG OVERLOAD",
                              },
                            ]}
                          />
                        </Grid>
                        <Grid md={12} paddingX={2}>
                          <TextInput
                            required
                            fullWidth
                            source="customStatusMessage"
                            label="Ketik Isi WA untuk Status Manual Disini"
                            multiline
                            resettable
                          />
                        </Grid>
                      </>
                    )
                  }
                </FormDataConsumer>

                {/* <FormDataConsumer>
                {({ formData, ...rest }) =>
                  !!formData.setStatusManually && (
                    <Grid md={12} paddingX={2}>
                      <TextInput
                        fullWidth
                        source="status"
                        label="Status"
                        multiline
                        resettable
                      />
                    </Grid>
                  )
                }
              </FormDataConsumer> */}

                <FormDataConsumer>
                  {({ formData, ...rest }) =>
                    formData.status === "SUDAH DIPESAN DAN BARANG PRODUKSI" && (
                      <Grid md={12} paddingX={2}>
                        <NumberInput
                          fullWidth
                          source="productionDays"
                          label="Jumlah hari barang diproduksi"
                          required
                          {...rest}
                        />
                      </Grid>
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }) =>
                    formData.status === "BARANG LOADING CHINA - JAKARTA" && (
                      <Grid md={12} paddingX={2}>
                        <DateInput
                          fullWidth
                          source="estimatedDate"
                          label="Tanggal Perkiraan Barang Sampai"
                          {...rest}
                        />
                        <TextInput
                          fullWidth
                          source="containerNumber"
                          label="Nomor Container"
                          multiline
                          resettable
                        />
                      </Grid>
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }) =>
                    formData.status ===
                      "BARANG KOMPLIT ITEM & BELUM CLEAR DP" && (
                      <Grid md={12} paddingX={2}>
                        <DateInput
                          fullWidth
                          source="estimatedDate"
                          label="Tanggal Barang Sampai"
                          {...rest}
                        />
                        <NumberInput
                          fullWidth
                          source="remainingDownPaymentAmount"
                          label="Sisa DP"
                          {...rest}
                        />
                      </Grid>
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }) =>
                    formData.status ===
                      "BARANG KOMPLIT ITEM & SUDAH CLEAR DP" && (
                      <Grid md={12} paddingX={2}>
                        <DateInput
                          fullWidth
                          source="estimatedDate"
                          label="Tanggal Barang Sampai"
                          {...rest}
                        />
                      </Grid>
                    )
                  }
                </FormDataConsumer>
                <FormDataConsumer>
                  {({ formData, ...rest }) =>
                    formData.status === "DELAY - STATUS BARANG OVERLOAD" && (
                      <>
                        {" "}
                        <Grid md={6} paddingX={2}>
                          <DateInput
                            fullWidth
                            source="estimatedDate"
                            label="Estimasi Awal Tanggal Barang Sampai"
                            {...rest}
                          />
                        </Grid>
                        <Grid md={6} paddingX={2}>
                          <DateInput
                            fullWidth
                            source="newEstimatedDate"
                            label="Estimasi Baru Tanggal Barang Sampai"
                            {...rest}
                          />
                        </Grid>
                      </>
                    )
                  }
                </FormDataConsumer>

                <Grid md={12} paddingX={2}>
                  <BooleanInput
                    label={"Atur jumlah hari kirim automatis secara manual"}
                    source="setDaysReminderManually"
                  />
                </Grid>
                <FormDataConsumer>
                  {({ formData }) =>
                    formData.setDaysReminderManually && (
                      <Grid md={12} paddingX={2}>
                        <NumberInput
                          fullWidth
                          helperText={`Sistem akan mereset warna data tracking pada tanggal ${moment()
                            .add(formData.daysToSendReminder, "days")
                            .startOf("day")
                            .format("DD MMM YYYY HH:mm a")}`}
                          label="Jumlah hari pengingat otomatis yang dihitung mulai tanggal hari ini"
                          min={1}
                          source="daysToSendReminder"
                        />
                      </Grid>
                    )
                  }
                </FormDataConsumer>
                <Grid md={12} paddingX={2}>
                  <BooleanInput
                    label={"Kirim pesan WA saat selesai edit"}
                    source="setSendMessageNow"
                  />
                </Grid>
                <FormDataConsumer>
                  {({ formData }) =>
                    !formData.setSendMessageNow && (
                      <Grid md={12} paddingX={2}>
                        <DateTimeInput
                          fullWidth
                          source="sendMessageTimestamp"
                          label="Waktu Kirim Otomatis"
                          helperText="Isi waktu kirim WA otomatis untuk data tracking"
                          defaultValue={moment().add(3, "minutes")}
                        />
                      </Grid>
                    )
                  }
                </FormDataConsumer>
              </Grid>
            </Grid>
            <Grid md={6}>
              <Box p={1}>
                <b>Preview isi WA:</b>
                <Box mt={1}>
                  <FormDataConsumer>
                    {({ formData }) => {
                      if (!formData.setStatusManually) {
                        // STATUS ORDERAN SUDAH DITERIMA
                        if (
                          formData.status === "STATUS ORDERAN SUDAH DITERIMA"
                        ) {
                          return (
                            <Grid
                              md={12}
                            >{`Customer *${formData?.name}* yth, Terima kasih sudah berbelanja, orderan anda dengan *${formData?.salesOrder}* barang *${formData?.item}* sudah kami terima dan akan segera diproses, mohon tunggu informasi selanjutnya. Terima kasih.`}</Grid>
                          );
                        }

                        // SUDAH DIPESAN DAN BARANG READY
                        if (
                          formData.status === "SUDAH DIPESAN DAN BARANG READY"
                        ) {
                          return (
                            <Grid md={12}>{`Customer *${
                              formData?.name
                            }* yth, kami menginformasikan bahwa barang no *${
                              formData?.salesOrder
                            }* dengan item *${
                              formData?.item
                            }* sudah dipesan & sedang dalam proses pengemasan pada tanggal ${moment(
                              formData?.customerOrderDate
                            ).format(
                              "DD MMMM YYYY"
                            )}. Ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
                          );
                        }

                        // SUDAH DIPESAN DAN BARANG PRODUKSI
                        if (
                          formData.status ===
                          "SUDAH DIPESAN DAN BARANG PRODUKSI"
                        ) {
                          return (
                            <Grid md={12}>{`Customer *${
                              formData?.name
                            }* yth, kami menginformasikan bahwa barang no *${
                              formData?.salesOrder
                            }* dengan item *${
                              formData?.item
                            }* sudah dipesan pada tanggal ${moment(
                              formData?.customerOrderDate
                            ).format(
                              "DD MMMM YYYY"
                            )} dan dalam proses *produksi ${
                              formData?.productionDays
                            } hari*. Kemungkinan akan mengalami keterlambatan pengiriman dikarenakan adanya proses produksi tersebut. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
                          );
                        }

                        // SUDAH DIKIRIM VENDOR KE GUDANG CHINA
                        if (
                          formData.status ===
                          "SUDAH DIKIRIM VENDOR KE GUDANG CHINA"
                        ) {
                          return (
                            <Grid
                              md={12}
                            >{`Customer *${formData?.name}* yth, kami menginformasikan bahwa barang no *${formData?.salesOrder}* dengan item *${formData?.item}* sudah dikirim dengan nomor *resi china lokal ${formData?.resi}* dan akan tiba di Gudang China dalam waktu 4-5 hari. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
                          );
                        }

                        // SUDAH TIBA DIGUDANG CHINA
                        if (formData.status === "SUDAH TIBA DIGUDANG CHINA") {
                          return (
                            <Grid
                              md={12}
                            >{`Customer *${formData?.name}* yth, kami menginformasikan bahwa barang no *${formData?.salesOrder}* dengan item *${formData?.item}* sudah tiba di Gudang China dengan resi china lokal *${formData?.resi}*. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
                          );
                        }

                        // BARANG LOADING CHINA - JAKARTA
                        if (
                          formData.status === "BARANG LOADING CHINA - JAKARTA"
                        ) {
                          return (
                            <Grid md={12}>{`Customer *${
                              formData?.name
                            }* yth, kami menginformasikan bahwa barang no *${
                              formData?.salesOrder
                            }* dengan item *${formData?.item}* dengan resi *${
                              formData?.resi
                            }* sudah di loading dengan nomor Container *${
                              formData?.containerNumber
                            }* dan akan tiba di gudang Jakarta dengan estimasi *${moment(
                              formData?.estimatedDate
                            ).format(
                              "DD MMMM YYYY"
                            )}*. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
                          );
                        }

                        // BARANG KOMPLIT ITEM & BELUM CLEAR DP
                        if (
                          formData.status ===
                          "BARANG KOMPLIT ITEM & BELUM CLEAR DP"
                        ) {
                          return (
                            <Grid md={12}>{`Customer *${
                              formData?.name
                            }* yth, kami menginformasikan bahwa barang no *${
                              formData?.salesOrder
                            }* dengan item *${formData?.item}* atas *${
                              formData?.resi
                            }* tiba di Gudang Jakarta pada tanggal  *${moment(
                              formData?.estimatedDate
                            ).format(
                              "DD MMMM YYYY"
                            )}* dan akan segera diproses pengiriman ke alamat anda. Mohon untuk segera melakukan pelunasan *sisa DP 30%* sebesar *IDR ${rupiah(
                              formData?.remainingDownPaymentAmount
                            )}*. Mohon ditunggu informasi selanjutnya. Terima kasih.`}</Grid>
                          );
                        }

                        // BARANG KOMPLIT ITEM & SUDAH CLEAR DP
                        if (
                          formData.status ===
                          "BARANG KOMPLIT ITEM & SUDAH CLEAR DP"
                        ) {
                          return (
                            <Grid md={12}>{`Customer *${
                              formData?.name
                            }* yth, kami menginformasikan bahwa barang no *${
                              formData?.salesOrder
                            }* dengan item *${
                              formData?.item
                            }* tiba di Gudang Jakarta pada tanggal  *${moment(
                              formData?.estimatedDate
                            ).format(
                              "DD MMMM YYYY"
                            )}* dan sudah dikirimkan dengan nomor resi SENTRAL CARGO *${
                              formData?.resi
                            }* .Jangan lupa Untuk membuat video unboxing jika barang telah sampai untuk menghindari kesalahan dalam pengiriman. Ditunggu orderan selanjutnya, Terima kasih.`}</Grid>
                          );
                        }

                        // DELAY - RANDOM CHECK CHINA
                        if (formData.status === "DELAY - RANDOM CHECK CHINA") {
                          return (
                            <Grid
                              md={12}
                            >{`Customer *${formData?.name}* yth, kami menginformasikan bahwa barang no *${formData?.salesOrder}* dengan item *${formData?.item}* akan mengalami kemunduran estimasi tiba di Indonesia dikarenakan adanya *Random Check* di Custom China maka dari itu untuk estimasi selanjutnya akan kami informasikan kembali. Kami segenap perusahaan memohon maaf sebesar besarnya atas kemunduran estimasi tersebut. Mohon ditunggu. Terima kasih.`}</Grid>
                          );
                        }

                        // DELAY - STATUS BARANG OVERLOAD
                        if (
                          formData.status === "DELAY - STATUS BARANG OVERLOAD"
                        ) {
                          return (
                            <Grid md={12}>{`Customer *${
                              formData?.name
                            }* yth, kami menginformasikan bahwa barang no *${
                              formData?.salesOrder
                            }* dengan item *${
                              formData?.item
                            }* Estimasi awal *${moment(
                              formData?.estimatedDate
                            ).format(
                              "DD MMMM YYYY"
                            )}* mengalami kemunduran Estimasi dikarenakan adanya *Overload Container* dipelabuhan Transit Indonesia. Maka estimasi selanjutnya *${moment(
                              formData?.newEstimatedDate
                            ).format(
                              "DD MMMM YYYY"
                            )}*, Kami segenap perusahaan memohon maaf sebesar besarnya atas kemunduran estimasi tersebut. Mohon ditunggu informasi selanjutnyya. Terima kasih.`}</Grid>
                          );
                        } else {
                          return <Grid md={12}>{formData?.status}</Grid>;
                        }
                      } else {
                        return (
                          <Grid md={12}>{formData?.customStatusMessage}</Grid>
                        );
                      }
                    }}
                  </FormDataConsumer>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Create>
  );
};
