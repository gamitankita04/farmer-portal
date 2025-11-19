import React from 'react'
import Hero from './Hero'
import { GiPlantWatering, GiFarmTractor, GiFruitBowl } from "react-icons/gi";
import GoodForFarmers from './GoodForFarmers';
import OurValues from './OurValues';
import HowWeHelp from './HowWeHelp';
import GovtProjects from './GovtProjects';
import Medicnecorp from './Medicnecorp';


function Home() {
  return (
    <div>
       <Hero/>
       <GoodForFarmers/>
       <OurValues/>  
  
       <HowWeHelp/> 
       <GovtProjects/>
    </div>
  )
}

export default Home
