import { signIn } from "@/auth"

export default async function SignIn() {
    return (
        <form className="flex flex-col justify-center items-center gap-2"
            action={async (formData) => {
                "use server"
                await signIn("Credentials", { formData, redirect: false } )
            }}
        >
            <label>
                Email
                <input className="bg-slate-800" name="email" type="email" />
            </label>
            <label>
                Password
                <input className="bg-slate-800" name="password" type="password" />
            </label>
            <button>Sign In</button>
        </form>
    )
}