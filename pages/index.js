import Layout from "../components/Layout";
import DayCard from "../components/DayCard";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
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
import MuiAlert from "@material-ui/lab/Alert";

import moment from "moment";

const HOMEPAGE_QUERY = gql`
  query homePage {
    pageCollection(where: { slug: "/" }, limit: 10) {
      total
      items {
        title
        body {
          json
        }
      }
    }
    dayCollection(
      order: releaseDatetime_ASC
      where: { releaseDatetime_lte: "2021-06-03T00:00:00.000-04:00" }
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

const IndexPage = () => {
  const { loading, error, data, fetchMore, networkStatus } =
    useQuery(HOMEPAGE_QUERY);

  const page = data ? data?.pageCollection?.items[0] : null;
  const days = data ? data?.dayCollection?.items : [];
  var today = moment();
  return (
    <Layout>
      {page && (
        <>
          <Paper style={{ padding: 30, marginBottom: 20 }}>
            <h1>In Celebration of Mark Volpe’s 23 Years of Leadership</h1>
            <div>{documentToReactComponents(page.body.json)}</div>
          </Paper>
          <Container maxWidth="md">
            {days.map((day) => {
              var release = moment(day.releaseDatetime);
              return (
                <DayCard
                  day={day}
                  today={today}
                  release={release}
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

  await apolloClient.query({
    query: HOMEPAGE_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;
