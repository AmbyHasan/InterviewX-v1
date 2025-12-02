import { interviewCovers ,mappings } from "../constants"; 
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//----------------------------------------------------------------------------------------------------------------------------------

//for printing the logos of the tech stack involved in the interview in the InterviewCard of home page
const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

//converting the tech stack name into normal names so that we can generate url and get the original items
const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

//for returning the logos
export const getTechLogos = async (techArray: string[]) => {
    if (!Array.isArray(techArray)) return []; // .map can only work on arrays
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech ,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });
  

//--------------------------------------------------------------------------------------------------------------------



const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};



  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    }))
  );

  return results;
};


//for displaying the company logo in the interview card present in the home page
export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
