import Header from "../components/header/index.jsx";
import Dashboard from "../components/dashboard/index.jsx";
import Listing from "../components/listing/index.jsx";
import "./index.scss"

const Home = () => (
  <>
    <div className="container">
      <Header />
      <Dashboard />
      <Listing />
    </div>
  </>
)

export default Home;
