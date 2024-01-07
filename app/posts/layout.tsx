import DateHandler from "../context/DateContext";

export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }){
    return <DateHandler>
        {children}
    </DateHandler>
}