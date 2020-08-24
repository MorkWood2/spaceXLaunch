import * as log from "https://deno.land/std@0.66.0/log/mod.ts";
//defined interface
interface Launch {
  flightNumber: number;
  mission: string;
}
//              pass in  a number and mapping it to launch
const launches = new Map<number, Launch>();

async function downLoadLaunchData() {
  log.info("Downloading launch data...");
  const response = await fetch(
    "https://api.spacexdata.com/v4/launches/latest",
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    log.warning("Problem downloading launch data ");
    throw new Error("Launch data download failed.");
  }
  const launchData = await response.json();
  for (const launch of launchData) {
    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
    };

    launches.set(flightData.flightNumber, flightData);

    log.info(JSON.stringify(flightData));
  }
}

downLoadLaunchData();
