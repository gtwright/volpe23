import { Image, Placeholder, Transformation } from "cloudinary-react";
import { Grid, Paper, Button } from "@material-ui/core";
import Link from "next/link";

const DayCard = ({ day, today, release }) => {
  const released = today > release;

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
          // <img src={day.image[0].url} alt={day.title} />
          <Image
            public-id={day.image[0].public_id}
            fetchFormat="auto"
            alt="MV"
            height="200"
            width="300"
            crop="fit"
            secure="true"
            loading="lazy"
            quality="auto"
          >
            {!released && <Transformation effect="pixelate" />}
            <Placeholder type="pixelate" />
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
