
export default function Button({children, handleOnClick}) {
    return (
        <button
            className='w-4/5 h-12 p-2 flex justify-center items-center bg-yellow-500 rounded text-black font-bold'
            type="submit"
            onClick={handleOnClick}
        >
            {children}
        </button>
    )
}
