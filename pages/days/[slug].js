import Layout from "../../components/Layout";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { Paper } from "@material-ui/core";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import { initializeApollo } from "../../lib/apolloClient";
import moment from "moment";
import Link from "next/link";
import { Image, Placeholder, Transformation } from "cloudinary-react";

const DAY_QUERY = gql`
  query homePage($slug: String) {
    dayCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        image
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
        <div>
          <Link href="/">&larr; Back to Home</Link>
        </div>
        {!released ? (
          <div>Releasing on {release.format("L")}</div>
        ) : day ? (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                publicId={day.image?.[0].public_id}
                alt="MV"
                fetchFormat="auto"
                quality="auto"
                secure="true"
                // loading="lazy"
                height="800"
                width="1200"
                crop="fit"
              ></Image>
            </div>
            <h1>{day.title}</h1>
            <div style={{ marginBottom: 30 }}>
              {day.description.json &&
                documentToReactComponents(day.description.json)}
            </div>
          </div>
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
  const paths = [...Array(23).keys()].map((x) => ({
    params: { slug: `${x + 1}` },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default DayPage;
