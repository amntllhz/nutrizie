
export default function EmptyState({ label, message, icon }) {
    return (
        <>
            <div className='flex flex-col items-center justify-center py-8 space-y-2'>
                <div className="w-fit">
                    <img src={icon} alt="" className='w-20 h-20' />
                </div>
                <div className='flex flex-col space-y-0.5'>
                    <div className="px-5 font-semibold text-center text-xs text-gray-800">{label}</div>
                    <p className='text-[11px] text-gray-400 text-center'>{message}</p>
                </div>
            </div>
        </>
    );
}