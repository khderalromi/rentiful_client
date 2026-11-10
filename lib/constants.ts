import {
  Wifi,
  Waves,
  Dumbbell,
  Car,
  PawPrint,
  Tv,
  Thermometer,
  Cigarette,
  Cable,
  Maximize,
  Bath,
  Phone,
  Sprout,
  Hammer,
  Bus,
  Mountain,
  VolumeX,
  Home,
  Warehouse,
  Building,
  Castle,
  Trees,
  LucideIcon,
} from "lucide-react";

export enum AmenityEnum {
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Dishwasher = "Dishwasher",
  HighSpeedInternet = "HighSpeedInternet",
  HardwoodFloors = "HardwoodFloors",
  WalkInClosets = "WalkInClosets",
  Microwave = "Microwave",
  Refrigerator = "Refrigerator",
  Pool = "Pool",
  Gym = "Gym",
  Parking = "Parking",
  PetsAllowed = "PetsAllowed",
  WiFi = "WiFi",
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Dishwasher: Waves,
  HighSpeedInternet: Wifi,
  HardwoodFloors: Home,
  WalkInClosets: Maximize,
  Microwave: Tv,
  Refrigerator: Thermometer,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  PetsAllowed: PawPrint,
  WiFi: Wifi,
};

export enum HighlightEnum {
  HighSpeedInternetAccess = "HighSpeedInternetAccess",
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Heating = "Heating",
  SmokeFree = "SmokeFree",
  CableReady = "CableReady",
  SatelliteTV = "SatelliteTV",
  DoubleVanities = "DoubleVanities",
  TubShower = "TubShower",
  Intercom = "Intercom",
  SprinklerSystem = "SprinklerSystem",
  RecentlyRenovated = "RecentlyRenovated",
  CloseToTransit = "CloseToTransit",
  GreatView = "GreatView",
  QuietNeighborhood = "QuietNeighborhood",
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
  HighSpeedInternetAccess: Wifi,
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Heating: Thermometer,
  SmokeFree: Cigarette,
  CableReady: Cable,
  SatelliteTV: Tv,
  DoubleVanities: Maximize,
  TubShower: Bath,
  Intercom: Phone,
  SprinklerSystem: Sprout,
  RecentlyRenovated: Hammer,
  CloseToTransit: Bus,
  GreatView: Mountain,
  QuietNeighborhood: VolumeX,
};

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Home,
  Cottage: Trees,
};

// Add this constant at the end of the file
export const NAVBAR_HEIGHT = 52; // in pixels

// Test users for development
export const testUsers = {
  tenant: {
    username: "Carol White",
    userId: "us-east-2:76543210-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "carol.white@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  tenantRole: "tenant",
  manager: {
    username: "John Smith",
    userId: "us-east-2:12345678-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "john.smith@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  managerRole: "manager",
};


export const LOCATION_MAPPING: Record<string, Record<string, [number, number]>> = {
  "Syria": {
    "Damascus": [36.2765, 33.5138],
    "Rif Dimashq": [36.3000, 33.5000],
    "Aleppo": [37.1611, 36.2021],
    "Homs": [36.7118, 34.7324],
    "Hama": [36.7550, 35.1318],
    "Latakia": [35.7906, 35.5317],
    "Tartus": [35.8866, 34.8890],
    "Idlib": [36.6339, 35.9306],
    "Deir ez-Zor": [40.1408, 35.3359],
    "Raqqa": [39.0194, 35.9594],
    "Hasakah": [40.7425, 36.5024],
    'Qamishli': [41.2260, 37.0521],
    "Daraa": [36.1021, 32.6189],
    "Suwayda": [36.5660, 32.7089],
    "Quneitra": [35.8240, 33.1250],
  },


  "Jordan": {
    "Amman": [35.9239, 31.9539],
    "Irbid": [35.8500, 32.5556],
    "Zarqa": [36.0842, 32.0836],
    "Mafraq": [36.2080, 32.3420],
    "Ajloun": [35.7520, 32.3330],
    "Jerash": [35.8993, 32.2747],
    "Madaba": [35.7980, 31.7160],
    "Balqa": [35.7270, 32.0390],
    "Karak": [35.7010, 31.1850],
    "Tafileh": [35.6040, 30.8370],
    "Maan": [35.7340, 30.1920],
    "Aqaba": [35.0078, 29.5267],
  },

  Lebanon: {
    "Beirut": [35.5018, 33.8938],
    "Mount Lebanon": [35.5360, 33.8330],
    "North Lebanon": [35.8490, 34.4360],
    "Akkar": [36.0780, 34.5320],
    "South Lebanon": [35.1940, 33.2730],
    "Nabatieh": [35.4820, 33.3780],
    "Bekaa": [35.9020, 33.8460],
    "Baalbek-Hermel": [36.2180, 34.0050],
  },

  "Saudi Arabia": {
    "Riyadh": [46.6753, 24.7136],
    "Makkah": [39.8579, 21.3891],
    "Madinah": [39.6111, 24.5247],
    "Eastern Province": [50.0888, 26.4207],
    "Qassim": [43.9750, 26.3260],
    "Asir": [42.5053, 18.2164],
    "Tabuk": [36.5715, 28.3838],
    "Hail": [41.6900, 27.5114],
    "Jazan": [42.5511, 16.8892],
    "Najran": [44.1277, 17.5650],
    "Al Bahah": [41.4677, 20.0129],
    "Al Jouf": [40.1430, 29.8110],
    "Northern Borders": [41.0381, 30.9843],
  },

  "United Arab Emirates": {
    "AbuDhabi": [54.3773, 24.4539],
    "Dubai": [55.2708, 25.2048],
    "Sharjah": [55.4033, 25.3463],
    "Ajman": [55.5136, 25.4052],
    "UmmAlQuwain": [55.5552, 25.5647],
    "RasAlKhaimah": [55.9432, 25.7895],
    "Fujairah": [56.3265, 25.1288],
  },


  "Kuwait": {
    "Al Asimah": [47.9774, 29.3759],
    "Hawalli": [48.0280, 29.3375],
    "Farwaniya": [47.9581, 29.2775],
    "Ahmadi": [48.0838, 29.0769],
    "Jahra": [47.6581, 29.3375],
    "Mubarak Al-Kabeer": [48.0580, 29.2120],
  },


  "Qatar": {
    "Doha": [51.5310, 25.2854],
    "AlRayyan": [51.3700, 25.2919],
    "AlWakrah": [51.6034, 25.1659],
    'AlKhor': [51.4969, 25.6804],
    "AlShamal": [51.2150, 26.1300],
    "AlDaayen": [51.4810, 25.5800],
    "UmmSalal": [51.3970, 25.4150],
    "AlShahaniya": [51.2200, 25.3700],
  },

  'Oman': {
    'Muscat': [58.4059, 23.5880],
    'Dhofar': [54.0924, 17.0194],
    'Musandam': [56.2477, 26.1799],
    'Buraimi': [55.7833, 24.2500],
    "Al Dakhiliyah": [57.5310, 22.9330],
    "North Al Batinah": [56.7460, 24.3640],
    "South Al Batinah": [57.4380, 23.4310],
    "North Ash Sharqiyah": [58.1890, 22.5660],
    "South Ash Sharqiyah": [59.5280, 22.5660],
    "Al Wusta": [56.5000, 19.5000],
    "Al Dhahirah": [56.5160, 23.2250],
  },

  
  'Bahrain': {
    'Capital': [50.5860, 26.2285],
    'Muharraq': [50.6119, 26.2572],
    "Northern Governorate": [50.4770, 26.2180],
    "Southern Governorate": [50.5550, 26.0500],
  },
};