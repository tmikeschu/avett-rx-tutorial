import styles from "../styles/Home.module.css";

import * as React from "react";
import { NextPage } from "next";
import Head from "next/head";

import { useGetTagsQuery } from "api";

const Home: NextPage = () => {
  const { data, loading } = useGetTagsQuery();
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
