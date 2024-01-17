// eslint-disable-next-line import/no-extraneous-dependencies
import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false,
};

async function connectDB(): Promise<void> {
  if (conn.isConnected) return;

  const db = await connect(
    'mongodb+srv://japcrowleythetraveler:C6OxRPadlhtepwBn@cluster0.eugf3fb.mongodb.net/?retryWrites=true&w=majority',
  );
  conn.isConnected = db.connections[0].readyState;
}

connection.on('connected', () => {
  console.log('mongoose is connected');
});
connection.on('error', () => {
  console.log('mongoose connection error');
});

export default connectDB;
