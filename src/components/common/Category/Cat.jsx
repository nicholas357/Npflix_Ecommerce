import React from 'react'
import { Card, CardContent } from '../ui/Card'
import '../../../index.css'
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  Gift,
  MonitorPlay,
  Gamepad2,
  FolderCode
} from "lucide-react";

import { useHistory } from 'react-router-dom';






const Cat = () => {
  const history = useHistory();
  const handleNavigation = (path) => {
    history.push(path);
    closeDrawer(); // Close the drawer after navigation
  };
  return (
    <>
    <style>
        {`
          
          
          @media (max-width: 768px) { /* Adjust the max-width based on your breakpoints */
            #i {
              size: 40px;
            }
          }
          
        `}
      </style>
    <div className='container'>     
      <section className="py-12 bg-gray-50">
        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigation('/netflix')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6" >
                  <img className="size-50"  src="https://i.imgur.com/Tvro3la.png" />
                  <span className="font-bold">Netflix</span>
                </CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigation('/spotify')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img className="size-70" src="https://i.imgur.com/MeThqen.png" />
                  <span className="font-bold">Spotify</span>
                </CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigation('/gift-cards')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img className="size-50" src="https://i.imgur.com/pXebitw.png" />
                  <span className="font-bold">Gift Cards</span>
                </CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigation('/top-ups')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img className="size-50" src="https://i.imgur.com/V9B6ChT.png" />
                  <span className="font-bold">TopUps</span>
                </CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigation('/softwares')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img className="size-50" src="https://i.imgur.com/F58HiLX.png" />
                  <span className="font-bold">Softwares</span>
                </CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigation('/subscriptions')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img className="size-50" src="https://i.imgur.com/uiSbFuE.png" />
                  <span className="font-bold">Subscription</span>
                </CardContent>
              </Card>
              
              
            
          </div>
        </div>
        </section>
      
      </section>
    </div>
    </>
  )
}

export default Cat