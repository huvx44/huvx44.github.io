export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
