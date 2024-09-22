import Form from "../components/form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRuralProducers } from "../store/ruralProducers/slice.js";
import Header from "../components/header/index.jsx";


const Edit = () => {
    const { id } = useParams();

    const ruralProducers = useSelector(selectRuralProducers);

    const ruralProducer = ruralProducers.filter(ruralProducer => ruralProducer.id == id)[0];

    return (<div className="container">
        <Header />
        <Form ruralProducer={ruralProducer} />
    </div>)
}

export default Edit;