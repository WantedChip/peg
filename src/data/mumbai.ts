export interface AreaTag {
  name: string;
  isLater?: boolean;
}

export const MUMBAI_AREAS: AreaTag[] = [
  { name: 'Thane' },
  { name: 'Mulund' },
  { name: 'Bhandup' },
  { name: 'Ghatkopar' },
  { name: 'Kurla' },
  { name: 'Vidyavihar' },
  { name: 'Bandra' },
  { name: 'BKC' },
  { name: 'Andheri' },
  { name: 'Sakinaka' },
  { name: 'Versova' },
  { name: 'DN Nagar' },
  { name: 'Powai' },
  { name: 'Lower Parel' },
  { name: 'Worli' },
  { name: 'Colaba' },
  { name: 'All of Mumbai · later', isLater: true },
  { name: 'Pune · maybe later', isLater: true },
  { name: 'Bengaluru · maybe later', isLater: true },
];
