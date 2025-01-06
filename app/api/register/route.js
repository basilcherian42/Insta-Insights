import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import bcrypt from 'bcrypt';

dbConnect();

export async function POST(request) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        const errorMessage = { message: 'Please fill in all fields to register' };
        return new Response(JSON.stringify(errorMessage), {
            status: 400,
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const errorMessage = { message: 'This Email already has an account, try logging in' };
        return new Response(JSON.stringify(errorMessage), {
            status: 400,
        });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Data ', name, '   ', email, '   ', password, '   ', hashedPassword);

    // If user is created successfully, return a success message
    const newUser = await User.create({ name, email, password: hashedPassword });
    const responseData = JSON.stringify(newUser);

    console.log('New user: ', newUser);
    return new Response(responseData, {
        status: 200,
    });
}
