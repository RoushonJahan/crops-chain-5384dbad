const sellers = [
    {
        id: 'SHP00001',
        shopName: 'Farm House',
        ownerName: 'Md. Rahman',
        phone: '+8801712345001',
        location: 'Rajshahi',
        transactionType: 'Nagad',
        totalOrders: 156,
      },
      {
        id: 'SHP00002',
        shopName: 'AgroAgency Ltd. Co.',
        ownerName: 'Fatima Khatun',
        phone: '+8801712345002',
        location: 'Dhaka',
        transactionType: 'bKash',
        totalOrders: 234,
      },
      {
        id: 'SHP00003',
        shopName: 'Northern Agro',
        ownerName: 'Abdul Karim',
        phone: '+8801712345003',
        location: 'Gazipur',
        transactionType: 'Nagad',
        totalOrders: 189,
      },
      {
        id: 'SHP00004',
        shopName: 'Green Valley',
        ownerName: 'Nasir Ahmed',
        phone: '+8801712345004',
        location: 'Cumilla',
        transactionType: 'bKash',
        totalOrders: 298,
      },
      {
        id: 'SHP00005',
        shopName: 'Rural Farmers',
        ownerName: 'Rashida Begum',
        phone: '+8801712345005',
        location: 'Bogura',
        transactionType: 'Nagad',
        totalOrders: 167,
      }
  ];

  const buyers = [
    {
      id: 'S001',
      shopName: 'Dhaka Electronics',
      ownerName: 'Kazi Hassan',
      phone: '+8801712346881',
      transactionType: 'bKash',
      location: 'Dhaka',
      totalOrders: 156,
    },
    {
      id: 'S002',
      shopName: 'Chittagong Traders',
      ownerName: 'Rafiqul Alam',
      phone: '+8801712346872',
      transactionType: 'Nagad',
      location: 'Chittagong',
      totalOrders: 89,
    },
    {
      id: 'S003',
      shopName: 'Sylhet Supermart',
      ownerName: 'Mahfuz Ullah',
      phone: '+8801712346873',
      transactionType: 'Rocket',
      location: 'Sylhet',
      totalOrders: 203,
    },
    {
      id: 'S004',
      shopName: 'Rajshahi Hub',
      ownerName: 'Jamal Hossain',
      phone: '+8801712346874',
      transactionType: 'Bank',
      location: 'Rajshahi',
      totalOrders: 134,
    },
    {
      id: 'S005',
      shopName: 'Khulna Wholesale',
      ownerName: 'Rafiqul Rahman',
      phone: '+8801712346875',
      transactionType: 'bKash',
      location: 'Khulna',
      totalOrders: 98,
    }
  ];
  const products = [
    {
      id: 'P001',
      name: 'Rice',
      price: 45,
      quantity: 500,
      shopName: 'Farm House',
      location: 'Rajshahi',
      status: 'available',
      harvestDate: '2024-01-15'
    },
    {
      id: 'P002',
      name: 'Wheat',
      price: 55,
      quantity: 300,
      shopName: 'AgroAgency Ltd. Co.',
      location: 'Dhaka',
      status: 'available',
      harvestDate: '2024-01-20'
    },
    {
      id: 'P003',
      name: 'Corn',
      price: 35,
      quantity: 87,
      shopName: 'Northern Agro',
      location: 'Gazipur',
      status: 'stock-out',
      harvestDate: '2024-01-10'
    },
    {
      id: 'P004',
      name: 'Tomato',
      price: 25,
      quantity: 200,
      shopName: 'Green Valley',
      location: 'Cumilla',
      status: 'available',
      harvestDate: '2024-02-01'
    },
    {
      id: 'P005',
      name: 'Potato',
      price: 18,
      quantity: 450,
      shopName: 'Rural Farmers',
      location: 'Bogura',
      status: 'available',
      harvestDate: '2024-01-25'
    },
    {
      id: 'P006',
      name: 'Onion',
      price: 30,
      quantity: 320,
      shopName: 'Valley Fresh',
      location: 'Pabna',
      status: 'available',
      harvestDate: '2024-02-05'
    },
    {
      id: 'P007',
      name: 'Garlic',
      price: 120,
      quantity: 150,
      shopName: 'Spice Garden',
      location: 'Jessore',
      status: 'available',
      harvestDate: '2024-01-28'
    },
    {
      id: 'P008',
      name: 'Carrot',
      price: 40,
      quantity: 280,
      shopName: 'Vegetable Hub',
      location: 'Rangpur',
      status: 'available',
      harvestDate: '2024-02-10'
    },
    {
      id: 'P009',
      name: 'Spinach',
      price: 15,
      quantity: 95,
      shopName: 'Green Leaf',
      location: 'Mymensingh',
      status: 'stock-out',
      harvestDate: '2024-02-12'
    },
    {
      id: 'P010',
      name: 'Cabbage',
      price: 22,
      quantity: 400,
      shopName: 'Farm Fresh',
      location: 'Comilla',
      status: 'available',
      harvestDate: '2024-02-08'
    },
    {
      id: 'P011',
      name: 'Cauliflower',
      price: 35,
      quantity: 180,
      shopName: 'White Pearl',
      location: 'Tangail',
      status: 'available',
      harvestDate: '2024-02-06'
    },
    {
      id: 'P012',
      name: 'Brinjal',
      price: 28,
      quantity: 220,
      shopName: 'Purple Garden',
      location: 'Narayanganj',
      status: 'available',
      harvestDate: '2024-02-09'
    },
    {
      id: 'P013',
      name: 'Cucumber',
      price: 20,
      quantity: 75,
      shopName: 'Cool Veg',
      location: 'Faridpur',
      status: 'stock-out',
      harvestDate: '2024-02-11'
    },
    {
      id: 'P014',
      name: 'Pumpkin',
      price: 25,
      quantity: 350,
      shopName: 'Orange Farm',
      location: 'Barisal',
      status: 'available',
      harvestDate: '2024-01-30'
    },
    {
      id: 'P015',
      name: 'Green Beans',
      price: 45,
      quantity: 160,
      shopName: 'Bean Field',
      location: 'Kishoreganj',
      status: 'available',
      harvestDate: '2024-02-07'
    },
    {
      id: 'P016',
      name: 'Bell Pepper',
      price: 65,
      quantity: 85,
      shopName: 'Color Garden',
      location: 'Manikganj',
      status: 'stock-out',
      harvestDate: '2024-02-04'
    },
    {
      id: 'P017',
      name: 'Okra',
      price: 35,
      quantity: 190,
      shopName: 'Green Finger',
      location: 'Gopalganj',
      status: 'available',
      harvestDate: '2024-02-13'
    },
    {
      id: 'P018',
      name: 'Green Chili',
      price: 80,
      quantity: 120,
      shopName: 'Spicy Farm',
      location: 'Patuakhali',
      status: 'available',
      harvestDate: '2024-02-02'
    },
    {
      id: 'P019',
      name: 'Lemon',
      price: 90,
      quantity: 250,
      shopName: 'Citrus Grove',
      location: 'Sylhet',
      status: 'available',
      harvestDate: '2024-01-18'
    },
    {
      id: 'P020',
      name: 'Ginger',
      price: 150,
      quantity: 90,
      shopName: 'Root Spice',
      location: 'Bandarban',
      status: 'stock-out',
      harvestDate: '2024-01-22'
    }
  ];

  const purchases = [
    {
      id: 'PUR001',
      sellerShopName: 'Farm House',
      sellerName: 'Md. Rahman',
      shopAddress: 'Rajshahi, Bangladesh',
      item: 'Rice',
      quantity: 100,
      totalPrice: 4500,
      buyerName: 'Abdul Karim',
      transportationName: 'Swift Logistics',
      destinationAddress: 'Dhaka, Bangladesh',
      transactionType: 'bKash',
      deliveryDate: '2024-02-20',
      deliveryTime: '3:00 PM'
    },
    {
      id: 'PUR002',
      sellerShopName: 'Green Valley',
      sellerName: 'Nasir Ahmed',
      shopAddress: 'Cumilla, Bangladesh',
      item: 'Tomato',
      quantity: 50,
      totalPrice: 1250,
      buyerName: 'Fatima Khatun',
      transportationName: 'Fast Express',
      destinationAddress: 'Chittagong, Bangladesh',
      transactionType: 'Nagad',
      deliveryDate: '2024-03-01',
      deliveryTime: '2:30 PM'
    },
    {
      id: 'PUR003',
      sellerShopName: 'AgroAgency Ltd. Co.',
      sellerName: 'Fatima Khatun',
      shopAddress: 'Dhaka, Bangladesh',
      item: 'Wheat',
      quantity: 200,
      totalPrice: 11000,
      buyerName: 'Mohammad Ali',
      transportationName: 'Metro Transport',
      destinationAddress: 'Sylhet, Bangladesh',
      transactionType: 'Rocket',
      deliveryDate: '2024-03-05',
      deliveryTime: '1:45 PM'
    },
    {
      id: 'PUR004',
      sellerShopName: 'Rural Farmers',
      sellerName: 'Rashida Begum',
      shopAddress: 'Bogura, Bangladesh',
      item: 'Potato',
      quantity: 150,
      totalPrice: 2700,
      buyerName: 'Aminul Islam',
      transportationName: 'Quick Delivery',
      destinationAddress: 'Rangpur, Bangladesh',
      transactionType: 'Bank',
      deliveryDate: '2024-03-08',
      deliveryTime: '4:15 PM'
    },
    {
      id: 'PUR005',
      sellerShopName: 'Northern Agro',
      sellerName: 'Abdul Karim',
      shopAddress: 'Gazipur, Bangladesh',
      item: 'Corn',
      quantity: 80,
      totalPrice: 2800,
      buyerName: 'Salma Khatun',
      transportationName: 'Express Cargo',
      destinationAddress: 'Khulna, Bangladesh',
      transactionType: 'bKash',
      deliveryDate: '2024-03-12',
      deliveryTime: '11:30 AM'
    }
  ];

  
