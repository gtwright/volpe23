import { Image, Placeholder, Transformation } from "cloudinary-react";
import { Grid, Paper, Button } from "@material-ui/core";
import Link from "next/link";

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
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h2>{day.title}</h2>

        {day.image[0].url && (
          <Image
            public-id={day.image[0].public_id}
            alt="MV"
            secure="true"
            loading="lazy"
          >
            <Transformation
              height="200"
              width="300"
              crop="fit"
              fetchFormat="auto"
              quality="auto"
            />
            {/* <Placeholder type="pixelate" /> */}
            {!released && <Transformation effect="pixelate" />}
          </Image>
        )}

        {released ? (
          <Link href={`/days/${day.slug}`}>
            <Button style={{ marginTop: 20 }}>View Details</Button>
          </Link>
        ) : (
          <>Releasing on {release.format("L")}</>
        )}
      </Paper>
    </Grid>
  );
};

export default DayCard;
