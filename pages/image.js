import { Image, Placeholder, Transformation } from "cloudinary-react";

const page = () => {
  return (
    <Image
      public-id="mv23/01_Pres272_1997_1998_f03_04_uxi6ya"
      alt="MV"
      fetchFormat="auto"
      quality="auto"
      secure="true"
      //   loading="lazy"
      height="200"
      width="300"
      crop="fit"
    >
      {/* <Transformation
              height="200"
              width="300"
              crop="fit"
              fetchFormat="auto"
              quality="auto"
            /> */}
      <Placeholder type="predominant"></Placeholder>
    </Image>
  );
};

export default page;
