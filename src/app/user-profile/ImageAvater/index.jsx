import Image from "next/image"

export default function ImageAvater() {
  return (
    <div className="h-150px w-150px round overflow-hidden position-relative">
      <Image src='/images/sample-profile-photo.jpg' fill objectFit="cover"/>
    </div>
  )
}
