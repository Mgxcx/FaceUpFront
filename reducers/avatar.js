export default function (avatar = [], action) {
  if (action.type == "saveAvatar") {
    return [...avatar, action.avatar];
  } else {
    return avatar;
  }
}
