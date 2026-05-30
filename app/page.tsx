import fs from 'fs'
import {eventsList, Eventz} from "@/initial_dashboard"

export default function Home() {
  const listz = new eventsList();
  const inputz: { [key: string]: Eventz } = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  for (let index = 0; index < Object.keys(inputz).length; index++) {
    listz.addEvent(new Eventz(inputz[Object.keys(inputz)[index]].creatorAccount, inputz[Object.keys(inputz)[index]].origin, inputz[Object.keys(inputz)[index]].destination, inputz[Object.keys(inputz)[index]].timeOfEvent));
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Event Dashboard (sorry if this is simple but I wrote everything by hand and had to learn TypeScript)
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Number of Events: ".concat(listz.numberOfEvents().toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Number of Users: ".concat(listz.numberOfUsers().toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Number created on or after 5/30/26 UTC: ".concat(listz.numberCreatedOnOrAfter(new Date('2026-05-30T00:00:00.0000Z')).toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Number created between 5/30/26 UTC and 6/1/26 UTC: ".concat(listz.numberCreatedInDateRange(new Date('2026-05-30T00:00:00.0000Z'), new Date('2026-06-01T00:00:00.0000Z')).toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Time Now: ".concat((new Date).toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Number of rides on or after 6/15/26 UTC: ".concat(listz.numberScheduledOnOrAfter(new Date('2026-06-15T00:00:00.0000Z')).toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Number of rides between 6/1/26 UTC and 7/1/26 UTC: ".concat(listz.numberCreatedInDateRange((new Date('2026-06-01T00:00:00.0000Z')), (new Date('2026-07-01T00:00:00.0000Z'))).toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Number from New York: ".concat(listz.numberFromCity("new york, ny, united states").toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Number to Ithaca: ".concat(listz.numberToCity("ithaca, ny, united states").toString())}
          </p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {"Average Distance (distance is not implemented because I didn't want to have to create an API key just for this so this should return 0): ".concat(listz.averageDistance().toString())}
          </p>
        </div>
      </main>
    </div>
  );
}
