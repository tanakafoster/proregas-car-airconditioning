// A short, neutral description of each suburb or town, shown on its page (/areas/<slug>/), keyed by slug.
// Every fact was checked against the sources listed. Leave a place out rather than guess.
export const areaFacts: Record<string, { blurb: string; sources: string[] }> = {
  "borrowdale": {
    blurb: "Borrowdale is a mainly residential suburb in the north of Harare and forms part of the city's north-eastern suburbs. It is home to the Sam Levy's Village shopping area.",
    sources: ["https://en.wikipedia.org/wiki/Borrowdale,_Harare"],
  },
  "mount-pleasant": {
    blurb: "Mount Pleasant is a residential suburb in the northern part of Harare. The main campus of the University of Zimbabwe lies at its southern edge.",
    sources: ["https://en.wikipedia.org/wiki/Mount_Pleasant,_Harare"],
  },
  "avondale": {
    blurb: "Avondale is a suburb about 3.5 km north of Harare city centre. It is mainly residential, while King George Road along its eastern edge is its most commercial street and Avondale Shopping Centre is its best-known landmark.",
    sources: ["https://en.wikipedia.org/wiki/Avondale,_Harare", "https://en.wikipedia.org/wiki/Belgravia,_Harare"],
  },
  "belgravia": {
    blurb: "Belgravia is a mixed-use residential suburb in the north of Harare, close to the city centre. It is one of the city's main embassy areas, and Cork Road and King George Road are its main commercial streets.",
    sources: ["https://en.wikipedia.org/wiki/Belgravia,_Harare"],
  },
  "alexandra-park": {
    blurb: "Alexandra Park is a Harare neighbourhood that borders Belgravia to the east.",
    sources: ["https://en.wikipedia.org/wiki/Belgravia,_Harare"],
  },
  "highlands": {
    blurb: "Highlands is a residential suburb between Borrowdale and Newlands, in the east of Harare. It is best known as the home of the Zimbabwe Broadcasting Corporation.",
    sources: ["https://en.wikipedia.org/wiki/Highlands,_Harare"],
  },
  "emerald-hill": {
    blurb: "Emerald Hill is a suburb in the north-west of Harare. It is home to St John's High School and Gateway High School.",
    sources: ["https://en.wikipedia.org/wiki/Emerald_Hill,_Zimbabwe"],
  },
  "mabvuku": {
    blurb: "Mabvuku is a suburb in the east of Harare. It dates back to the 1950s, and its oldest school, Donnybrook Primary School, opened in 1954.",
    sources: ["https://en.wikipedia.org/wiki/Mabvuku"],
  },
  "milton-park": {
    blurb: "Milton Park is an inner-city suburb just west of central Harare, about 3 km from the city centre. It is a mixed-use area, with homes alongside businesses.",
    sources: ["https://en.wikipedia.org/wiki/Milton_Park,_Harare", "https://www.propertybook.co.zw/neighbourhood-guides/suburbs/milton-park"],
  },
  "arcadia": {
    blurb: "Arcadia is a small, historic suburb south-east of central Harare, just south of the main railway line. Arcadia Sports Club and the Arcadia Community Centre are here.",
    sources: ["https://en.wikipedia.org/wiki/Arcadia,_Harare"],
  },
  "highfield": {
    blurb: "Highfield is a high-density suburb in the south-west of Harare, with Glen Norah on its south-western side.",
    sources: ["https://en.wikipedia.org/wiki/Highfield,_Harare"],
  },
  "mbare": {
    blurb: "Mbare is a high-density suburb in the south of Harare. Founded in 1907, it was the city's first township, and it is home to Mbare Musika, the largest farm produce market in Zimbabwe.",
    sources: ["https://en.wikipedia.org/wiki/Mbare"],
  },
  "chitungwiza": {
    blurb: "Chitungwiza is a town on the outskirts of Harare and one of the most populous urban centres in Zimbabwe.",
    sources: ["https://en.wikipedia.org/wiki/Chitungwiza"],
  },
}
