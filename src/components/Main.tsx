import { ChangeEventHandler, FormEventHandler, useEffect } from "react"
import { Trips } from "../common/types"
import { Link } from "react-router-dom"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

import { useNavigate } from "react-router-dom"


const Main = ({ onChange, onSubmit, trips, user }: { onChange: ChangeEventHandler<HTMLSelectElement> | undefined, onSubmit: FormEventHandler<HTMLFormElement> | undefined, trips: Trips[], user: string | undefined }): JSX.Element => {

    const navigate = useNavigate()

    useEffect(() => {
        if (user === undefined) {
            navigate('/sign-in')
        }
    }, [navigate, user]);

    return <div className="layout__container">
        <Header auth={false} user={user} />
        <main>
            <h1 className="visually-hidden">Travel App</h1>
            <section className="trips-filter">
                <h2 className="visually-hidden">Trips filter</h2>
                <form onSubmit={onSubmit} className="trips-filter__form" autoComplete="off">
                    <label className="trips-filter__search input">
                        <span className="visually-hidden">Search by name</span>
                        <input
                            data-test-id="filter-search"
                            name="search"
                            type="search"
                            placeholder="search by title"
                        />
                    </label>
                    <label className="select">
                        <span className="visually-hidden">Search by duration</span>
                        <select data-test-id="filter-duration" name="duration" onChange={onChange}>
                            <option value="">duration</option>
                            <option value="0_x_5">&lt; 5 days</option>
                            <option value="5_x_10">&lt; 10 days</option>
                            <option value={10}>≥ 10 days</option>
                        </select>
                    </label>
                    <label className="select">
                        <span className="visually-hidden">Search by level</span>
                        <select data-test-id="filter-level" name="level" onChange={onChange}>
                            <option value="">level</option>
                            <option value="easy">easy</option>
                            <option value="moderate">moderate</option>
                            <option value="difficult">difficult</option>
                        </select>
                    </label>
                </form>
            </section>
            <section className="trips">
                <h2 className="visually-hidden">Trips List</h2>
                <ul className="trip-list">
                    {
                        trips.map((trip: Trips, index: number) => {
                            return (
                                <li data-test-id="trip-card" className="trip-card" key={index}>
                                    <img
                                        data-test-id="trip-card-image"
                                        src={trip.image}
                                        alt="trip photo"
                                        style={{ height: "100%" }}
                                    />
                                    <div className="trip-card__content">
                                        <div className="trip-info">
                                            <h3 data-test-id="trip-card-title" className="trip-info__title">
                                                {trip.title}
                                            </h3>
                                            <div className="trip-info__content">
                                                <span
                                                    data-test-id="trip-card-duration"
                                                    className="trip-info__duration"
                                                >
                                                    <strong>{trip.duration}</strong> days
                                                </span>
                                                <span data-test-id="trip-card-level" className="trip-info__level">
                                                    {trip.level}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="trip-price">
                                            <span>Price</span>
                                            <strong
                                                data-test-id="trip-card-price-value"
                                                className="trip-price__value"
                                            >
                                                ${trip.price}
                                            </strong>
                                        </div>
                                    </div>


                                    <Link to={`/trip/${trip.id}`} data-test-id="trip-card-link" className="button">
                                        Discover a trip
                                    </Link>



                                </li>
                            )
                        })
                    }


                </ul>
            </section>
        </main>
        <Footer />
    </div>
}

export { Main }