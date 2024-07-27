import axios from 'axios';

async function signUp(formData: FormData) {
    'use server'

    console.log(formData);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(email);
    console.log(password);

    if (!email || !password) {
        return { error: 'Please fill out all fields.' };
    }

    const fullData = {
        email,
        password
    }

    try {
        axios.post('/api/signUp', fullData).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.error('Error (axios.post):', error);
        });

        // fetch('/api/signUp', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(fullData)
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         console.error('Error (fetch):', error);
        //     });

        // return { success: true, message: "user created", data: fullData };
        // // console.log(response.data);
        // // return { success: true, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error (axios) :', error);
            return { error: error.message || 'An error occurred during sign up.' };
        }
        console.error('Error (not axios) :', error);
        return { error: 'An error occurred during sign up.' };
    }
}

export default function SignUp() {
    return (
        <form className="flex flex-col justify-center items-center gap-2" action={signUp}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    className="bg-slate-800"
                    id="email"
                    name="email"
                    type="email"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    className="bg-slate-800"
                    id="password"
                    name="password"
                    type="password"
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}