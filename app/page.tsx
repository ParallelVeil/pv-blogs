import Posts from "./components/Posts"
import MyProfilePic from './components/MyProfilePic'
import DateHandler from "./context/DateContext"

export const revalidate = 86400

export default function Home() {
    return (
        <DateHandler>
            <div className="mx-auto">
                <MyProfilePic/>
                <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
                    Hello and Welcome 👋&nbsp;
                    <span className="whitespace-nowrap">
          {`I'm `}<span className="font-bold">ishiko</span>.
        </span>
                </p>
                <Posts limit={3}/>
            </div>
        </DateHandler>
    )
}