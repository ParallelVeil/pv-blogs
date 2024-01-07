import Posts from "./components/Posts"
import MyProfilePic from './about/components/ProfilePic'
import DateHandler from "./context/DateContext"
import Profile from "./about/components/Profile"

export const revalidate = 86400

export default function Home() {
    return (
        <DateHandler>
            <div className="mx-auto">
                <MyProfilePic/>
                <Profile/>
                <Posts limit={4}/>
            </div>
        </DateHandler>
    )
}