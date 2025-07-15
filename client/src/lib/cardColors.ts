// Color palette for tool cards - solid colors with good contrast
export const cardColors = [
  'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500',
  'bg-orange-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500',
  'bg-violet-500', 'bg-sky-500', 'bg-lime-500', 'bg-fuchsia-500',
  'bg-yellow-500', 'bg-slate-500', 'bg-gray-500', 'bg-zinc-500'
];

export const cardColorsLight = [
  'bg-blue-100', 'bg-purple-100', 'bg-green-100', 'bg-red-100',
  'bg-orange-100', 'bg-pink-100', 'bg-indigo-100', 'bg-teal-100',
  'bg-cyan-100', 'bg-emerald-100', 'bg-amber-100', 'bg-rose-100',
  'bg-violet-100', 'bg-sky-100', 'bg-lime-100', 'bg-fuchsia-100',
  'bg-yellow-100', 'bg-slate-100', 'bg-gray-100', 'bg-zinc-100'
];

export const iconColors = [
  'text-blue-600', 'text-purple-600', 'text-green-600', 'text-red-600',
  'text-orange-600', 'text-pink-600', 'text-indigo-600', 'text-teal-600',
  'text-cyan-600', 'text-emerald-600', 'text-amber-600', 'text-rose-600',
  'text-violet-600', 'text-sky-600', 'text-lime-600', 'text-fuchsia-600',
  'text-yellow-600', 'text-slate-600', 'text-gray-600', 'text-zinc-600'
];

export const darkCardColors = [
  'dark:bg-blue-800', 'dark:bg-purple-800', 'dark:bg-green-800', 'dark:bg-red-800',
  'dark:bg-orange-800', 'dark:bg-pink-800', 'dark:bg-indigo-800', 'dark:bg-teal-800',
  'dark:bg-cyan-800', 'dark:bg-emerald-800', 'dark:bg-amber-800', 'dark:bg-rose-800',
  'dark:bg-violet-800', 'dark:bg-sky-800', 'dark:bg-lime-800', 'dark:bg-fuchsia-800',
  'dark:bg-yellow-800', 'dark:bg-slate-800', 'dark:bg-gray-800', 'dark:bg-zinc-800'
];

export const darkIconColors = [
  'dark:text-blue-300', 'dark:text-purple-300', 'dark:text-green-300', 'dark:text-red-300',
  'dark:text-orange-300', 'dark:text-pink-300', 'dark:text-indigo-300', 'dark:text-teal-300',
  'dark:text-cyan-300', 'dark:text-emerald-300', 'dark:text-amber-300', 'dark:text-rose-300',
  'dark:text-violet-300', 'dark:text-sky-300', 'dark:text-lime-300', 'dark:text-fuchsia-300',
  'dark:text-yellow-300', 'dark:text-slate-300', 'dark:text-gray-300', 'dark:text-zinc-300'
];

export const getCardColor = (index: number) => {
  const colorIndex = index % cardColors.length;
  return {
    bg: cardColors[colorIndex],
    bgLight: cardColorsLight[colorIndex],
    icon: iconColors[colorIndex],
    darkBg: darkCardColors[colorIndex],
    darkIcon: darkIconColors[colorIndex]
  };
};

export const getCardStyles = (index: number) => {
  const colors = getCardColor(index);
  return {
    cardBg: `${colors.bg}`,
    iconBg: `${colors.bg}`,
    iconColor: 'text-black',
    textColor: 'text-black'
  };
};