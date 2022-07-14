import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export async function getStaticProps() {
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASS = process.env.DB_PASS;
  const DB_CLUSTER = process.env.DB_CLUSTER;
  const DB_NAME = process.env.DB_NAME;
  const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  //fetch data from an API
  MongoClient.connect;
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
