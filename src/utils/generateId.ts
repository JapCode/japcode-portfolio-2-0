import { randomUUID } from 'crypto';

function generateUniqueID(): string {
  return randomUUID();
}
export default generateUniqueID;
