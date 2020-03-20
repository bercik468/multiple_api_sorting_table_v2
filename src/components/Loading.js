import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  loadingCircle: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(102,102,102,0.8)",
    zIndex: 2000
  }
});

const Loading = () => {
  const styles = useStyles();
  return (
    <div className={styles.loadingCircle}>
      <CircularProgress size={120} />
    </div>
  );
};

export default Loading;
