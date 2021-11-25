export interface PageRoute {
  path: string;
  element?: () => JSX.Element;
  isProtected?: boolean; // default is false,
  redirect?: string;
  children?: PageRoute[];
}
