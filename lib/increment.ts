import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import prisma from './prisma';
export async function increment(post: string) {
    noStore();
    return prisma.views.upsert({
        where: {
            post
        },
        update: {
            count: {
                increment: 1
            }
        },
        create: {
            post,
            count: 1
        }
    });
  }