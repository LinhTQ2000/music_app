import { useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import * as AlbumAction from "../actions/AlbumActions";

const useNewReleases = () => {
  const data = useSelector((state) => state.newReleases);

  const dispatch = useDispatch();
  const actions = useMemo(
    () => bindActionCreators(AlbumAction, dispatch),
    [dispatch]
  );

  return {
    actions,
    data,
  };
};

export default useNewReleases;
