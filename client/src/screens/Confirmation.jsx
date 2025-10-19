import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { MdOutlineDone } from 'react-icons/md'
import { IoAirplane } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { useTrips } from '../context/TripContext'
import { FaDownload, FaEye } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {
  const { id } = useParams();
  const { trip, loading, fetchTripById } = useTrips();
  const navigate = useNavigate();

  const onDownload = () => {
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
  }

  const onViewTicket = () => {
    toast.info('Opening ticket...', {
      position: "top-right",
      autoClose: 1000,
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
    navigate(`/flight-ticket`);
  }

  useEffect(() => {
    if (id && (!trip || trip._id !== id)) {
      fetchTripById(id);
    } 
  }, [id, fetchTripById, trip]);

  return (
    <>
      <Navbar />
      <div className='mb-6'>
        <div className='flex items-center justify-center mb-4 mt-3'>
          <div className='p-3 rounded-full bg-green-100 inline-block'>
            <MdOutlineDone size={40} color="green" />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center mb-4'>
          <h1 className='text-2xl font-semibold text-gray-800 ml-4'>Booking Confirmed!</h1>
          <p className='text-gray-600 mt-2'>Your Trip is successfully booked. Enjoy your journey!</p>
        </div>
        <section className='w-1/3 mx-auto border border-gray-200 rounded-xl shadow-xl'>
          <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl flex items-center justify-between px-6 py-4'>
            <div className='flex flex-col gap-2 text-white'>
              <h3>Flight Ticket</h3>
              <p className='font-thin text-sm'>Booking ID: {trip?._id}</p>
            </div>
            <div>
              <IoAirplane size={40} color="white" />
            </div>
          </div>
          <div className='flex items-center justify-between px-6 py-4'>
            <p>{trip?.from}</p>
            <div className='flex flex-col items-center gap-2'>
              <div className='flex items-center gap-2'>
                <div className='border border-b-blue-500 w-25'></div>
                <p><IoAirplane size={20} color='blue'/></p>
                <div className='border border-b-blue-500 w-25'></div>
              </div>
              <p className='font-thin text-sm'>{trip?.time}hrs</p>
            </div>
            <p>{trip?.to}</p>
          </div>
          <div className='flex items-center gap-2 justify-between px-6 py-4'>
            <div className='bg-neutral-100 w-1/2 p-2 rounded-lg'>
              <p className='font-thin text-sm'>Date</p>
              <p className='font-semibold text-sm'>{trip?.date ? new Date(trip.date).toLocaleDateString() : ''}</p>
            </div>
            <div className='bg-neutral-100 w-1/2 p-2 rounded-lg'>
              <p className='font-thin text-sm'>Seats</p>
              <p className='font-semibold text-sm'>E5, E6</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between px-6 py-4'>
              <p className='font-semibold text-lg'>Total Fare Paid</p>
              <p className='font-bold text-green-500 text-xl'>${trip?.price}</p>
            </div>
            <img src="/qr.webp" alt="qr" className="w-1/4 mx-auto" />
            <p className='text-center mt-2 text-sm font-thin'>Scan this QR code at the boarding gate</p>
            <div className='flex items-center justify-between gap-2 mt-4 px-5 mb-3'>
              <button onClick={onDownload} className='bg-blue-500 text-white text-sm w-1/2 px-4 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-600 transition-colors'><FaDownload />Download Ticket</button>
              <button onClick={onViewTicket} className='text-blue-500 border border-blue-500 text-sm w-1/2 px-4 py-2 rounded-lg flex justify-center items-center gap-2 hover:text-blue-600 transition-colors'><FaEye />View Ticket</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Confirmation