import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/logo.svg"
      alt="Logo"
      width={300}
      height={145}
      priority
    />
  );
}
