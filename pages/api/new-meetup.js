import { MongoClient } from 'mongodb';
// /api/new-meetup
// POST /api/new-meetup

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASS = process.env.DB_PASS;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { title, image, address, description } = data;
    const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

    try {
      const client = await MongoClient.connect(connectionString);
      const db = client.db();
      const meetupsCollection = db.collection('meetups');
      const result = await meetupsCollection.insertOne(data);
      client.close();
      res
        .status(201)
        .json({ message: 'Meetup inserted!', meetupID: result.insertedId });
    } catch (error) {
      console.log('🚀 - file: new-meetup.js - line 23 - error', error);
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
