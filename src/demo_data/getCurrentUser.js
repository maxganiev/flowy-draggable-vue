export const getCurrentUser = () =>
  new Promise((resolove) =>
    setTimeout(() => {
      resolove({ id: 1186, full_name_short: "Максим Ганиев" });
    }, 200)
  );
