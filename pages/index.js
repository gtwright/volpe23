import Layout from "../components/Layout";
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
  CardMedia
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import ReactPlayer from "react-player";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
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
    dayCollection(order: title_ASC) {
      items {
        title
        image
        description {
          json
        }
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
          <Grid container spacing={3}>
            {days.map((day) => {
              var release = moment(day.releaseDatetime);
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={day.slug}
                  // style={{ height: "100%" }}
                >
                  {/* <CardActionArea>
                    <CardMedia
                      style={{ height: 140 }}
                      image={day.image[0].secure_url}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions> */}
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                      }}
                    >
                      <h2>{day.title}</h2>

                      {day.image[0].url && (
                        // <img src={day.image[0].url} alt={day.title} />
                        <Image
                          src={day.image[0].url}
                          alt="MV"
                          height={100}
                          width={200}
                        />
                      )}
                    </div>

                    {today > release ? (
                      <Link href={`/days/${day.slug}`}>
                        <Button variant="contained">View Details</Button>
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
