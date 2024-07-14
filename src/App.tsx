
import './App.css'
import bookings from "./data/bookings.json"
import trips from "./data/trips.json"
import { Trips } from "./common/types"

import { AppPath } from './common/app-path.enum'
import { RouterProvider } from './components/router-provider'

import { Main } from './components/Main'
import { Signin } from './components/Signin'
import { Signup } from './components/Signup'
import { Bookings } from './components/Bookings'

import { Trip } from './components/Trip'

import { ChangeEvent, useState, useEffect } from 'react'

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


const books: IBooks[] = bookings.map((book: IBookings) => {
  return {
    id: book.id,
    title: book.trip.title,
    guests: book.guests,
    date: book.date,
    price: book.totalPrice
  }
})

const App = (): JSX.Element => {

  const [details, setDetails] = useState({ duration: "", level: "" })
  const [tripsObject, setTripsObject] = useState(trips)
  const [formSignup, setFormSignup] = useState<{ [key: string]: FormDataEntryValue }>({});
  const [formSearch, setFormSearch] = useState<{ [key: string]: FormDataEntryValue }>({});

  // const [signUps, setSignUps] = useState<{ [key: string]: FormDataEntryValue }[]>([])
  const [user, setUser] = useState<string>()

  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [book, setBook] = useState<IBooks[]>(books.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }

  useEffect(() => {

    let data: Trips[] = trips

    if (details.duration || formSearch.duration) {
      if (details.duration === "0_x_5") {
        data = data.filter((trip: Trips) => trip.duration < 5)
      } else if (details.duration === "5_x_10") {
        data = data.filter((trip: Trips) => trip.duration > 4 && trip.duration < 10)
      } else if (details.duration === "10") {
        data = data.filter((trip: Trips) => trip.duration >= 10)
      }
    }

    if (details.level || formSearch.level) {
      data = data.filter((trip: Trips) => trip.level === details.level)
    }

    const filterByWord = (array: Trips[], word: string) => {
      const regex = new RegExp(word, 'i'); // Create a case-insensitive regex dynamically
      return array.filter(str => regex.test(str.title));
    };

    if (formSearch.search === "") {
      data = filterByWord(data, formSearch.search.toString())
    } else {
      setTripsObject(trips)
    }

    setTripsObject(data)

  }, [details, formSearch])





  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const formDataObject: { [key: string]: FormDataEntryValue } = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });

    setFormSearch(formDataObject);
  };

  const handleSignupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const formDataObject: { [key: string]: FormDataEntryValue } = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });

    setFormSignup(formDataObject);
    setShowMessage(true)


    form.reset()
  };


  return (


    <RouterProvider routes={[
      {
        path: AppPath.ROOT,
        children: [
          {
            path: AppPath.ROOT,
            element: <Main onChange={handleChange} trips={tripsObject} onSubmit={handleSearchSubmit} user={user} />
          },
          {
            path: AppPath.BOOKINGS,
            element: <Bookings user={user} books={book} setBook={setBook} />
          },
          {
            path: AppPath.SIGNIN,
            element: <Signin signups={formSignup} setUser={setUser} />
          },
          {
            path: AppPath.SIGNUP,
            element: <Signup onSubmit={handleSignupSubmit} message={showMessage} />
          },
          {
            path: AppPath.TRIP_$ID,
            element: <Trip user={user} books={book} setBook={setBook} />
          },
          {
            path: AppPath.ANY,
            element: <h1>Not Found</h1>
          }
        ]
      }
    ]} />



  )
}

export default App
