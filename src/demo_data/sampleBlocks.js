export const blocks = [
  {
    preview: {
      title: "New block A",
      description: "New block A",
      icon: "eye",
    },
    node: {
      title: "New block A",
      description: "<span> New block A</span>",
      icon: "eyeblue",
    },
  },
  {
    preview: {
      title: "Update database",
      description: "Triggers when somebody performs a specified action",
      icon: "error",
    },
    node: {
      title: "Update database",
      description:
        '<span>Triggers when somebody performs a <span class="font-bold">specified action</span></span>',
      icon: "errorred",
    },
  },
  {
    preview: {
      title: "Time has passed",
      description: "Triggers after a specified amount of time",
      icon: "database",
    },
    node: {
      title: "Time has passed",
      description: 'Triggers after a specified <span class="font-bold">amount</span> of time',
      icon: "databaseorange",
    },
  },
];
