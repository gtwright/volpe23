import { useRouter } from "next/router";
import Link from "next/link";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default function GlobalNav() {
  const { pathname } = useRouter();

  return (
    <Toolbar
      style={{
        // backgroundColor: "red",
        minHeight: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">
        <a href="https://bso.org" target="_blank">
          bso.org
        </a>{" "}
        tanglewood.org bostonpops.org
      </Typography>
    </Toolbar>
  );
}
