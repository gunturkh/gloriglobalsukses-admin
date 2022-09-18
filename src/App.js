import * as React from "react";
// import { theme } from './theme'
import { Admin, fetchUtils, Resource } from "react-admin";
import { stringify } from "query-string";
import {
  TrackingList,
  TrackingCreate,
  TrackingEdit,
  TrackingShow,
} from "./components/Tracking";
import { Dashboard } from "./Dashboard";
import authProvider from "./authProvider";
import PostIcon from "@mui/icons-material/Book";
import simpleRestProvider from "ra-data-simple-rest";
import LoginPage from "./loginPage";
import moment from "moment";
import { daysToSendReminderDefaultValue } from "./utils.js";
console.log({
  env: process.env,
  host: process.env.REACT_APP_SERVER_URL,
  sockethost: process.env.REACT_APP_SOCKET_HOST,
  socketpath: process.env.REACT_APP_SOCKET_PATH
})
const apiUrl = `${process.env.REACT_APP_SERVER_URL}`;
const fetchJson = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers();
    // { Accept: "application/json" });
  }

  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  options.headers.set("X-Custom-Header", `foobar`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(apiUrl, fetchJson);

const customDataProvider = {
  ...dataProvider,
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sortBy: field ? `${field}:${order.toLowerCase()}` : `read:ASC`,
      limit: perPage,
      page: page,
      populate: "user",
      ...params.filter,
      // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      // filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return fetchJson(url).then(({ headers, json }) => {
      return {
        data: json.results.map((item) => {
          return {
            ...item,
          };
        }),
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    });
  },
  create: async (resource, params) => {
    const user = localStorage.getItem("user");
    const { id: userId = "" } = user ? JSON.parse(user) : {};
    console.log("userId", userId);
    const url = `${apiUrl}/${resource}`;
    const modifiedSendMessageTimestamp = parseInt(
      moment(params.data.sendMessageTimestamp).format("x"),
      10
    );
    const includeDaysToSendReminder = params?.data?.setSendMessageNow && {
      daysToSendReminder: daysToSendReminderDefaultValue(params?.data),
    };
    console.log(
      "daysToSendReminder",
      daysToSendReminderDefaultValue(params?.data)
    );
    const modifiedDaysToSendReminderTimestamp = parseInt(
      moment()
        // use days for production, and minutes for development
        .add("days", daysToSendReminderDefaultValue(params?.data))
        // .add("minutes", params.data.daysToSendReminder)
        .startOf("day")
        .format("x"),
      10
    );
    console.log({
      now: parseInt(moment().format("x"), 10),
      added: modifiedDaysToSendReminderTimestamp,
    });
    delete params.data.daysToSendReminder;
    if (
      params?.data?.productionDays === "" &&
      params?.data?.status !== "SUDAH DIPESAN DAN BARANG PRODUKSI"
    )
      delete params.data.productionDays;
    if (!params?.data?.setStatusManually && params?.data?.customStatusMessage === "") delete params.data.customStatusMessage;
    console.log("params.data after delete daysToSendReminder", params?.data);

    const imagesURL = [];
    if (params?.data?.images) {
      for (const image of params.data.images) {
        const imageData = new FormData();
        imageData.append("file", image.rawFile);
        imageData.append("upload_preset", "proofimages");
        imageData.append("cloud_name", "glori-global-sukses");
        await fetch(
          " https://api.cloudinary.com/v1_1/glori-global-sukses/image/upload",
          {
            method: "post",
            body: imageData,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("image data uploaded", data);
            imagesURL.push(data.secure_url);
          });
      }
    }

    const modifiedData = {
      ...params.data,
      user: userId,
      sendMessageTimestamp: modifiedSendMessageTimestamp,
      sendMessageStatus: false,
      read: true,
      daysToSendReminderTimestamp: modifiedDaysToSendReminderTimestamp,
      images: imagesURL,
      ...includeDaysToSendReminder,
    };
    console.log("create data", modifiedData);
    return fetchJson(url, {
      method: "POST",
      body: JSON.stringify(modifiedData),
    }).then(({ json }) => {
      return {
        ...json,
        id: json.id,
      };
    });
  },
  update: async (resource, params) => {
    const user = localStorage.getItem("user");
    const { id: userId = "" } = user ? JSON.parse(user) : {};
    console.log("userId", userId);
    const url = `${apiUrl}/${resource}/${params?.data?.id}`;
    const modifiedSendMessageTimestamp = parseInt(
      moment(params.data.sendMessageTimestamp).format("x"),
      10
    );
    const includeDaysToSendReminder = params?.data?.setSendMessageNow && {
      daysToSendReminder: daysToSendReminderDefaultValue(params?.data),
    };
    console.log(
      "daysToSendReminder",
      daysToSendReminderDefaultValue(params?.data)
    );
    const modifiedDaysToSendReminderTimestamp = parseInt(
      moment()
        // use days for production, and minutes for development
        .add("days", daysToSendReminderDefaultValue(params?.data))
        // .add("minutes", params.data.daysToSendReminder)
        .startOf("day")
        .format("x"),
      10
    );
    console.log({
      now: parseInt(moment().format("x"), 10),
      added: modifiedDaysToSendReminderTimestamp,
    });
    delete params.data.daysToSendReminder;
    if (
      params?.data?.productionDays === "" &&
      params?.data?.status !== "SUDAH DIPESAN DAN BARANG PRODUKSI"
    )
      delete params.data.productionDays;
    if (!params?.data?.setStatusManually && params?.data?.customStatusMessage === "") delete params.data.customStatusMessage;
    console.log("params.data after delete daysToSendReminder", params?.data);

    const imagesURL = [];
    if (params?.data?.images) {
      const newImages = params.data.images.filter(
        (p) => p?.rawFile instanceof File
      );
      if (newImages.length > 0) {
        for (const image of newImages) {
          const imageData = new FormData();
          imageData.append("file", image.rawFile);
          imageData.append("upload_preset", "proofimages");
          imageData.append("cloud_name", "glori-global-sukses");
          await fetch(
            " https://api.cloudinary.com/v1_1/glori-global-sukses/image/upload",
            {
              method: "post",
              body: imageData,
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("image data uploaded", data);
              imagesURL.push(data.secure_url);
            });
        }
      }
    }
    const modifiedData = {
      ...params.data,
      user: userId,
      sendMessageTimestamp: modifiedSendMessageTimestamp,
      sendMessageStatus: false,
      read: true,
      daysToSendReminderTimestamp: modifiedDaysToSendReminderTimestamp,
      ...includeDaysToSendReminder,
      history: [...params.data.history, params.data],
      images: imagesURL,
    };
    return fetchJson(url, {
      method: "PUT",
      body: JSON.stringify(modifiedData),
    }).then(({ json }) => {
      return {
        ...json,
        id: json.id,
      };
    });
  },
};

const App = () => {
  const parsedClientInfoFromLocalStorage =
    JSON.parse(localStorage.getItem("clientInfo")) || {};
  const checkSavedClientInfo =
    Object.keys(parsedClientInfoFromLocalStorage).length > 0;
  console.log("checkSavedClientInfo", checkSavedClientInfo);
  const permissions = localStorage.getItem("permissions");
  return (
    <Admin
      authProvider={authProvider}
      dashboard={Dashboard}
      dataProvider={customDataProvider}
      loginPage={LoginPage}
      // theme={theme}
    >
      {/* <Resource
        name="posts"
        list={PostList}
        create={PostCreate}
        edit={PostEdit}
        icon={PostIcon}
      /> */}
      {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
      {/* <Resource name="users" list={ListGuesser} icon={UserIcon} /> */}
      <Resource
        name="tracking"
        list={TrackingList}
        create={permissions === "admin" ? TrackingCreate : null}
        edit={permissions === "admin" ? TrackingEdit : null}
        icon={PostIcon}
        show={TrackingShow}
      />
    </Admin>
  );
};

export default App;
