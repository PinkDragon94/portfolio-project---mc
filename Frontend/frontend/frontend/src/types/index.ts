export interface User {
  id: string;
  username: string;
  email: string;
  userType: 'alumni' | 'vendor';
  cohort?: string;
  program?: string;
  company?: string;
  expertiseTitle: string;
  profilePicture?: string;
  bio?: string;
}

export interface Device {
  name: string;
  icon: string;
}

export interface Browser {
  name: string;
  icon: string;
  minVersion?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
