import Layout from "../components/Layout";
import DayCard from "../components/DayCard";
import { gql } from "@apollo/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { initializeApollo } from "../lib/apolloClient";
import {
  Container,
  Box,
  Grid,
  Paper,
  Button,
  CardActions,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { Image } from "cloudinary-react";

import moment from "moment";

const HOMEPAGE_QUERY = gql`
  query homePage($today: DateTime) {
    pageCollection(where: { slug: "/" }, limit: 10) {
      total
      items {
        title
        image
        body {
          json
        }
      }
    }
    dayCollection(
      order: releaseDatetime_DESC
      where: { releaseDatetime_lte: $today }
    ) {
      items {
        title
        description {
          json
        }
        season
        image
        releaseDatetime
        slug
        sys {
          id
        }
      }
    }
  }
`;

const IndexPage = ({ page, days }) => {
  var today = moment();
  console.log(page);
  return (
    <Layout>
      {page && (
        <>
          <Paper style={{ padding: 30, marginBottom: 20, paddingTop: 5 }}>
            <h1>In Celebration of Mark Volpe’s 23 Years of Leadership</h1>
            <Image
              publicId={page.image[0].public_id}
              alt="Mark Volpe"
              fetchFormat="auto"
              quality="auto"
              secure="true"
              height="800"
              width="1200"
              crop="fit"
              style={{ width: "100%" }}
            />
            <div>{documentToReactComponents(page.body.json)}</div>
          </Paper>
          <Container maxWidth="md" disableGutters>
            {days.map((day, idx) => {
              return (
                <DayCard
                  day={day}
                  index={days.length - idx}
                  today={today}
                  key={day.slug}
                />
              );
            })}
          </Container>
        </>
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  var today = moment().add(0, "d");
  const { data } = await apolloClient.query({
    query: HOMEPAGE_QUERY,
    variables: { today },
  });
  const page = data ? data?.pageCollection?.items[0] : null;
  const days = data ? data?.dayCollection?.items : [];
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      days,
      page,
    },
    revalidate: 1,
  };
}

export default IndexPage;
