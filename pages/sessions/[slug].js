import Layout from "../../components/Layout";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { Paper } from "@material-ui/core";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import { initializeApollo } from "../../lib/apolloClient";
import ReactPlayer from "react-player";
import moment from "moment";

const SESSION_QUERY = gql`
  query homePage($slug: String) {
    sessionCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        description
        videoEmbed
        releaseDatetime
      }
    }
  }
`;

const SessionPage = ({ session, slug }) => {
  const { loading, error, data } = useQuery(SESSION_QUERY, {
    slug,
  });
  // session = data ? data.sessionCollection.items[0] : session;
  var today = moment();
  var release = moment(session?.releaseDatetime) || null;
  const released = release && today >= release;
  return (
    <Layout>
      <Paper style={{ padding: 30 }}>
        {session ? (
          <>
            <h1>{session.title}</h1>
            {released && (
              <ReactPlayer
                url={session.videoEmbed}
                width="100%"
                controls={true}
              />
            )}

            <div style={{ marginTop: 30, marginBottom: 30 }}>
              {session.description}
            </div>
            {released ? (
              <>Released on {release.format("L")}</>
            ) : (
              <>Releasing on {release.format("L")}</>
            )}
            {/* {session?.body?.json && (
              <div>{documentToReactComponents(session.body.json)}</div>
            )} */}
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
    query: SESSION_QUERY,
    variables: { slug },
  });
  const session = client.data.sessionCollection.items[0] || null;
  // console.log("session", slug, session);

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      session,
      slug,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // See the "fallback" section below
  };
}

export default SessionPage;
