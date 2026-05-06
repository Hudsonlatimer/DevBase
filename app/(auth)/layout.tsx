export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-svh items-center justify-center bg-[#050505] text-white px-4 overflow-hidden">
      {/* Background depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 blur-[140px] rounded-full opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150 pointer-events-none" />
      
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </main>
  );
}
