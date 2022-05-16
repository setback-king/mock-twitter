import React from "react";
import { ProfileTop } from "../build-components/ProfileTop";
import { ProfileBottom } from "../build-components/ProfileBottom";

function Profile({ user }) {
  return (
    <div className="profile">
      <ProfileTop user={user} />
      <ProfileBottom />
    </div>
  );
}

export default Profile;
