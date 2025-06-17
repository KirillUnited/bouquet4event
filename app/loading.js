import { LoaderIcon } from 'lucide-react';

function Loading() {
  return (

    <div className='bg-background fixed inset-0 flex items-center justify-center z-50'>
      <LoaderIcon className="w-10 h-10 animate-spin" />
    </div>
  )
}

export default Loading;