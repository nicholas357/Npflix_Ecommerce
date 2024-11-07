import React from 'react';
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Card,
  Drawer,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  HomeIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { RiNetflixFill } from "react-icons/ri";
import { FaAppStoreIos } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { FaSteamSquare } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaPlaystation } from "react-icons/fa";
import { HandCoinsIcon, BadgeIcon } from 'lucide-react';
import { useHistory } from 'react-router-dom';

const Menu = () => {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const history = useHistory();
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Function to handle navigation and close drawer
  const handleNavigation = (path) => {
    history.push(path);
    closeDrawer(); // Close the drawer after navigation
  };

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
          onClick={closeDrawer}
          style={{ position: 'fixed' }}
        />
      )}

      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="z-[10000] fixed">
        <Card color="transparent" shadow={false} className="h-[calc(100vh-2rem)] w-full p-4">
         
          
          <List>
            <Accordion
              open={open === 1}
              icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">Brands</Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem onClick={() => handleNavigation('/netflix')} >
                    <ListItemPrefix>
                      <a className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                        <RiNetflixFill className="mr-2 w-8 h-8" />
                        Netflix
                      </a>
                    </ListItemPrefix>
                  </ListItem>
                  <ListItem onClick={() => handleNavigation('/apple')}>
                    <ListItemPrefix>
                      <a className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                        <FaAppStoreIos className="mr-2 w-8 h-8" />
                        Apple
                      </a>
                    </ListItemPrefix>
                  </ListItem>
                  <ListItem onClick={() => handleNavigation('/epic-store')}>
                    <ListItemPrefix>
                      <a  className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                        <SiEpicgames className="mr-2 w-8 h-8" />
                        Epic Games
                      </a>
                    </ListItemPrefix>
                  </ListItem>
                  <ListItem onClick={() => handleNavigation('/steam-store')}>
                    <ListItemPrefix>
                      <a  className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                        <FaSteamSquare className="mr-2 w-8 h-8" />
                        Steam Store
                      </a>
                    </ListItemPrefix>
                  </ListItem>
                  <ListItem onClick={() => handleNavigation('/microsoft')}>
                    <ListItemPrefix>
                      <a  className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                        <FaMicrosoft className="mr-2 w-8 h-8" />
                        Microsoft
                      </a>
                    </ListItemPrefix>
                  </ListItem>
                  <ListItem onClick={() => handleNavigation('/playstation')}>
                    <ListItemPrefix>
                      <a  className="flex items-center block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                        <FaPlaystation className="mr-2 w-8 h-8" />
                        PlayStation
                      </a>
                    </ListItemPrefix>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>

            <ListItem onClick={() => handleNavigation('/')}> 
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home
            </ListItem>
            <ListItem onClick={() => handleNavigation('/shop')}>
              <ListItemPrefix>
                <ShoppingCartIcon className="h-5 w-5" />
              </ListItemPrefix>
              Shop
            </ListItem>
            <ListItem onClick={() => handleNavigation('/recommended')}>
              <ListItemPrefix>
                <HandCoinsIcon className="h-5 w-5"/>
              </ListItemPrefix>
              Recommended
            </ListItem>
            <ListItem onClick={() => handleNavigation('/featured')}>
              <ListItemPrefix>
                <BadgeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Featured
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}

export default Menu;
