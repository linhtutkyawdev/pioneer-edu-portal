<div align="center">
  
  <br />

  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">Pioneer Education Portal</h3>
</div>

## <a name="introduction">🤖 Introduction</a>

Built with the latest Next.js and TypeScript, this project replicates Zoom, a widely used video conferencing tool and convert it to an internal lecture streaming platform. It enables users (students, teachers and admins) to securely log in, create classes and access live lectures according to the schedule and also have all the  streaming functionalities such as recording, screen sharing, and managing participants.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Clerk
- getstream
- shadcn
- Tailwind CSS


**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)


**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=

POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

Replace the placeholder values with your actual Clerk & getstream credentials. You can obtain these credentials by signing up on the [Clerk website](https://clerk.com/), [getstream website](https://getstream.io/), [vercel postgres website](https://vercel.com/docs/storage/vercel-postgres)

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Secreenshots
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-1.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-2.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-3.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-4.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-5.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-6.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-7.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-8.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-9.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-10.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-11.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-12.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-13.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-14.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-15.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-16.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-17.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-18.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-19.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-20.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-21.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-22.png)
![](https://github.com/linhtutkyawdev/pioneer-edu-portal/blob/main/screenshots/s-23.png)

## <a name="tutorial">🚀 Refrence Tutorial</a>

  <br />
    <a href="https://youtu.be/R8CIO1DZ2b8" target="_blank">
      <img src="https://github.com/adrianhajdin/zoom-clone/assets/67959015/f09a8421-67d3-45ce-b9bc-a791cdc2774b" alt="Project Banner">
    </a>

