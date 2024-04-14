export const e2p = (s: string) =>
  // @ts-ignore
  s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
