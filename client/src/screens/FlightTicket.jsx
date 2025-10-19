import { FaCalendarAlt, FaClock, FaDoorOpen, FaUser } from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const FlightTicket = () => {

    const handleDownload = async () => {
        toast.success('Ticket downloaded successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
                background: '#f0f9ff',
                color: '#0369a1',
                border: '1px solid #bae6fd',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
            },
            progressStyle: {
                background: '#0369a1',
            }
        });
    };
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white px-10 py-8 overflow-x-hidden">
                <div className="" />

                <div className="flex flex-col items-center">
                    <div className="flex justify-between items-start mb-8 w-[1231px]">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Emirates A380 Airbus
                            </h1>
                            <p className="text-gray-600 text-sm mt-2 flex items-center">
                                <span className="mr-2"><FaLocationDot size={16} color="gray" /></span>
                                Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                            </p>
                        </div>

                        <div className="text-right">
                            <div className="text-[26px] font-extrabold text-gray-800 leading-none">
                                $7890
                            </div>
                            <button
                                onClick={handleDownload}
                                className="mt-4 inline-block text-sm rounded-md text-white font-medium bg-blue-600 px-4 py-2 hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                Download
                            </button>
                        </div>
                    </div>

                    <div id="ticket-wrapper">
                        <div className="flex items-stretch border border-gray-200 bg-white overflow-hidden w-[1231px] h-[309px] rounded-2xl ">
                            <div className="flex flex-col justify-between w-[246px] h-[309px] p-6 bg-blue-50 rounded-l-2xl">
                                <div>
                                    <div className="text-3xl font-semibold text-gray-900">11:30 AM</div>
                                    <div className="text-sm text-gray-600 mt-1">New York</div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="h-11 w-0.5 bg-gray-300" />
                                    <IoAirplane size={20} className="my-2 text-gray-400 transform rotate-90" />
                                    <div className="h-11 w-0.5 bg-gray-300" />
                                </div>

                                <div>
                                    <div className="text-3xl font-semibold text-gray-900">2:00 PM</div>
                                    <div className="text-sm text-gray-600 mt-1">Boston</div>
                                </div>
                            </div>

                            <div className="w-[610px] h-[309px] flex flex-col justify-between">
                                <div className="flex items-center justify-between bg-blue-200 px-4 py-2 rounded-r-xl w-full">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://randomuser.me/api/portraits/men/84.jpg"
                                            alt="passenger"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-base font-semibold text-gray-900">
                                                James Doe
                                            </div>
                                            <div className="text-sm text-gray-700 mt-0.5">
                                                Boarding Pass N'145
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-900 font-semibold">
                                        Business Class
                                    </div>
                                </div>

                                <div className="flex gap-5 items-center mt-3 px-3">
                                    {[
                                        { icon: <FaCalendarAlt color="blue" size={16} />, label: "Date", value: "26 Oct 2024" },
                                        { icon: <FaClock color="blue" size={16} />, label: "Flight time", value: "12:00" },
                                        { icon: <FaDoorOpen color="blue" size={16} />, label: "Gate", value: "A12" },
                                        { icon: <FaUser color="blue" size={16} />, label: "Seat", value: "128" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-2.5 items-center">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 grid place-items-center">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs font-medium text-gray-600">{item.label}</div>
                                                <div className="text-sm font-semibold text-gray-800">{item.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-end p-3">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">EK</div>
                                        <div className="text-sm text-gray-600">E12345</div>
                                    </div>

                                    <img
                                        alt="barcode"
                                        src={`/qr.webp?text=E12345`}
                                        className="w-60 h-12 object-cover grayscale"
                                    />
                                </div>
                            </div>

                            <div className="relative w-[246px] h-[309px] p-6 border-l border-gray-200 bg-white rounded-r-2xl">
                                <svg
                                    width="246"
                                    height="309"
                                    viewBox="0 0 246 309"
                                    className="absolute left-0 top-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M30 265 Q 50 150, 220 65"
                                        stroke="#3B82F6"
                                        strokeWidth="2.5"
                                        strokeDasharray="8 4"
                                        fill="none"
                                    />

                                    <g opacity="0.4">
                                        {[...Array(15)].map((_, row) => (
                                            [...Array(15)].map((_, col) => (
                                                <circle
                                                    key={`bottom-${row}-${col}`}
                                                    cx={8 + col * 6}
                                                    cy={248 + row * 6}
                                                    r="1.5"
                                                    fill="#93C5FD"
                                                />
                                            ))
                                        ))}
                                    </g>

                                    <g opacity="0.4">
                                        {[...Array(15)].map((_, row) => (
                                            [...Array(15)].map((_, col) => (
                                                <circle
                                                    key={`top-${row}-${col}`}
                                                    cx={195 + col * 6}
                                                    cy={48 + row * 6}
                                                    r="1.5"
                                                    fill="#93C5FD"
                                                />
                                            ))
                                        ))}
                                    </g>
                                </svg>

                                <div className="absolute left-4 bottom-7 bg-white px-2.5 py-2 rounded-lg shadow-lg border border-gray-200 flex gap-2.5 items-center">
                                    <img
                                        alt="Profile"
                                        src="https://picsum.photos/48/36?random=1"
                                        className="w-12 h-9 object-cover rounded"
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <div className="text-gray-900 font-semibold text-sm whitespace-nowrap">James Doe</div>
                                        <div className="flex gap-0.5">
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute right-4 top-6 bg-white px-2.5 py-2 rounded-lg shadow-lg border border-gray-200 flex gap-2.5 items-center">
                                    <img
                                        alt="Profile"
                                        src="https://picsum.photos/48/36?random=2"
                                        className="w-12 h-9 object-cover rounded"
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <div className="text-gray-900 font-semibold text-sm whitespace-nowrap">James Doe</div>
                                        <div className="flex gap-0.5">
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 w-[1231px]">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Terms and Conditions
                        </h2>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Payments</h3>
                        <ul className="list-disc pl-5 text-gray-700 text-sm space-y-3">
                            <li>
                                If you are purchasing your ticket using a debit or credit card via the
                                Website, we will process these payments via the automated secure common
                                payment gateway which will be subject to fraud screening purposes.
                            </li>
                            <li>
                                If you do not supply the correct card billing address and/or cardholder
                                information, your booking will not be confirmed and the overall cost may
                                increase. We reserve the right to cancel your booking if payment is
                                declined for any reason or if you have supplied incorrect card information.
                                If we become aware of, or are notified of, any fraud or illegal activity
                                associated with the payment for the booking, the booking will be cancelled
                                and you will be liable for all costs and expenses arising from such
                                cancellation, etc.
                            </li>
                            <li>
                                Argo may require the card holder to provide additional payment verification upon request by either submitting an online form or visiting the nearest Argo office, or at the airport at the time of check-in. Argo reserves the right to deny boarding or to collect a guarantee payment (in cash or from another credit card) if the card originally used for the purchase cannot be presented by the cardholder at check-in or when collecting the tickets, or in the case the original payment has been withheld or disputed by the card issuing bank. Credit card details are held in a secured environment and transferred through an internationally accepted system.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FlightTicket;