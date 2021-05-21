import { Image, Placeholder } from "cloudinary-react";
import { Grid, Paper, Button } from "@material-ui/core";
import Link from "next/link";

const DayCard = ({ day, today, release }) => {
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
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column"
            // justifyContent: "center",
            // width: "100%"
          }}
        > */}
        <h2>{day.title}</h2>

        {day.image[0].url && (
          // <img src={day.image[0].url} alt={day.title} />
          <Image
            public-id={day.image[0].public_id}
            alt="MV"
            height={200}
            secure="true"
          >
            <Placeholder type="pixelate" />
          </Image>
        )}
        {/* </div> */}

        {/* {today > release ? (
          <Link href={`/days/${day.slug}`}>
            <Button variant="contained">View Details</Button>
          </Link>
        ) : (
          <>Releasing on {release.format("L")}</>
        )} */}
        <>Releasing on {release.format("L")}</>
      </Paper>
    </Grid>
  );
};

export default DayCard;
