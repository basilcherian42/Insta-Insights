/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_HOSTNAME: "http://localhost:3000/api/",
        MONGODB_URI: 'mongodb+srv://vkoct2002:ElYHKghxtobcFt96@cluster0.mnbtsxd.mongodb.net/instanextdb',
        NEXTAUTH_SECRET: 'InstaNextApp',
        NEXTAUTH_URL: "http://localhost:3000",
        SECRET: "dglkglkj",
        GOOGLE_ID: '954824129822-a59fkktiakscl320oj9vtm10gq503s6u.apps.googleusercontent.com',
        GOOGLE_SECRET: #enter google secret,
        GITHUB_ID: '7b171a9363c7dfb99de2',
        GITHUB_SECRET: #eneter github secret'


    },
};

export default nextConfig;
