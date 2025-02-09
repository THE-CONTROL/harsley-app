interface SubmitButtonProps {
 label: string;
 isSubmitting: boolean;
 isValid: boolean;
}

export default function SubmitButton({
 label,
 isSubmitting,
 isValid
}: SubmitButtonProps) {
 return (
   <div className="mt-6 sm:mt-9 mb-2">
        <button 
        type="submit" 
        disabled={isSubmitting || !isValid}
        className={`w-full text-xs sm:text-sm font-medium rounded-lg px-4 sm:px-6 py-2.5 sm:py-3.5 text-white ${
            !isValid ? "bg-gray-400 hover:bg-gray-300" : "bg-blue-400 hover:bg-blue-300"
        }`}
        >
        {label}
        {isSubmitting && (
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="inline ml-2 sm:ml-2.5 h-4 sm:h-5 w-4 sm:w-5 stroke-white">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
            </svg>
        )}
        </button>
    </div>
 );
}