import axios from "axios"
import { useDispatch } from "react-redux"
import { getData } from "../../helpers/Store/Shipments"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { ShipmentsState } from "../../helpers/types/shipmentTypes"
import SingleRowData from "../SingleRowData/SingleRowData"
import { shipmentsCustomerSort, trakingNoSort, statusSort } from "../../helpers/Store/Shipments"

export default function Table() {
    const shipments = useSelector((state: ShipmentsState) => state.shipments)
    const dispatch = useDispatch()
    const [customerSortACS, setCustomerSortACS] = useState(true)
    const [trakingNoACS, setTrakingNoACS] = useState(true)
    const [statusACS, setStatusACS] = useState(true)
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
        console.log("Yep")
    }, []) 

    const hanldeSortCustomer = () => {
        dispatch(shipmentsCustomerSort(customerSortACS))
        setCustomerSortACS(!customerSortACS)
    }
    const hanldeSortTrakingNo = () => {
        dispatch(trakingNoSort(trakingNoACS))
        setTrakingNoACS(!trakingNoACS)
    }
    const hanldeSortStatus = () => {
        dispatch(statusSort(statusACS))
        setStatusACS(!statusACS)
    }
    
    return (
        <div className="shipments-container">
            <table className="shipments-table">
                    <thead className="shipments-table-head">
                        <tr>
                            <th>OrderNo</th>
                            <th>DeliveryDate</th>
                            <th>
                                <div>
                                    <p>Customer</p>
                                    <span className="sort-button" onClick={hanldeSortCustomer}>
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 18L16 16M16 6L20 10.125M16 6L12 10.125M16 6L16 13" stroke="var(--text-head-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 18L12 13.875M8 18L4 13.875M8 18L8 11M8 6V8" stroke="var(--text-head-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>TrakingNo</p>
                                    <span className="sort-button" onClick={hanldeSortTrakingNo}>
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 18L16 16M16 6L20 10.125M16 6L12 10.125M16 6L16 13" stroke="var(--text-head-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 18L12 13.875M8 18L4 13.875M8 18L8 11M8 6V8" stroke="var(--text-head-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <p>Status</p>
                                    <span className="sort-button" onClick={hanldeSortStatus}>
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 18L16 16M16 6L20 10.125M16 6L12 10.125M16 6L16 13" stroke="var(--text-head-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 18L12 13.875M8 18L4 13.875M8 18L8 11M8 6V8" stroke="var(--text-head-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                            </th>              
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