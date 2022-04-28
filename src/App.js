import * as React from "react";
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

const apiUrl = `${process.env.REACT_APP_SERVER_URL}`;
const fetchJson = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
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
      sortBy: `${field}:${order.toLowerCase()}`,
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
    const modifiedDaysToSendReminderTimestamp = parseInt(
      moment()
        // use days for production, and minutes for development
        .add("days", params.data.daysToSendReminder)
        // .add("minutes", params.data.daysToSendReminder)
        .format("x"),
      10
    );
    console.log({
      now: parseInt(moment().format("x"), 10),
      added: modifiedDaysToSendReminderTimestamp,
    });
    const includeDaysToSendReminder = params?.data?.setSendMessageNow && {
      daysToSendReminder: params?.data?.daysToSendReminder,
    };
    const modifiedData = {
      ...params.data,
      user: userId,
      sendMessageTimestamp: modifiedSendMessageTimestamp,
      sendMessageStatus: false,
      read: true,
      daysToSendReminderTimestamp: modifiedDaysToSendReminderTimestamp,
      ...includeDaysToSendReminder,
    };
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
    const modifiedDaysToSendReminderTimestamp = parseInt(
      moment()
        // use days for production, and minutes for development
        .add("days", params.data.daysToSendReminder)
        // .add("minutes", params.data.daysToSendReminder)
        .format("x"),
      10
    );
    console.log({
      now: parseInt(moment().format("x"), 10),
      added: modifiedDaysToSendReminderTimestamp,
    });
    const includeDaysToSendReminder = params?.data?.setSendMessageNow && {
      daysToSendReminder: params?.data?.daysToSendReminder,
    };
    const modifiedData = {
      ...params.data,
      user: userId,
      sendMessageTimestamp: modifiedSendMessageTimestamp,
      sendMessageStatus: false,
      read: true,
      daysToSendReminderTimestamp: modifiedDaysToSendReminderTimestamp,
      ...includeDaysToSendReminder,
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
  // return <Admin authProvider={authProvider} dashboard={Dashboard} dataProvider={dataProvider} >
  return (
    <Admin
      authProvider={authProvider}
      dashboard={Dashboard}
      dataProvider={customDataProvider}
      loginPage={LoginPage}
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
        create={TrackingCreate}
        // edit={TrackingEdit}
        edit={TrackingEdit}
        icon={PostIcon}
        show={TrackingShow}
      />
    </Admin>
  );
};

export default App;
