import { clubInfo } from "../data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
      <p>
        © {new Date().getFullYear()} {clubInfo.name}. All Rights Reserved.
      </p>
    </footer>
  );
}
