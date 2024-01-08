import Posts from "./components/Posts"
import DateHandler from "./context/DateContext"
import Profile from "./about/components/Profile"

export const revalidate = 86400

export default function Home() {
    return (
        <DateHandler>
            <div className="mx-auto">
                <Profile/>
                <Posts limit={8}/>
            </div>
        </DateHandler>
    )
}