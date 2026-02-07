export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      {children}
    </div>
  );
}
