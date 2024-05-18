export default function Footer() {
  return (
    <footer className="h-14 bg-secondary px-3">
      <div className="flex justify-between items-center h-full w-full">
        <strong>{new Date().getFullYear()} ©</strong>

        <strong>© Petz</strong>
      </div>
    </footer>
  );
}
