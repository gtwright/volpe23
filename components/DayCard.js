import { Image } from "cloudinary-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Paper } from "@material-ui/core";

const CardImage = ({ day }) => (
  <Image
    publicId={day.image[0].public_id}
    alt="MV"
    fetchFormat="auto"
    quality="auto"
    secure="true"
    height="600"
    width="850"
    crop="fit"
    style={{ maxWidth: "100%" }}
  ></Image>
);

const DayCard = ({ day, index }) => {
  return (
    <Paper
      key={day.slug}
      style={{
        padding: 20,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "column",
        marginBottom: 25,
      }}
    >
      <h2>
        {index}. {day.title}
      </h2>
      <>
        <CardImage day={day} />
        <div>
          {!!day.description && documentToReactComponents(day.description.json)}
        </div>
      </>
    </Paper>
  );
};

export default DayCard;
