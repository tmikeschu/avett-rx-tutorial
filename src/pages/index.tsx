import styles from "../styles/Home.module.css";

import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { data, loading } = useQuery<{
    allTags: { data: Array<{ name: string }> };
  }>(
    gql`
      query GetTags {
        allTags {
          data {
            name
          }
        }
      }
    `
  );
  const tags = data && data.allTags ? data.allTags.data : [];

  return (
    <div className={styles.container}>
      <Head>
        <title>Avett Rx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Avett Rx</h1>

        {loading ? (
          <span>Loading...</span>
        ) : (
          tags.map((tag) => <div key={tag.name}>{tag.name}</div>)
        )}
      </main>
    </div>
  );
};

export default Home;
