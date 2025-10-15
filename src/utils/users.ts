import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import bcryptjs from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string) => {
  return db.select().from(users).where(eq(users.email, email));
};

export const createUser = async (userData: {
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  password: string;
}) => {
  const { name, email, password, role } = userData;

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const result = await db
      .insert(users) // asegúrate que `users` no sea `user`
      .values({
        name,
        email,
        role,
        password: hashedPassword,
      })
      .returning();

    return result;
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    console.error('💥 Mensaje:', (error as any).message);
    throw error;
  }
};

const updateUserPassword = async (userId: string, newPassword: string) => {
  const hashedPassword = await bcryptjs.hash(newPassword, 10);
  return db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, userId));
};
export const updateUser = async (
  userId: string,
  userData: Partial<{
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    password: string;
  }>,
) => {
  if (userData.password) {
    await updateUserPassword(userId, userData.password);
  }
  return db.update(users).set(userData).where(eq(users.id, userId));
};
