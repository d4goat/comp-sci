import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Read the locale from the NEXT_LOCALE cookie, defaulting to 'id' (Bahasa Indonesia)
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'id';

  return {
    locale,
    // Dynamically import the corresponding messages dictionary
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
