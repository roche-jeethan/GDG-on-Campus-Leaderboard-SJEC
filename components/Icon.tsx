import Image from "next/image";

export default function GDGlogo() {
  return (
    <>
      <Image
        src={"/GDG-Sticker-Brackets.gif"}
        alt={"GDG logo"}
        width={69}
        height={69}
        unoptimized
      />
    </>
  );
}
