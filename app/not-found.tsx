import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white text-center px-4">
      <h2 className="text-6xl font-black text-blue-600 mb-4">404</h2>
      <p className="text-2xl font-bold mb-2">Page Not Found</p>
      <p className="text-slate-400 mb-8">
        요청하신 페이지를 찾을 수 없습니다.<br/>
        주소를 다시 확인해주세요.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-500 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}