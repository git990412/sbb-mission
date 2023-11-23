export default function timestamp(date: Date): string {
  function pad(n: number) {
    return n < 10 ? "0" + n : n;
  }

  const d = date;
  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes())
  );
}
