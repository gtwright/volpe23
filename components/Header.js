import { useRouter } from "next/router";
import Link from "next/link";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MainNav from "./MainNav";

export default function Header() {
  const { pathname } = useRouter();

  return (
    <AppBar color="default" elevation={0}>
      <MainNav />
    </AppBar>
  );
}
