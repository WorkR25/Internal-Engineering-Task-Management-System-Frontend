import { redirect } from 'next/navigation';

export default function RootPage() {
  // Automatically redirect anyone visiting '/' to the sign-in page
  redirect('/auth/signin');
}  


