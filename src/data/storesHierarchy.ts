import { StoreNode, PersonaType } from '../types';

// Helper to generate individual stores
function createStores(zoneName: string, prefix: string, count: number, startId: number): StoreNode[] {
  const stores: StoreNode[] = [];
  const locations = [
    'City Centre Mall', 'Metro Hub', 'Express High Street', 'Tech Park Galleria', 
    'Central Square', 'Plaza Arcade', 'Grand Avenue', 'Boulevard', 'Heritage Market',
    'Nexus Mall', 'Infinity Tower Store', 'Market City', 'Aerocity Pavilion', 'Ring Road Flagship'
  ];

  for (let i = 0; i < count; i++) {
    const loc = locations[i % locations.length];
    const storeNumber = startId + i;
    stores.push({
      id: `store-${storeNumber}`,
      name: `Store #${storeNumber} - ${prefix} ${loc}`,
      type: 'store',
      storeCount: 1,
      city: prefix,
    });
  }
  return stores;
}

// Generate full 284 stores hierarchy
let currentStoreId = 101;

// North: 82 stores
const northCentralDelhi = createStores('Central Delhi Zone', 'Delhi', 14, currentStoreId);
currentStoreId += 14;
const northGurgaonNoida = createStores('Gurgaon & Noida Zone', 'NCR', 18, currentStoreId);
currentStoreId += 18;
const northWestDelhi = createStores('North & West Delhi Zone', 'Delhi', 12, currentStoreId);
currentStoreId += 12;

const northChandigarh = createStores('Chandigarh Tricity Zone', 'Chandigarh', 12, currentStoreId);
currentStoreId += 12;
const northLudhiana = createStores('Ludhiana & Amritsar Zone', 'Punjab', 10, currentStoreId);
currentStoreId += 10;

const northJaipur = createStores('Jaipur City Zone', 'Jaipur', 9, currentStoreId);
currentStoreId += 9;
const northLucknow = createStores('Lucknow & Kanpur Zone', 'UP', 7, currentStoreId);
currentStoreId += 7;

// West: 78 stores
const westSouthMumbai = createStores('South Mumbai Zone', 'Mumbai', 22, currentStoreId);
currentStoreId += 22;
const westThane = createStores('Thane & Navi Mumbai Zone', 'Navi Mumbai', 18, currentStoreId);
currentStoreId += 18;

const westPune = createStores('Pune Metro Zone', 'Pune', 14, currentStoreId);
currentStoreId += 14;
const westNagpur = createStores('Nagpur & Nashik Zone', 'Maharashtra', 8, currentStoreId);
currentStoreId += 8;

const westAhmedabad = createStores('Ahmedabad Commercial Zone', 'Ahmedabad', 10, currentStoreId);
currentStoreId += 10;
const westSurat = createStores('Surat & Vadodara Zone', 'Gujarat', 6, currentStoreId);
currentStoreId += 6;

// South: 74 stores
const southCentralBLR = createStores('Bengaluru Tech Zone', 'Bengaluru', 18, currentStoreId);
currentStoreId += 18;
const southResidentialBLR = createStores('Bengaluru Residential Zone', 'Bengaluru', 16, currentStoreId);
currentStoreId += 16;

const southChennai = createStores('Chennai Metro Zone', 'Chennai', 14, currentStoreId);
currentStoreId += 14;
const southCoimbatore = createStores('Coimbatore Zone', 'Tamil Nadu', 10, currentStoreId);
currentStoreId += 10;

const southCyberabad = createStores('Cyberabad Zone', 'Hyderabad', 11, currentStoreId);
currentStoreId += 11;
const southSecunderabad = createStores('Secunderabad Zone', 'Telangana', 5, currentStoreId);
currentStoreId += 5;

// East: 50 stores
const eastKolkata = createStores('Kolkata Metro Zone', 'Kolkata', 18, currentStoreId);
currentStoreId += 18;
const eastHowrah = createStores('Howrah & Durgapur Zone', 'Bengal', 10, currentStoreId);
currentStoreId += 10;

const eastBhubaneswar = createStores('Bhubaneswar Zone', 'Odisha', 7, currentStoreId);
currentStoreId += 7;
const eastPatna = createStores('Patna Zone', 'Bihar', 5, currentStoreId);
currentStoreId += 5;

const eastGuwahati = createStores('Guwahati Zone', 'Assam', 6, currentStoreId);
currentStoreId += 6;
const eastShillong = createStores('Shillong & Siliguri Zone', 'North East', 4, currentStoreId);
currentStoreId += 4;

export const STORES_HIERARCHY: StoreNode = {
  id: 'company-root',
  name: 'The ArKitects Retail (All 284 Stores)',
  type: 'company',
  storeCount: 284,
  children: [
    {
      id: 'reg-north',
      name: 'North Region',
      type: 'region',
      storeCount: 82,
      children: [
        {
          id: 'clu-delhi-ncr',
          name: 'Delhi NCR Cluster',
          type: 'cluster',
          storeCount: 44,
          children: [
            {
              id: 'zone-delhi-central',
              name: 'Central & South Delhi Zone',
              type: 'zone',
              storeCount: 14,
              children: northCentralDelhi,
            },
            {
              id: 'zone-delhi-gurgaon',
              name: 'Gurgaon & Noida Tech Zone',
              type: 'zone',
              storeCount: 18,
              children: northGurgaonNoida,
            },
            {
              id: 'zone-delhi-west',
              name: 'North & West Delhi Zone',
              type: 'zone',
              storeCount: 12,
              children: northWestDelhi,
            },
          ],
        },
        {
          id: 'clu-punjab',
          name: 'Punjab & Chandigarh Cluster',
          type: 'cluster',
          storeCount: 22,
          children: [
            {
              id: 'zone-chandigarh',
              name: 'Chandigarh Tricity Zone',
              type: 'zone',
              storeCount: 12,
              children: northChandigarh,
            },
            {
              id: 'zone-ludhiana',
              name: 'Ludhiana & Amritsar Hub Zone',
              type: 'zone',
              storeCount: 10,
              children: northLudhiana,
            },
          ],
        },
        {
          id: 'clu-up-raj',
          name: 'UP & Rajasthan Cluster',
          type: 'cluster',
          storeCount: 16,
          children: [
            {
              id: 'zone-jaipur',
              name: 'Jaipur City Zone',
              type: 'zone',
              storeCount: 9,
              children: northJaipur,
            },
            {
              id: 'zone-lucknow',
              name: 'Lucknow & Kanpur Zone',
              type: 'zone',
              storeCount: 7,
              children: northLucknow,
            },
          ],
        },
      ],
    },
    {
      id: 'reg-west',
      name: 'West Region',
      type: 'region',
      storeCount: 78,
      children: [
        {
          id: 'clu-mumbai',
          name: 'Mumbai Metropolitan Cluster',
          type: 'cluster',
          storeCount: 40,
          children: [
            {
              id: 'zone-mumbai-south',
              name: 'South Mumbai & Bandra Zone',
              type: 'zone',
              storeCount: 22,
              children: westSouthMumbai,
            },
            {
              id: 'zone-mumbai-thane',
              name: 'Thane & Navi Mumbai Zone',
              type: 'zone',
              storeCount: 18,
              children: westThane,
            },
          ],
        },
        {
          id: 'clu-pune-mh',
          name: 'Pune & Maharashtra Cluster',
          type: 'cluster',
          storeCount: 22,
          children: [
            {
              id: 'zone-pune',
              name: 'Pune Metro Zone',
              type: 'zone',
              storeCount: 14,
              children: westPune,
            },
            {
              id: 'zone-nagpur',
              name: 'Nagpur & Nashik Zone',
              type: 'zone',
              storeCount: 8,
              children: westNagpur,
            },
          ],
        },
        {
          id: 'clu-gujarat',
          name: 'Gujarat Commercial Cluster',
          type: 'cluster',
          storeCount: 16,
          children: [
            {
              id: 'zone-ahmedabad',
              name: 'Ahmedabad Commercial Zone',
              type: 'zone',
              storeCount: 10,
              children: westAhmedabad,
            },
            {
              id: 'zone-surat',
              name: 'Surat & Vadodara Zone',
              type: 'zone',
              storeCount: 6,
              children: westSurat,
            },
          ],
        },
      ],
    },
    {
      id: 'reg-south',
      name: 'South Region',
      type: 'region',
      storeCount: 74,
      children: [
        {
          id: 'clu-blr',
          name: 'Bengaluru Metro Cluster',
          type: 'cluster',
          storeCount: 34,
          children: [
            {
              id: 'zone-blr-tech',
              name: 'Bengaluru Tech Corridor Zone',
              type: 'zone',
              storeCount: 18,
              children: southCentralBLR,
            },
            {
              id: 'zone-blr-south',
              name: 'Bengaluru South & West Zone',
              type: 'zone',
              storeCount: 16,
              children: southResidentialBLR,
            },
          ],
        },
        {
          id: 'clu-tn',
          name: 'Chennai & Tamil Nadu Cluster',
          type: 'cluster',
          storeCount: 24,
          children: [
            {
              id: 'zone-chennai',
              name: 'Chennai Metro Zone',
              type: 'zone',
              storeCount: 14,
              children: southChennai,
            },
            {
              id: 'zone-coimbatore',
              name: 'Coimbatore Hub Zone',
              type: 'zone',
              storeCount: 10,
              children: southCoimbatore,
            },
          ],
        },
        {
          id: 'clu-hyd',
          name: 'Hyderabad & Telangana Cluster',
          type: 'cluster',
          storeCount: 16,
          children: [
            {
              id: 'zone-cyberabad',
              name: 'Cyberabad Tech Zone',
              type: 'zone',
              storeCount: 11,
              children: southCyberabad,
            },
            {
              id: 'zone-secunderabad',
              name: 'Secunderabad Twin City Zone',
              type: 'zone',
              storeCount: 5,
              children: southSecunderabad,
            },
          ],
        },
      ],
    },
    {
      id: 'reg-east',
      name: 'East Region',
      type: 'region',
      storeCount: 50,
      children: [
        {
          id: 'clu-kolkata',
          name: 'Kolkata & Bengal Cluster',
          type: 'cluster',
          storeCount: 28,
          children: [
            {
              id: 'zone-kolkata-metro',
              name: 'Kolkata Central Zone',
              type: 'zone',
              storeCount: 18,
              children: eastKolkata,
            },
            {
              id: 'zone-howrah',
              name: 'Howrah & Durgapur Zone',
              type: 'zone',
              storeCount: 10,
              children: eastHowrah,
            },
          ],
        },
        {
          id: 'clu-odisha-bihar',
          name: 'Odisha & Bihar Cluster',
          type: 'cluster',
          storeCount: 12,
          children: [
            {
              id: 'zone-bhubaneswar',
              name: 'Bhubaneswar Capital Zone',
              type: 'zone',
              storeCount: 7,
              children: eastBhubaneswar,
            },
            {
              id: 'zone-patna',
              name: 'Patna City Zone',
              type: 'zone',
              storeCount: 5,
              children: eastPatna,
            },
          ],
        },
        {
          id: 'clu-northeast',
          name: 'North East Gateway Cluster',
          type: 'cluster',
          storeCount: 10,
          children: [
            {
              id: 'zone-guwahati',
              name: 'Guwahati Gateway Zone',
              type: 'zone',
              storeCount: 6,
              children: eastGuwahati,
            },
            {
              id: 'zone-shillong',
              name: 'Shillong & Siliguri Zone',
              type: 'zone',
              storeCount: 4,
              children: eastShillong,
            },
          ],
        },
      ],
    },
  ],
};

export interface StoreInteriorImage {
  src: string;
  fallbackSrc: string;
  title: string;
  zone: string;
  description: string;
}

// Curated authentic photographs of the inside of The ArKitects electronics & appliance retail showrooms
export const REAL_STORE_IMAGES: StoreInteriorImage[] = [
  {
    src: '/stores/store-flagship-floor.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80',
    title: 'Central Electronics Experience Floor',
    zone: 'Showroom Floor & Display Tables',
    description: 'Illuminated display pods featuring smartphones, tablets, and smart wearables.',
  },
  {
    src: '/stores/store-tv-entertainment.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
    title: 'OLED & 8K Cinema Gallery',
    zone: 'Home Entertainment Department',
    description: 'Wall-mounted 4K and 8K OLED screens with interactive demonstration consoles.',
  },
  {
    src: '/stores/store-gadgets-tables.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
    title: 'Smart Devices & Wearables Hub',
    zone: 'Connected Tech Zone',
    description: 'Customer hands-on experience tables for smartwatches, fitness bands, and drones.',
  },
  {
    src: '/stores/store-audio-lounge.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80',
    title: 'Hi-Fi Audio & Soundbar Lounge',
    zone: 'Acoustics & Headphones Studio',
    description: 'Dedicated sound testing lounge with noise-canceling headphones and soundbars.',
  },
  {
    src: '/stores/store-laptop-computing.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
    title: 'Computing & Creator Desks',
    zone: 'Laptops & Workstations',
    description: 'Ergonomic display desks with creator ultrabooks, gaming rigs, and curved monitors.',
  },
  {
    src: '/stores/store-appliances-hall.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1200&q=80',
    title: 'Smart Living & Kitchen Tech',
    zone: 'Major Home Appliances',
    description: 'Inverter air conditioners, multi-door refrigerators, and kitchen appliances.',
  },
  {
    src: '/stores/store-smart-home.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    title: 'Smart Home & IoT Experience',
    zone: 'Home Automation Showcase',
    description: 'Integrated smart lighting, digital door locks, and voice assistant setups.',
  },
  {
    src: '/stores/store-retail-aisle.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=1200&q=80',
    title: 'Main Showroom Avenue',
    zone: 'Retail Experience Promenade',
    description: 'Wide, brightly illuminated store corridor connecting customer demo zones and checkout.',
  },
];

// Returns real store interior image directly linked to the specific node selected
export function getStoreImageForNode(node: StoreNode, tick: number = 0): StoreInteriorImage {
  let hash = 0;
  for (let i = 0; i < node.id.length; i++) {
    hash = (hash * 37 + node.id.charCodeAt(i)) % 1000;
  }
  const index = Math.abs(hash + tick) % REAL_STORE_IMAGES.length;
  return REAL_STORE_IMAGES[index];
}

// Backward compatibility
export const RETAIL_CAMERA_FEEDS = REAL_STORE_IMAGES.map((img, i) => ({
  id: `cam-${i + 1}`,
  label: `${img.title} #${i + 1}`,
  tag: 'Store Interior',
  image: img.src,
  description: img.description,
}));

// Deterministic node sub-KPI calculator for Part B based on node name and persona
export function getNodeSubKPIs(node: StoreNode, persona: PersonaType) {
  let seed = 0;
  for (let i = 0; i < node.name.length; i++) {
    seed = (seed * 31 + node.name.charCodeAt(i)) % 1000;
  }
  const variance = (seed % 20) - 10;

  switch (persona) {
    case 'Chief Financial Officer (CFO)':
      return [
        { label: 'Profit margin %', value: `${(18.4 + variance * 0.15).toFixed(1)}%`, trend: variance >= 0 ? '+1.2%' : '-0.8%', isPositive: variance >= 0 },
        { label: 'Cash flow velocity', value: `₹${Math.max(12, Math.round(48 + variance * 2))} L/wk`, trend: '+4.5%', isPositive: true },
        { label: 'Return on ad spend', value: `₹${(3.8 + variance * 0.05).toFixed(1)} per ₹1`, trend: '+0.4', isPositive: true },
        { label: 'Budget used vs plan', value: `${Math.min(99, Math.max(82, 91 + variance))}%`, trend: 'On track', isPositive: true },
        { label: 'Money stuck in unsold stock', value: `₹${(1.8 + Math.abs(variance) * 0.12).toFixed(1)} Cr`, trend: variance > 0 ? '-8%' : '+4%', isPositive: variance > 0 },
      ];
    case 'Chief People Officer (CHRO)':
      return [
        { label: 'Employee happiness score', value: `${Math.min(96, Math.max(76, 84 + variance))}/100`, trend: '+3 pts', isPositive: true },
        { label: 'Employees leaving', value: `${(6.8 + Math.abs(variance) * 0.08).toFixed(1)}%`, trend: '-0.4%', isPositive: true },
        { label: 'Open jobs being filled', value: `${Math.max(2, Math.round(node.storeCount * 0.8 + variance * 0.2))} roles`, trend: 'Active', isPositive: true },
        { label: 'AI vs human work split', value: `${Math.min(52, Math.max(34, 41 + variance))}% AI`, trend: '+5% AI share', isPositive: true },
        { label: 'Skills covered', value: `${Math.min(98, Math.max(85, 92 + variance * 0.4))}%`, trend: 'Skill gap 8%', isPositive: true },
      ];
    case 'Chief Digital & Technology Officer (CDTO)':
      return [
        { label: 'Hours saved by AI', value: `${Math.round(node.storeCount * 65 + variance * 4)} hrs`, trend: '+18% vs mo', isPositive: true },
        { label: 'Monthly AI cost', value: `₹${(0.05 * node.storeCount + 0.1).toFixed(2)} L`, trend: '-6% unit cost', isPositive: true },
        { label: 'Time systems worked without break', value: '99.96%', trend: 'Zero outage', isPositive: true },
        { label: 'How many staff use tools', value: `${Math.min(97, Math.max(80, 89 + variance))}%`, trend: '+3%', isPositive: true },
        { label: 'Data sources connected', value: `${node.storeCount > 10 ? '42/48' : '12/12'} tools`, trend: 'Live sync', isPositive: true },
      ];
    case 'Chief Operations & Supply Chain Officer (COSO)':
      return [
        { label: 'Orders delivered on time', value: `${(96.2 + variance * 0.1).toFixed(1)}%`, trend: '+1.4%', isPositive: true },
        { label: 'Stock available vs demand', value: `${Math.min(99, Math.max(86, 94 + variance))}%`, trend: 'Healthy', isPositive: true },
        { label: 'Festive stock arrival vs plan', value: `${Math.min(98, Math.max(82, 91 + variance * 0.6))}%`, trend: '+8% vs wk', isPositive: true },
        { label: 'Delivery cost per order', value: `₹${Math.max(140, Math.round(185 + variance * 2))}`, trend: '-₹14/order', isPositive: true },
        { label: 'Damaged or lost goods %', value: `${(0.42 + Math.abs(variance) * 0.01).toFixed(2)}%`, trend: '-0.08%', isPositive: true },
      ];
    default: // CEO
      return [
        { label: 'Revenue vs target', value: `${Math.min(115, Math.max(94, 104 + variance))}%`, trend: '+8% vs yr', isPositive: true },
        { label: 'Customer happiness score', value: `${Math.min(92, Math.max(68, 74 + variance))}/100`, trend: '+4 pts', isPositive: true },
        { label: 'Market share vs top 3 rivals', value: `${(24.2 + variance * 0.2).toFixed(1)}%`, trend: 'Rank #1', isPositive: true },
        { label: 'Profit margin %', value: `${(18.4 + variance * 0.15).toFixed(1)}%`, trend: '+0.6%', isPositive: true },
        { label: 'Top category growth', value: '+34% ACs', trend: '+22% TVs', isPositive: true },
      ];
  }
}

// Generates a clickable detailed KPICardData for node-specific sub-KPI cards
export function getNodeDetailedKPICard(
  subKpi: { label: string; value: string; trend: string; isPositive: boolean },
  node: StoreNode,
  persona: PersonaType
) {
  const isSingleStore = node.type === 'store';
  const managerName = isSingleStore ? `Manager of ${node.name}` : `Director of ${node.name}`;
  const managerPhone = '+91 98200 ' + Math.floor(10000 + Math.random() * 89999);
  const managerEmail = `${node.id.toLowerCase().replace(/[^a-z0-9]/g, '')}.lead@thearkitects.in`;

  return {
    id: `node-kpi-${node.id}-${subKpi.label.replace(/\s+/g, '-').toLowerCase()}`,
    title: subKpi.label,
    value: subKpi.value,
    unit: node.name,
    trend: subKpi.trend,
    trendDirection: subKpi.isPositive ? ('up' as const) : ('down' as const),
    trendPositive: subKpi.isPositive,
    sparkline: [65, 72, 70, 78, 84, 88, 92],
    industryBenchmark: {
      value: 'National Store Avg: 91.5%',
      comparisonText: '+6.2% above peer average',
      isBeatingBenchmark: true,
      benchmarkSource: 'All-India Retail Electronics Performance Index',
    },
    detailTitle: `${subKpi.label} Detail • ${node.name}`,
    detailDescription: `Store-level metrics and verified performance breakdown for ${node.name} (${node.storeCount} physical store${node.storeCount > 1 ? 's' : ''}).`,
    detailItems: [
      { label: 'Current Performance Metric', value: subKpi.value, badge: 'Live Node', isPositive: subKpi.isPositive },
      { label: 'Variance against National Plan', value: subKpi.trend, subtext: 'Updated from POS data feed', isPositive: subKpi.isPositive },
      { label: 'Top Contributor Category', value: '4K OLED Smart TVs (55"+)', subtext: '38% of local revenue volume', isPositive: true },
      { label: 'Second Contributor Category', value: 'Inverter 5-Star Split ACs', subtext: '28% of local revenue volume', isPositive: true },
      { label: 'Store Footfall Conversion Rate', value: '28.4%', subtext: '1 in 3.5 walk-in visitors made purchase', isPositive: true },
      { label: 'Inventory Health Index', value: '96.2% Available', subtext: 'Zero out-of-stock flags reported', isPositive: true },
    ],
    leadContact: {
      name: managerName,
      role: isSingleStore ? 'Store Operations Lead' : 'Cluster Operations Director',
      department: `${node.type.toUpperCase()} Operations Management`,
      email: managerEmail,
      phone: managerPhone,
    },
  };
}

