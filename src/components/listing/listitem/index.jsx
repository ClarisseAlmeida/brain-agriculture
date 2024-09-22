import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { eraseRuralProducer } from "../../../store/ruralProducers/slice";
import "../index.scss";

const ListItem = ({ ruralProducer }) => {
    const dispatch = useDispatch();

    const handleEraseRuralProducer = (id, name) => {
        if (confirm(`Tem certeza de que deseja excluir o produtor ${name}?`)) {
            dispatch(eraseRuralProducer(id));
        }
    };

    return (
        <tr>
            <td><p className="listing-text">{ruralProducer.producerName}</p></td>
            <td><p>{ruralProducer.identity}</p></td>
            <td><p className="listing-text">{ruralProducer.farmName}</p></td>
            <td>
                <Link to={'/editar/' + ruralProducer.id} className='listing-link'>{
                    <p>Editar / Visualizar</p>
                }
                </Link>
            </td>
            <td>
                <button className='listing-button' onClick={() => handleEraseRuralProducer(ruralProducer.id, ruralProducer.producerName)}>
                    Excluir
                </button>
            </td>
        </tr>
    )
}

export default ListItem;
