import Layout from "../components/Layout";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { Paper } from "@material-ui/core";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { initializeApollo } from "../lib/apolloClient";

const HOMEPAGE_QUERY = gql`
  query homePage {
    pageCollection(where: { slug: "about" }, limit: 1) {
      total
      items {
        title
        body {
          json
        }
      }
    }
  }
`;

const AboutPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    HOMEPAGE_QUERY
  );

  const page = data ? data.pageCollection.items[0] : null;

  return (
    <Layout>
      {page && (
        <Paper style={{ padding: 30 }}>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
          <div>{documentToReactComponents(page.body.json)}</div>
        </Paper>
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

export default AboutPage;
