import React from "react";
import { API_HOST } from "../../utils/constants";
import DefaultAvatar from "../../assets/images/DefaultAvatar.png";

import "./ProfilePicture.scss";

export default function ProfilePicture(props) {
  const { user } = props;
  const pictureURL = user?.photo
    ? `${API_HOST}/photo?id=${user.id}`
    : DefaultAvatar;

  return (
    <div
      className="avatar"
      style={{ backgroundImage: `url('${pictureURL}')` }}
    ></div>
  );
}
