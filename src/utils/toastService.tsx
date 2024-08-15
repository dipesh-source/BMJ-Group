import toast from "react-hot-toast";
const showToast = (message = "Something went wrong", messageType = "error") =>
  toast.custom(message, {
    // @ts-ignore
    type: messageType,
    className: "toasterMessage ring-1 ring-black ring-opacity-5",
    style: {
      maxWidth: "400px",
      backgroundColor: "white",
      color: "black",
    },
    // icon: toastIcons[messageType].icon,
    // iconTheme: {
    //   primary: `${theme.palette[messageType].main}`,
    //   secondary: `#FFF`,
    // },
    duration: 5000,
  });

export default showToast;
