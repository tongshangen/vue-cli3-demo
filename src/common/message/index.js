import { Message } from "element-ui";
// export const messages = function(type, message) {
//   Message({
//     type: type,
//     message: message
//   });
// };
export const Messages = function(type, message, showClose, fun, iscenter) {
  console.log(type, message, showClose, fun, iscenter);

  Message({
    type: type,
    message: message,
    showClose,
    onClose: fun,
    center: iscenter
  });
};
