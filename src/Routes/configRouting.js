import Home from "../pages/Home/Home.js"
import Error404 from "../pages/Error404/Error404.js"

export default [
    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: "*",
        page: Error404
    },
];