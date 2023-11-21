"use client";
 
import { 
    ThemeProvider, 
    Textarea, Button, IconButton ,
    Navbar as NavbarMT,
    Typography,
    Input,
    Badge,
    Alert,
    Dialog,
    Stepper, Step,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
 } from "@material-tailwind/react";

 import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

 import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
  
} from "@heroicons/react/24/outline";

//  import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
 export { 
    ThemeProvider, 
    Textarea, Button, IconButton,
    NavbarMT,
    Typography,
    Input,
    Badge,
    Alert,
    Dialog,
    Stepper, Step,
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
    Drawer
    // BellIcon, Cog6ToothIcon 
};

 
 export default function ThemeContext({ children }) {
   return (
        <ThemeProvider>
            { children }
        </ThemeProvider>
   )
 }
 

