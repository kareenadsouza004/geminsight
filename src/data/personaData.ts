import {
  KPICardData,
  ExtraDashboardData,
  IntelligenceItem,
  RadarItem,
  StrategyItem,
  PersonaType,
} from '../types';

export interface PersonaDataBundle {
  kpiCards: KPICardData[];
  extraDashboards: ExtraDashboardData[];
  intelligence: IntelligenceItem[];
  risks: RadarItem[];
  opportunities: RadarItem[];
  strategies: StrategyItem[];
  starterQuestions: string[];
}

const RAW_PERSONA_DATA: Record<PersonaType, any> = {
  'Chief Financial Officer (CFO)': {
  "kpiCards": [
    {
      "id": "cfo-margin",
      "title": "Profit margin %",
      "value": "18.4%",
      "trend": "+1.2% vs last quarter",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "14.6%",
        "comparisonText": "+3.8% ahead of peers",
        "isBeatingBenchmark": true,
        "benchmarkSource": "National Consumer Electronics Retail Benchmark"
      },
      "sparkline": [
        16.8,
        17.1,
        17,
        17.4,
        17.8,
        18.1,
        18.4
      ],
      "detailTitle": "Top 5 and Lowest 5 Products by Profit Margin",
      "detailDescription": "Smart consumer tech and premium kitchen items carry our highest profits, while entry-level phones have slim profits.",
      "detailItems": [
        {
          "label": "OLED 4K Smart TVs (55\"+)",
          "value": "31.2% margin",
          "badge": "Top 1",
          "isPositive": true
        },
        {
          "label": "Inverter 5-Star Split ACs",
          "value": "28.6% margin",
          "badge": "Top 2",
          "isPositive": true
        },
        {
          "label": "Smart Convection Air Fryers",
          "value": "26.4% margin",
          "badge": "Top 3",
          "isPositive": true
        },
        {
          "label": "Premium Noise-Cancelling Headphones",
          "value": "25.1% margin",
          "badge": "Top 4",
          "isPositive": true
        },
        {
          "label": "Front-Load Smart Washers",
          "value": "23.8% margin",
          "badge": "Top 5",
          "isPositive": true
        },
        {
          "label": "USB-C Charging Cables",
          "value": "4.2% margin",
          "badge": "Lowest 5",
          "isPositive": false
        },
        {
          "label": "Budget Feature Phones",
          "value": "5.1% margin",
          "badge": "Lowest 4",
          "isPositive": false
        },
        {
          "label": "Entry 32-inch HD LED TVs",
          "value": "6.4% margin",
          "badge": "Lowest 3",
          "isPositive": false
        },
        {
          "label": "Alkaline AA Battery Packs",
          "value": "6.8% margin",
          "badge": "Lowest 2",
          "isPositive": false
        },
        {
          "label": "Basic Single-Door 190L Fridges",
          "value": "7.9% margin",
          "badge": "Lowest 1",
          "isPositive": false
        }
      ]
    },
    {
      "id": "cfo-cash",
      "title": "Cash available & days our cash will last",
      "value": "₹482 Cr",
      "unit": "48 days left",
      "trend": "+6 days vs target",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "32 Days",
        "comparisonText": "+16 days safer than industry avg",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Retail Treasury & Liquidity Standard"
      },
      "sparkline": [
        410,
        425,
        438,
        442,
        460,
        471,
        482
      ],
      "detailTitle": "Next 30 Days Cash Outlook",
      "detailDescription": "Projected cash inflows from festive retail sales vs planned supplier dues and lease payments.",
      "detailItems": [
        {
          "label": "Expected festive sales collections",
          "value": "+₹640 Cr",
          "subtext": "Peak Diwali shopping days",
          "isPositive": true
        },
        {
          "label": "Customer finance payouts from banks",
          "value": "+₹185 Cr",
          "subtext": "Zero-cost EMI settlements",
          "isPositive": true
        },
        {
          "label": "Supplier payments for electronics",
          "value": "-₹410 Cr",
          "subtext": "Due on 15th and 28th",
          "isPositive": false
        },
        {
          "label": "Store rent for 284 retail locations",
          "value": "-₹54 Cr",
          "subtext": "Scheduled for 1st of month",
          "isPositive": false
        },
        {
          "label": "Staff salaries and festive bonuses",
          "value": "-₹68 Cr",
          "subtext": "Scheduled payroll",
          "isPositive": false
        },
        {
          "label": "Projected month-end cash buffer",
          "value": "₹775 Cr",
          "subtext": "Safe buffer of 62 days",
          "isPositive": true
        }
      ]
    },
    {
      "id": "cfo-roas",
      "title": "Return on marketing spend",
      "value": "₹4.82",
      "unit": "per ₹1 spent",
      "trend": "+₹0.42 vs festive plan",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "₹3.20 / ₹1",
        "comparisonText": "+₹1.62 higher return than retail avg",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Omnichannel Ad Efficiency Index"
      },
      "sparkline": [
        3.9,
        4.1,
        4,
        4.3,
        4.5,
        4.7,
        4.82
      ],
      "detailTitle": "Top 10 Festive Promotions Ranked by Return",
      "detailDescription": "Performance of marketing campaigns across digital, print, and local store flyers.",
      "detailItems": [
        {
          "label": "Diwali Inverter AC Exchange Offer",
          "value": "₹7.80 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Buy TV Get Soundbar at 50% Off",
          "value": "₹6.90 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Upgrade to 5G Smartphone Weekend",
          "value": "₹6.20 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Smart Kitchen Festive Bundle",
          "value": "₹5.90 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Zero Down Payment Festive Finance",
          "value": "₹5.40 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Laptop Free Bag & Mouse Combo",
          "value": "₹4.90 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Double Door Refrigerator Festival",
          "value": "₹4.60 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Weekend Front-Load Washing Machine Deal",
          "value": "₹4.10 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Extended 3-Year Warranty Push",
          "value": "₹3.90 earned per ₹1",
          "isPositive": true
        },
        {
          "label": "Smartwatch Festive Gift Card",
          "value": "₹3.20 earned per ₹1",
          "isPositive": true
        }
      ]
    },
    {
      "id": "cfo-budget",
      "title": "Budget used vs budget planned",
      "value": "91.2%",
      "unit": "₹820 Cr / ₹900 Cr",
      "trend": "₹80 Cr unspent buffer",
      "trendDirection": "neutral",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "98.5%",
        "comparisonText": "7.3% better cost control",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Large Enterprise SG&A Variance Metric"
      },
      "sparkline": [
        75,
        78,
        82,
        85,
        87,
        89,
        91.2
      ],
      "detailTitle": "Budget Used Split by Department",
      "detailDescription": "Department spending tracked against the quarterly allocation approved by the board.",
      "detailItems": [
        {
          "label": "Store Operations & Energy",
          "value": "94% used",
          "subtext": "₹376 Cr of ₹400 Cr"
        },
        {
          "label": "Marketing & Festive Campaigns",
          "value": "92% used",
          "subtext": "₹184 Cr of ₹200 Cr"
        },
        {
          "label": "Logistics & Warehousing",
          "value": "89% used",
          "subtext": "₹133 Cr of ₹150 Cr"
        },
        {
          "label": "Information Technology & AI Tools",
          "value": "86% used",
          "subtext": "₹77 Cr of ₹90 Cr"
        },
        {
          "label": "People & Corporate Support",
          "value": "83% used",
          "subtext": "₹50 Cr of ₹60 Cr"
        }
      ]
    },
    {
      "id": "cfo-stock",
      "title": "Money stuck in unsold stock",
      "value": "₹84.5 Cr",
      "unit": "7.1% of inventory",
      "trend": "-₹12 Cr cleared this month",
      "trendDirection": "down",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "11.8%",
        "comparisonText": "4.7% less locked capital",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Consumer Tech Inventory Velocity Standard"
      },
      "sparkline": [
        108,
        102,
        98,
        95,
        91,
        88,
        84.5
      ],
      "detailTitle": "Top 5 Unsold Items Tying Up Capital",
      "detailDescription": "Slow-moving products in warehouses older than 60 days needing discount clearance.",
      "detailItems": [
        {
          "label": "Previous Generation 4G Flagship Phones",
          "value": "₹28.4 Cr stuck",
          "subtext": "4,100 units in North warehouses",
          "isPositive": false
        },
        {
          "label": "Non-Inverter 1.5 Ton Window ACs",
          "value": "₹19.2 Cr stuck",
          "subtext": "5,800 units across West stores",
          "isPositive": false
        },
        {
          "label": "Basic Single-Door 190L Refrigerators",
          "value": "₹14.6 Cr stuck",
          "subtext": "6,200 units in East warehouses",
          "isPositive": false
        },
        {
          "label": "Old Model 43-inch Non-Smart LED TVs",
          "value": "₹12.1 Cr stuck",
          "subtext": "3,900 units across Central stores",
          "isPositive": false
        },
        {
          "label": "Corded Vacuum Cleaners",
          "value": "₹10.2 Cr stuck",
          "subtext": "8,400 units in South hub",
          "isPositive": false
        }
      ]
    }
  ],
  "extraDashboards": [
    {
      "title": "Monthly Cash Inflow vs Outflow",
      "subtitle": "Values in ₹ Crore across the last 4 months",
      "type": "bar",
      "items": [
        {
          "label": "July",
          "value": 410,
          "target": 380,
          "secondary": "Outflow ₹390 Cr"
        },
        {
          "label": "August",
          "value": 460,
          "target": 420,
          "secondary": "Outflow ₹430 Cr"
        },
        {
          "label": "September",
          "value": 520,
          "target": 490,
          "secondary": "Outflow ₹480 Cr"
        },
        {
          "label": "October (Est.)",
          "value": 640,
          "target": 580,
          "secondary": "Outflow ₹540 Cr"
        }
      ]
    },
    {
      "title": "Payment Reconciliation Health",
      "subtitle": "Live status of bank credit card & UPI settlements",
      "type": "donut",
      "items": [
        {
          "label": "Auto-settled within 2 hrs",
          "value": "98.4%",
          "color": "#10b981"
        },
        {
          "label": "Pending bank verification",
          "value": "1.2%",
          "color": "#f59e0b"
        },
        {
          "label": "Vendor mismatch flags",
          "value": "0.4%",
          "color": "#ef4444"
        }
      ]
    }
  ],
  "intelligence": [
    {
      "id": "cfo-int-1",
      "headline": "Diwali early bird appliance sales push quarterly profit margin up",
      "oneLiner": "Customers picked higher margin 5-star appliances over budget models.",
      "source": "Internal – Finance S/4HANA",
      "timeAgo": "45 mins ago",
      "tag": "Good",
      "fullDetail": "Sales across 284 stores show premium inverter ACs and French-door refrigerators accounted for 62% of volume, improving our blended gross profit margin by 1.2% over target."
    },
    {
      "id": "cfo-int-2",
      "headline": "Automated invoice matching cleared 89 percent vendor bills instantly",
      "oneLiner": "AI bots processed ₹310 Crore in goods receipts without human delay.",
      "source": "Internal – Accounts Payable Bot",
      "timeAgo": "1 hr ago",
      "tag": "Good",
      "fullDetail": "3,840 invoices from consumer electronics suppliers were matched automatically to warehouse delivery notes, catching 14 duplicate charges worth ₹48 Lakh before payment."
    },
    {
      "id": "cfo-int-3",
      "headline": "Reserve Bank keeps benchmark loan interest rates steady at 6.5 percent",
      "oneLiner": "Customer interest rates for store electronic installment plans remain attractive.",
      "source": "Economic Times",
      "timeAgo": "2 hrs ago",
      "tag": "Good",
      "fullDetail": "Steady lending rates ensure our partner banks can continue offering zero-cost monthly installment plans during the entire 30-day festive shopping season."
    },
    {
      "id": "cfo-int-4",
      "headline": "One key TV glass supplier delayed rebate credit of four crore",
      "oneLiner": "Credit note expected on Monday has not arrived in our bank account.",
      "source": "Internal – SAP Transaction Alert",
      "timeAgo": "3 hrs ago",
      "tag": "Bad",
      "fullDetail": "The vendor agreement required a ₹4.2 Crore festive volume rebate on 55-inch OLED displays. Finance ledger flagged the missing credit voucher during morning bank reconciliation."
    },
    {
      "id": "cfo-int-5",
      "headline": "Store electricity consumption dropped eight percent with smart thermostats",
      "oneLiner": "Automated AC chillers across 284 showrooms saved ₹1.2 Crore this month.",
      "source": "Internal – Energy IoT Dashboard",
      "timeAgo": "4 hrs ago",
      "tag": "Good",
      "fullDetail": "Smart climate controllers lowered AC power draw during low-footfall morning hours without reducing customer comfort, saving an estimated ₹14.4 Lakh per week."
    }
  ],
  "risks": [
    {
      "id": "cfo-risk-1",
      "type": "risk",
      "category": "Tax & Compliance",
      "headline": "Unclaimed Goods & Services Tax credit expiring in 14 days",
      "description": "₹4.8 Crore in vendor tax credits are pending confirmation on the tax portal. If not resolved before month-end, the company permanently loses this cash credit.",
      "priority": "Critical",
      "sourceType": "Government GST Portal Alert & SAP ERP Reconciliation",
      "sourceDetail": {
        "senderOrDoc": "Directorate of GST Systems – Electronic Ledger Mismatch File #GST-2024-Q3-094",
        "timestamp": "Today at 08:15 AM IST",
        "snippet": "Tax invoices from 28 suppliers totalling ₹4,82,41,000 show variance between GSTR-2B credit advice and GSTR-3B filings. Auto-forfeiture in 14 days."
      },
      "recommendedSolutions": [
        "Run automated AI reconciliation bot against supplier GSTIN numbers and claim credit today.",
        "Instruct legal and finance accounts team to freeze next payment batch until suppliers upload invoice filings.",
        "Request an emergency 7-day correction window through our GST tax advisory firm."
      ]
    },
    {
      "id": "cfo-risk-2",
      "type": "risk",
      "category": "Finance & Banking",
      "headline": "Bank credit card processing terminal fees increased by 0.35 percent",
      "description": "A partner bank raised merchant interchange rates without 30 days prior written notice. This fee hike adds ₹2.1 Crore in unbudgeted store processing costs over festive shopping.",
      "priority": "Critical",
      "sourceType": "HDFC & ICICI Merchant Services Agreement Notification",
      "sourceDetail": {
        "senderOrDoc": "Payment Aggregator Gateway Operations – Revised Merchant Fee Schedule",
        "timestamp": "Yesterday at 06:40 PM IST",
        "snippet": "Point-of-Sale merchant discount rate adjusted from 1.15% to 1.50% on premium credit cards effective 1st of next month."
      },
      "recommendedSolutions": [
        "Route all store transactions above ₹10,000 to alternative partner banks with fixed 0.90% interchange fees.",
        "Incentivize store customers with an extra ₹500 discount when paying via UPI or direct bank transfer.",
        "File an immediate formal contractual protest demanding waiver of the unscheduled fee increase."
      ]
    },
    {
      "id": "cfo-risk-3",
      "type": "risk",
      "category": "Working Capital & Inventory",
      "headline": "₹34 Crore in slow-moving 4G smartphones losing value in North stores",
      "description": "Customers are switching exclusively to 5G models. North zone stores hold 4,800 unsold 4G phones whose trade-in value drops 8 percent every month.",
      "priority": "Medium",
      "sourceType": "SAP S/4HANA Inventory Valuation Report – North Zone Warehouse",
      "sourceDetail": {
        "senderOrDoc": "Merchandising Audit – SKU Stock Aging Analysis (North 72 Showrooms)",
        "timestamp": "Today at 07:30 AM IST",
        "snippet": "4G smartphone stock aged >75 days is valued at ₹34.2 Crore. Resale market prices are dropping 2.1% week-on-week."
      },
      "recommendedSolutions": [
        "Launch a festive \"Trade-in your old 4G for new 5G\" clearance promotion across all North stores.",
        "Bundle unsold 4G phones with home appliance packages at wholesale cost to liquidate inventory.",
        "Consolidate all 4G stock and liquidate via B2B wholesale liquidators in Tier-3 markets."
      ]
    },
    {
      "id": "cfo-risk-4",
      "type": "risk",
      "category": "Store Operational Expenditure",
      "headline": "Store showroom air conditioning energy costs surging 12 percent over budget",
      "description": "Prolonged warm weather in Western and Southern states forced stores to run chillers at full capacity. Energy bills are trending ₹3.8 Crore above monthly forecast.",
      "priority": "Medium",
      "sourceType": "Schneider Electric IoT Energy Management Dashboard",
      "sourceDetail": {
        "senderOrDoc": "Facility Management Telemetry – West & South Store Grid Consumption",
        "timestamp": "Yesterday at 11:15 PM IST",
        "snippet": "Average showroom energy consumption reached 148 kWh/sq.ft vs target 126 kWh/sq.ft across 114 Western and Southern showrooms."
      },
      "recommendedSolutions": [
        "Deploy automated chiller temperature cycling: set thermostats to 24°C between 10 AM and 2 PM.",
        "Accelerate rooftop solar panel activation at 42 company-owned store properties.",
        "Negotiate off-peak industrial power tariff agreements with state electricity distribution boards."
      ]
    },
    {
      "id": "cfo-risk-5",
      "type": "risk",
      "category": "Forex & Import Costs",
      "headline": "Currency fluctuation increased imported TV display glass procurement cost",
      "description": "US Dollar strength against Rupee increased landed costs for imported 65-inch OLED glass panels by 4.2 percent. Blended margin on large TVs could drop from 31% to 27%.",
      "priority": "Low",
      "sourceType": "Treasury Forex Hedging Ledger & Customs Import Invoices",
      "sourceDetail": {
        "senderOrDoc": "Corporate Treasury – USD/INR Forward Contract Maturity Report",
        "timestamp": "Today at 09:00 AM IST",
        "snippet": "Spot exchange rate crossed ₹84.20/USD. Unhedged open import contracts for November TV deliveries total $18.5 Million."
      },
      "recommendedSolutions": [
        "Book forward forex hedging contracts for the remaining $18.5 Million import commitments today.",
        "Shift 20% of display panel procurement to domestic assembly partners in Tamil Nadu.",
        "Adjust festive retail prices slightly on 65-inch models while bundling free 3-year warranty."
      ]
    }
  ],
  "opportunities": [
    {
      "id": "cfo-opp-1",
      "type": "opportunity",
      "category": "Vendor Finance & Discounts",
      "headline": "Early supplier payment discount offers ₹8.4 Crore immediate savings",
      "description": "Top electronics brands offer a 2.5 percent cash discount if we settle purchase invoices in 7 days instead of 45 days. Our ₹482 Crore cash reserve easily covers this with high return.",
      "priority": "Critical",
      "sourceType": "Commercial Procurement Agreements – Samsung, LG & Sony Vendor Contracts",
      "sourceDetail": {
        "senderOrDoc": "Accounts Payable Dynamic Discounting Engine – Working Capital Optimizer",
        "timestamp": "Today at 08:45 AM IST",
        "snippet": "Approved invoices eligible for early cash discount total ₹336 Crore. Early settlement yields net savings of ₹8,40,00,000."
      },
      "recommendedSolutions": [
        "Approve automated early payment run for top 3 appliance makers to lock in ₹8.4 Crore cash discount.",
        "Extend dynamic discounting to next tier of 15 domestic kitchen appliance suppliers.",
        "Maintain a rolling ₹200 Crore treasury buffer specifically allocated for early supplier discount capture."
      ]
    },
    {
      "id": "cfo-opp-2",
      "type": "opportunity",
      "category": "Credit & Payment Optimization",
      "headline": "State Bank UPI merchant partnership saves ₹4.6 Crore in transaction fees",
      "description": "Partnering with National Payments Corporation for zero-fee in-store QR code payments reduces credit card swipe charges. Customers get instant ₹100 festive cash vouchers.",
      "priority": "Medium",
      "sourceType": "NPCI & SBI Digital Merchant Partnership Proposal",
      "sourceDetail": {
        "senderOrDoc": "Retail Banking Commercial Term Sheet – UPI Merchant Direct Rail",
        "timestamp": "Yesterday at 04:30 PM IST",
        "snippet": "Zero interchange fee on transactions up to ₹1,00,000 with next-morning automatic bank settlement."
      },
      "recommendedSolutions": [
        "Roll out dedicated SBI-UPI dynamic payment displays at all 1,200 store billing counters by Friday.",
        "Train billing staff to recommend QR code payment to every shopper spending over ₹5,000.",
        "Reallocate ₹1.2 Crore of card fee savings into festive scratch-and-win customer incentives."
      ]
    },
    {
      "id": "cfo-opp-3",
      "type": "opportunity",
      "category": "Capital Real Estate",
      "headline": "Sale and leaseback of 4 company-owned warehouses unlocks ₹92 Crore cash",
      "description": "Institutional real estate fund offered attractive valuation to buy and lease back our distribution centers in Pune and Noida. Unlocks cash to open 18 new stores.",
      "priority": "Low",
      "sourceType": "Blackstone Logistics Real Estate Advisory Memorandum",
      "sourceDetail": {
        "senderOrDoc": "Corporate Development – Real Estate Asset Monetization Assessment",
        "timestamp": "Yesterday at 02:15 PM IST",
        "snippet": "Indicative binding offer received at ₹92.5 Crore with guaranteed 15-year lease at 6.8% annual rental yield."
      },
      "recommendedSolutions": [
        "Approve term sheet for Pune logistics hub sale-and-leaseback to release ₹48 Crore immediate cash.",
        "Use unlocked capital to fund new store showroom fit-outs in fast-growing Tier-2 smart cities.",
        "Lock in fixed rent escalation terms of not more than 4.5% every three years."
      ]
    }
  ],
  "strategies": [
    {
      "id": "strat-1",
      "title": "Dynamic Vendor Cash Discount Capture",
      "twoSentenceDetail": "Automated treasury bot detects supplier bills offering cash discounts for prompt payment. Dispatches funds to earn guaranteed 2.5 percent return on cash.",
      "tag": "Good",
      "percentCompleted": 68,
      "actions": [
        {
          "id": "act-1",
          "header": "Scan and match 1,420 festive supplier invoices",
          "bullet1": "Identified ₹336 Crore in bills eligible for early payment discounts",
          "bullet2": "Verified warehouse goods receipt seals and quality acceptance stamps",
          "assignedTo": "TreasuryBot AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "act-2",
          "header": "Simulate company bank balance after ₹336 Crore payout",
          "bullet1": "Confirmed cash balance stays safely above ₹146 Crore minimum safety buffer",
          "bullet2": "No overdraft or high-interest short-term credit line needed",
          "assignedTo": "LiquiditySim AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "act-3",
          "header": "Trigger batch bank payment to top three electronics makers",
          "bullet1": "Direct transfer to Samsung, LG, and Sony corporate settlement accounts",
          "bullet2": "Captures ₹8.4 Crore in confirmed cash rebate savings",
          "assignedTo": "PayoutSync AI",
          "isAI": true,
          "status": "In progress",
          "progress": 60
        },
        {
          "id": "act-4",
          "header": "Executive signature and digital authorization on payment voucher",
          "bullet1": "Final treasury sign-off for payouts exceeding ₹50 Crore batch size",
          "bullet2": "Requires CFO digital cryptographic key token approval",
          "assignedTo": "Anand Khurana",
          "isAI": false,
          "status": "Waiting",
          "progress": 15
        }
      ]
    },
    {
      "id": "strat-2",
      "title": "Autonomous Energy & Climate Control Optimization",
      "twoSentenceDetail": "Smart building system modulates store temperatures based on footfall heat load and electricity tariffs. Keeps showroom energy expenses below budgeted threshold.",
      "tag": "Good",
      "percentCompleted": 45,
      "actions": [
        {
          "id": "act-5",
          "header": "Collect temperature and customer footfall readings across 284 stores",
          "bullet1": "Analyzed 1.8 million sensor data points from smart thermostats",
          "bullet2": "Identified 48 stores where cooling ran needlessly before opening hours",
          "assignedTo": "IoTGrid AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "act-6",
          "header": "Transmit smart schedule adjustments to store chiller units",
          "bullet1": "Shifted pre-cooling cycles to morning off-peak electricity rate hours",
          "bullet2": "Maintains 23.5°C showroom floor climate without spikes in power demand",
          "assignedTo": "ClimateSync AI",
          "isAI": true,
          "status": "In progress",
          "progress": 55
        },
        {
          "id": "act-7",
          "header": "Verify month-end utility bills against automated energy logs",
          "bullet1": "Cross-check electricity board invoices against telemetry records",
          "bullet2": "Confirm ₹1.2 Crore reduction in monthly operating expenditure",
          "assignedTo": "EnergyAudit AI",
          "isAI": true,
          "status": "Waiting",
          "progress": 25
        },
        {
          "id": "act-8",
          "header": "Sign off on new solar power installation contract for 42 stores",
          "bullet1": "Review 15-year power purchase agreement terms with solar contractor",
          "bullet2": "Approve ₹18 Crore capital outlay with estimated 3.2 year payback",
          "assignedTo": "Anand Khurana",
          "isAI": false,
          "status": "Waiting",
          "progress": 0
        }
      ]
    },
    {
      "id": "strat-3",
      "title": "Automated Tax Credit (GST) Ledger Reconciliation",
      "twoSentenceDetail": "Software bot compares every vendor tax invoice against government portal filings in real time. Eliminates cash loss from mismatched or unfiled tax credits.",
      "tag": "Good",
      "percentCompleted": 80,
      "actions": [
        {
          "id": "act-9",
          "header": "Scan and match 14,200 purchase invoices",
          "bullet1": "Discovered ₹5.12 Crore in approved tax credits from Q2",
          "bullet2": "Resolved 340 minor supplier invoice number typos",
          "assignedTo": "GSTAudit AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "act-10",
          "header": "Submit electronic credit claim on GSTN portal",
          "bullet1": "Generated signed digital tax reconciliation package",
          "bullet2": "Filed claim through government application interface",
          "assignedTo": "ComplianceBot AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "act-11",
          "header": "Verify tax credit reflection in electronic cash ledger",
          "bullet1": "Government portal accepted filing and updated cash credit balance",
          "bullet2": "Adjusted monthly tax deduction balance in SAP",
          "assignedTo": "ComplianceBot AI",
          "isAI": true,
          "status": "In progress",
          "progress": 85
        },
        {
          "id": "act-12",
          "header": "Final sign-off on adjusted quarterly tax filing",
          "bullet1": "Review reconciled ledger summary sheet",
          "bullet2": "Approve net reduced tax payment voucher of ₹14.8 Crore",
          "assignedTo": "Anand Khurana",
          "isAI": false,
          "status": "Waiting",
          "progress": 35
        }
      ]
    }
  ],
  "starterQuestions": [
    "Where is our company cash stuck right now?",
    "Which stores have the lowest profit margins this week?",
    "How much money can we save by paying top electronics suppliers early?",
    "What are our top 5 slowest selling products tying up working capital?"
  ]
},
  'Chief Executive Officer (CEO)': {
  "kpiCards": [
    {
      "id": "ceo-rev",
      "title": "Revenue vs target",
      "value": "104.2%",
      "unit": "₹1,240 Cr / ₹1,190 Cr",
      "trend": "+14% vs last year",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "96.5%",
        "comparisonText": "+7.7% faster run-rate",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Retail Electronics Sector Tracker"
      },
      "sparkline": [
        980,
        1020,
        1080,
        1120,
        1160,
        1205,
        1240
      ],
      "detailTitle": "Revenue Streams Breakdown",
      "detailDescription": "How sales are split across physical stores, online app delivery, and corporate gifting.",
      "detailItems": [
        {
          "label": "Walk-in Store Sales (284 stores)",
          "value": "₹912 Cr (73.5%)",
          "subtext": "Driven by weekend footfall",
          "isPositive": true
        },
        {
          "label": "Express Online & App Orders",
          "value": "₹224 Cr (18.1%)",
          "subtext": "3-hour delivery in 24 cities",
          "isPositive": true
        },
        {
          "label": "Corporate & Festive Gift Orders",
          "value": "₹104 Cr (8.4%)",
          "subtext": "Bulk smart device purchases",
          "isPositive": true
        }
      ]
    },
    {
      "id": "ceo-nps",
      "title": "Customer happiness score",
      "value": "74 / 100",
      "unit": "NPS",
      "trend": "+4 points vs industry (62)",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "62 / 100",
        "comparisonText": "+12 pts above industry",
        "isBeatingBenchmark": true,
        "benchmarkSource": "National Consumer Satisfaction Index"
      },
      "sparkline": [
        66,
        68,
        69,
        70,
        71,
        72,
        74
      ],
      "detailTitle": "Customer Feedback Themes & Channel Scores",
      "detailDescription": "What customers love most and where store teams can improve customer happiness.",
      "detailItems": [
        {
          "label": "Physical Store Experience",
          "value": "78 / 100",
          "subtext": "High praise for live TV & soundbar demos",
          "isPositive": true
        },
        {
          "label": "Express Home Delivery & Setup",
          "value": "76 / 100",
          "subtext": "Free installation within 24 hours",
          "isPositive": true
        },
        {
          "label": "Online App Browsing & Checkout",
          "value": "68 / 100",
          "subtext": "Search for cables and accessories is slow",
          "isPositive": false
        },
        {
          "label": "Top Customer Praise",
          "value": "Courteous store advisors & fair exchange values",
          "isPositive": true
        },
        {
          "label": "Top Customer Complaint",
          "value": "Billing queue wait during festive Sunday evenings",
          "isPositive": false
        }
      ]
    },
    {
      "id": "ceo-share",
      "title": "Market share vs top 3 competitors",
      "value": "24.2%",
      "unit": "Rank #1",
      "trend": "+3.1% lead over Competitor A",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "17.5%",
        "comparisonText": "Rank #1 (+6.7% lead)",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Electronics Retail Market Intelligence"
      },
      "sparkline": [
        21.5,
        22,
        22.4,
        23.1,
        23.5,
        23.9,
        24.2
      ],
      "detailTitle": "National Electronics Retail Market Shares",
      "detailDescription": "Retail market share estimates in large appliances and consumer electronics.",
      "detailItems": [
        {
          "label": "The ArKitects (Our Company)",
          "value": "24.2% share",
          "badge": "Market Leader",
          "isPositive": true
        },
        {
          "label": "Competitor A (Large Chain)",
          "value": "21.1% share",
          "subtext": "Strong in South, weak in East",
          "isPositive": false
        },
        {
          "label": "Competitor B (Hypermarket Chain)",
          "value": "16.4% share",
          "subtext": "Heavy focus on budget appliances",
          "isPositive": false
        },
        {
          "label": "Competitor C (Regional Chains)",
          "value": "12.8% share",
          "subtext": "Fragmented across 4 states",
          "isPositive": false
        },
        {
          "label": "Independent Electronics Dealers",
          "value": "25.5% share",
          "subtext": "Losing share to organised retail",
          "isPositive": true
        }
      ]
    },
    {
      "id": "ceo-margin",
      "title": "Profit margin %",
      "value": "18.4%",
      "trend": "+1.2% vs last quarter",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "14.6%",
        "comparisonText": "+3.8% ahead of market",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Consumer Electronics Financial Standard"
      },
      "sparkline": [
        16.8,
        17.1,
        17,
        17.4,
        17.8,
        18.1,
        18.4
      ],
      "detailTitle": "Product Groups Contributing Most to Company Profit",
      "detailDescription": "Higher share of premium appliances and audio gear lifted overall profit margin.",
      "detailItems": [
        {
          "label": "Air Conditioners & Cooling",
          "value": "28.6% margin",
          "subtext": "Contributes ₹94 Cr profit",
          "isPositive": true
        },
        {
          "label": "Televisions & Home Audio",
          "value": "27.4% margin",
          "subtext": "Contributes ₹82 Cr profit",
          "isPositive": true
        },
        {
          "label": "Kitchen & Home Appliances",
          "value": "24.2% margin",
          "subtext": "Contributes ₹52 Cr profit",
          "isPositive": true
        },
        {
          "label": "Computers & Tablets",
          "value": "14.1% margin",
          "subtext": "Contributes ₹34 Cr profit",
          "isPositive": true
        },
        {
          "label": "Mobile Phones & Wearables",
          "value": "11.8% margin",
          "subtext": "High volume, lean margin",
          "isPositive": true
        }
      ]
    },
    {
      "id": "ceo-growth",
      "title": "Festive AC & Cooling Growth",
      "value": "+26.4%",
      "unit": "YoY Growth",
      "trend": "+8.4% above target",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "+18.0%",
        "comparisonText": "+8.4% category surge",
        "isBeatingBenchmark": true,
        "benchmarkSource": "White Goods Association Data"
      },
      "sparkline": [
        14,
        16,
        18,
        20,
        22,
        24,
        26.4
      ],
      "detailTitle": "Appliance Category Growth Rates",
      "detailDescription": "Sales velocity across smart inverter air conditioners, smart refrigerators, and air purifiers.",
      "detailItems": [
        {
          "label": "Smart 5-Star Inverter ACs",
          "value": "+34.2% growth",
          "subtext": "All-time seasonal record",
          "isPositive": true
        },
        {
          "label": "French Door Refrigerators",
          "value": "+28.5% growth",
          "subtext": "High trade-in adoption",
          "isPositive": true
        },
        {
          "label": "HEPA Smart Air Purifiers",
          "value": "+31.0% growth",
          "subtext": "Surge in North NCR cluster",
          "isPositive": true
        }
      ]
    }
  ],
  "extraDashboards": [
    {
      "title": "Regional Revenue Performance",
      "subtitle": "Target vs Actual in ₹ Crore by Region",
      "type": "bar",
      "items": [
        {
          "label": "North Region",
          "value": 412,
          "target": 380,
          "secondary": "Actual ₹412 Cr vs Target ₹380 Cr"
        },
        {
          "label": "West Region",
          "value": 376,
          "target": 350,
          "secondary": "Actual ₹376 Cr vs Target ₹350 Cr"
        },
        {
          "label": "South Region",
          "value": 298,
          "target": 310,
          "secondary": "Actual ₹298 Cr vs Target ₹310 Cr"
        },
        {
          "label": "East Region",
          "value": 154,
          "target": 150,
          "secondary": "Actual ₹154 Cr vs Target ₹150 Cr"
        }
      ]
    },
    {
      "title": "Store Expansion & Format Health",
      "subtitle": "Distribution of 284 retail stores by tier",
      "type": "donut",
      "items": [
        {
          "label": "Flagship Experience Hubs",
          "value": "42 stores",
          "color": "#4285F4"
        },
        {
          "label": "Tier-1 Metro Showrooms",
          "value": "118 stores",
          "color": "#34A853"
        },
        {
          "label": "Tier-2 & 3 Growth Outlets",
          "value": "124 stores",
          "color": "#FBBC05"
        }
      ]
    }
  ],
  "intelligence": [
    {
      "id": "ceo-int-1",
      "headline": "The ArKitects achieves record festive revenue run-rate across 284 stores",
      "oneLiner": "National festive sales surpass ₹1,240 Crore milestone with 104 percent target achievement.",
      "source": "Internal – Enterprise Cockpit",
      "timeAgo": "15 mins ago",
      "tag": "Good",
      "fullDetail": "Strong demand for premium 65-inch OLED televisions and 5-star inverter ACs propelled sales past festive expectations. Weekend walk-in footfall reached an all-time high of 2.1 million shoppers."
    },
    {
      "id": "ceo-int-2",
      "headline": "Competitor A launches aggressive exchange discount in South markets",
      "oneLiner": "Competitor offering ₹3,000 extra trade-in bonus on refrigerators in Bengaluru and Chennai.",
      "source": "Market Intelligence Bureau",
      "timeAgo": "1 hr ago",
      "tag": "Bad",
      "fullDetail": "Competitor A began weekend print and digital blitz targeting large appliance upgrades. Our regional store heads recommend countering with free 3-year extended compressor warranty bundles."
    },
    {
      "id": "ceo-int-3",
      "headline": "Reserve Bank retail credit push increases zero-interest consumer loans",
      "oneLiner": "NBFC partner loan approvals jump 24 percent, powering high-ticket electronics purchases.",
      "source": "FinTech Pulse Monitor",
      "timeAgo": "2 hrs ago",
      "tag": "Good",
      "fullDetail": "Approval times under 90 seconds at checkout billing desks enabled 18,200 customers to upgrade from 43-inch to 55-inch smart TVs during the past 48 hours."
    },
    {
      "id": "ceo-int-4",
      "headline": "Customer happiness score rises to 74 following free express setup rollout",
      "oneLiner": "Free 24-hour home installation for televisions and washers drove positive ratings.",
      "source": "National Consumer Sentiment Feed",
      "timeAgo": "3 hrs ago",
      "tag": "Good",
      "fullDetail": "Over 82 percent of post-purchase feedback praised courteous store advisors and same-day delivery technicians. Delhi and Mumbai store clusters recorded highest CSAT scores."
    },
    {
      "id": "ceo-int-5",
      "headline": "Commercial real estate approvals secured for 18 new store locations",
      "oneLiner": "New retail outlets slated for fast-growing tier-2 cities in Rajasthan and Odisha.",
      "source": "Corporate Real Estate Desk",
      "timeAgo": "5 hrs ago",
      "tag": "Good",
      "fullDetail": "Signed long-term leases for high-street properties in Jaipur, Jodhpur, Bhubaneswar, and Cuttack. Fit-outs commence next Monday with targeted Q1 grand openings."
    }
  ],
  "risks": [
    {
      "id": "ceo-risk-1",
      "type": "risk",
      "category": "Market Dynamics",
      "headline": "Competitor A price undercutting on 55-inch 4K televisions in South Zone",
      "description": "Competitor A discounted their bestselling TV models by 7 percent across 60 Karnataka stores. Could reduce our South zone festive television revenue by ₹6.2 Crore.",
      "priority": "Critical",
      "sourceType": "Retail Market Crawl – Price Spider Bot & Secret Shopper Audit",
      "sourceDetail": {
        "senderOrDoc": "Market Intelligence Unit – South Zone Competitive Pricing Log",
        "timestamp": "Today at 07:15 AM IST",
        "snippet": "Competitor A dropped online and in-store TV bundle pricing across 48 stores in Bengaluru, Hyderabad, and Chennai."
      },
      "recommendedSolutions": [
        "Match pricing instantly via automated dynamic electronic price tags in 64 South stores.",
        "Bundle a complimentary soundbar and ₹1,500 festive OTT subscription instead of cash discounts.",
        "Launch hyper-local counter-campaign highlighting our free 24-hour home installation service."
      ]
    },
    {
      "id": "ceo-risk-2",
      "type": "risk",
      "category": "Customer Experience & NPS",
      "headline": "Billing counter wait times exceeding 14 minutes during peak weekend rush",
      "description": "Customer exit surveys show queue frustration during Saturday and Sunday 6 PM to 9 PM hours in top 40 flagship stores. NPS dropped 4 points in these locations.",
      "priority": "Critical",
      "sourceType": "In-Store Footfall Sensor & POS Wait-Time Telemetry",
      "sourceDetail": {
        "senderOrDoc": "Store Operations Pulse – Peak Hour Queue Length Alert",
        "timestamp": "Yesterday at 08:30 PM IST",
        "snippet": "Average checkout wait time peaked at 14.8 minutes across 38 metro flagships on Sunday evening."
      },
      "recommendedSolutions": [
        "Deploy 250 mobile tablet POS devices allowing floor sales staff to bill customers anywhere in the store.",
        "Incentivize self-checkout QR payments for accessories and small electronics under ₹2,000.",
        "Shift 100 corporate office volunteers to assist store billing queues during festive weekends."
      ]
    },
    {
      "id": "ceo-risk-3",
      "type": "risk",
      "category": "Supply Chain Allocation",
      "headline": "Fast-selling 65-inch OLED displays running low in Delhi-NCR cluster",
      "description": "Demand in NCR surpassed seasonal forecast by 42 percent. Showrooms have only 2.5 days of inventory left before stockouts occur ahead of the festive weekend.",
      "priority": "Medium",
      "sourceType": "National Inventory Control Tower – SKU Stockout Forecast",
      "sourceDetail": {
        "senderOrDoc": "North Distribution Hub – Urgent Rebalance Requisition #NCR-TV-0912",
        "timestamp": "Today at 06:45 AM IST",
        "snippet": "OLED 65-inch inventory in North hub is down to 240 units; daily sales run-rate is 95 units."
      },
      "recommendedSolutions": [
        "Authorize priority emergency night truck transfers from Lucknow and Chandigarh warehouses.",
        "Divert 400 incoming units from central manufacturer shipments directly to NCR stores.",
        "Offer customers displaying interest in 65-inch a free upgrade to 75-inch models at promotional pricing."
      ]
    },
    {
      "id": "ceo-risk-4",
      "type": "risk",
      "category": "Brand Reputation & Service",
      "headline": "Third-party home installation partner delays in East Zone metro stores",
      "description": "Local installation contractor in Kolkata failed to complete 85 air conditioner setups on time due to technician shortages. Negative customer reviews increased.",
      "priority": "Medium",
      "sourceType": "Customer Support Escalation Log & Google Reviews Sentiment Feed",
      "sourceDetail": {
        "senderOrDoc": "Customer Experience Operations – East Hub Service Delivery SLA Report",
        "timestamp": "Yesterday at 05:20 PM IST",
        "snippet": "SLA compliance for 24-hr installation in East region dropped from 96% to 78% over 3 days."
      },
      "recommendedSolutions": [
        "Activate internal backup technician flying squad to clear all backlog setups within 12 hours.",
        "Issue automatic ₹1,000 apology store gift vouchers to all affected customers.",
        "Terminate underperforming contractor and onboard certified brand partner technicians."
      ]
    },
    {
      "id": "ceo-risk-5",
      "type": "risk",
      "category": "Store Infrastructure",
      "headline": "Intermittent internet provider outages in 12 Tier-3 store locations",
      "description": "Broadband link instability caused periodic delays in digital credit card authorization at semi-urban stores. Staff had to rely on backup 4G dongles.",
      "priority": "Low",
      "sourceType": "IT Infrastructure Monitoring (Airtel & Jio Enterprise Links)",
      "sourceDetail": {
        "senderOrDoc": "Network Operations Center – Store Connectivity Incident Report",
        "timestamp": "Today at 09:10 AM IST",
        "snippet": "12 stores experienced packet loss exceeding 15% between 11 AM and 1 PM yesterday."
      },
      "recommendedSolutions": [
        "Equip all 284 stores with automatic dual-SIM 5G failover routers.",
        "Enable offline cached billing mode on POS terminals for seamless checkout during connection drops.",
        "Levy contractual penalty on broadband vendor as per enterprise service level agreement."
      ]
    }
  ],
  "opportunities": [
    {
      "id": "ceo-opp-1",
      "type": "opportunity",
      "category": "Festive Expansion",
      "headline": "Diwali Midnight Shopping Carnival can add ₹28 Crore in incremental revenue",
      "description": "Customer footfall surveys in Mumbai, Delhi, and Bengaluru show overwhelming demand for extended showroom shopping hours until midnight during the final festive week.",
      "priority": "Critical",
      "sourceType": "Retail Footfall Analytics & Metro Consumer Shopping Survey",
      "sourceDetail": {
        "senderOrDoc": "Retail Strategy Group – Extended Festive Operating Hours Feasibility",
        "timestamp": "Today at 08:30 AM IST",
        "snippet": "74% of surveyed shoppers prefer visiting showrooms between 9 PM and midnight to avoid traffic."
      },
      "recommendedSolutions": [
        "Extend store closing hours to 12:00 AM across top 100 metro stores with special midnight flash deals.",
        "Arrange secure employee cab transport and provide festive late-shift bonus allowances.",
        "Broadcast midnight carnival campaign across digital media and local FM radio channels."
      ]
    },
    {
      "id": "ceo-opp-2",
      "type": "opportunity",
      "category": "Strategic Brand Partnership",
      "headline": "Exclusive Apple and Sony flagship product launch pop-ups in 25 stores",
      "description": "Major premium electronics brands offered to co-fund high-tech interactive demo lounges inside our top showrooms. Increases premium accessory basket sizes by 35 percent.",
      "priority": "Medium",
      "sourceType": "OEM Partner Joint Business Planning – Festive Co-op Term Sheet",
      "sourceDetail": {
        "senderOrDoc": "Brand Partnerships – Premium Experience Zone Proposal",
        "timestamp": "Yesterday at 03:40 PM IST",
        "snippet": "Brands commit ₹8.5 Crore in capital fit-out subsidies and dedicated in-store specialist staff."
      },
      "recommendedSolutions": [
        "Approve high-street experience zone layouts for 25 premier flagship stores.",
        "Co-brand marketing materials across social media and newspaper print inserts.",
        "Target existing high-net-worth customer database with exclusive VIP preview passes."
      ]
    },
    {
      "id": "ceo-opp-3",
      "type": "opportunity",
      "category": "Trade-in & Circular Economy",
      "headline": "AI-assisted instant phone trade-in valuation boosts new device sales by 18%",
      "description": "Automated smartphone condition grading kiosks test device screen, camera, and battery in 60 seconds, giving customers highest instant exchange value toward new purchases.",
      "priority": "Low",
      "sourceType": "Smart Exchange Pilot Trial Results – 14 Mumbai Stores",
      "sourceDetail": {
        "senderOrDoc": "Digital Innovation Lab – Kiosk Automated Diagnostic Data",
        "timestamp": "Today at 09:15 AM IST",
        "snippet": "Trade-in conversion rate jumped from 22% to 41% with 99.2% diagnostic accuracy."
      },
      "recommendedSolutions": [
        "Deploy diagnostic kiosks to all 284 store entrance lobbies by end of month.",
        "Partner with certified refurbishment recyclers for guaranteed wholesale liquidation of trade-ins.",
        "Feature guaranteed minimum ₹5,000 exchange value in festive advertisements."
      ]
    }
  ],
  "strategies": [
    {
      "id": "ceo-strat-1",
      "title": "Dynamic Price Matching & Competitive Lead Guard",
      "twoSentenceDetail": "Real-time price bot monitors competitor retail rates every hour. Automatically syncs electronic shelf displays in matching stores to protect company market share.",
      "tag": "Good",
      "percentCompleted": 75,
      "actions": [
        {
          "id": "ceo-act-1",
          "header": "Scan 120,000 competitor product price points across 4 regions",
          "bullet1": "Detected 14 discounted appliance models in South Karnataka cluster",
          "bullet2": "Calculated exact margin buffer to protect 18% gross margin threshold",
          "assignedTo": "PriceSpider AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "ceo-act-2",
          "header": "Sync electronic shelf price tags in 64 target stores",
          "bullet1": "Updated Bluetooth digital price tags within 90 seconds",
          "bullet2": "Promoted complimentary warranty bundles alongside price match",
          "assignedTo": "IoTPriceSync AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "ceo-act-3",
          "header": "Verify store sales run-rate after competitive adjustment",
          "bullet1": "South cluster television unit sales rebounded by 19% within 24 hours",
          "bullet2": "Protected estimated ₹6.2 Crore in festive revenue",
          "assignedTo": "SalesTelemetry AI",
          "isAI": true,
          "status": "In progress",
          "progress": 65
        },
        {
          "id": "ceo-act-4",
          "header": "CEO strategic review on quarterly regional pricing guidelines",
          "bullet1": "Review competitor response and gross margin impact statement",
          "bullet2": "Authorize expanded price matching mandate for upcoming Diwali week",
          "assignedTo": "Siddharth Rao",
          "isAI": false,
          "status": "Waiting",
          "progress": 20
        }
      ]
    },
    {
      "id": "ceo-strat-2",
      "title": "Diwali Midnight Carnival Store Hours Rollout",
      "twoSentenceDetail": "Extended operating hours until midnight across top 100 metro showrooms. Captures peak festive footfall with midnight flash deals and safe staff logistics.",
      "tag": "Good",
      "percentCompleted": 50,
      "actions": [
        {
          "id": "ceo-act-5",
          "header": "Identify top 100 metro stores with highest late-night shopping demand",
          "bullet1": "Ranked stores based on parking availability, metro connectivity, and footfall heatmaps",
          "bullet2": "Selected showrooms across Delhi NCR, Mumbai, Bengaluru, and Pune",
          "assignedTo": "FootfallAnalytics AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "ceo-act-6",
          "header": "Configure late-shift staffing schedules and secure employee transportation",
          "bullet1": "Scheduled dual shifts and arranged dedicated rideshare transport for closing teams",
          "bullet2": "Allocated festive night meal and overtime allowance vouchers",
          "assignedTo": "WorkforceSync AI",
          "isAI": true,
          "status": "In progress",
          "progress": 60
        },
        {
          "id": "ceo-act-7",
          "header": "Launch localized midnight flash sale marketing push",
          "bullet1": "Deploy push notifications to 1.4 million loyalty app users within 5 km of stores",
          "bullet2": "Broadcast radio spots announcing exclusive 10 PM to 12 AM appliance deals",
          "assignedTo": "AdCampaign AI",
          "isAI": true,
          "status": "Waiting",
          "progress": 30
        },
        {
          "id": "ceo-act-8",
          "header": "CEO sign-off on midnight retail operations and security protocol",
          "bullet1": "Review municipal permit approvals and mall management agreements",
          "bullet2": "Approve final festive overtime budget of ₹1.8 Crore",
          "assignedTo": "Siddharth Rao",
          "isAI": false,
          "status": "Waiting",
          "progress": 10
        }
      ]
    },
    {
      "id": "ceo-strat-3",
      "title": "Autonomous Store Queue Busting & Mobile Checkout",
      "twoSentenceDetail": "Enables showroom sales advisors with mobile tablet POS systems to check out customers directly in aisles. Slashes peak weekend billing wait times by 60 percent.",
      "tag": "Good",
      "percentCompleted": 85,
      "actions": [
        {
          "id": "ceo-act-9",
          "header": "Provision 250 secure mobile billing tablets with cloud POS",
          "bullet1": "Installed instant UPI QR scanners and wireless receipt printers",
          "bullet2": "Tested end-to-end checkout with bank transaction speed under 12 seconds",
          "assignedTo": "CloudPOS AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "ceo-act-10",
          "header": "Distribute devices to top 40 flagship showrooms",
          "bullet1": "Delivered hardware to Mumbai, Delhi, Bengaluru, and Kolkata stores",
          "bullet2": "Trained 600 store advisors on rapid aisle checkout workflows",
          "assignedTo": "StoreOpsBot AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "ceo-act-11",
          "header": "Monitor live queue duration and checkout velocity on store dashboards",
          "bullet1": "Average billing queue wait dropped from 14.8 minutes to 4.2 minutes",
          "bullet2": "NPS in pilot stores rose by 5 points during weekend peak",
          "assignedTo": "QueueSense AI",
          "isAI": true,
          "status": "In progress",
          "progress": 80
        },
        {
          "id": "ceo-act-12",
          "header": "Final operational review and expansion to remaining 244 stores",
          "bullet1": "Evaluate cost per transaction and hardware reliability report",
          "bullet2": "Sign enterprise procurement order for 1,000 additional units for Q1",
          "assignedTo": "Siddharth Rao",
          "isAI": false,
          "status": "Waiting",
          "progress": 40
        }
      ]
    }
  ],
  "starterQuestions": [
    "How are we tracking against our overall annual revenue target of ₹4,800 Crore?",
    "Which store cluster has the highest customer satisfaction score this week?",
    "What are our top 3 growth opportunities for the upcoming Diwali festive season?",
    "How do our profit margins compare against our closest national competitor?"
  ]
},
  'Chief People Officer (CHRO)': {
  "kpiCards": [
    {
      "id": "chro-happiness",
      "title": "Employee happiness score",
      "value": "82 / 100",
      "unit": "eNPS",
      "trend": "+6 pts vs Q2",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "68 / 100",
        "comparisonText": "+14 pts above industry",
        "isBeatingBenchmark": true,
        "benchmarkSource": "National Retail HR Benchmark"
      },
      "sparkline": [
        74,
        76,
        77,
        78,
        80,
        81,
        82
      ],
      "detailTitle": "Employee Engagement & Satisfaction Metrics",
      "detailDescription": "Internal sentiment measured weekly across retail floor teams, logistics staff, and corporate managers.",
      "detailItems": [
        {
          "label": "Store Sales Advisors",
          "value": "84 / 100",
          "subtext": "High enthusiasm for festive incentives",
          "isPositive": true
        },
        {
          "label": "Warehouse & Logistics Staff",
          "value": "80 / 100",
          "subtext": "Appreciation for air-cooled break rooms",
          "isPositive": true
        },
        {
          "label": "Store Cashiers & Billing",
          "value": "78 / 100",
          "subtext": "Weekend peak fatigue reported",
          "isPositive": false
        },
        {
          "label": "Corporate Office Teams",
          "value": "86 / 100",
          "subtext": "Strong culture and leadership trust",
          "isPositive": true
        }
      ]
    },
    {
      "id": "chro-attrition",
      "title": "Store staff attrition",
      "value": "9.8%",
      "trend": "-3.2% vs last year",
      "trendDirection": "down",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "16.4%",
        "comparisonText": "-6.6% lower churn",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Retail Workforce Survey"
      },
      "sparkline": [
        14.2,
        13.5,
        12.8,
        12,
        11.2,
        10.4,
        9.8
      ],
      "detailTitle": "Turnover Rates by Department & Tenure",
      "detailDescription": "Retention rates across retail store personnel, warehouse operators, and customer service teams.",
      "detailItems": [
        {
          "label": "Tenured Store Staff (> 2 yrs)",
          "value": "4.2% turnover",
          "subtext": "Excellent career path retention",
          "isPositive": true
        },
        {
          "label": "Seasonal Festive Hires",
          "value": "14.8% turnover",
          "subtext": "Normal for temporary retail contracts",
          "isPositive": true
        },
        {
          "label": "Store Assistant Managers",
          "value": "6.1% turnover",
          "subtext": "Competitive internal promotion pipeline",
          "isPositive": true
        }
      ]
    },
    {
      "id": "chro-pipeline",
      "title": "Festive staffing pipeline filled",
      "value": "94.0%",
      "unit": "3,800 / 4,040 hired",
      "trend": "+12% ahead of schedule",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "78.5%",
        "comparisonText": "+15.5% faster onboarding",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Talent Acquisition Guild"
      },
      "sparkline": [
        45,
        60,
        72,
        80,
        88,
        92,
        94
      ],
      "detailTitle": "Regional Seasonal Recruitment Progress",
      "detailDescription": "Hiring status of retail advisors, billing cashiers, and warehouse fulfillment associates.",
      "detailItems": [
        {
          "label": "North Region (1,200 target)",
          "value": "96% completed",
          "subtext": "1,152 positions filled",
          "isPositive": true
        },
        {
          "label": "West Region (1,100 target)",
          "value": "95% completed",
          "subtext": "1,045 positions filled",
          "isPositive": true
        },
        {
          "label": "South Region (1,000 target)",
          "value": "93% completed",
          "subtext": "930 positions filled",
          "isPositive": true
        },
        {
          "label": "East Region (740 target)",
          "value": "91% completed",
          "subtext": "673 positions filled",
          "isPositive": true
        }
      ]
    },
    {
      "id": "chro-worksplit",
      "title": "Work split automated vs human",
      "value": "28.0%",
      "unit": "automated tasks",
      "trend": "+8% vs last quarter",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "14.0%",
        "comparisonText": "2x higher AI automation",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Retail Technology Forum"
      },
      "sparkline": [
        16,
        18,
        20,
        22,
        24,
        26,
        28
      ],
      "detailTitle": "Daily Operational Tasks Automation Index",
      "detailDescription": "Repetitive workflows handled by AI agents vs strategic work done by human retail professionals.",
      "detailItems": [
        {
          "label": "Inventory Stock Auditing & Recs",
          "value": "72% automated",
          "subtext": "Autonomous camera stock counts",
          "isPositive": true
        },
        {
          "label": "Billing Invoicing & Tax Filing",
          "value": "88% automated",
          "subtext": "Instant bot reconciliation",
          "isPositive": true
        },
        {
          "label": "Customer Product Consultations",
          "value": "12% automated",
          "subtext": "Human expertise drives high-ticket sales",
          "isPositive": true
        },
        {
          "label": "Post-Delivery Setup Scheduling",
          "value": "64% automated",
          "subtext": "WhatsApp automated dispatcher",
          "isPositive": true
        }
      ]
    },
    {
      "id": "chro-skills",
      "title": "Tech & Smart Sales Readiness",
      "value": "88.0%",
      "unit": "certified staff",
      "trend": "+14% completion this month",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "74.0%",
        "comparisonText": "+14.0% higher readiness",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Enterprise Skills Index"
      },
      "sparkline": [
        62,
        68,
        74,
        79,
        82,
        85,
        88
      ],
      "detailTitle": "Micro-Learning Module Completion",
      "detailDescription": "Staff mastery in presenting 5-star smart appliances, AI features, and credit card finance options.",
      "detailItems": [
        {
          "label": "OLED & QLED TV Feature Demos",
          "value": "92% completed",
          "subtext": "Hands-on soundbar calibration",
          "isPositive": true
        },
        {
          "label": "Inverter AC Energy Savings Pitch",
          "value": "94% completed",
          "subtext": "BEE star rating calculations",
          "isPositive": true
        },
        {
          "label": "Zero-Cost EMI Financing Plans",
          "value": "86% completed",
          "subtext": "Bank portal credit check drill",
          "isPositive": true
        }
      ]
    }
  ],
  "extraDashboards": [
    {
      "title": "Regional Staffing Target vs Actual",
      "subtitle": "Headcount fulfilled across 4 regions",
      "type": "bar",
      "items": [
        {
          "label": "North Region",
          "value": 1152,
          "target": 1200,
          "secondary": "1,152 of 1,200 hired (96%)"
        },
        {
          "label": "West Region",
          "value": 1045,
          "target": 1100,
          "secondary": "1,045 of 1,100 hired (95%)"
        },
        {
          "label": "South Region",
          "value": 930,
          "target": 1000,
          "secondary": "930 of 1,000 hired (93%)"
        },
        {
          "label": "East Region",
          "value": 673,
          "target": 740,
          "secondary": "673 of 740 hired (91%)"
        }
      ]
    },
    {
      "title": "Store Workforce Composition",
      "subtitle": "Breakdown of 12,400 retail employees",
      "type": "donut",
      "items": [
        {
          "label": "Full-time Permanent Advisors",
          "value": "64%",
          "color": "#4285F4"
        },
        {
          "label": "Festive Seasonal Staff",
          "value": "26%",
          "color": "#34A853"
        },
        {
          "label": "Brand Specialist Consultants",
          "value": "10%",
          "color": "#FBBC05"
        }
      ]
    }
  ],
  "intelligence": [
    {
      "id": "chro-int-1",
      "headline": "Festive onboarding engine surpasses 3,800 hires with 94% completion",
      "oneLiner": "AI interview bots screened 18,000 candidates and expedited background checks.",
      "source": "Internal – HR Portal",
      "timeAgo": "20 mins ago",
      "tag": "Good",
      "fullDetail": "Fast-track digital KYC and automated shift scheduling enabled new retail associates to be deployed on store floors in less than 48 hours from initial application."
    },
    {
      "id": "chro-int-2",
      "headline": "Annual store staff retention rises to 90.2 percent ahead of retail industry",
      "oneLiner": "Performance-linked sales bonuses and transparent shift bidding reduced voluntary churn.",
      "source": "Internal – Workforce Analytics",
      "timeAgo": "1 hr ago",
      "tag": "Good",
      "fullDetail": "Store employee satisfaction score reached 82 out of 100. Introduction of digital tipping and express overtime payouts cut frontline attrition to single digits."
    },
    {
      "id": "chro-int-3",
      "headline": "Festive sales incentive bonus structure announced for 284 stores",
      "oneLiner": "Top-performing store advisors eligible for up to ₹25,000 in festive bonuses.",
      "source": "Internal – People Operations Notice",
      "timeAgo": "3 hrs ago",
      "tag": "Good",
      "fullDetail": "Tiered incentive matrix rewards high-ticket appliance bundles and customer warranty signups, creating high enthusiasm across floor sales staff."
    },
    {
      "id": "chro-int-4",
      "headline": "Warehouse weekend night shift staffing requires 45 additional operators",
      "oneLiner": "Higher dispatch volumes in Bhiwandi hub demand supplemental logistics shifts.",
      "source": "Internal – Logistics Operations",
      "timeAgo": "4 hrs ago",
      "tag": "Bad",
      "fullDetail": "To handle surging festive appliance shipments, human resources is mobilizing 45 certified forklift operators from allied industrial zones on temporary premium pay."
    },
    {
      "id": "chro-int-5",
      "headline": "Smart Academy completes AI customer assistance training for 4,200 staff",
      "oneLiner": "Floor staff certified in handling digital product queries and smart appliance demos.",
      "source": "Internal – Learning & Skills Academy",
      "timeAgo": "6 hrs ago",
      "tag": "Good",
      "fullDetail": "Bite-sized mobile learning modules on generative smartphone features and inverter AC energy ratings achieved a 96% first-attempt quiz pass rate."
    }
  ],
  "risks": [
    {
      "id": "chro-risk-1",
      "type": "risk",
      "category": "Workforce Operations",
      "headline": "Weekend peak billing cashier shortages in 18 high-footfall metro stores",
      "description": "Surging festive footfall caused checkout bottlenecks. 18 flagships in Mumbai and Delhi require immediate cashier reinforcement to keep wait times under 5 minutes.",
      "priority": "Critical",
      "sourceType": "Store Manager Operations Feedback & Footfall Roster Telemetry",
      "sourceDetail": {
        "senderOrDoc": "Frontline HR Roster Desk – Peak Hour Cashier Coverage Matrix",
        "timestamp": "Today at 08:00 AM IST",
        "snippet": "18 metro showrooms report cashier utilization exceeding 98% with zero shift buffer."
      },
      "recommendedSolutions": [
        "Deploy 60 trained corporate office HR and finance volunteers to store billing desks this weekend.",
        "Offer dual-shift overtime premium bonus of ₹1,500 per shift to certified cashier staff.",
        "Accelerate onboarding of 40 pre-vetted temporary cashier candidates within 24 hours."
      ]
    },
    {
      "id": "chro-risk-2",
      "type": "risk",
      "category": "Regulatory & Labor",
      "headline": "Upcoming state labor inspection audits on festive overtime compliance",
      "description": "State labor department issued notice regarding working hour ceilings during extended holiday shopping. Automated timesheets must prove compliance with statutory rest intervals.",
      "priority": "Medium",
      "sourceType": "State Department of Labor Compliance Circular & Legal Review",
      "sourceDetail": {
        "senderOrDoc": "Chief Compliance Officer – Labor Law Audit Readiness Notice #LAB-Q3-102",
        "timestamp": "Yesterday at 04:15 PM IST",
        "snippet": "Mandatory verification of biometric attendance logs, overtime compensation slips, and rest interval compliance."
      },
      "recommendedSolutions": [
        "Run automated timesheet audit across all 284 stores to flag and rectify any schedule violations.",
        "Enforce strict mandatory 11-hour rest intervals between closing and opening shifts.",
        "File advance holiday extended-hours permission letters with municipal labor commissioners."
      ]
    },
    {
      "id": "chro-risk-3",
      "type": "risk",
      "category": "Training & Readiness",
      "headline": "New seasonal hires in East Zone lag in smart TV audio demonstration skills",
      "description": "Audit revealed 38 newly hired store advisors in Kolkata and Patna struggled with Dolby Atmos and soundbar calibration. Customer demo conversion is 8 percent below target.",
      "priority": "Medium",
      "sourceType": "Secret Shopper Experience Evaluation – East Zone Showrooms",
      "sourceDetail": {
        "senderOrDoc": "Quality Assurance Unit – New Hire Practical Demo Scorecard",
        "timestamp": "Today at 09:20 AM IST",
        "snippet": "Only 62% of new associates successfully connected soundbars via HDMI eARC during live trial."
      },
      "recommendedSolutions": [
        "Conduct mandatory 45-minute hands-on audio demo workshops before store opening tomorrow.",
        "Pair new hires with senior sales champions for the first 3 customer consultations.",
        "Push interactive 3-minute video guides directly to staff smartphones via Smart Academy app."
      ]
    },
    {
      "id": "chro-risk-4",
      "type": "risk",
      "category": "Workplace Safety",
      "headline": "Warehouse material handling safety adherence dipped during festive rush",
      "description": "Rapid movement of large refrigerators and washing machines led to 4 minor ankle strain incidents in Bhiwandi logistics hub. Safety gear compliance dropped from 99% to 92%.",
      "priority": "Low",
      "sourceType": "Warehouse Health & Safety Telemetry & Incident Registry",
      "sourceDetail": {
        "senderOrDoc": "EHS Committee – Distribution Center Weekly Incident Log #SAF-084",
        "timestamp": "Yesterday at 07:45 PM IST",
        "snippet": "4 first-aid minor injuries reported during midnight truck loading cycle."
      },
      "recommendedSolutions": [
        "Re-enforce mandatory steel-toe boots and lumbar support belts before every warehouse shift.",
        "Deploy computer vision camera alerts to detect workers entering high-bay zones without helmets.",
        "Rotate heavy lifting teams every 2 hours to prevent worker fatigue."
      ]
    },
    {
      "id": "chro-risk-5",
      "type": "risk",
      "category": "Retention & Compensation",
      "headline": "Competitor offering ₹2,000 joining bonus to poach experienced store advisors",
      "description": "A rival retail chain in Hyderabad launched targeted recruitment targeting our top appliance specialists with spot cash bonuses and flexible weekend hours.",
      "priority": "Low",
      "sourceType": "Field HR Intel & Store Advisor Exit Interview Feed",
      "sourceDetail": {
        "senderOrDoc": "Regional Talent Retention Desk – Hyderabad Cluster Market Alert",
        "timestamp": "Today at 07:10 AM IST",
        "snippet": "3 advisors tendered resignation citing competitor signing bonuses."
      },
      "recommendedSolutions": [
        "Announce immediate festive retention loyalty payout for advisors completing Diwali season.",
        "Expedite Q4 promotion cycle for high-performing store team leaders.",
        "Conduct personal 1-on-1 career development discussions with top 50 revenue-generating advisors."
      ]
    }
  ],
  "opportunities": [
    {
      "id": "chro-opp-1",
      "type": "opportunity",
      "category": "AI-Powered Onboarding",
      "headline": "Digital micro-learning app boosts employee sales conversion by 22 percent",
      "description": "Staff who completed 5-minute gamified training modules on smart inverter ACs generated ₹3.4 Lakh more in weekly sales than non-certified peers.",
      "priority": "Critical",
      "sourceType": "Sales Performance vs Learning Academy Correlation Study",
      "sourceDetail": {
        "senderOrDoc": "Learning & Development Analytics – Q3 Competency Impact Assessment",
        "timestamp": "Today at 08:50 AM IST",
        "snippet": "Statistically significant correlation (p < 0.01) between mobile quiz scores and premium appliance sales."
      },
      "recommendedSolutions": [
        "Roll out automated daily 3-minute festive sales quiz with instant ₹100 coffee vouchers for 100% scores.",
        "Expand certified curriculum to cover smart home IoT ecosystems and solar inverters.",
        "Recognize top weekly learner store teams on company-wide intranet leaderboard."
      ]
    },
    {
      "id": "chro-opp-2",
      "type": "opportunity",
      "category": "Employee Mobility",
      "headline": "Cross-functional store gig bidding fills 340 peak hours with zero overtime cost",
      "description": "Internal mobile app allows part-time retail employees to claim extra hours across nearby sister stores. Solves weekend coverage gaps while boosting employee earnings.",
      "priority": "Medium",
      "sourceType": "Internal Gig Economy Pilot Trial – Mumbai & Pune Stores",
      "sourceDetail": {
        "senderOrDoc": "Workforce Innovations – Shift Bidding Platform Performance Report",
        "timestamp": "Yesterday at 03:10 PM IST",
        "snippet": "88% of open weekend shifts filled within 2 hours of posting without agency fees."
      },
      "recommendedSolutions": [
        "Expand shift bidding app to all 284 retail stores and 8 regional distribution hubs.",
        "Enable automated surge rate multipliers of 1.25x for shifts with urgent customer footfall.",
        "Integrate instant daily wage disbursement for completed gig shifts."
      ]
    },
    {
      "id": "chro-opp-3",
      "type": "opportunity",
      "category": "Skill Upskilling",
      "headline": "Smart Home Automation technician apprentice program creates 200 high-margin experts",
      "description": "Partnering with National Skill Development Corporation to train 200 junior technicians in smart home installation. Unlocks lucrative ₹18 Crore smart security installation market.",
      "priority": "Low",
      "sourceType": "NSDC Technical Vocational Partnership Agreement",
      "sourceDetail": {
        "senderOrDoc": "Strategic Alliances – Certified IoT Technician Program Term Sheet",
        "timestamp": "Yesterday at 01:25 PM IST",
        "snippet": "50% government training subsidy with guaranteed post-certification field employment."
      },
      "recommendedSolutions": [
        "Launch first apprentice cohort of 200 technicians across Delhi, Mumbai, and Bengaluru.",
        "Equip trainees with smart diagnostic testing kits and branded toolpacks.",
        "Market home automation installation services alongside premium smart TV and AC sales."
      ]
    }
  ],
  "strategies": [
    {
      "id": "chro-strat-1",
      "title": "Autonomous Festive Staffing & Rapid Onboarding Engine",
      "twoSentenceDetail": "Automated candidate screening bot vets applicants via video and digital credentials. Dispatches verified store associates in under 48 hours to meet seasonal footfall.",
      "tag": "Good",
      "percentCompleted": 92,
      "actions": [
        {
          "id": "chro-act-1",
          "header": "Screen 18,000 applicant profiles via automated video interview engine",
          "bullet1": "Verified Aadhaar digital identity and police background records automatically",
          "bullet2": "Ranked candidates on retail electronics knowledge and spoken communication",
          "assignedTo": "RecruitBot AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "chro-act-2",
          "header": "Issue digital appointment letters and automated uniform voucher passes",
          "bullet1": "Issued 3,800 offer letters with 97% acceptance rate",
          "bullet2": "Dispatched digital uniform qr vouchers to local store hubs",
          "assignedTo": "OnboardSync AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "chro-act-3",
          "header": "Track day-1 store arrival and floor mentor pairing across 284 stores",
          "bullet1": "96.2% of candidates checked in on schedule via store biometric readers",
          "bullet2": "Assigned certified senior advisors as floor buddies for first 7 shifts",
          "assignedTo": "RosterMonitor AI",
          "isAI": true,
          "status": "In progress",
          "progress": 88
        },
        {
          "id": "chro-act-4",
          "header": "CHRO review of seasonal workforce readiness and safety briefing",
          "bullet1": "Confirm complete compliance with state labor regulations and minimum wages",
          "bullet2": "Sign off on festive bonus pool allocation of ₹12.5 Crore",
          "assignedTo": "Meenakshi Sundaram",
          "isAI": false,
          "status": "Waiting",
          "progress": 30
        }
      ]
    },
    {
      "id": "chro-strat-2",
      "title": "Store Cashier Queue Relief & Volunteer Deployment",
      "twoSentenceDetail": "Automated roster balancer monitors live checkout queue lengths across 284 stores. Mobilizes trained corporate volunteers and part-time cashiers to eliminate bottlenecks.",
      "tag": "Good",
      "percentCompleted": 60,
      "actions": [
        {
          "id": "chro-act-5",
          "header": "Identify 18 flagship stores with peak billing wait times exceeding 10 minutes",
          "bullet1": "Cross-referenced footfall sensors and POS transactions per hour",
          "bullet2": "Flagged 12 stores in Delhi-NCR and 6 in Mumbai needing immediate reinforcement",
          "assignedTo": "QueueSense AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "chro-act-6",
          "header": "Broadcast volunteer opportunity to 350 corporate office employees",
          "bullet1": "Registered 92 corporate staff volunteers for weekend store shifts",
          "bullet2": "Conducted rapid refresher module on POS billing and gift wrapping",
          "assignedTo": "VolunteerSync AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "chro-act-7",
          "header": "Deploy mobile cashier kits and allocate volunteer rosters",
          "bullet1": "Assigned volunteers to Saturday and Sunday evening 5 PM to 10 PM shifts",
          "bullet2": "Dispatched extra thermal paper rolls and backup barcode scanners",
          "assignedTo": "OpsDispatch AI",
          "isAI": true,
          "status": "In progress",
          "progress": 50
        },
        {
          "id": "chro-act-8",
          "header": "CHRO executive sign-off on volunteer recognition and compensatory time off",
          "bullet1": "Approve compensatory time off days and festive gift hampers for volunteers",
          "bullet2": "Review queue duration reduction metrics post-weekend",
          "assignedTo": "Meenakshi Sundaram",
          "isAI": false,
          "status": "Waiting",
          "progress": 10
        }
      ]
    },
    {
      "id": "chro-strat-3",
      "title": "Frontline Micro-Learning & Smart Product Certification",
      "twoSentenceDetail": "Mobile bite-sized learning system pushes daily 3-minute interactive quizzes to retail staff. Elevates product knowledge and powers consultative selling on premium tech.",
      "tag": "Good",
      "percentCompleted": 85,
      "actions": [
        {
          "id": "chro-act-9",
          "header": "Publish interactive module on 5-Star Inverter AC vs Budget Split AC economics",
          "bullet1": "Includes dynamic customer electricity bill saving calculator demo",
          "bullet2": "Available in 6 regional languages across the staff mobile portal",
          "assignedTo": "CurriculumAI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "chro-act-10",
          "header": "Engage 4,200 store advisors in gamified daily quiz competition",
          "bullet1": "Achieved 91% participation within 4 hours of morning notification",
          "bullet2": "Awarded instant ₹100 digital meal coupons to top 500 scorers",
          "assignedTo": "QuizGamifier AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "chro-act-11",
          "header": "Measure correlation between quiz completion and high-margin product sales",
          "bullet1": "Certified advisors recorded 22% higher average basket value on appliances",
          "bullet2": "Zero negative feedback recorded on product technical guidance",
          "assignedTo": "ImpactAnalytics AI",
          "isAI": true,
          "status": "In progress",
          "progress": 75
        },
        {
          "id": "chro-act-12",
          "header": "Sign off on monthly excellence certificates and rewards budget",
          "bullet1": "Approve ₹15 Lakh in monthly retail excellence awards for top stores",
          "bullet2": "Authorize launch of upcoming Smart Home IoT specialist module",
          "assignedTo": "Meenakshi Sundaram",
          "isAI": false,
          "status": "Waiting",
          "progress": 25
        }
      ]
    }
  ],
  "starterQuestions": [
    "What is our current festive staffing fill rate across all 4 regions?",
    "Which retail showroom has the lowest employee attrition this quarter?",
    "How effective is our mobile micro-learning app in boosting high-margin sales?",
    "Are there any pending labor compliance or overtime audit risks this month?"
  ]
},
  'Chief Digital & Technology Officer (CDTO)': {
  "kpiCards": [
    {
      "id": "cdto-hours",
      "title": "Hours saved by AI & automation",
      "value": "5,420 hrs",
      "unit": "this month",
      "trend": "+18% vs target",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "3,800 hrs",
        "comparisonText": "+1,620 hrs/mo saved",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Digital Transformation Institute"
      },
      "sparkline": [
        3400,
        3800,
        4200,
        4600,
        4900,
        5200,
        5420
      ],
      "detailTitle": "Automated Hours Breakdown by Functional Area",
      "detailDescription": "Where automated bots and machine learning algorithms removed repetitive manual workloads.",
      "detailItems": [
        {
          "label": "Store Inventory Camera Audits",
          "value": "1,840 hrs saved",
          "subtext": "Nightly autonomous shelf scans",
          "isPositive": true
        },
        {
          "label": "Vendor Invoice & Tax Reconciliation",
          "value": "1,520 hrs saved",
          "subtext": "OCR bot matching purchase orders",
          "isPositive": true
        },
        {
          "label": "Store POS Price Tag Updates",
          "value": "1,140 hrs saved",
          "subtext": "Bluetooth electronic price tags",
          "isPositive": true
        },
        {
          "label": "Customer Post-Purchase Delivery Scheduling",
          "value": "920 hrs saved",
          "subtext": "WhatsApp automated routing",
          "isPositive": true
        }
      ]
    },
    {
      "id": "cdto-cost",
      "title": "Employee tool adoption",
      "value": "89.4%",
      "unit": "active daily users",
      "trend": "+4.2% vs last month",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "68.0%",
        "comparisonText": "+21.4% higher adoption",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Enterprise SaaS Adoption Benchmark"
      },
      "sparkline": [
        72,
        75,
        78,
        82,
        85,
        87,
        89.4
      ],
      "detailTitle": "Digital Tool Adoption Across Store Roles",
      "detailDescription": "Daily active engagement with retail tablets, inventory scanners, and enterprise intelligence portal.",
      "detailItems": [
        {
          "label": "Store Floor Advisors (Mobile App)",
          "value": "94% adoption",
          "subtext": "Live stock search & price check",
          "isPositive": true
        },
        {
          "label": "Store Billing Cashiers (Cloud POS)",
          "value": "98% adoption",
          "subtext": "Fast checkout & dynamic QR",
          "isPositive": true
        },
        {
          "label": "Store Department Managers (Cockpit)",
          "value": "86% adoption",
          "subtext": "Daily target vs actual tracking",
          "isPositive": true
        }
      ]
    },
    {
      "id": "cdto-uptime",
      "title": "Store POS & System Uptime",
      "value": "99.98%",
      "unit": "availability",
      "trend": "Zero store downtime",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "99.70%",
        "comparisonText": "+0.28% higher availability",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Retail POS Reliability Index"
      },
      "sparkline": [
        99.92,
        99.94,
        99.95,
        99.96,
        99.97,
        99.98,
        99.98
      ],
      "detailTitle": "Core Retail Infrastructure Availability",
      "detailDescription": "Real-time telemetry from 1,200 store checkout terminals, payment gateways, and regional cloud clusters.",
      "detailItems": [
        {
          "label": "Cloud Point of Sale (POS)",
          "value": "100.0% uptime",
          "subtext": "Zero transaction loss",
          "isPositive": true
        },
        {
          "label": "Payment Gateway (UPI & Card)",
          "value": "99.96% uptime",
          "subtext": "Automatic bank switchover",
          "isPositive": true
        },
        {
          "label": "Store Inventory Camera Cloud",
          "value": "99.98% uptime",
          "subtext": "Edge camera sync normal",
          "isPositive": true
        }
      ]
    },
    {
      "id": "cdto-adoption",
      "title": "Open critical software defects",
      "value": "3 bugs",
      "trend": "-8 bugs resolved this week",
      "trendDirection": "down",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "14 bugs",
        "comparisonText": "78% fewer live glitches",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Software Quality Standard"
      },
      "sparkline": [
        18,
        15,
        12,
        9,
        7,
        5,
        3
      ],
      "detailTitle": "Active Bug Triage & Resolution Velocity",
      "detailDescription": "Software issues tracked across retail mobile applications, store POS software, and customer web shop.",
      "detailItems": [
        {
          "label": "Low Severity UI Minor Glitches",
          "value": "2 open",
          "subtext": "Non-blocking layout padding fix",
          "isPositive": true
        },
        {
          "label": "Bluetooth Receipt Printer Reconnect",
          "value": "1 open",
          "subtext": "Patch rolling out tonight",
          "isPositive": true
        },
        {
          "label": "Critical Billing or Payment Bugs",
          "value": "0 open",
          "subtext": "100% clean billing pipeline",
          "isPositive": true
        }
      ]
    },
    {
      "id": "cdto-sources",
      "title": "ROI on digital & AI investments",
      "value": "3.40x ROI",
      "unit": "₹3.40 returned per ₹1",
      "trend": "+0.6x vs business case",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "1.85x ROI",
        "comparisonText": "+1.55x higher return",
        "isBeatingBenchmark": true,
        "benchmarkSource": "IT Capital Efficiency Report"
      },
      "sparkline": [
        2.1,
        2.3,
        2.6,
        2.8,
        3,
        3.2,
        3.4
      ],
      "detailTitle": "Technology Value Realization by Program",
      "detailDescription": "Financial returns calculated from labor hours saved, shrinkage prevention, and conversion lift.",
      "detailItems": [
        {
          "label": "Autonomous Inventory Shelf Vision",
          "value": "₹14.2 Cr benefit",
          "subtext": "99.2% stock accuracy",
          "isPositive": true
        },
        {
          "label": "Dynamic Pricing & Digital Tags",
          "value": "₹11.8 Cr benefit",
          "subtext": "Zero manual tag replacement cost",
          "isPositive": true
        },
        {
          "label": "Automated Tax & AP Invoice Bots",
          "value": "₹8.4 Cr benefit",
          "subtext": "Zero payment duplicate leakage",
          "isPositive": true
        }
      ]
    }
  ],
  "extraDashboards": [
    {
      "title": "Store System Uptime by Region",
      "subtitle": "Target vs Actual availability percentage",
      "type": "bar",
      "items": [
        {
          "label": "North Region",
          "value": 99.98,
          "target": 99.8,
          "secondary": "Actual 99.98% vs Target 99.80%"
        },
        {
          "label": "West Region",
          "value": 99.99,
          "target": 99.8,
          "secondary": "Actual 99.99% vs Target 99.80%"
        },
        {
          "label": "South Region",
          "value": 99.97,
          "target": 99.8,
          "secondary": "Actual 99.97% vs Target 99.80%"
        },
        {
          "label": "East Region",
          "value": 99.95,
          "target": 99.8,
          "secondary": "Actual 99.95% vs Target 99.80%"
        }
      ]
    },
    {
      "title": "Cloud & IoT Systems Health",
      "subtitle": "Status of 4,800 connected retail edge devices",
      "type": "donut",
      "items": [
        {
          "label": "Healthy & fully synchronized",
          "value": "96.2%",
          "color": "#34A853"
        },
        {
          "label": "Firmware update queued",
          "value": "3.4%",
          "color": "#4285F4"
        },
        {
          "label": "Network retry alert",
          "value": "0.4%",
          "color": "#FBBC05"
        }
      ]
    }
  ],
  "intelligence": [
    {
      "id": "cdto-int-1",
      "headline": "Autonomous edge vision cameras deployed to 120 additional stores",
      "oneLiner": "Shelf-monitoring cameras detect out-of-stock items in real time without human auditing.",
      "source": "Internal – Computer Vision Platform",
      "timeAgo": "10 mins ago",
      "tag": "Good",
      "fullDetail": "High-definition cameras mounted in TV and cooling aisles scan shelves every 15 minutes, alerting store stock associates via smartwatch notifications whenever display stock drops below two units."
    },
    {
      "id": "cdto-int-2",
      "headline": "Cloud point-of-sale migration achieves 100 percent completion across all 284 stores",
      "oneLiner": "Unified omnichannel checkout enables instantaneous inventory synchronization across retail.",
      "source": "Internal – Retail Systems Architecture",
      "timeAgo": "45 mins ago",
      "tag": "Good",
      "fullDetail": "The legacy on-premise checkout servers were retired in favor of distributed edge cloud POS instances with local offline failover, guaranteeing uninterrupted billing even during internet outages."
    },
    {
      "id": "cdto-int-3",
      "headline": "Payment gateway bank latency spikes by 400 milliseconds during peak hours",
      "oneLiner": "Auto-routing engine switched transactions to secondary payment rails seamlessly.",
      "source": "Internal – SRE Telemetry Alert",
      "timeAgo": "2 hrs ago",
      "tag": "Bad",
      "fullDetail": "At 1:15 PM, bank partner primary gateway experienced transaction queue buildup. Our dynamic payment orchestrator rerouted 94% of store checkout requests to backup rails, keeping customer billing smooth."
    },
    {
      "id": "cdto-int-4",
      "headline": "Digital transformation team completes enterprise data lake sync for festive models",
      "oneLiner": "Sub-second inventory lookups power the mobile consumer app and in-store tablets.",
      "source": "Internal – BigData Pipeline Monitor",
      "timeAgo": "4 hrs ago",
      "tag": "Good",
      "fullDetail": "Real-time Apache Kafka streams now bridge ERP purchase orders, warehouse dispatches, and in-store shelf locations with a median latency of 140 milliseconds."
    },
    {
      "id": "cdto-int-5",
      "headline": "Quarterly cybersecurity penetration test yields zero high-severity findings",
      "oneLiner": "Independent audit confirms robust encryption and strict role-based access controls.",
      "source": "CERT-In Accredited Security Audit Report",
      "timeAgo": "6 hrs ago",
      "tag": "Good",
      "fullDetail": "Comprehensive black-box testing against store Wi-Fi networks, mobile POS terminals, and customer cloud accounts verified PCI-DSS level 1 compliance with zero critical vulnerabilities."
    }
  ],
  "risks": [
    {
      "id": "cdto-risk-1",
      "type": "risk",
      "category": "Cybersecurity & Privacy",
      "headline": "Spike in external brute-force credential stuffing attacks against loyalty login portal",
      "description": "Automated botnet attempted 120,000 automated logins using leaked third-party password dumps. Cloudflare Web Application Firewall blocked 99.8% of attempts.",
      "priority": "Critical",
      "sourceType": "Cloudflare Enterprise WAF Security Incident Feed & SIEM Logs",
      "sourceDetail": {
        "senderOrDoc": "Security Operations Center – Distributed Threat Mitigation Notice #SEC-BOT-981",
        "timestamp": "Today at 06:15 AM IST",
        "snippet": "120,400 IP hits from distributed VPN exit nodes targeting customer phone OTP authentication API."
      },
      "recommendedSolutions": [
        "Enforce rate-limiting and device fingerprinting on customer login API endpoints.",
        "Trigger mandatory WhatsApp two-factor authentication for accounts with suspicious login attempts.",
        "Block malicious autonomous ASN ranges at perimeter edge firewall."
      ]
    },
    {
      "id": "cdto-risk-2",
      "type": "risk",
      "category": "Infrastructure & POS",
      "headline": "Aging Bluetooth thermal receipt printers in 24 stores showing disconnect errors",
      "description": "Older thermal receipt printers in West zone stores lose Bluetooth connection during peak billing, forcing cashiers to reboot devices and causing 2-minute billing delays.",
      "priority": "Critical",
      "sourceType": "Store IT Helpdesk Incident Tracker & Hardware Telemetry",
      "sourceDetail": {
        "senderOrDoc": "Store Support Central – POS Peripherals Failure Summary #IT-PRN-042",
        "timestamp": "Yesterday at 05:40 PM IST",
        "snippet": "48 printer disconnect incidents logged across 24 stores during Saturday evening trading."
      },
      "recommendedSolutions": [
        "Dispatch 50 modern USB-wired thermal printers to affected West stores via express courier.",
        "Push Bluetooth driver firmware update resolving pairing timeout glitch tonight at 2 AM.",
        "Encourage digital WhatsApp invoice delivery over paper receipts to reduce printer dependency."
      ]
    },
    {
      "id": "cdto-risk-3",
      "type": "risk",
      "category": "Integration & Data",
      "headline": "Slow response times from supplier inventory API for real-time stock lookup",
      "description": "Third-party API from major smartphone brand experiences 2.8 second response times during flash sales, slowing down store advisor stock inquiry screens.",
      "priority": "Medium",
      "sourceType": "API Gateway Telemetry (Kong Enterprise) & Microservice Tracing",
      "sourceDetail": {
        "senderOrDoc": "Integration Engineering – Partner API Latency Alert #API-OEM-771",
        "timestamp": "Today at 08:20 AM IST",
        "snippet": "Median response latency for SKU availability increased from 180ms to 2,840ms."
      },
      "recommendedSolutions": [
        "Enable local Redis caching with 5-minute time-to-live for supplier stock status lookups.",
        "Escalate service level agreement breach with supplier enterprise IT operations lead.",
        "Implement asynchronous background polling rather than synchronous blocking customer calls."
      ]
    },
    {
      "id": "cdto-risk-4",
      "type": "risk",
      "category": "Software Quality",
      "headline": "Minor UI layout rendering glitch on store tablet app for iOS devices",
      "description": "After the latest mobile POS update, store advisors using 10.2-inch iPads report that product comparison specifications require extra sideways scrolling.",
      "priority": "Low",
      "sourceType": "App Store Feedback & Store Advisor Internal Bug Reports",
      "sourceDetail": {
        "senderOrDoc": "Mobile Engineering – Bug Ticket #MOB-1049 (iPad Flexbox Layout)",
        "timestamp": "Yesterday at 02:15 PM IST",
        "snippet": "CSS flexbox horizontal overflow detected on screen resolutions 1620x2160."
      },
      "recommendedSolutions": [
        "Deploy hotfix patch v4.2.1 through internal enterprise app distribution portal tonight.",
        "Validate responsiveness across all standard store tablet device profiles.",
        "Notify store managers of the automated overnight app update."
      ]
    },
    {
      "id": "cdto-risk-5",
      "type": "risk",
      "category": "Vendor Reliability",
      "headline": "Scheduled cloud database maintenance window by hosting provider during holiday week",
      "description": "Cloud database provider scheduled minor engine patch for Sunday 3:00 AM. Requires verification that store failover replica handles all automated early morning batch jobs.",
      "priority": "Low",
      "sourceType": "Cloud Infrastructure Vendor Maintenance Advisory Notice",
      "sourceDetail": {
        "senderOrDoc": "Google Cloud Platform – Planned Database Instance Maintenance Notice",
        "timestamp": "Today at 09:30 AM IST",
        "snippet": "High-availability failover expected to cause 15-second read-only transition window."
      },
      "recommendedSolutions": [
        "Request cloud vendor postpone scheduled maintenance until after the Diwali festive peak.",
        "Run dry-run failover drill on staging cluster to confirm zero impact on store morning batch jobs.",
        "Keep senior SRE engineer on active standby during the maintenance window."
      ]
    }
  ],
  "opportunities": [
    {
      "id": "cdto-opp-1",
      "type": "opportunity",
      "category": "Edge AI Compute",
      "headline": "Autonomous edge vision cameras can eliminate ₹12 Crore in annual stock shrink",
      "description": "Edge cameras with local tensor processing units detect misplaced inventory and shelf-sweeping in under 3 seconds, protecting high-value smartphones and luxury audio items.",
      "priority": "Critical",
      "sourceType": "Edge AI Proof of Concept Results – 12 Flagship Stores",
      "sourceDetail": {
        "senderOrDoc": "Retail Technology Research – Computer Vision Loss Prevention Study",
        "timestamp": "Today at 08:40 AM IST",
        "snippet": "Zero inventory discrepancies recorded in test stores over 60 days with 99.4% detection accuracy."
      },
      "recommendedSolutions": [
        "Approve enterprise rollout of edge vision devices to top 100 high-shrinkage stores.",
        "Integrate live alert feed directly into store security guards smart pagers.",
        "Negotiate volume hardware discount for 2,000 camera units with hardware partner."
      ]
    },
    {
      "id": "cdto-opp-2",
      "type": "opportunity",
      "category": "Autonomous Self-Checkout",
      "headline": "WhatsApp dynamic billing link cuts peak checkout queue drop-offs by 40 percent",
      "description": "Allow customers purchasing accessories to scan QR codes on product shelves and pay instantly via UPI on WhatsApp, receiving verified digital exit passes on their phones.",
      "priority": "Medium",
      "sourceType": "WhatsApp Commerce Integration Trial – Delhi NCR Showrooms",
      "sourceDetail": {
        "senderOrDoc": "Digital Checkout Innovation – WhatsApp Self-Service Metric Report",
        "timestamp": "Yesterday at 04:00 PM IST",
        "snippet": "Average checkout duration reduced from 6 minutes to 45 seconds with 100% payment verification."
      },
      "recommendedSolutions": [
        "Activate WhatsApp instant checkout QR codes for all small accessories under ₹2,500.",
        "Place digital barcode validation scanners at store exit doors for fast security verification.",
        "Promote feature via showroom floor banners offering instant ₹50 cashback on WhatsApp pay."
      ]
    },
    {
      "id": "cdto-opp-3",
      "type": "opportunity",
      "category": "Predictive IoT Maintenance",
      "headline": "IoT chiller telemetry predicts AC failures 7 days before compressor breakdown",
      "description": "Smart vibration and current sensors on showroom HVAC chillers detect motor bearing wear early, preventing expensive customer showroom cooling outages during festive heat.",
      "priority": "Low",
      "sourceType": "Predictive Maintenance IoT Telemetry – Western Store HVAC Network",
      "sourceDetail": {
        "senderOrDoc": "Facility Engineering – Predictive Chiller Diagnostic Alert #IOT-HVAC-301",
        "timestamp": "Yesterday at 11:30 AM IST",
        "snippet": "Harmonic vibration analysis successfully flagged 8 failing compressor motors before breakdown."
      },
      "recommendedSolutions": [
        "Deploy vibration sensors to all 284 store chiller rooftop units by next month.",
        "Automate preventive maintenance service requests directly to certified OEM HVAC engineers.",
        "Save an estimated ₹3.2 Crore in emergency repair costs and lost store footfall."
      ]
    }
  ],
  "strategies": [
    {
      "id": "cdto-strat-1",
      "title": "Autonomous Store Shelf Vision & Real-Time Stockout Guard",
      "twoSentenceDetail": "Ceiling edge cameras scan product displays every 15 minutes to identify depleted shelves. Sends instant restock tasks to floor advisors to eliminate lost sales.",
      "tag": "Good",
      "percentCompleted": 88,
      "actions": [
        {
          "id": "cdto-act-1",
          "header": "Calibrate computer vision models on 4,000 consumer electronics product packages",
          "bullet1": "Trained models on OLED TV boxes, air fryers, and inverter AC displays",
          "bullet2": "Achieved 99.4% object detection accuracy across varying store lighting conditions",
          "assignedTo": "VisionTrain AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "cdto-act-2",
          "header": "Deploy edge tensor processing units across 120 target stores",
          "bullet1": "Connected devices to secure store VLAN with local video inferencing",
          "bullet2": "Ensures zero personal customer video is streamed or saved outside the store",
          "assignedTo": "EdgeDeploy AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "cdto-act-3",
          "header": "Integrate automated smartwatch alerts for store restocking teams",
          "bullet1": "Average time to restock empty TV display dropped from 84 minutes to 11 minutes",
          "bullet2": "Prevented an estimated ₹4.8 Crore in potential festive stockout lost revenue",
          "assignedTo": "AlertSync AI",
          "isAI": true,
          "status": "In progress",
          "progress": 80
        },
        {
          "id": "cdto-act-4",
          "header": "CDTO sign-off on nationwide camera expansion business case",
          "bullet1": "Review hardware ROI and shrinkage reduction metrics statement",
          "bullet2": "Authorize rollout of edge vision devices to remaining 164 stores",
          "assignedTo": "Ananya Sen",
          "isAI": false,
          "status": "Waiting",
          "progress": 35
        }
      ]
    },
    {
      "id": "cdto-strat-2",
      "title": "Next-Gen WhatsApp Scan-and-Pay Express Checkout",
      "twoSentenceDetail": "Enables shoppers to scan shelf QR codes and pay via UPI directly inside WhatsApp. Bypasses billing lines entirely and generates cryptographically signed exit passes.",
      "tag": "Good",
      "percentCompleted": 65,
      "actions": [
        {
          "id": "cdto-act-5",
          "header": "Build secure WhatsApp Business conversational commerce payment gateway",
          "bullet1": "Integrated NPCI UPI auto-intent deep links with zero merchant transaction fees",
          "bullet2": "Generates dynamic QR codes linked directly to store inventory stock ledger",
          "assignedTo": "ChatPay AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "cdto-act-6",
          "header": "Install optical barcode exit validation scanners at 40 trial stores",
          "bullet1": "Security staff tablets verify digital receipt signatures in under 2 seconds",
          "bullet2": "Zero false-positive alarms recorded during pilot trial",
          "assignedTo": "ScannerSync AI",
          "isAI": true,
          "status": "In progress",
          "progress": 60
        },
        {
          "id": "cdto-act-7",
          "header": "Promote scan-and-pay workflow via interactive store digital signage",
          "bullet1": "Live demonstrations displayed on 55-inch demo screens near store entrances",
          "bullet2": "Recorded 14,200 successful self-checkout transactions in first 10 days",
          "assignedTo": "PromoBot AI",
          "isAI": true,
          "status": "Waiting",
          "progress": 35
        },
        {
          "id": "cdto-act-8",
          "header": "Executive review of fraud metrics and full-chain rollout approval",
          "bullet1": "Review audit logs confirming zero unbilled product shrinkage",
          "bullet2": "Authorize nationwide activation across all 284 showrooms",
          "assignedTo": "Ananya Sen",
          "isAI": false,
          "status": "Waiting",
          "progress": 15
        }
      ]
    },
    {
      "id": "cdto-strat-3",
      "title": "Zero-Downtime POS High-Availability Architecture",
      "twoSentenceDetail": "Configures dual-redundant local database caches in all 284 store checkout terminals. Guarantees 100 percent billing continuity even during internet backbone failures.",
      "tag": "Good",
      "percentCompleted": 95,
      "actions": [
        {
          "id": "cdto-act-9",
          "header": "Install local SQLite encrypted transaction caches on 1,200 store POS units",
          "bullet1": "Stores up to 72 hours of offline billing transactions with SHA-256 security",
          "bullet2": "Automatically synchronizes with central S/4HANA upon link restoration",
          "assignedTo": "EdgeCache AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "cdto-act-10",
          "header": "Deploy dual 5G enterprise backup SIM routers to all store communication racks",
          "bullet1": "Configured automated sub-second failover between fiber and cellular links",
          "bullet2": "Conducted live disconnect drills in 100 stores with zero interrupted checkouts",
          "assignedTo": "NetMesh AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "cdto-act-11",
          "header": "Real-time telemetry monitoring on Central IT Command dashboard",
          "bullet1": "99.98% uptime maintained during peak weekend festive trading hours",
          "bullet2": "Median checkout latency held under 850 milliseconds",
          "assignedTo": "SREMonitor AI",
          "isAI": true,
          "status": "In progress",
          "progress": 90
        },
        {
          "id": "cdto-act-12",
          "header": "Final operational certification and quarterly disaster recovery report",
          "bullet1": "Validate third-party SOC-2 audit logs and transaction consistency proofs",
          "bullet2": "Sign off on festive IT stability sign-off certificate",
          "assignedTo": "Ananya Sen",
          "isAI": false,
          "status": "Waiting",
          "progress": 40
        }
      ]
    }
  ],
  "starterQuestions": [
    "How many operational hours have our automated software agents saved this month?",
    "What is the live uptime of our store POS terminals across all 284 locations?",
    "Are there any high-priority software bugs affecting festive store checkout?",
    "What is the measured return on investment of our edge computer vision rollout?"
  ]
},
  'Chief Operations & Supply Chain Officer (COSO)': {
  "kpiCards": [
    {
      "id": "coso-ontime",
      "title": "On-time delivery to stores",
      "value": "96.5%",
      "unit": "scheduled deliveries",
      "trend": "+4.2% vs target",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "88.5%",
        "comparisonText": "+8.0% faster dispatch",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Logistics Performance Index"
      },
      "sparkline": [
        91,
        92,
        93,
        94,
        95,
        96,
        96.5
      ],
      "detailTitle": "Store Delivery Performance by Region",
      "detailDescription": "On-time delivery tracking across 4 central distribution hubs and 284 physical retail stores.",
      "detailItems": [
        {
          "label": "North Distribution Hub (Noida)",
          "value": "97.8% on-time",
          "subtext": "Serving 82 North stores",
          "isPositive": true
        },
        {
          "label": "West Distribution Hub (Bhiwandi)",
          "value": "98.1% on-time",
          "subtext": "Serving 78 West stores",
          "isPositive": true
        },
        {
          "label": "South Distribution Hub (Hosur)",
          "value": "95.4% on-time",
          "subtext": "Serving 74 South stores",
          "isPositive": true
        },
        {
          "label": "East Distribution Hub (Kolkata)",
          "value": "94.2% on-time",
          "subtext": "Serving 50 East stores",
          "isPositive": true
        }
      ]
    },
    {
      "id": "coso-stock",
      "title": "On-shelf product availability",
      "value": "97.4%",
      "unit": "in-stock rate",
      "trend": "+2.1% vs festive plan",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "89.0%",
        "comparisonText": "+8.4% fewer lost sales",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Supply Chain Operations Standard"
      },
      "sparkline": [
        93,
        94,
        95,
        95.5,
        96,
        97,
        97.4
      ],
      "detailTitle": "Stock Availability by High-Demand Category",
      "detailDescription": "Percentage of time top 500 bestselling electronics are in stock and ready for immediate purchase.",
      "detailItems": [
        {
          "label": "Inverter 5-Star Air Conditioners",
          "value": "98.6% available",
          "subtext": "High seasonal buffer maintained",
          "isPositive": true
        },
        {
          "label": "55\" and 65\" 4K Smart TVs",
          "value": "97.2% available",
          "subtext": "Replenished daily from local hubs",
          "isPositive": true
        },
        {
          "label": "Smartphones & 5G Handsets",
          "value": "98.9% available",
          "subtext": "Direct vendor ship-to-store",
          "isPositive": true
        },
        {
          "label": "Microwaves & Smart Kitchen",
          "value": "94.8% available",
          "subtext": "East zone warehouse slightly lean",
          "isPositive": false
        }
      ]
    },
    {
      "id": "coso-festive",
      "title": "Route compliance & fleet efficiency",
      "value": "92.8%",
      "unit": "GPS compliance",
      "trend": "+5.4% vs last quarter",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "79.2%",
        "comparisonText": "+13.6% higher efficiency",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Fleet & Transport Association"
      },
      "sparkline": [
        82,
        84,
        86,
        88,
        90,
        91,
        92.8
      ],
      "detailTitle": "Fleet Telemetry & Fuel Optimization",
      "detailDescription": "Performance of 420 GPS-tracked transport trucks moving goods between distribution hubs and stores.",
      "detailItems": [
        {
          "label": "Optimized Route Adherence",
          "value": "94.2% compliant",
          "subtext": "Avoided urban traffic congestions",
          "isPositive": true
        },
        {
          "label": "Fleet Fuel Consumption Savings",
          "value": "₹1.8 Cr saved",
          "subtext": "8% reduction in diesel per ton-km",
          "isPositive": true
        },
        {
          "label": "Night Delivery Slot Utilization",
          "value": "89.5% utilized",
          "subtext": "Unloaded during zero-footfall hours",
          "isPositive": true
        }
      ]
    },
    {
      "id": "coso-cost",
      "title": "Product returns & transit damages",
      "value": "1.8%",
      "unit": "damage rate",
      "trend": "-0.9% vs last festive season",
      "trendDirection": "down",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "4.5%",
        "comparisonText": "-2.7% fewer returns",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Reverse Logistics Benchmark"
      },
      "sparkline": [
        3.2,
        2.9,
        2.6,
        2.3,
        2.1,
        1.9,
        1.8
      ],
      "detailTitle": "Damage Metrics by Appliance Class",
      "detailDescription": "Transit safety achieved through reinforced pallet wrapping, hydraulic lifts, and sensor tracking.",
      "detailItems": [
        {
          "label": "Large Screen OLED Televisions",
          "value": "0.8% damage",
          "subtext": "Specialized vertical foam crates",
          "isPositive": true
        },
        {
          "label": "Side-by-Side Refrigerators",
          "value": "1.2% damage",
          "subtext": "Corner edge buffer guards",
          "isPositive": true
        },
        {
          "label": "Washing Machines & Dryers",
          "value": "1.4% damage",
          "subtext": "Drum locking bolts strictly checked",
          "isPositive": true
        },
        {
          "label": "Small Kitchen Appliances",
          "value": "0.4% damage",
          "subtext": "Corrugated master cartons",
          "isPositive": true
        }
      ]
    },
    {
      "id": "coso-damage",
      "title": "Inventory turnover per year",
      "value": "6.8x / yr",
      "unit": "turns per year",
      "trend": "+1.4x vs last year",
      "trendDirection": "up",
      "trendPositive": true,
      "industryBenchmark": {
        "value": "4.9x / yr",
        "comparisonText": "+1.9x faster inventory turn",
        "isBeatingBenchmark": true,
        "benchmarkSource": "Warehouse Excellence Council"
      },
      "sparkline": [
        4.8,
        5.1,
        5.5,
        5.9,
        6.2,
        6.5,
        6.8
      ],
      "detailTitle": "Stock Velocity & Holding Days",
      "detailDescription": "How rapidly inventory cycles through warehouse storage onto showroom display floors.",
      "detailItems": [
        {
          "label": "High Velocity Consumer Tech (Mobiles)",
          "value": "14.2 turns/yr",
          "subtext": "25 days average holding time",
          "isPositive": true
        },
        {
          "label": "Seasonal Festive Cooling (ACs & Fans)",
          "value": "8.4 turns/yr",
          "subtext": "43 days average holding time",
          "isPositive": true
        },
        {
          "label": "Large Kitchen Appliances (Fridges)",
          "value": "6.1 turns/yr",
          "subtext": "59 days average holding time",
          "isPositive": true
        }
      ]
    }
  ],
  "extraDashboards": [
    {
      "title": "Warehouse Fleet Turnaround Time",
      "subtitle": "Target vs Actual minutes from docking to dispatch",
      "type": "bar",
      "items": [
        {
          "label": "North Shed (Noida)",
          "value": 42,
          "target": 45,
          "secondary": "Actual 42m vs Target 45m"
        },
        {
          "label": "West Shed (Bhiwandi)",
          "value": 38,
          "target": 45,
          "secondary": "Actual 38m vs Target 45m"
        },
        {
          "label": "South Shed (Hosur)",
          "value": 44,
          "target": 45,
          "secondary": "Actual 44m vs Target 45m"
        },
        {
          "label": "East Shed (Kolkata)",
          "value": 48,
          "target": 45,
          "secondary": "Actual 48m vs Target 45m"
        }
      ]
    },
    {
      "title": "Inter-Store Stock Movement Health",
      "subtitle": "Status of active stock transfers balancing supply",
      "type": "donut",
      "items": [
        {
          "label": "Arrived & restocked on shelf",
          "value": "78%",
          "color": "#34A853"
        },
        {
          "label": "In transit on local shuttle",
          "value": "18%",
          "color": "#4285F4"
        },
        {
          "label": "Loading at hub dock",
          "value": "4%",
          "color": "#FBBC05"
        }
      ]
    }
  ],
  "intelligence": [
    {
      "id": "coso-int-1",
      "headline": "Government cuts import tariffs on electronic display panels by five percent",
      "oneLiner": "Import duties reduced, lowering procurement costs across 55-inch and 65-inch models.",
      "source": "Ministry of Commerce Official Gazette",
      "timeAgo": "25 mins ago",
      "tag": "Good",
      "fullDetail": "Customs notification lowers tariff on imported open-cell television screens, allowing us to negotiate immediate savings of ₹3.4 Crore on upcoming supplier production orders."
    },
    {
      "id": "coso-int-2",
      "headline": "Automated warehouse conveyor in Bhiwandi sets national dispatch record",
      "oneLiner": "44,000 festive appliances dispatched in 24 hours with zero sorting errors.",
      "source": "Internal – Logistics Automation Engine",
      "timeAgo": "1 hr ago",
      "tag": "Good",
      "fullDetail": "Robotic high-bay sorter in our West distribution center sorted and routed appliances to 78 stores across Maharashtra and Gujarat ahead of scheduled departure times."
    },
    {
      "id": "coso-int-3",
      "headline": "Highway road repairs in West Bengal slow television deliveries by 12 hours",
      "oneLiner": "Four container trucks bound for Kolkata rerouted via alternate state highways.",
      "source": "National Highways Authority Portal",
      "timeAgo": "2 hrs ago",
      "tag": "Bad",
      "fullDetail": "Culvert repairs on National Highway 19 caused traffic congestion. Rerouting emergency store stock transfers from Patna ensures Kolkata stores do not run out of televisions."
    },
    {
      "id": "coso-int-4",
      "headline": "Autonomous truck routing software reduces diesel expenditure by ₹1.8 Crore",
      "oneLiner": "Dynamic delivery clustering cut unladen miles by 14 percent across national fleet.",
      "source": "Internal – Fleet Optimization Telemetry",
      "timeAgo": "3 hrs ago",
      "tag": "Good",
      "fullDetail": "AI route planner consolidated regional store deliveries into night-time off-peak corridors, dodging metropolitan traffic jams and reducing carbon emissions by 420 metric tons."
    },
    {
      "id": "coso-int-5",
      "headline": "Pallet drop sensors reduce high-ticket transit damage to all-time low of 0.42 percent",
      "oneLiner": "IoT shock sensors on OLED TV crates alerted freight drivers to rough road patches.",
      "source": "Internal – Cargo Safety Monitoring",
      "timeAgo": "5 hrs ago",
      "tag": "Good",
      "fullDetail": "Accelerometer sensor tags on premium television containers triggered real-time cabin warnings whenever road vibration exceeded 2.5G, keeping transit claims negligible."
    }
  ],
  "risks": [
    {
      "id": "coso-risk-1",
      "type": "risk",
      "category": "Logistics & Weather",
      "headline": "Heavy monsoon rains warning for coastal Andhra and Odisha transport routes",
      "description": "Meteorological department forecast cyclonic rains over next 48 hours. 14 trucks carrying 1,200 festive refrigerators to coastal stores risk weather delays.",
      "priority": "Critical",
      "sourceType": "Indian Meteorological Department Warning & Transport Weather Radar",
      "sourceDetail": {
        "senderOrDoc": "National Fleet Dispatch Operations – Weather Advisory Notice #MET-CYC-019",
        "timestamp": "Today at 06:30 AM IST",
        "snippet": "Predicted wind speeds >65 km/h and localized flooding along NH-16 corridor between Visakhapatnam and Cuttack."
      },
      "recommendedSolutions": [
        "Pre-dispatch all coastal store weekend inventory today before rain intensifies.",
        "Reroute transport convoys through elevated inland highways (NH-26 / NH-30).",
        "Equip all truck cargo beds with heavy-duty waterproof tarpaulins and pallet seals."
      ]
    },
    {
      "id": "coso-risk-2",
      "type": "risk",
      "category": "Warehouse Bottlenecks",
      "headline": "Docking bay congestion in Noida North distribution hub during morning unloads",
      "description": "Simultaneous arrival of 28 supplier trailers created a 90-minute queue outside distribution gates, delaying subsequent store outbound dispatches by 45 minutes.",
      "priority": "Critical",
      "sourceType": "Warehouse Management System (Blue Yonder) & Dock Telemetry",
      "sourceDetail": {
        "senderOrDoc": "North Distribution Center Operations – Gate Queue Telemetry Report",
        "timestamp": "Yesterday at 07:15 AM IST",
        "snippet": "Trailer gate wait time averaged 94 minutes vs 20-minute SLA threshold."
      },
      "recommendedSolutions": [
        "Implement mandatory supplier appointment scheduling via digital dock booking portal.",
        "Open 4 auxiliary unloading bays and authorize 2 hours of morning overtime for dock crews.",
        "Prioritize high-demand festive SKU trailers for rapid express cross-docking."
      ]
    },
    {
      "id": "coso-risk-3",
      "type": "risk",
      "category": "Import & Port Customs",
      "headline": "Port customs clearance delay on 18 container loads of smart microwaves",
      "description": "Nhava Sheva container terminal experienced automated customs EDI gateway downtime. 4,200 microwave ovens are delayed by 36 hours before warehouse intake.",
      "priority": "Medium",
      "sourceType": "JNPT Port Operations Status & Customs Broker Clearance Feed",
      "sourceDetail": {
        "senderOrDoc": "Customs Clearance Agent – Vessel Cargo Status Advisory #JNPT-BL-4021",
        "timestamp": "Today at 08:10 AM IST",
        "snippet": "EDI document processing stalled due to server migration; clearance expected within 24 hours."
      },
      "recommendedSolutions": [
        "File manual paper customs release bonds to clear 8 urgent containers immediately.",
        "Temporarily rebalance microwave oven inventory from North warehouses to West stores.",
        "Coordinate dedicated express bonded trucking once customs gate passes are generated."
      ]
    },
    {
      "id": "coso-risk-4",
      "type": "risk",
      "category": "Packaging & Damage",
      "headline": "Cardboard carton corner compression on 200 washing machines in East transit",
      "description": "Rough rail container shunting caused outer packaging scuffing on 200 front-load washing machines. While internal appliances are intact, external boxes look worn.",
      "priority": "Low",
      "sourceType": "Inbound Warehouse Quality Inspection Report – Kolkata Distribution Shed",
      "sourceDetail": {
        "senderOrDoc": "Quality Assurance Registry – Receiving Incident Log #QA-EST-091",
        "timestamp": "Yesterday at 03:45 PM IST",
        "snippet": "Packaging compression rate at 4.2% on rail container rake #CR-984 from Pune factory."
      },
      "recommendedSolutions": [
        "Inspect and repackage scuffed appliances with fresh branded master cartons before store delivery.",
        "Lodge insurance and damage claim with railway freight corporation for re-boxing expenses.",
        "Switch fragile appliance transport on East routes from rail to air-suspension road trucks."
      ]
    },
    {
      "id": "coso-risk-5",
      "type": "risk",
      "category": "Fleet Operations",
      "headline": "Diesel fuel price revision increases inter-city freight haulage costs by 2.2%",
      "description": "Oil marketing companies revised commercial diesel rates by ₹1.80 per liter. Increases monthly inter-city transport budget by ₹42 Lakh across 420 fleet vehicles.",
      "priority": "Low",
      "sourceType": "Petroleum Planning & Analysis Cell Price Bulletin & Fleet Expense Ledger",
      "sourceDetail": {
        "senderOrDoc": "Fleet Operations Directorate – Monthly Fuel Surcharge Variance Statement",
        "timestamp": "Today at 09:40 AM IST",
        "snippet": "Diesel average wholesale rate across 4 states adjusted to ₹89.40/L."
      },
      "recommendedSolutions": [
        "Optimize multi-drop truck clustering to eliminate 18,000 deadhead haulage kilometers.",
        "Enforce strict automated engine idle shutdown protocols during store unloading stops.",
        "Accelerate transition of urban delivery shuttle fleet to electric commercial vans."
      ]
    }
  ],
  "opportunities": [
    {
      "id": "coso-opp-1",
      "type": "opportunity",
      "category": "Autonomous Store Balancing",
      "headline": "Autonomous store-to-store stock balancing unlocks ₹18 Crore in recovered sales",
      "description": "AI algorithm identifies stores with surplus inventory and automatically routes stock to nearby stores facing impending stockouts, avoiding central warehouse turnaround time.",
      "priority": "Critical",
      "sourceType": "Autonomous Stock Balancer Engine – Q3 Performance Audit",
      "sourceDetail": {
        "senderOrDoc": "Supply Chain Analytics – Local Store Transfer Efficiency Assessment",
        "timestamp": "Today at 08:35 AM IST",
        "snippet": "420 local shuttles transferred 6,400 appliances with an average transit time of under 3 hours."
      },
      "recommendedSolutions": [
        "Authorize automated inter-store stock transfers for products with inventory variance >40%.",
        "Equip local store delivery vans with dynamic route-balancing navigation tablets.",
        "Incentivize transferring stores with credited commission margin on liquidated stock."
      ]
    },
    {
      "id": "coso-opp-2",
      "type": "opportunity",
      "category": "Green Fleet Delivery",
      "headline": "Electric commercial vehicle fleet reduces urban store delivery costs by 45%",
      "description": "Deploying 80 electric 3-wheeler and mini-truck vehicles for city store deliveries saves ₹1.4 Crore annually in fuel and secures unrestricted 24/7 city entry permits.",
      "priority": "Medium",
      "sourceType": "Green Logistics Feasibility Study & EV Fleet Pilot Trial",
      "sourceDetail": {
        "senderOrDoc": "Sustainability & Fleet Innovation – EV Urban Delivery Performance Report",
        "timestamp": "Yesterday at 04:15 PM IST",
        "snippet": "Operating cost of ₹2.10 per kilometer compared to ₹7.80 for diesel commercial vans."
      },
      "recommendedSolutions": [
        "Expand EV delivery fleet from 20 to 80 vehicles across Mumbai, Delhi, and Bengaluru.",
        "Install high-speed DC fast-charging points at 8 regional warehouse loading hubs.",
        "Leverage clean green logistics branding in corporate sustainability disclosures."
      ]
    },
    {
      "id": "coso-opp-3",
      "type": "opportunity",
      "category": "Supplier Cross-Docking",
      "headline": "Supplier direct-to-store cross-docking cuts warehouse holding days by 4 days",
      "description": "Partnering with top TV manufacturers to ship full truckloads directly to high-volume store clusters eliminates intermediate warehouse touches and saves ₹2.8 Crore.",
      "priority": "Low",
      "sourceType": "OEM Direct Fulfillment Agreement – Samsung & LG Supply Chain Term Sheet",
      "sourceDetail": {
        "senderOrDoc": "Commercial Logistics – Direct Store Delivery Protocol #DSD-OEM-201",
        "timestamp": "Yesterday at 02:40 PM IST",
        "snippet": "Direct delivery eliminates warehouse handling fees of ₹420 per large appliance."
      },
      "recommendedSolutions": [
        "Roll out direct-to-store deliveries for top 40 high-volume metro flagship stores.",
        "Synchronize supplier factory dispatch schedules with store off-peak unloading windows.",
        "Reallocate freed warehouse square footage to high-margin small kitchen appliance buffer."
      ]
    }
  ],
  "strategies": [
    {
      "id": "coso-strat-1",
      "title": "Autonomous Store-to-Store Stock Balancing",
      "twoSentenceDetail": "Software bot monitors inventory levels across adjacent retail locations. Dispatches local shuttle transfers to rebalance stock in 3 hours before stockouts happen.",
      "tag": "Good",
      "percentCompleted": 80,
      "actions": [
        {
          "id": "coso-act-1",
          "header": "Analyze stock levels and footfall demand across 284 store showrooms",
          "bullet1": "Identified 18 stores in Delhi-NCR with low 55-inch OLED TV inventory",
          "bullet2": "Located 4 nearby stores with surplus stock exceeding 30 days holding buffer",
          "assignedTo": "RebalanceAI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "coso-act-2",
          "header": "Dispatch automated store transfer manifests to local logistics shuttles",
          "bullet1": "Generated digital transfer vouchers and electronic gate passes in ERP",
          "bullet2": "Transferred 340 television and AC units within 3 hours",
          "assignedTo": "ShuttleSync AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "coso-act-3",
          "header": "Track real-time arrival and shelf display restock at receiving stores",
          "bullet1": "All 18 stores restocked prior to Friday evening peak footfall rush",
          "bullet2": "Captured an estimated ₹1.8 Crore in protected customer weekend purchases",
          "assignedTo": "ArrivalMonitor AI",
          "isAI": true,
          "status": "In progress",
          "progress": 75
        },
        {
          "id": "coso-act-4",
          "header": "COSO executive sign-off on regional inter-store transfer billing rules",
          "bullet1": "Review store margin split and internal freight cost allocations",
          "bullet2": "Authorize expanded mandate for West and South clusters",
          "assignedTo": "Vikramaditya Roy",
          "isAI": false,
          "status": "Waiting",
          "progress": 25
        }
      ]
    },
    {
      "id": "coso-strat-2",
      "title": "Autonomous Route Clustering & Green Logistics Fleet",
      "twoSentenceDetail": "Dynamic delivery engine optimizes truck routes based on live traffic, delivery slots, and load weights. Minimizes fuel consumption and guarantees 96.5 percent on-time delivery.",
      "tag": "Good",
      "percentCompleted": 65,
      "actions": [
        {
          "id": "coso-act-5",
          "header": "Consolidate 1,400 daily store replenishment orders into optimized clusters",
          "bullet1": "Grouped shipments by geometric delivery corridors and store receiving windows",
          "bullet2": "Eliminated 14% of empty return haulage miles across national fleet",
          "assignedTo": "RouteOptimizer AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "coso-act-6",
          "header": "Transmit turn-by-turn navigation schedules to 420 transport truck telematics",
          "bullet1": "Guided freight drivers through off-peak metropolitan traffic corridors",
          "bullet2": "Maintained 94.2% route compliance with zero transit safety violations",
          "assignedTo": "FleetNav AI",
          "isAI": true,
          "status": "In progress",
          "progress": 70
        },
        {
          "id": "coso-act-7",
          "header": "Monitor live warehouse gate turnaround and store unloading times",
          "bullet1": "Average warehouse dock turnaround held at 38 minutes",
          "bullet2": "Fuel savings reached ₹1.8 Crore over 30-day monitoring period",
          "assignedTo": "DockMonitor AI",
          "isAI": true,
          "status": "Waiting",
          "progress": 40
        },
        {
          "id": "coso-act-8",
          "header": "Sign off on new EV commercial truck lease agreement for 60 vehicles",
          "bullet1": "Review 5-year lease terms and battery warranty SLA with commercial vehicle maker",
          "bullet2": "Approve ₹8.4 Crore fleet upgrade capital expenditure",
          "assignedTo": "Vikramaditya Roy",
          "isAI": false,
          "status": "Waiting",
          "progress": 10
        }
      ]
    },
    {
      "id": "coso-strat-3",
      "title": "Automated Pallet Shock Sensor & Fragile Transit Protection",
      "twoSentenceDetail": "IoT vibration sensors on television and refrigerator crates alert drivers to harsh road conditions in real time. Slashes in-transit damage rates to under 0.5 percent.",
      "tag": "Good",
      "percentCompleted": 90,
      "actions": [
        {
          "id": "coso-act-9",
          "header": "Deploy 2,400 reusable Bluetooth accelerometer sensors on high-value crates",
          "bullet1": "Mounted on 55-inch and 65-inch OLED TVs, French door fridges, and washers",
          "bullet2": "Calibrated to detect impact shocks exceeding 2.0G force thresholds",
          "assignedTo": "SensorDeploy AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "coso-act-10",
          "header": "Integrate real-time driver cabin buzzer alerts for rough road warnings",
          "bullet1": "Alerts drivers instantly to reduce speed on unpaved or damaged highway stretches",
          "bullet2": "Reduced harsh braking and transit shock incidents by 68%",
          "assignedTo": "DriverCabin AI",
          "isAI": true,
          "status": "Done",
          "progress": 100
        },
        {
          "id": "coso-act-11",
          "header": "Automated intake quality check via sensor scan at receiving warehouse docks",
          "bullet1": "Sensors upload full transit trip logs in 3 seconds at store receiving doors",
          "bullet2": "Damage rate dropped to 0.42% – all-time company record",
          "assignedTo": "IntakeAudit AI",
          "isAI": true,
          "status": "In progress",
          "progress": 85
        },
        {
          "id": "coso-act-12",
          "header": "Executive review of freight insurance premium reduction savings",
          "bullet1": "Present validated zero-claim transit records to marine cargo insurance underwriters",
          "bullet2": "Secure ₹85 Lakh discount on annual corporate logistics insurance premium",
          "assignedTo": "Vikramaditya Roy",
          "isAI": false,
          "status": "Waiting",
          "progress": 30
        }
      ]
    }
  ],
  "starterQuestions": [
    "What is our current on-time delivery rate from warehouses to all 284 stores?",
    "Which product categories are facing the highest risk of festive stockouts?",
    "How much fuel have we saved through automated truck route clustering this month?",
    "Are there any weather-related transport bottlenecks impacting East or coastal stores?"
  ]
},
};

const PERSONA_CONTACT_DIRECTORY: Record<PersonaType, any[]> = {
  "Chief Financial Officer (CFO)": [
    {
      "name": "Rohan Varma",
      "role": "VP Merchandising & Gross Margins",
      "department": "Commercial Finance",
      "email": "rohan.varma@thearkitects.in",
      "phone": "+91 98201 44210"
    },
    {
      "name": "Anita Desai",
      "role": "Head of Treasury & Working Capital",
      "department": "Corporate Treasury",
      "email": "anita.desai@thearkitects.in",
      "phone": "+91 98210 55192"
    },
    {
      "name": "Manish Kulkarni",
      "role": "Director of Marketing Analytics",
      "department": "Growth & ROI",
      "email": "manish.k@thearkitects.in",
      "phone": "+91 98302 77145"
    },
    {
      "name": "Sunita Rao",
      "role": "Controller Accounts Payable",
      "department": "Financial Operations",
      "email": "sunita.rao@thearkitects.in",
      "phone": "+91 98404 11290"
    },
    {
      "name": "Vikram Sethi",
      "role": "Senior VP Inventory Valuation",
      "department": "Supply Chain Finance",
      "email": "vikram.sethi@thearkitects.in",
      "phone": "+91 98111 88320"
    }
  ],
  "Chief Executive Officer (CEO)": [
    {
      "name": "Siddharth Rao",
      "role": "Chief Customer Experience Officer",
      "department": "Retail Operations",
      "email": "siddharth.rao@thearkitects.in",
      "phone": "+91 98200 12345"
    },
    {
      "name": "Kavita Menon",
      "role": "VP Market Strategy & Expansion",
      "department": "Executive Office",
      "email": "kavita.menon@thearkitects.in",
      "phone": "+91 98300 23456"
    },
    {
      "name": "Arjun Das",
      "role": "Head of National Store Operations",
      "department": "Physical Stores",
      "email": "arjun.das@thearkitects.in",
      "phone": "+91 98400 34567"
    },
    {
      "name": "Tapan Mukherjee",
      "role": "Regional Director - East & North East",
      "department": "Regional Management",
      "email": "tapan.m@thearkitects.in",
      "phone": "+91 98500 45678"
    },
    {
      "name": "Deepak Singhania",
      "role": "VP Category & Festive Sales",
      "department": "Merchandising",
      "email": "deepak.s@thearkitects.in",
      "phone": "+91 98600 56789"
    }
  ],
  "Chief People Officer (CHRO)": [
    {
      "name": "Meenakshi Sundaram",
      "role": "VP Talent Acquisition & Workforce",
      "department": "Human Resources",
      "email": "meenakshi.s@thearkitects.in",
      "phone": "+91 98700 67890"
    },
    {
      "name": "Rohit Balan",
      "role": "Head of Workplace Safety & Wellness",
      "department": "People Operations",
      "email": "rohit.balan@thearkitects.in",
      "phone": "+91 98800 78901"
    },
    {
      "name": "Sanjay Deshmukh",
      "role": "Director Technical Academy",
      "department": "Learning & Skills",
      "email": "sanjay.d@thearkitects.in",
      "phone": "+91 98900 89012"
    },
    {
      "name": "Naveen Kumar",
      "role": "Chief Learning Officer",
      "department": "People Development",
      "email": "naveen.k@thearkitects.in",
      "phone": "+91 98101 90123"
    },
    {
      "name": "Rashmi Joshi",
      "role": "Head of Employee Engagement",
      "department": "Culture & Pulse",
      "email": "rashmi.j@thearkitects.in",
      "phone": "+91 98202 01234"
    }
  ],
  "Chief Digital & Technology Officer (CDTO)": [
    {
      "name": "Ananya Sen",
      "role": "VP Cloud Infrastructure & SRE",
      "department": "Core Platforms",
      "email": "ananya.sen@thearkitects.in",
      "phone": "+91 98303 12345"
    },
    {
      "name": "Kartik Iyer",
      "role": "Head of Store IoT & Edge Cameras",
      "department": "Retail Technology",
      "email": "kartik.iyer@thearkitects.in",
      "phone": "+91 98404 23456"
    },
    {
      "name": "Pooja Bhatt",
      "role": "Director Digital Products & UX",
      "department": "Store Experience",
      "email": "pooja.bhatt@thearkitects.in",
      "phone": "+91 98505 34567"
    },
    {
      "name": "Debashis Roy",
      "role": "Head of Enterprise Data Engineering",
      "department": "AI & Data Lake",
      "email": "debashis.roy@thearkitects.in",
      "phone": "+91 98606 45678"
    },
    {
      "name": "Sumeet Joshi",
      "role": "Lead Information Security Officer",
      "department": "Cyber Defense",
      "email": "sumeet.j@thearkitects.in",
      "phone": "+91 98707 56789"
    }
  ],
  "Chief Operations & Supply Chain Officer (COSO)": [
    {
      "name": "Vikramaditya Roy",
      "role": "Head of National Fleet Logistics",
      "department": "Transportation",
      "email": "vikram.roy@thearkitects.in",
      "phone": "+91 98808 67890"
    },
    {
      "name": "Harish Nair",
      "role": "Director Customs & Import Operations",
      "department": "Global Procurement",
      "email": "harish.nair@thearkitects.in",
      "phone": "+91 98909 78901"
    },
    {
      "name": "Subhash Sen",
      "role": "General Manager Central Warehousing",
      "department": "Distribution Hubs",
      "email": "subhash.sen@thearkitects.in",
      "phone": "+91 98110 89012"
    },
    {
      "name": "Rakesh Chouhan",
      "role": "Head of Regional Hub Delivery",
      "department": "Last-Mile Fulfillment",
      "email": "rakesh.c@thearkitects.in",
      "phone": "+91 98211 90123"
    },
    {
      "name": "Gopalakrishnan V.",
      "role": "Director Carrier & Fleet Relations",
      "department": "Supply Chain Operations",
      "email": "gopal.v@thearkitects.in",
      "phone": "+91 98312 01234"
    }
  ]
};

export const PERSONA_DATA: Record<PersonaType, PersonaDataBundle> = (Object.keys(RAW_PERSONA_DATA) as PersonaType[]).reduce(
  (acc, persona) => {
    const rawBundle = RAW_PERSONA_DATA[persona];
    const contacts = PERSONA_CONTACT_DIRECTORY[persona] || [];

    const kpiCards: KPICardData[] = rawBundle.kpiCards.map((card: any, idx: number) => ({
      ...card,
      leadContact: contacts[idx % contacts.length],
    }));

    const intelligence: IntelligenceItem[] = rawBundle.intelligence.map((item: any, idx: number) => {
      const contact = contacts[(idx + 1) % contacts.length];
      return {
        ...item,
        contactPerson: contact,
        inDepthReport: {
          summary: `Comprehensive strategic intelligence briefing covering store impact, vendor movements, and operational recommendations for ${persona}.`,
          keyMetrics: [
            { label: 'Target Variance', value: item.tag === 'Good' ? '+4.2%' : item.tag === 'Bad' ? '-3.8%' : 'On Target' },
            { label: 'Store Scope', value: '284 Stores' },
            { label: 'Financial Impact', value: item.tag === 'Good' ? 'Positive ROI' : item.tag === 'Bad' ? '₹1.8 Cr at risk' : 'Neutral' },
            { label: 'AI Confidence', value: '99.4%' },
          ],
          affectedStoresOrDepts: 'Physical electronics stores across 4 regions, central procurement, and regional distribution sheds.',
          executiveRecommendation:
            item.tag === 'Bad'
              ? 'Escalate immediate mitigation with regional store heads and review at 2 PM checkpoint.'
              : 'Scale best execution practices and maintain continuous monitoring cadence.',
        },
      };
    });

    const risks: RadarItem[] = rawBundle.risks.map((risk: any, idx: number) => ({
      ...risk,
      contactPerson: contacts[idx % contacts.length],
    }));

    const opportunities: RadarItem[] = rawBundle.opportunities.map((opp: any, idx: number) => ({
      ...opp,
      contactPerson: contacts[(idx + 2) % contacts.length],
    }));

    acc[persona] = {
      kpiCards,
      extraDashboards: rawBundle.extraDashboards,
      intelligence,
      risks,
      opportunities,
      strategies: rawBundle.strategies,
      starterQuestions: rawBundle.starterQuestions,
    };
    return acc;
  },
  {} as Record<PersonaType, PersonaDataBundle>
);
