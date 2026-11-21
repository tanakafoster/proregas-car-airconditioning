// Guide articles at /guides/<slug>/. Every fact taken from elsewhere is cited with [^source-id], and each guide lists
// its sources. Inline formatting in text: **bold**, [link text](/path/) for links to our own pages, [^id] or [^id,id]
// for numbered source links. Sources are numbered in the order the text first cites them.
// Keep business claims to what the owner has confirmed (see lib/site.ts).

export type Source = { id: string; label: string; url: string }

export type Block =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "note"; title: string; text: string }

export type Guide = {
  slug: string
  // Short name for lists and breadcrumbs.
  label: string
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string
  published: string // YYYY-MM-DD
  sections: { heading: string; blocks: Block[] }[]
  faqs: { q: string; a: string }[]
  related: { href: string; label: string }[]
  cta: { title: string; text: string; message: string }
  sources: Source[]
}

const src = {
  fuelHot: {
    id: "fuel-hot",
    label: "FuelEconomy.gov (US Department of Energy and EPA): Fuel economy in hot weather",
    url: "https://www.fueleconomy.gov/feg/hotweather.shtml",
  },
  consumerReports: {
    id: "cr",
    label: "Consumer Reports: Fuel economy face-off, driving with windows open or AC running (2017)",
    url: "https://www.consumerreports.org/fuel-economy-efficiency/fuel-economy-face-off-driving-with-windows-open-or-ac-running/",
  },
  ornl: {
    id: "ornl",
    label: "Oak Ridge National Laboratory: Effects of air conditioner use on real-world fuel economy (SAE paper 2013-01-0551, 2013)",
    url: "https://www.ornl.gov/publications/effects-of-air-conditioner-use-on-real-world-fuel-economy/",
  },
  racWinter: {
    id: "rac-winter",
    label: "RAC: Should you use your air-con in the winter? Air-con myths busted (2026)",
    url: "https://www.rac.co.uk/drive/advice/car-maintenance/air-con-myths-busted",
  },
  asu: {
    id: "asu",
    label: "Arizona State University: Hot cars can hit deadly temperatures in as little as one hour (2018)",
    url: "https://news.asu.edu/20180516-discoveries-asu-study-hot-cars-can-hit-deadly-temperatures-within-one-hour",
  },
  nhtsa: {
    id: "nhtsa",
    label: "NHTSA and National Safety Council: Learn how to prevent pediatric vehicular heatstroke deaths (2019)",
    url: "https://www.nhtsa.gov/press-releases/nhtsa-and-nsc-learn-how-prevent-pediatric-vehicular-heatstroke-deaths",
  },
  nsc: {
    id: "nsc",
    label: "National Safety Council: Kids in hot cars, one child is too many",
    url: "https://www.nsc.org/safety-first/kids-in-hot-cars-one-child-is-too-many",
  },
  sae: {
    id: "sae-recirc",
    label: "Grady, Jung and others: Vehicle cabin air quality with fractional air recirculation (SAE paper 2013-01-1494)",
    url: "https://intra.engr.ucr.edu/~heejung/publications/2013-CO2-exp.pdf",
  },
  niosh: {
    id: "niosh",
    label: "Grady and others (NIOSH): Reducing CO2 and particulate exposures via fractional recirculation of vehicle cabin air (Atmospheric Environment, 2017)",
    url: "https://stacks.cdc.gov/view/cdc/228417",
  },
  kia: {
    id: "kia",
    label: "Kia owner's manual: Controlling air intake",
    url: "https://ownersmanual.kia.com/full_webhelp/CV1/2024/en_US/topics/t00319.html",
  },
  whatCar: {
    id: "whatcar",
    label: "What Car?: Run your air-conditioning once a week (2008)",
    url: "https://www.whatcar.com/news/run-your-air-conditioning-once-a-week/n3986",
  },
  aaNz: {
    id: "aa-nz",
    label: "AA New Zealand, Ask an expert: air conditioning left unused (2009)",
    url: "https://aa.co.nz/cars/ask-an-expert/faults-reliability-service-and-repair/show/458",
  },
  hella: {
    id: "hella",
    label: "HELLA Tech World: Car air-conditioning",
    url: "https://www.hella.com/techworld/uk/technical/car-air-conditioning/car-air-conditioning/",
  },
  delphi: {
    id: "delphi",
    label: "Delphi: What you need to know about air-con regassing",
    url: "https://www.delphiautoparts.com/resource-center/article/what-you-need-to-know-about-air-con-regassing",
  },
  mahle: {
    id: "mahle",
    label: "MAHLE: So cool and so fresh...? (2022)",
    url: "https://workshop-heroes.mahle.com/en/article/so-cool-and-so-fresh",
  },
  greenFlag: {
    id: "green-flag",
    label: "Green Flag: When to use a car's air-conditioning in the winter (2015)",
    url: "https://www.greenflag.com/category/motoring-news-and-advice/chill-not-chill-use-cars-air-conditioning-winter",
  },
  parkers: {
    id: "parkers",
    label: "Parkers: How to buy a used car with air conditioning (2021)",
    url: "https://parkers.co.uk/used-cars/how-to-buy-a-used-car-with-air-conditioning",
  },
  racUsed: {
    id: "rac-used",
    label: "RAC: Buying a used car, the ultimate checklist (2025)",
    url: "https://www.rac.co.uk/drive/advice/buying-and-selling-guides/buying-a-used-car/",
  },
  chronicle: {
    id: "chronicle",
    label: "The Chronicle: Vehicle imports decline (ZIMRA figures for January to March 2015)",
    url: "https://www.chronicle.co.zw/vehicle-imports-decline/",
  },
} satisfies Record<string, Source>

export const guides: Guide[] = [
  {
    slug: "does-car-aircon-use-more-fuel",
    label: "Does aircon use more fuel?",
    h1: "Does car aircon use more fuel? Aircon vs windows down",
    metaTitle: "Does car aircon use more fuel? Aircon vs windows down",
    metaDescription:
      "How much fuel your car's aircon really uses, when opening the windows is cheaper, and simple ways to stay cool for less. With test results from US researchers.",
    intro:
      "Yes, running the aircon uses some extra fuel. How much depends on the weather, your car and how you drive, and at higher speeds opening the windows isn't always the cheaper choice.",
    published: "2026-11-21",
    sections: [
      {
        heading: "Why the aircon uses fuel",
        blocks: [
          {
            type: "p",
            text: "In most petrol and diesel cars the aircon compressor is driven by the engine's belt, so when the aircon is working the engine has to do a little more work and burns a little more fuel. The US government's fuel economy site calls the aircon the main reason cars use more fuel in hot weather.[^fuel-hot]",
          },
          {
            type: "p",
            text: "How much more depends on the outside temperature, the humidity and how strong the sun is.[^fuel-hot] The hotter and stickier the day, the harder the aircon has to work.",
          },
        ],
      },
      {
        heading: "How much extra fuel?",
        blocks: [
          {
            type: "ul",
            items: [
              "In very hot conditions, the aircon can cut a petrol or diesel car's fuel economy by **more than 25%**, mostly on short trips.[^fuel-hot]",
              "Consumer Reports tested cars on a 29°C (85°F) day and found the aircon cost **1 to 4 miles per US gallon**, about 0.4 to 1.7 km per litre, depending on the car.[^cr]",
              "For hybrids and electric cars the effect is bigger in percentage terms.[^fuel-hot]",
            ],
          },
          {
            type: "p",
            text: "On short trips the aircon works hardest at the start, while it pulls the heat out of a car that has been standing in the sun. That's why the percentage is highest on short journeys.",
          },
        ],
      },
      {
        heading: "Aircon or windows down?",
        blocks: [
          {
            type: "p",
            text: "Open windows make the car less streamlined, so the engine has to push harder against the air. That drag is small at low speeds but grows as you go faster.[^fuel-hot]",
          },
          {
            type: "p",
            text: "Researchers at Oak Ridge National Laboratory tested a 2009 Toyota Corolla and a 2009 Ford Explorer. At steady speeds of about 64 to 113 km/h, both used more fuel with the aircon on full than with the windows down. For the Corolla, windows down used as much fuel as the aircon at about 121 km/h, and more at about 129 km/h.[^ornl] Consumer Reports found that opening the windows at about 105 km/h made no measurable difference to fuel use in its tests.[^cr]",
          },
          {
            type: "table",
            caption: "Which is cheaper on fuel",
            head: ["Driving", "Cheaper choice"],
            rows: [
              ["Town driving and slow traffic", "Windows down, if it's comfortable"],
              ["Open road and highway speeds", "Aircon with the windows closed"],
            ],
          },
          {
            type: "p",
            text: "That rule of thumb is the advice given by the US fuel economy site: roll the windows down at lower speeds and use the aircon at highway speeds.[^fuel-hot] The RAC also says it's generally not a good idea to drive for long with the windows open and the aircon on at the same time.[^rac-winter]",
          },
        ],
      },
      {
        heading: "Seven ways to use less fuel and stay cool",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Park in the shade", text: "Or use a sunshade, so the car doesn't get as hot in the first place.[^fuel-hot]" },
              { title: "Let the hot air out first", text: "Drive with the windows open for a short time before switching the aircon on. Letting the hottest air out puts less load on the aircon and helps the car cool faster.[^fuel-hot]" },
              { title: "Don't idle to cool the car", text: "Switch the aircon on once you start driving. Most aircon systems cool the car faster while you drive.[^fuel-hot]" },
              { title: "Don't set it colder than you need", text: "Running the aircon harder or longer than needed wastes fuel.[^fuel-hot]" },
              { title: "Close the windows once the aircon is on", text: "Otherwise you're cooling hot outside air as it blows in.[^rac-winter]" },
              { title: "Use recirculation for a few minutes", text: "Cooling the air already in the car takes less energy than cooling hot air from outside. See our guide [Recirculation or fresh air?](/guides/recirculation-vs-fresh-air/)." },
              { title: "Keep the aircon healthy", text: "An aircon that's low on gas, or with a condenser clogged with dirt, cools less well. See [how to look after your car aircon](/guides/car-aircon-maintenance-tips/)." },
            ],
          },
        ],
      },
      {
        heading: "Should you just leave it off?",
        blocks: [
          {
            type: "p",
            text: "Not completely. Consumer Reports points out that the aircon also dries the air in the car, which can help keep the driver alert, and calls the extra fuel a worthwhile trade-off.[^cr] And leaving the aircon unused for a long time can let its seals dry out and gas leak away.[^rac-winter]",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Does the aircon use fuel when the engine is idling?",
        a: "Yes, a little, because the engine still drives the compressor. But idling to cool a hot car is a slow way to do it. Most systems cool the car faster once you are driving.",
      },
      {
        q: "Does the fan use fuel if the aircon button is off?",
        a: "Far less. With the aircon button off the compressor isn't working, so the fan just blows outside air through the car. It won't cool the air below the outside temperature.",
      },
      {
        q: "My aircon runs all the time but the car stays warm. Am I wasting fuel?",
        a: "Probably. If the aircon is working hard but not cooling, something is wrong, such as low gas, a leak or a fan fault. Getting it fixed means it cools the car quickly and doesn't have to run flat out.",
      },
    ],
    related: [
      { href: "/services/car-aircon-regas/", label: "R134a aircon regas" },
      { href: "/services/aircon-check-ups/", label: "Aircon check-ups" },
      { href: "/guides/how-to-cool-down-a-hot-car/", label: "How to cool down a hot car fast" },
    ],
    cta: {
      title: "Aircon working hard but not cooling?",
      text: "Send us your car's make, model and year, and tell us what the aircon is doing. We come to you anywhere in Harare.",
      message: "Hi ProRegas, my aircon isn't cooling well. My car is a ",
    },
    sources: [src.fuelHot, src.consumerReports, src.ornl, src.racWinter],
  },

  {
    slug: "how-to-cool-down-a-hot-car",
    label: "Cool down a hot car fast",
    h1: "How to cool down a hot car fast",
    metaTitle: "How to cool down a hot car fast, and stay safe in the heat",
    metaDescription:
      "How hot a parked car really gets, the quickest way to cool it down, and why you should never leave a child or pet inside. Based on university and road safety research.",
    intro:
      "A car parked in the sun gets much hotter inside than the air outside. Here is how hot it gets, the quickest way to cool it down, and how to keep children and pets safe.",
    published: "2026-11-21",
    sections: [
      {
        heading: "How hot does a parked car get?",
        blocks: [
          {
            type: "p",
            text: "Researchers at Arizona State University parked cars outside on summer days in Tempe, Arizona, where it was over 38°C (100°F), and measured them over an hour, the length of a shopping trip.[^asu] On average they found:",
          },
          {
            type: "table",
            caption: "Average temperatures after one hour in a parked car",
            head: ["Part of the car", "In the sun", "In the shade"],
            rows: [
              ["Air inside the car", "47°C", "about 38°C"],
              ["Dashboard", "69°C", "48°C"],
              ["Steering wheel", "53°C", "42°C"],
              ["Seats", "51°C", "41°C"],
            ],
          },
          {
            type: "p",
            text: "Harare is usually not as hot as Arizona, but the effect is the same: the sun heats up the inside of a closed car fast. US road safety officials say a closed car can heat up by about 11°C (19°F) in just 10 minutes, and that leaving a window slightly open doesn't help.[^nhtsa]",
          },
        ],
      },
      {
        heading: "The quickest way to cool it down",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Open the windows or doors first", text: "Let the hottest air out for a minute before you switch the aircon on. That puts less load on the aircon and helps the car cool faster.[^fuel-hot]" },
              { title: "Start driving", text: "Switch the aircon on as you set off instead of idling in the car park. Most aircon systems cool the car faster while you drive.[^fuel-hot]" },
              { title: "Close the windows", text: "Once the air from the vents is cool, close the windows so the aircon isn't fighting hot air from outside." },
              { title: "Use recirculation for a few minutes", text: "Recirculation cools the air already in the car rather than hot air from outside, which takes less energy.[^sae-recirc] Switch back to fresh air once the car is comfortable, as carmakers advise using recirculation only for a while.[^kia]" },
              { title: "Mind the hot surfaces", text: "In the Arizona tests the steering wheel averaged 53°C and the seats 51°C after an hour in the sun.[^asu] Metal seatbelt buckles can burn too, so check them before you, or a child, sit down." },
            ],
          },
        ],
      },
      {
        heading: "Keep it from getting so hot",
        blocks: [
          {
            type: "ul",
            items: [
              "Park in the shade or use a windscreen sunshade.[^fuel-hot] In the Arizona tests, shade kept the dashboard about 21°C cooler after an hour.[^asu]",
              "Keep the car locked when it's parked, so children can't climb in on their own.[^nsc]",
            ],
          },
        ],
      },
      {
        heading: "Never leave a child or pet in the car",
        blocks: [
          {
            type: "note",
            title: "Not even for a minute",
            text: "Children's bodies heat up three to five times faster than an adult's.[^nhtsa] On a 32°C (90°F) day, a parked car can become deadly for a child within the first 10 minutes.[^nsc] Never leave a child in the car while you run an errand, even with a window open.[^nhtsa]",
          },
          {
            type: "p",
            text: "Safety groups suggest putting your bag, phone or even a shoe on the back seat, so you always look in the back before you lock the car.[^nhtsa] The same heat is dangerous for dogs and other pets.",
          },
        ],
      },
      {
        heading: "Still not cold after 10 minutes?",
        blocks: [
          {
            type: "p",
            text: "Once you are driving, a healthy aircon should be blowing clearly cold air within a few minutes. If it only blows cool air, goes warm in traffic, or the airflow is weak, something needs attention. Our [aircon check-ups page](/services/aircon-check-ups/) explains what different symptoms usually mean.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is it bad to switch the aircon on full straight away?",
        a: "It won't harm a healthy system, but it isn't the quickest way. Letting the hot air out through the windows first, then driving with the aircon on, cools the car down faster.",
      },
      {
        q: "Does a sunshade really help?",
        a: "Yes. It keeps direct sun off the dashboard and front seats, which are the parts that get hottest. Parking in the shade helps even more.",
      },
      {
        q: "Does leaving a window open a little keep the car cool?",
        a: "Not much. Road safety officials say cracking a window does little to stop a parked car heating up, so it never makes it safe to leave a child or pet inside.",
      },
    ],
    related: [
      { href: "/guides/recirculation-vs-fresh-air/", label: "Recirculation or fresh air?" },
      { href: "/guides/does-car-aircon-use-more-fuel/", label: "Does car aircon use more fuel?" },
      { href: "/services/car-aircon-regas/", label: "R134a aircon regas" },
    ],
    cta: {
      title: "Takes ages to cool down?",
      text: "If your aircon struggles on hot days, send us your car's make, model and year. We come to your home or office in Harare.",
      message: "Hi ProRegas, my car takes a long time to cool down. My car is a ",
    },
    sources: [src.asu, src.nhtsa, src.fuelHot, src.sae, src.kia, src.nsc],
  },

  {
    slug: "recirculation-vs-fresh-air",
    label: "Recirculation or fresh air?",
    h1: "Recirculation or fresh air: which aircon setting should you use?",
    metaTitle: "Car aircon recirculation or fresh air: which should you use?",
    metaDescription:
      "What the recirculation button does, when it helps (hot days, dust and fumes) and when to switch back to fresh air (stuffy air and misted windows). Based on research and carmaker advice.",
    intro:
      "Most cars have a button with a curved arrow inside a car outline. It switches between recirculating the air inside the car and drawing in fresh air from outside. Each has its time.",
    published: "2026-11-21",
    sections: [
      {
        heading: "What the button does",
        blocks: [
          {
            type: "ul",
            items: [
              "**Fresh air** (usually an arrow coming into the car from outside): the fan pulls in outside air through the cabin filter.",
              "**Recirculation** (a curved arrow inside the car): the fan takes the air already in the car and passes it through the aircon again. Little outside air comes in.",
            ],
          },
        ],
      },
      {
        heading: "When recirculation helps",
        blocks: [
          {
            type: "p",
            text: "**To cool a hot car faster.** Cooling the air that's already in the car takes less energy than cooling hot air from outside.[^sae-recirc] It's most useful for the first few minutes after you set off on a hot day.",
          },
          {
            type: "p",
            text: "**On dusty roads and behind smoky vehicles.** Recirculation keeps more of the dust and exhaust outside. In tests on an SUV, full recirculation cut the number of tiny particles in the cabin to about a fifth of the level with fresh air.[^sae-recirc] A US government study (NIOSH) also found recirculation reduces exposure to these very small particles.[^niosh]",
          },
        ],
      },
      {
        heading: "Why you shouldn't leave it on all the time",
        blocks: [
          {
            type: "p",
            text: "**The air goes stale.** Every breath adds carbon dioxide (CO2) to the air in the car. With full recirculation, the NIOSH study measured CO2 rising to about 3,000 parts per million (ppm). Letting in just 25% fresh air brought it down to about 1,000 ppm.[^niosh] For comparison, US workplace safety guidance treats 1,000 ppm indoors as a sign of poor ventilation.[^sae-recirc] More passengers means the CO2 builds up faster.[^sae-recirc]",
          },
          {
            type: "p",
            text: "**The windows can mist up.** People also breathe out moisture, so the air in a closed car gets damper with recirculation on.[^sae-recirc] Kia's owner's manual warns that using the heater on recirculation for a long time can fog up the windscreen and side windows, and that the air may become stale.[^kia]",
          },
          {
            type: "p",
            text: "**It can smell musty.** The same manual says long spells of recirculation can lead to musty smells from the vents. It recommends driving mostly with fresh air and using recirculation only when needed.[^kia]",
          },
        ],
      },
      {
        heading: "Which setting, when",
        blocks: [
          {
            type: "table",
            caption: "Which air setting to use",
            head: ["Situation", "Setting"],
            rows: [
              ["Getting into a hot car", "Windows open for a minute, then recirculation with the aircon on"],
              ["Once the car is comfortable", "Fresh air"],
              ["Dusty gravel road, or stuck behind a smoky truck or kombi", "Recirculation until you're clear"],
              ["Long drive, or a full car", "Fresh air"],
              ["Rain, and the windows are misting up", "Fresh air with the aircon on, aimed at the windscreen"],
              ["Feeling stuffy or drowsy", "Fresh air, and take a break if you're tired"],
            ],
          },
          {
            type: "p",
            text: "Why the aircon in the rain? It takes moisture out of the air, so it clears misted windows quickly, even with the heater on.[^rac-winter]",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Does recirculation make the aircon colder?",
        a: "It helps the car cool down faster, because the aircon is cooling air that is already cool instead of hot outside air. Once the car is comfortable, fresh air keeps the air from going stale.",
      },
      {
        q: "Does the cabin filter matter with fresh air on?",
        a: "Yes. With fresh air on, all the outside air passes through the cabin filter first. A clogged filter cuts the airflow, so check it more often if you drive on dusty roads.",
      },
      {
        q: "My windows mist up even on fresh air. Why?",
        a: "Make sure the aircon itself is on, as it is what dries the air. If the windows still mist up quickly, the cabin filter may be blocked, or the aircon may not be working properly, for example because it is low on gas.",
      },
    ],
    related: [
      { href: "/services/cabin-filter-replacement/", label: "Cabin filter checks and replacements" },
      { href: "/guides/how-to-cool-down-a-hot-car/", label: "How to cool down a hot car fast" },
      { href: "/guides/car-aircon-maintenance-tips/", label: "How to look after your car aircon" },
    ],
    cta: {
      title: "Musty smell or misty windows?",
      text: "Tell us what your aircon is doing and your car's make, model and year. We come to you in Harare.",
      message: "Hi ProRegas, I have a question about my car's aircon. My car is a ",
    },
    sources: [src.sae, src.niosh, src.kia, src.racWinter],
  },

  {
    slug: "car-aircon-maintenance-tips",
    label: "Look after your car aircon",
    h1: "How to look after your car aircon: 7 simple tips",
    metaTitle: "How to look after your car aircon: 7 simple tips",
    metaDescription:
      "Keep your car's aircon cold for longer: run it in winter, change the cabin filter, know when it needs a service, and avoid DIY top-up cans. Advice from parts makers and motoring groups.",
    intro:
      "A car aircon doesn't need much attention, but a few habits keep it cooling well and help you avoid expensive repairs.",
    published: "2026-11-21",
    sections: [
      {
        heading: "1. Run it regularly, even in cold weather",
        blocks: [
          {
            type: "p",
            text: "The gas in the system carries oil that keeps the compressor and seals lubricated. If the aircon is left off for long periods, the seals can dry out, gas can slowly escape, and the compressor clutch can give more trouble.[^rac-winter] An AA expert explains that the compressor's seal is designed to work best when the system runs regularly.[^aa-nz]",
          },
          {
            type: "p",
            text: "A UK warranty company advises running the aircon at least once a week to avoid expensive repairs.[^whatcar] In Harare's cooler months, a few minutes now and then is enough, and it clears misted windows quickly too.[^rac-winter]",
          },
        ],
      },
      {
        heading: "2. Expect it to lose a little gas each year",
        blocks: [
          {
            type: "p",
            text: "Even a healthy aircon slowly loses gas through its hoses and seals. Parts makers HELLA and Delphi both say up to 10% can escape in a year, even from a new system.[^hella,delphi] So a gradual drop in cooling over a year or two is normal. Cooling that fades within weeks of a regas is not, and usually means a leak.",
          },
        ],
      },
      {
        heading: "3. Have it serviced every couple of years",
        blocks: [
          {
            type: "p",
            text: "Delphi says most carmakers recommend an aircon service at least every two years.[^delphi] HELLA recommends a check every 12 months and a service every two years, including a new filter drier (the part that soaks up moisture inside the system).[^hella] MAHLE simply says every few years.[^mahle] Your car's service book has the interval for your model.",
          },
        ],
      },
      {
        heading: "4. Change the cabin filter",
        blocks: [
          {
            type: "p",
            text: "The cabin filter cleans the air before it reaches the vents. MAHLE recommends a new one at every service, or at least every six months.[^mahle] Dusty roads clog it faster, which cuts airflow and can cause musty smells. See our [cabin filter page](/services/cabin-filter-replacement/).",
          },
        ],
      },
      {
        heading: "5. Help stop mould and smells",
        blocks: [
          {
            type: "p",
            text: "The evaporator behind the dashboard is damp whenever the aircon runs, and mould can grow on it. MAHLE suggests switching the aircon off a few minutes before you reach your destination, which helps prevent mould.[^mahle] HELLA says the evaporator needs disinfecting regularly.[^hella] Running the aircon through the year also helps prevent smells.[^rac-winter]",
          },
        ],
      },
      {
        heading: "6. Skip DIY top-up cans and stop-leak",
        blocks: [
          {
            type: "p",
            text: "Motoring site Parkers warns that cheap top-up cans don't last.[^parkers] If a system needs gas, it most likely has a leak, and one aircon specialist recommends a pressure test before regassing.[^green-flag] Each system is built for a set amount of gas, and too much can be as bad as too little. Our [gas leak repairs page](/services/aircon-leak-repairs/) explains where leaks usually come from.",
          },
        ],
      },
      {
        heading: "7. Notice the early signs",
        blocks: [
          {
            type: "p",
            text: "A quick check: set the temperature to the coldest setting and the fan to maximum, and feel how cold the air is.[^delphi] Watch out for:",
          },
          {
            type: "ul",
            items: [
              "Air that's cool rather than cold, or that goes warm in traffic",
              "Windows that take longer to demist in cold or wet weather[^delphi]",
              "A musty smell, weak airflow, or new noises when the aircon is on",
            ],
          },
          {
            type: "p",
            text: "Catching a problem early usually means a cheaper fix. Our [aircon check-ups page](/services/aircon-check-ups/) explains what each symptom can mean.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is running the aircon in winter a waste of fuel?",
        a: "It uses a little fuel, but a few minutes now and then keeps the seals and compressor lubricated. It also clears misted windows quickly, because the aircon dries the air.",
      },
      {
        q: "How do I know if my car needs a regas?",
        a: "The usual sign is cooling that has faded gradually, so the air is cool rather than cold. If it fades again soon after a regas, the system probably has a leak that needs fixing.",
      },
      {
        q: "Can I clean the aircon vents myself?",
        a: "You can wipe the vent grilles, but the cause of most smells is the cabin filter or the evaporator behind the dashboard. Start by changing the cabin filter.",
      },
    ],
    related: [
      { href: "/services/car-aircon-regas/", label: "R134a aircon regas" },
      { href: "/services/cabin-filter-replacement/", label: "Cabin filter checks and replacements" },
      { href: "/services/aircon-leak-repairs/", label: "Gas leak repairs" },
    ],
    cta: {
      title: "Aircon not as cold as it used to be?",
      text: "We regas cars that use R134a and fix leaks, filters and faults, at your home or office in Harare.",
      message: "Hi ProRegas, my aircon isn't as cold as it used to be. My car is a ",
    },
    sources: [src.racWinter, src.aaNz, src.whatCar, src.hella, src.delphi, src.mahle, src.parkers, src.greenFlag],
  },

  {
    slug: "check-aircon-before-buying-used-car",
    label: "Check the aircon on a used car",
    h1: "How to check the aircon before you buy a used car",
    metaTitle: "How to check the aircon before you buy a used car",
    metaDescription:
      "A simple aircon check you can do before you buy a used or imported car in Zimbabwe: what to test, what to look and listen for, and the warning signs sellers hide.",
    intro:
      "Aircon faults are easy to miss on a quick look round a car, and some are expensive to fix. These checks take about ten minutes and need no tools.",
    published: "2026-11-21",
    sections: [
      {
        heading: "Why it's worth checking",
        blocks: [
          {
            type: "p",
            text: "Many cars in Zimbabwe are imported second-hand, a lot of them from Japan. ZIMRA said that most of the vehicles imported through Beitbridge in early 2015 came from Japan and South Africa.[^chronicle] That means you often know little about how the car was used or serviced before.",
          },
          {
            type: "p",
            text: "The RAC's used car checklist says to check that the aircon is blowing ice cold, and to try everything electrical. Even a simple fault is something to negotiate on.[^rac-used]",
          },
        ],
      },
      {
        heading: "Check which gas it uses",
        blocks: [
          {
            type: "p",
            text: "Some newer Japanese-market cars use R1234yf gas instead of R134a, and the year alone doesn't tell you which. Look for the aircon sticker under the bonnet. Our guide [Which aircon gas does my car use?](/which-aircon-gas/) shows what to look for.",
          },
        ],
      },
      {
        heading: "The ten-minute aircon test",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Start with the aircon off", text: "With the engine running, set the temperature to the coldest setting and the fan to about half speed, with the aircon button off. Then switch the aircon on. The air from the vents should get noticeably colder.[^parkers]" },
              { title: "Feel how cold it gets", text: "A working aircon can make the air at the vents about 9 to 18°C cooler than the air going in.[^parkers] Cool isn't enough: it should feel properly cold." },
              { title: "Try every fan speed and vent", text: "Check all the fan speeds, the dashboard and footwell vents, and the windscreen setting. A fan that works only on the top speed usually has a failed blower resistor." },
              { title: "Listen under the bonnet", text: "When the aircon is switched on, the compressor clutch should engage with no more than a gentle click.[^parkers] Grinding, rattling or squealing is a warning sign. Keep hands, hair and loose clothing well clear of the belts and fans." },
              { title: "Look for oily marks", text: "Oily residue on the aircon pipes and joints can be a sign of a gas leak.[^parkers]" },
              { title: "Sniff the air", text: "A musty smell usually means an old cabin filter or a dirty evaporator. A burning smell from behind the dashboard needs checking." },
              { title: "Test it in traffic", text: "On the test drive, make sure the aircon stays cold while you're standing still in traffic, not only on the open road. Going warm in traffic can mean a cooling fan or condenser problem." },
            ],
          },
        ],
      },
      {
        heading: "Warning signs",
        blocks: [
          {
            type: "ul",
            items: [
              "**\"It just needs a regas.\"** Parkers warns buyers not to be fooled by this line.[^parkers] Ask why it hasn't been done already.",
              "**Missing aircon fuses.** Parkers says to check that fuses haven't been taken out, which can hide a fault.[^parkers]",
              "**A recent DIY top-up.** Cheap top-up cans don't last.[^parkers] Gas that keeps running out usually means a leak.",
              "**No history.** Ask when the aircon was last serviced or regassed. A full service history is a bonus on any used car.[^rac-used]",
            ],
          },
        ],
      },
      {
        heading: "Already bought it?",
        blocks: [
          {
            type: "p",
            text: "If the aircon isn't cold, our [aircon check-ups page](/services/aircon-check-ups/) explains what different symptoms usually point to. Recently imported cars can also have a very dirty cabin filter, so that's a cheap first thing to check.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "The seller says the aircon just needs gas. Should I believe them?",
        a: "Be careful. Gas doesn't usually run out quickly unless there's a leak, and a regas won't fix a leak, a failed compressor or an electrical fault. Treat a car with a warm aircon as needing a repair, and price that in.",
      },
      {
        q: "Can I test the aircon on a cold day?",
        a: "Yes. The air from the vents should still get colder when you switch the aircon on.",
      },
      {
        q: "Should the compressor click on and off?",
        a: "On many cars the clutch clicks on and off now and then, which is normal. Some cars have compressors with no clutch at all. Clicking on and off every few seconds, or a clutch that never engages, needs checking.",
      },
    ],
    related: [
      { href: "/which-aircon-gas/", label: "Which aircon gas does my car use?" },
      { href: "/services/aircon-check-ups/", label: "Aircon check-ups" },
      { href: "/services/aircon-compressor-repairs/", label: "Compressor repair and replacement" },
    ],
    cta: {
      title: "Bought a car with a weak aircon?",
      text: "Send us the make, model and year and tell us what the aircon is doing. We come to you anywhere in Harare.",
      message: "Hi ProRegas, I've bought a car and the aircon isn't cold. It's a ",
    },
    sources: [src.chronicle, src.racUsed, src.parkers],
  },
]

// The gas guide is its own page at /which-aircon-gas/, but it's listed with the guides.
export const guideLinks = [
  { href: "/which-aircon-gas/", label: "Which aircon gas does my car use?", description: "R134a or R1234yf: how to check before you book a regas." },
  ...guides.map((g) => ({ href: `/guides/${g.slug}/`, label: g.h1, description: g.metaDescription })),
]
