// eslint-disable-next-line import/no-extraneous-dependencies
import { connect, connection } from 'mongoose';
import config from '../config/index';

const { dbPassword } = config;

const conn = {
  isConnected: false,
};

async function connectDB(): Promise<void> {
  if (conn.isConnected) return;

  const db = await connect(
    `mongodb+srv://japcrowleythetraveler:${dbPassword}@cluster0.eugf3fb.mongodb.net/?retryWrites=true&w=majority`,
  );
  conn.isConnected = db.connections[0].readyState === 1;
}

connection.on('connected', () => {
  console.log('mongoose is connected');
});
connection.on('error', () => {
  console.log('mongoose connection error');
});

export default connectDB;
