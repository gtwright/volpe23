import Layout from "../../components/Layout";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { Paper } from "@material-ui/core";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import { initializeApollo } from "../../lib/apolloClient";
import ReactPlayer from "react-player";
import moment from "moment";
import Link from "next/link";

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

const DayPage = ({ day, slug }) => {
  const { loading, error, data } = useQuery(DAY_QUERY, {
    slug,
  });
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  // session = data ? data.sessionCollection.items[0] : session;
  var today = moment();
  var release = moment(day?.releaseDatetime) || null;
  const released = release && today >= release;
  // console.log(day);
  return (
    <Layout>
      <Paper style={{ padding: 30 }}>
        {day ? (
          <>
            <div>
              <Link href="/">&larr; Back to Home</Link>
            </div>
            <h1>{day.title}</h1>
            <div style={{ marginTop: 30, marginBottom: 30 }}>
              {/* {documentToReactComponents(day.description)} */}
            </div>
            {released ? (
              <>Released on {release.format("L")}</>
            ) : (
              <>Releasing on {release.format("L")}</>
            )}
          </>
        ) : (
          <div>Page Not Found</div>
        )}
      </Paper>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { slug } = params;
  const client = await apolloClient.query({
    query: DAY_QUERY,
    variables: { slug },
  });
  const day = client.data.dayCollection.items[0] || null;
  console.log("day", day);

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      day,
      slug,
    },
    revalidate: 1,
    // notFound: false,
  };
}

export async function getStaticPaths() {
  const paths = [...Array(10).keys()].map((x) => ({
    params: { slug: `${x + 1}` },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default DayPage;
