export const hardcopyData = [
    {
        id: 1,
        patient: {
            name: "Pierre Giroux",
            rxNumber: "640771",
            avatar: null,
            gender: "male",
            address: "4012 Av. de l'Empereur, Laval, QC",
            dateOfBirth: "1990-10-19",
            age: 34
        },
        medications: [
            {
                name: "MIN-Tadalafil",
                dosage: "20mg",
                quantity: 8,
                refills: 11,
                amount: 88,
                days: 96,
                din: "02451697",
                manufacturer: "MIN",
                daysSupply: 30
            },
            {
                name: "Sildenafil",
                dosage: "100mg",
                quantity: 4,
                refills: 5,
                amount: 60,
                days: 30,
                din: "02451698",
                manufacturer: "MIN",
                daysSupply: 15
            }
        ],
        hardcopyDate: "August 1, 2025",
        order: {
            number: "346886",
            status: "Shipped",
            icons: ["wordpress", "document-percent"]
        },
        pharmacy: {
            name: "Pamela Bridgen",
            address: "5270 Solar Dr",
            phone: "+1 (833) 697-6259",
            fax: "+1 (437) 537 5123",
            license: "06277824"
        },
        directions: "Take 1 tablet when needed. Max dose 20mg in 48hrs",
        prescriptionType: "New Rx",
        drugStatus: "New Drug On File",
        payment: {
            method: "CASH",
            cost: 126.00,
            dispensingFee: 0.00,
            discount: 18.90,
            total: 107.10,
            otherDinUsed: "",
            counselled: {
                yes: true,
                no: false,
                initials: "MM"
            }
        }
    },
    {
        id: 2,
        patient: {
            name: "Marie Dubois",
            rxNumber: "640772",
            avatar: null,
            gender: "female",
            address: "1234 Rue Principale, Montreal, QC",
            dateOfBirth: "1985-05-15",
            age: 39
        },
        medications: [
            {
                name: "Compounded Semaglutide",
                dosage: "1mg/ml",
                quantity: 1,
                refills: 3,
                amount: 30,
                days: 30,
                din: "02451699",
                manufacturer: "COMP",
                daysSupply: 30
            }
        ],
        hardcopyDate: "August 2, 2025",
        order: {
            number: "346887",
            status: "Processing",
            icons: ["wordpress", "document-percent"]
        },
        pharmacy: {
            name: "Dr. Sarah Johnson",
            address: "789 Medical Center Blvd",
            phone: "+1 (514) 555-0123",
            fax: "+1 (514) 555-0124",
            license: "06277825"
        },
        directions: "Inject 0.25mg once weekly for 4 weeks, then 0.5mg once weekly",
        prescriptionType: "New Rx",
        drugStatus: "New Drug On File",
        payment: {
            method: "INSURANCE",
            cost: 245.00,
            dispensingFee: 12.50,
            discount: 0.00,
            total: 257.50,
            otherDinUsed: "",
            counselled: {
                yes: true,
                no: false,
                initials: "SJ"
            }
        }
    },
    {
        id: 3,
        patient: {
            name: "Jean Tremblay",
            rxNumber: "640773",
            avatar: null,
            gender: "male",
            address: "5678 Chemin des Érables, Quebec City, QC",
            dateOfBirth: "1978-12-20",
            age: 46
        },
        medications: [
            {
                name: "Viagra®",
                dosage: "50mg",
                quantity: 6,
                refills: 4,
                amount: 72,
                days: 60,
                din: "02451700",
                manufacturer: "PFIZER",
                daysSupply: 30
            },
            {
                name: "Cialis®",
                dosage: "10mg",
                quantity: 4,
                refills: 6,
                amount: 48,
                days: 40,
                din: "02451701",
                manufacturer: "LILLY",
                daysSupply: 20
            }
        ],
        hardcopyDate: "August 3, 2025",
        order: {
            number: "346888",
            status: "Shipped",
            icons: ["wordpress", "document-percent"]
        },
        pharmacy: {
            name: "Dr. Michael Chen",
            address: "456 Health Plaza",
            phone: "+1 (418) 555-0456",
            fax: "+1 (418) 555-0457",
            license: "06277826"
        },
        directions: "Take 1 tablet 30 minutes before sexual activity. Do not take more than once daily",
        prescriptionType: "Refill",
        drugStatus: "Existing Drug",
        payment: {
            method: "CASH",
            cost: 189.00,
            dispensingFee: 8.00,
            discount: 28.35,
            total: 168.65,
            otherDinUsed: "",
            counselled: {
                yes: false,
                no: true,
                initials: "MC"
            }
        }
    },
    {
        id: 4,
        patient: {
            name: "Sophie Martin",
            rxNumber: "640774",
            avatar: null,
            gender: "female",
            address: "9012 Boulevard Saint-Laurent, Montreal, QC",
            dateOfBirth: "1992-08-10",
            age: 32
        },
        medications: [
            {
                name: "Andropecia Hair Support",
                dosage: "1mg",
                quantity: 30,
                refills: 2,
                amount: 90,
                days: 90,
                din: "02451702",
                manufacturer: "ANDRO",
                daysSupply: 30
            }
        ],
        hardcopyDate: "August 4, 2025",
        order: {
            number: "346889",
            status: "Pending",
            icons: ["wordpress", "document-percent"]
        },
        pharmacy: {
            name: "Dr. Emily Rodriguez",
            address: "345 Wellness Street",
            phone: "+1 (450) 555-0789",
            fax: "+1 (450) 555-0790",
            license: "06277827"
        },
        directions: "Take 1 tablet daily with or without food",
        prescriptionType: "New Rx",
        drugStatus: "New Drug On File",
        payment: {
            method: "CASH",
            cost: 95.00,
            dispensingFee: 5.00,
            discount: 14.25,
            total: 85.75,
            otherDinUsed: "",
            counselled: {
                yes: true,
                no: false,
                initials: "ER"
            }
        }
    },
    {
        id: 5,
        patient: {
            name: "Lucas Bouchard",
            rxNumber: "640775",
            avatar: null,
            gender: "male",
            address: "2345 Avenue des Pins, Montreal, QC",
            dateOfBirth: "1980-03-25",
            age: 44
        },
        medications: [
            {
                name: "Anti-ageing 1",
                dosage: "2mg",
                quantity: 15,
                refills: 1,
                amount: 30,
                days: 45,
                din: "02451703",
                manufacturer: "ANTI",
                daysSupply: 15
            },
            {
                name: "Body Optimization Program",
                dosage: "5mg",
                quantity: 20,
                refills: 3,
                amount: 80,
                days: 60,
                din: "02451704",
                manufacturer: "BODY",
                daysSupply: 20
            }
        ],
        hardcopyDate: "August 5, 2025",
        order: {
            number: "346890",
            status: "Shipped",
            icons: ["wordpress", "document-percent"]
        },
        pharmacy: {
            name: "Dr. David Wilson",
            address: "678 Medical Drive",
            phone: "+1 (819) 555-0234",
            fax: "+1 (819) 555-0235",
            license: "06277828"
        },
        directions: "Take 1 capsule twice daily with meals",
        prescriptionType: "Refill",
        drugStatus: "Existing Drug",
        payment: {
            method: "INSURANCE",
            cost: 320.00,
            dispensingFee: 15.00,
            discount: 0.00,
            total: 335.00,
            otherDinUsed: "",
            counselled: {
                yes: true,
                no: false,
                initials: "DW"
            }
        }
    },
    {
        id: 6,
        patient: {
            name: "Emma Lavoie",
            rxNumber: "640776",
            avatar: null,
            gender: "female",
            address: "4567 Rue Sherbrooke, Montreal, QC",
            dateOfBirth: "1988-11-30",
            age: 36
        },
        medications: [
            {
                name: "Chewable Tadalafil",
                dosage: "20mg",
                quantity: 10,
                refills: 5,
                amount: 50,
                days: 50,
                din: "02451705",
                manufacturer: "CHEW",
                daysSupply: 10
            }
        ],
        hardcopyDate: "August 6, 2025",
        order: {
            number: "346891",
            status: "Processing",
            icons: ["wordpress", "document-percent"]
        },
        pharmacy: {
            name: "Dr. Lisa Thompson",
            address: "890 Pharmacy Lane",
            phone: "+1 (438) 555-0567",
            fax: "+1 (438) 555-0568",
            license: "06277829"
        },
        directions: "Chew 1 tablet as needed, at least 30 minutes before sexual activity",
        prescriptionType: "New Rx",
        drugStatus: "New Drug On File",
        payment: {
            method: "CASH",
            cost: 145.00,
            dispensingFee: 7.50,
            discount: 21.75,
            total: 130.75,
            otherDinUsed: "",
            counselled: {
                yes: true,
                no: false,
                initials: "LT"
            }
        }
    },
    {
        id: 7,
        patient: {
            name: "Thomas Gagnon",
            rxNumber: "640777",
            avatar: null,
            gender: "male",
            address: "7890 Boulevard René-Lévesque, Quebec City, QC",
            dateOfBirth: "1975-07-12",
            age: 49
        },
        medications: [
            {
                name: "Cialis",
                dosage: "5mg",
                quantity: 12,
                refills: 4,
                amount: 60,
                days: 60,
                din: "02451706",
                manufacturer: "LILLY",
                daysSupply: 30
            },
            {
                name: "Compounded Semaglutide (Old)",
                dosage: "0.5mg/ml",
                quantity: 1,
                refills: 2,
                amount: 15,
                days: 30,
                din: "02451707",
                manufacturer: "COMP",
                daysSupply: 30
            }
        ],
        hardcopyDate: "August 7, 2025",
        order: {
            number: "346892",
            status: "Shipped",
            icons: ["wordpress", "document-percent"]
        },
        pharmacy: {
            name: "Dr. Robert Brown",
            address: "1234 Healthcare Avenue",
            phone: "+1 (581) 555-0890",
            fax: "+1 (581) 555-0891",
            license: "06277830"
        },
        directions: "Take 1 tablet daily. For diabetes: inject 0.25mg once weekly",
        prescriptionType: "Refill",
        drugStatus: "Existing Drug",
        payment: {
            method: "INSURANCE",
            cost: 275.00,
            dispensingFee: 12.00,
            discount: 0.00,
            total: 287.00,
            otherDinUsed: "",
            counselled: {
                yes: false,
                no: true,
                initials: "RB"
            }
        }
    },
    {
        id: 8,
        patient: {
            name: "Isabella Roy",
            rxNumber: "640778",
            avatar: null,
            gender: "female",
            address: "3456 Avenue du Parc, Montreal, QC",
            dateOfBirth: "1995-04-18",
            age: 29
        },
        medications: [
            {
                name: "Compounded Semaglutide (Ozempic®)",
                dosage: "1mg/ml",
                quantity: 1,
                refills: 3,
                amount: 30,
                days: 30,
                din: "02451708",
                manufacturer: "NOVO",
                daysSupply: 30
            }
        ],
        hardcopyDate: "August 8, 2025",
        order: {
            number: "346893",
            status: "Pending",
            icons: ["wordpress", "document-percent"]
        },
        pharmacy: {
            name: "Dr. Jennifer Lee",
            address: "5678 Medical Center Way",
            phone: "+1 (514) 555-0345",
            fax: "+1 (514) 555-0346",
            license: "06277831"
        },
        directions: "Inject 0.25mg once weekly for 4 weeks, then 0.5mg once weekly for 4 weeks, then 1mg once weekly",
        prescriptionType: "New Rx",
        drugStatus: "New Drug On File",
        payment: {
            method: "CASH",
            cost: 298.00,
            dispensingFee: 10.00,
            discount: 44.70,
            total: 263.30,
            otherDinUsed: "",
            counselled: {
                yes: true,
                no: false,
                initials: "JL"
            }
        }
    }
];

// Product filter options based on the medications
export const productFilterOptions = [
    { value: "andropecia-hair-support", label: "Andropecia Hair Support" },
    { value: "anti-ageing-1", label: "Anti-ageing 1" },
    { value: "body-optimization-program", label: "Body Optimization Program" },
    { value: "chewable-tadalafil", label: "Chewable Tadalafil" },
    { value: "cialis", label: "Cialis" },
    { value: "cialis-brand", label: "Cialis®" },
    { value: "compounded-semaglutide", label: "Compounded Semaglutide" },
    { value: "compounded-semaglutide-old", label: "Compounded Semaglutide (Old)" },
    { value: "compounded-semaglutide-ozempic", label: "Compounded Semaglutide (Ozempic®)" },
    { value: "viagra", label: "Viagra®" },
    { value: "tadalafil", label: "Tadalafil" },
    { value: "sildenafil", label: "Sildenafil" },
    { value: "min-tadalafil", label: "MIN-Tadalafil" }
]; 