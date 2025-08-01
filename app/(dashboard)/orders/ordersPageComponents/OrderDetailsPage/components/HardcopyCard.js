import React from "react";

const HardcopyCard = () => {
    return (
        <div className="border rounded-md bg-white p-6 shadow-md text-sm text-black font-sans max-w-4xl mx-auto">
            <div className="text-right text-xs text-gray-700 mb-2">
                Date: July 31, 2025
            </div>


            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="font-semibold">Rx Number: #1042143</p>
                    <p>Salmon, Nicole</p>
                    <p><strong>Gender:</strong> female</p>
                    <p>13 Park Lane, Sebright, ON</p>
                </div>
                <div className="text-right">
                    <p><strong>DOB:</strong> 1985-11-06</p>
                    <p><strong>Age:</strong> 39</p>
                </div>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                <div>
                    <p><strong>Ozempic®</strong> 0</p>
                    <p>R(0): 0  A: 0  DAYS:</p>
                </div>
                <div className="text-right">
                    <p><strong>TAB DIN:</strong> 0</p>
                    <p><strong>mfg:</strong></p>
                    <p><strong>Days Supply:</strong></p>
                </div>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex justify-between mb-2">
                <p><strong>Tel:</strong></p>
                <p><strong>Fax:</strong></p>
                <p><strong>Lic#:</strong></p>
            </div>

            <p className="mb-4"><strong>Drug Direction:</strong></p>

            <p className="text-center font-medium my-2">---Refill---</p>

            <div className="mt-4">
                <h3 className="font-semibold mb-1">CASH</h3>
                <p>Cost: $300.00</p>
                <p>Dispensing Fee: $0.00</p>
                <p>Discount: $0.00</p>
                <p><strong>Total:</strong> $300.00</p>
                <p>Other DIN Used:</p>
                <p className="mt-2">Counselled(Yes/No) : _____</p>
            </div>

        </div>
    );
};

export default HardcopyCard;
