import Link from "next/link";

export default function InfoLayout({ children }) {
  return (
    <section className="md:flex gap-[20px] flex-wrap items-start justify-center">
      <div className="flex-[2]">
        <ul className="flex md:flex-col gap-[15px] underline text-base mb-[20px]">
            <Link href={"/info/privacy-policy"}>
                <li>Privacy Policy</li>
            </Link>
            <Link href={"/info/terms-of-service"}>
                <li>Terms of service</li>
            </Link>
            <Link href={"/info/refund"}>
                <li>Refund Policy</li>
            </Link>
            <Link href={"/info/contact-us"}>
                <li>Contact Us</li>
            </Link>
        </ul>
      </div>
      <div className="flex-[10] mb-[150px]">{children}</div>
    </section>
  );
}
