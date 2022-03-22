import * as React from "react";
import { Admin, fetchUtils, Resource, ListGuesser } from "react-admin";
import { stringify } from "query-string";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./users";
import { PostList, PostCreate, PostEdit } from "./posts";
import { Dashboard } from "./Dashboard";
import authProvider from "./authProvider";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import simpleRestProvider from "ra-data-simple-rest";
import LoginPage from "./loginPage";

console.log("Node ENV is: ", process.env.NODE_ENV);
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
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

const dataProvider = simpleRestProvider(
  // "gor-orchid-backend-production.up.railway.app/v1",
  apiUrl,
  fetchJson
);

const customDataProvider = {
  ...dataProvider,
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sortBy: `${field}:${order.toLowerCase()}`,
      limit: perPage,
      page: page,
      // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      // filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return fetchJson(url).then(({ headers, json }) => ({
      data: json.results.map((item) => {
        return {
          ...item,
        };
      }),
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
    // const result = await dataProvider.getList(resource, params);
    // if (result) {
    //   return {
    //     data: result.data.results.map((item) => {
    //       return {
    //         ...item,
    //       };
    //     }),
    //     total: result.total,
    //   };
    // }
    // return Promise();
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
      <Resource name="users" list={ListGuesser} icon={UserIcon} />
      <Resource
        name="fields"
        list={ListGuesser}
        // create={PostCreate}
        // edit={PostEdit}
        icon={PostIcon}
      />
    </Admin>
  );
};

export default App;
