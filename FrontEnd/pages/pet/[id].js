import axios from 'axios';
import Head from 'next/head';
import React from 'react';
import PetContent from '../../components/PetDetail/PetContent';
import { loadAllDog } from '../../Helper/access';

export async function getStaticPaths() {
  const data = await loadAllDog();
  return {
    paths: data.dogs.map((dog) => ({
      params: { id: dog?.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(
    `https://635a58ac6f97ae73a62a1943.mockapi.io/api/v1/dogs/${params.id}`
  );

  return {
    props: {
      dog: await res.data,
    },
    // revalidate: 30,
  };
}

const Pet = ({ dog = {} }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PetContent dog={dog} />
      </main>
    </div>
  );
};

export default Pet;
