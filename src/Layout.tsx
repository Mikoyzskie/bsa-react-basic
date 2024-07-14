import { ReactNode } from "react"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
    return <div className="layout__container">
        <Header />
        {children}
        <Footer />
    </div>
}

export { Layout }