
import { useEffect } from "react"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

import { useNavigate } from "react-router-dom"




export interface IBookings {
    id: string;
    userId: string;
    tripId: string;
    guests: number;
    date: string;
    trip: Trip;
    totalPrice: number;
    createdAt: string;
}

export interface Trip {
    title: string;
    duration: number;
    price: number;
}

interface IBooks {
    id: string,
    title: string,
    guests: number,
    date: string,
    price: number
}

const Bookings = ({ user, books, setBook }: { user: string | undefined, books: IBooks[], setBook: React.Dispatch<React.SetStateAction<IBooks[]>> }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (user === undefined) {
            navigate('/sign-in')
        }
    }, [navigate, user]);





    function formatDate(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }



    const handleOnclick = (id: string) => {
        const filteredBook = books.filter(book => book.id !== id)
        setBook(filteredBook.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    }


    return <div className="layout__container">
        <Header auth={false} user={user} />
        <main className="bookings-page">
            <h1 className="visually-hidden">Travel App</h1>
            <ul className="bookings__list">
                {
                    books.map((booking: IBooks) => {

                        // const formatDate = (date: Date) => {
                        //     return date.toLocaleDateString('en-GB'); // 'en-GB' specifies the format dd/mm/yyyy
                        // };
                        const date = new Date(booking.date)
                        const formattedDate = formatDate(date);

                        return (
                            <li data-test-id="booking" className="booking" key={booking.id}>
                                <h3 data-test-id="booking-title" className="booking__title">
                                    {booking.title}
                                </h3>
                                <span data-test-id="booking-guests" className="booking__guests">
                                    {booking.guests} guests
                                </span>
                                <span data-test-id="booking-date" className="booking__date">
                                    {formattedDate}
                                </span>
                                <span data-test-id="booking-total" className="booking__total">
                                    ${booking.price}
                                </span>
                                <button
                                    data-test-id="booking-cancel"
                                    className="booking__cancel"
                                    title="Cancel booking"
                                    id={booking.id}
                                    onClick={() => handleOnclick(booking.id)}
                                >
                                    <span className="visually-hidden">Cancel booking</span>×
                                </button>
                            </li>
                        )
                    })
                }


            </ul>
        </main>
        <Footer />
    </div>

}

export { Bookings }