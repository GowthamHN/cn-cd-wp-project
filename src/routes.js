

import Login from "./components/Login/login.js";
import Chat from "./components/chat/chat.js";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/user"
  },
  {
    path: "/chat",
    name: "Chat",
    icon: "ni ni-tv-2 text-primary",
    component: Chat,
    layout: "/user"
  }
];
export default routes;