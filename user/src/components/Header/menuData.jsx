const menuData = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Chatbot",
    newTab: false,
    path: "/chatbot",
  },
  {
    id: 3,
    title: "Features",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Symptom analysis",
        newTab: false,
        path: "/symptoms",
      },
      {
        id: 32,
        title: "Diet planner",
        newTab: false,
        path: "/diet",
      },
      {
        id: 33,
        title: "Consult a doctor",
        newTab: false,
        path: "/docs",
      },
    ],
  },
];

export default menuData;
