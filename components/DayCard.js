import { Image, Placeholder, Transformation } from "cloudinary-react";
import { Grid, Paper, Button } from "@material-ui/core";
import Link from "next/link";

const CardImage = ({ day, released }) => (
  <Image
    publicId={day.image[0].public_id}
    alt="MV"
    fetchFormat="auto"
    quality="auto"
    secure="true"
    // loading="lazy"
    height="600"
    width="850"
    crop="fit"
    style={{ maxWidth: "100%" }}
  >
    {/* <Transformation
    height="200"
    width="300"
    crop="fit"
    fetchFormat="auto"
    quality="auto"
  /> */}
    {/* <Placeholder type="pixelate" /> */}
    {!released && <Transformation effect="pixelate" />}
  </Image>
);

const DayCard = ({ day, today, release }) => {
  const released = today > release;
  // console.log("day image", day.image);
  return (
    <Grid
      item
      xs={12}
      md={4}

      // style={{ height: "100%" }}
    >
      <Paper
        style={{
          padding: 30,
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>{day.title}</h2>
        <>
          {released ? (
            <Link href={`/days/${day.slug}`}>
              <a style={{ width: "100%" }}>
                <CardImage day={day} released={released} />
              </a>
            </Link>
          ) : (
            <CardImage day={day} released={released} />
          )}

          {!released && <>Releasing on {release.format("L")}</>}
        </>
      </Paper>
    </Grid>
  );
};

export default DayCard;
