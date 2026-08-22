'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;

  if (name && email && message) {
    // 1. Sauvegarder dans la base de données
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, message }
    });

    // 2. Envoyer l'email de notification si configuré
    if (process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"Site web Mosayane" <${process.env.GMAIL_EMAIL}>`,
          to: 'mosayaneofficiel@gmail.com',
          replyTo: email,
          subject: `NOUVEAU MESSAGE: ${name} via le site web`,
          text: `Vous avez reçu un nouveau message depuis le site mosayanemusic.com :\n\nNom : ${name}\nEmail : ${email}\nTéléphone : ${phone || 'Non renseigné'}\n\nMessage :\n${message}`,
        });
      } catch (error) {
        console.error("Erreur d'envoi d'email Nodemailer :", error);
      }
    }

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
