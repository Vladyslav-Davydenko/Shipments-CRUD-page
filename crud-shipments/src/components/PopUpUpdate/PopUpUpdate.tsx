import { useState } from "react";
import { Shipment } from "../../helpers/types/shipmentTypes";
import { useDispatch } from "react-redux";
import { updateData } from "../../helpers/Store/Shipments";

interface PropsPopUp {
    onPopUpClose: () => void;
    shipment: Shipment;
}

export default function PopUpUpdate(props: PropsPopUp) {
    const {onPopUpClose, shipment} = props
    const tempOrderNo = shipment.orderNo
    const [orderNo, setOrderNo] = useState(shipment.orderNo);
    const [date, setDate] = useState(shipment.date);
    const [customer, setCustomer] = useState(shipment.customer);
    const [trackingNo, setTrackingNo] = useState(shipment.trackingNo);
    const [status, setStatus] = useState(shipment.status);
    const [consignee, setConsignee] = useState(shipment.consignee);
    const dispatch = useDispatch()

    function onFormSubmit(e: React.FormEvent) {
        e.preventDefault()

        const newValue = {
            orderNo,
            date,
            customer,
            trackingNo,
            status,
            consignee,
        }

        dispatch(updateData({
            oldNo: tempOrderNo,
            newData: newValue
        }))

        onPopUpClose()
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-title">
                    {`updating values of order "${shipment.orderNo}"`}
                </div>
                <div>
                    <form id="shipmentForm" onSubmit={onFormSubmit} className="popup-form">
                        <div>
                        <label htmlFor="orderNo">Order Number:</label>
                        <input type="text" id="orderNo" name="orderNo" className="input" value={orderNo} onChange={(e) => setOrderNo(e.target.value)}/>
                        </div><div>
                        <label htmlFor="date">Date:</label>
                        <input type="text" id="date" name="date" className="input" value={date} onChange={(e) => setDate(e.target.value)}/>
                        </div><div>
                        <label htmlFor="customer">Customer:</label>
                        <input type="text" id="customer" name="customer" className="input" value={customer} onChange={(e) => setCustomer(e.target.value)}/>
                        </div><div>
                        <label htmlFor="trackingNo">Tracking Number:</label>
                        <input type="text" id="trackingNo" name="trackingNo" className="input" value={trackingNo} onChange={(e) => setTrackingNo(e.target.value)}/>
                        </div><div>
                        <label htmlFor="status">Status:</label>
                        <select id="status" name="status" value={status} className="input" onChange={(e) => setStatus(e.target.value as typeof shipment.status)}>
                            <option value="'In Transit'">In Transit</option>
                            <option value="'Delivered'">Delivered</option>
                            <option value="'Pending'">Pending</option>
                        </select>
</div><div>
                        <label htmlFor="consignee">Consignee:</label>
                        <input type="text" id="consignee" name="consignee" className="input" value={consignee} onChange={(e) => setConsignee(e.target.value)}/>
                        </div>
                        <span></span>
                        <input type="submit" value="Update" className="btn btn-blue btn-update"/>
                    </form>
                </div>
                <button className="btn btn-red btn-close-popup" onClick={onPopUpClose}>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Menu / Close_SM">
                    <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    </svg>
                </button>

            </div>
        </div>
    )
}