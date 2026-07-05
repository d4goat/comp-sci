import { useTranslations } from 'next-intl';
import { listItem, NAV_ITEMS, type listItemType } from '@/data';

export function useTranslatedData() {
  const tDest = useTranslations('Destinations');
  const tCat = useTranslations('Categories');
  const tLabel = useTranslations('Labels');
  const tNav = useTranslations('Navigation');

  const translatedDestinations: listItemType[] = listItem.map((item) => {
    // Translate HTM labels
    const translatedHtm = item.htm.map(ticket => {
      const rawLabel = ticket.label.replace(/\s+/g, '');
      const camelLabel = rawLabel.charAt(0).toLowerCase() + rawLabel.slice(1);
      // fallback to original label if not found in dictionary
      let translatedLabel = ticket.label;
      try {
        translatedLabel = tLabel(camelLabel) || ticket.label;
      } catch (e) {}

      return {
        ...ticket,
        label: translatedLabel
      };
    });

    // Translate visit tips
    let translatedTips = item.visitTips;
    try {
      const tipsKey = `Destinations.${item.slug}.visitTips`;
      // next-intl raw fetch for arrays
      const rawTips = tDest.raw(`${item.slug}.visitTips`);
      if (Array.isArray(rawTips)) {
        translatedTips = rawTips;
      }
    } catch (e) {}

    return {
      ...item,
      title: tDest(`${item.slug}.title`),
      description: tDest(`${item.slug}.description`),
      additionalDesc: tDest(`${item.slug}.additionalDesc`),
      notes: tDest(`${item.slug}.notes`),
      visitTips: translatedTips,
      category: item.category,
      htm: translatedHtm
    };
  });

  const translatedNavItems = NAV_ITEMS.map((nav) => {
    const camelLabel = nav.label.replace(/\s+/g, '');
    const jsonKey = camelLabel.charAt(0).toLowerCase() + camelLabel.slice(1);
    let label = nav.label;
    try {
      label = tNav(jsonKey) || nav.label;
    } catch (e) {}

    return {
      ...nav,
      label
    };
  });

  return {
    listItem: translatedDestinations,
    NAV_ITEMS: translatedNavItems
  };
}
