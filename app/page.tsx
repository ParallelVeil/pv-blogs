import Posts from "./components/Posts"
import Profile from "./about/components/Profile"

export const revalidate = 86400

export default function Home() {
    return (
        <>
            <div className="mx-auto">
                <Profile/>
                <Posts limit={5}/>
            </div>
        </>
    )
}