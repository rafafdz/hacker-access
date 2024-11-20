import AuthButton from '@/components/AuthButton'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <h1 className="text-3xl">Platanus</h1>
        <h1 className="text-3xl">Hack</h1>
      </div>
      <AuthButton />
    </div>
  )
}
