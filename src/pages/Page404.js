import React from "react";
import { Link } from "react-router-dom";

import EmptyPage from "../component/Common/Empty";
import { HOME } from "../constants/RouteConstant";

export default function Page404() {
  return (
    <EmptyPage
      title="It looks like nothing was found at this location"
      button={
        <Link className="empty-page__button flex-center" to={HOME}>
          Back on HomePage
        </Link>
      }
    />
  );
}
