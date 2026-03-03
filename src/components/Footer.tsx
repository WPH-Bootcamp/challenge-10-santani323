export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8 py-4 w-full text-center text-gray-500 text-sm">
      <div className="container mx-auto px-4">
        &copy; {new Date().getFullYear()} Web Programming Hack Blog All rights reserved.
      </div>
    </footer>
  );
}
