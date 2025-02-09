import Link from "next/link";

export default function Footer() {
 return (
   <div className="flex py-2 sm:py-3 bg-white justify-between pb-4 sm:pb-5 md:pb-7 mt-auto sticky bottom-0 text-[10px] sm:text-xs text-gray-700">
      <div className="space-x-1">
         <Link className="underline" href="https://myvendy.com/terms-and-conditions" target="_blank" rel="noreferrer">Terms</Link>
         <span>&amp;</span>
         <Link className="underline" href="https://myvendy.com/privacy-policy" target="_blank" rel="noreferrer">Privacy</Link>
      </div>
      <div>
         <span className="pr-6 sm:pr-9 cursor-pointer -mr-2 sm:-mr-4">Eng</span>
      </div>
   </div>
 )
}