import Image from "next/image"
import AuthForm from './components/AuthForm'
export default function Home() {
    return (
     <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* We will actually add the logo for the app. */}
            <Image
            alt="Logo" height='48' width='48' 
            className="mx-auto w-auto"
            src='/images/logo.png' />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-800">
                Sign in into your Account.
            </h2>
      </div>
      {/* We are goin to put the Authorization form here. */}
      <AuthForm />
     </div>
    )
  }
  