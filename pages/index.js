import Layout from "../components/Layout";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { initializeApollo } from "../lib/apolloClient";
import { Container, Box, Grid, Paper, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import ReactPlayer from "react-player";
import moment from "moment";
import Link from "next/link";
const HOMEPAGE_QUERY = gql`
  query homePage {
    pageCollection(where: { slug: "home" }, limit: 10) {
      total
      items {
        title
        body {
          json
        }
      }
    }
    sessionCollection(order: title_ASC) {
      items {
        title
        description
        slug
        releaseDatetime
      }
    }
  }
`;

const IndexPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    HOMEPAGE_QUERY
  );

  const page = data ? data?.pageCollection?.items[0] : null;
  const sessions = data ? data?.sessionCollection?.items : [];
  var today = moment();

  return (
    <Layout>
      {page && (
        <>
          <Paper style={{ padding: 30, marginBottom: 20 }}>
            <h1>Us: A Celebration of Community</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=sLioN5dtpK0?rel=0"
                width="100%"
                controls={true}
              />
            </div>
            <div>{documentToReactComponents(page.body.json)}</div>
          </Paper>
          <Grid container spacing={3}>
            {sessions.map((session) => {
              var release = moment(session.releaseDatetime);
              return (
                <Grid item xs={12} md={6} key={session.slug}>
                  <Paper
                    style={{
                      padding: 30,
                      height: "100%",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <div>
                      <h2>{session.title}</h2>
                      <p>{session.description}</p>
                    </div>

                    {today > release ? (
                      <Link href={`/sessions/${session.slug}`}>
                        <Button variant="contained">Watch</Button>
                      </Link>
                    ) : (
                      <>Releasing on {release.format("L")}</>
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: HOMEPAGE_QUERY
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
}

export default IndexPage;
