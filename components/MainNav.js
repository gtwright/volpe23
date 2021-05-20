import { useRouter } from "next/router";
import Link from "next/link";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

export default function MainNav() {
  const { pathname } = useRouter();

  return (
    <Container maxWidth="lg">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link href="/">
            <a className={pathname === "/" ? "is-active" : ""}>
              {/* <img
                src="/BSOSTLGLD_microsite_banner.png"
                alt="STL GLD Logo"
                style={{ height: 50 }}
              /> */}
              In Celebration of Mark Volpe’s 23 Years of Leadership
            </a>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <a
              className={pathname === "/about" ? "is-active" : ""}
              style={{
                textDecoration: "none",
                fontSize: "1.5em",
                fontWeight: 700,
                color: "#000"
              }}
            >
              <Typography variant="h6" component="h3">
                About
              </Typography>
            </a>
          </Link>
        </div>
      </Toolbar>
    </Container>
  );
}
