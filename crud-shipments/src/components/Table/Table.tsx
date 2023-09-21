import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { getData } from "../../helpers/Store/Shipments"
import { ShipmentsState } from "../../helpers/types/shipmentTypes"
import SingleRowData from "../SingleRowData/SingleRowData"

export default function Table() {
    const shipments = useSelector((state: ShipmentsState) => state.shipments)
    const dispatch = useDispatch()
    const url = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0"


    /**
     * Retriving data from API ans saving it into Redux store
     */
    useEffect(() => {
        async function getDataFromApi() {
            try{
                const responce = await axios.get(url)
                dispatch(getData(responce.data))
            } catch(err: any){
                console.log(`Error occured: ${err.message}`)
            }
        }

        getDataFromApi()
    }, []) 
    
    return (
        <div className="shipments-container">
            <table className="shipments-table">
                    <thead className="shipments-table-head">
                        <tr>
                            <th>OrderNo</th>
                            <th>DeliveryDate</th>
                            <th>Customer</th>
                            <th>TrakingNo</th>
                            <th>Status</th>              
                            <th>Consignee</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="shipments-table-body">
                            { shipments.length > 0 &&
                            shipments.map(shipment => {
                                return <SingleRowData shipment={shipment} key={shipment.orderNo}/>
                            })}
                    </tbody>
            </table>
        </div>
    )
}