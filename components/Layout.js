import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
// import Header from "./Header";

export default function App({ children }) {
  return (
    <>
      <CssBaseline />
      {/* <Header /> */}
      <main style={{ paddingTop: 90 }}>
        <Container maxWidth="lg">{children}</Container>
        <style jsx global>{`
          @font-face {
            font-family: "BSO Regular";
            src: url("../fonts/FunctionPro_Book/FunctionPro-Book-webfont.eot");
            src: url("../fonts/FunctionPro_Book/FunctionPro-Book-webfont.eot?iefix")
                format("eot"),
              url("../fonts/FunctionPro_Book/FunctionPro-Book-webfont.woff")
                format("woff"),
              url("../fonts/FunctionPro_Book/FunctionPro-Book-webfont.ttf")
                format("truetype"),
              url("../fonts/FunctionPro_Book/FunctionPro-Book-webfont.svg#webfontrF77UyWk")
                format("svg");
            font-weight: normal;
            font-style: normal;
          }

          body {
            background: url(/site-background.svg) no-repeat center center fixed;
            background-size: cover;
            font-family: "BSO Regular";
          }
        `}</style>
      </main>
    </>
  );
}
