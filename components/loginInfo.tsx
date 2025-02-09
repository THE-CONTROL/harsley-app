interface LoginInfoProps {
 smallText: string
}

export default function LoginInfo({
 smallText
}: LoginInfoProps) {

 return (
    <div className="w-full flex text-gray-800 flex-col justify-center">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-[2.5rem] leading-tight md:leading-[3rem] text-black-1 font-semibold pb-1 sm:pb-2">
        Making commerce as simple as a chat
        </h2>
        <p className="pb-6 sm:pb-8 md:pb-12 text-xs sm:text-sm text-gray-600">
        {smallText}
        </p>
    </div>
 )
}