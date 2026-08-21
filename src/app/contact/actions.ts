'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;

  if (name && email && message) {
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, message }
    });
    revalidatePath('/admin/contact');
    revalidatePath('/admin');
    return { success: true };
  }
  return { success: false };
}

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get('email') as string;
  
  if (email) {
    try {
      await prisma.newsletterSubscriber.create({
        data: { email }
      });
      revalidatePath('/admin/newsletter');
      revalidatePath('/admin');
      return { success: true };
    } catch (error) {
      // Might fail if email already exists (@unique constraint)
      return { success: false, error: 'Email already exists' };
    }
  }
  return { success: false };
}
