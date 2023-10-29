import HomeComponent from "./Home";
import Image from "next/image";
import styles from "./page.module.css";

const url = "https://api.sandbox.ebay.com/identity/v1/oauth2/token";
const secrets = {
  client_id: "CarynLig-cardvalu-SBX-2fcce2f20-8268e5c9",
  client_secret: "SBX-fcce2f20ae64-9636-430b-9790-ebb5",
  dev_id: "f86fda8f-5835-4cae-bc9f-1688a562a8c8",
};

// export const getServerSideProps = async () => {
//   const getAuthToken = async () => {
//     console.log("get");
//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         authorization: `Basic ${secrets.client_id}:${secrets.client_secret}`,
//       },
//       body: JSON.stringify({
//         grant_type: "client_credentials",
//         scope: "https://api.ebay.com/oauth/api_scope",
//       }),
//     });
//     const token = await res.json();
//     return token;
//   };

//   getAuthToken();
// };

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeComponent />
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
