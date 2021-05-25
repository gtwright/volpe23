import { Image, Placeholder, Transformation } from "cloudinary-react";
import { Grid, Paper, Button } from "@material-ui/core";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

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
    {/* {!released && <Transformation effect="pixelate" />} */}
  </Image>
);

const DayCard = ({ day, today, release }) => {
  const released = today > release;
  // console.log("day image", day.image);
  return (
    // <Grid
    //   item
    //   xs={12}
    //   md={8}

    //   // style={{ height: "100%" }}
    // >
    <Paper
      key={day.slug}
      style={{
        padding: 30,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "column",
        margin: 25,
      }}
    >
      <h3>{day.season}</h3>
      <h2>{day.title}</h2>
      <>
        <CardImage day={day} released={released} />
        {/* {released ? (
          // <Link href={`/days/${day.slug}`}>
            <a style={{ width: "100%" }}>
              <CardImage day={day} released={released} />
            </a>
          // </Link>
        ) : (
          <CardImage day={day} released={released} />
        )} */}
        <div>{documentToReactComponents(day.description.json)}</div>

        {/* {!released && <>Releasing on {release.format("L")}</>} */}
      </>
    </Paper>
    // </Grid>
  );
};

export default DayCard;
