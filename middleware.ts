// You can use a Next.js Middleware with NextAuth.js to protect your site.

import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    }
});

export const config = {
    matcher:[
        "/users/:path*"
    ]
};