export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border rounded-xl m-2 ml-0 pl-2 pb-4 w-fit">{children}</div>
  );
}
