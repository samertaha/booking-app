import { formatISO } from "date-fns"
import { NextPage } from "next"
import Head from "next/head"
import CalendarComponent from '@/components/Calendar'
import { prisma } from "@/server/db/client"

interface HomeProps {
  days: Day[]
  closedDays: string[] // as ISO string
}

const Home: NextPage<HomeProps> = ({ days, closedDays }) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CalendarComponent days={days} closedDays={closedDays} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const days = await prisma?.day.findMany()
  const closedDays = (await prisma?.closedDay.findMany())?.map((d) => formatISO(d.date)
  )
  console.log("days:", days)
  return {
    props: {
      days,
      closedDays,
    },
  }
}

export default Home
