import Layout from "../../components/Layout";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { Paper } from "@material-ui/core";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import { initializeApollo } from "../../lib/apolloClient";
import ReactPlayer from "react-player";
import moment from "moment";

const DAY_QUERY = gql`
  query homePage($slug: String) {
    dayCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        description {
          json
        }
        releaseDatetime
      }
    }
  }
`;

const SessionPage = ({ day, slug }) => {
  const { loading, error, data } = useQuery(DAY_QUERY, {
    slug
  });
  // session = data ? data.sessionCollection.items[0] : session;
  var today = moment();
  var release = moment(day?.releaseDatetime) || null;
  const released = release && today >= release;
  console.log(day);
  return (
    <Layout>
      <Paper style={{ padding: 30 }}>
        {day ? (
          <>
            <h1>{day.title}</h1>
            <div style={{ marginTop: 30, marginBottom: 30 }}>
              {documentToReactComponents(day.description)}
            </div>
            {released ? (
              <>Released on {release.format("L")}</>
            ) : (
              <>Releasing on {release.format("L")}</>
            )}
          </>
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          <div>Page Not Found</div>
        )}
      </Paper>
    </Layout>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const apolloClient = initializeApollo();
  const { slug } = params;
  const client = await apolloClient.query({
    query: DAY_QUERY,
    variables: { slug }
  });
  const day = client.data.dayCollection.items[0] || null;
  // console.log("session", slug, session);

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      day,
      slug
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true // See the "fallback" section below
  };
}

export default SessionPage;
