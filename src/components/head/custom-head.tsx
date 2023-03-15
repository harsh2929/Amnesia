import Head from 'next/head';

type HeadProps = {
  title: string;
};
export const CustomHead = ({title}: HeadProps) => {
  title = `amnesia | ${title.toLowerCase()}`;
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};
