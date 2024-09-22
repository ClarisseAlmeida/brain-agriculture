import { selectRuralProducers } from "../../store/ruralProducers/slice.js";
import { useSelector } from "react-redux";
import ListItem from "./listitem/index.jsx";
import "./index.scss";

const Listing = () => {

    const ruralProducers = useSelector(selectRuralProducers);

    return (
        <>
            <h3>Produtores</h3>
            <table className="listing">
                <thead>
                    <tr>
                        <th>Produtor</th>
                        <th>CPF / CNPJ</th>
                        <th>Fazenda</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {[...ruralProducers].reverse().map(ruralProducer =>
                        <ListItem key={ruralProducer.id} ruralProducer={ruralProducer} />
                    )}
                </tbody>
            </table>
        </>
    )
}

export default Listing;
