import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { ShipmentsState, Shipment } from "../types/shipmentTypes";


const initialState: ShipmentsState = {
    shipments: []
}

const shipmentsSlice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        getData: (state, action: PayloadAction<Shipment[]>) => {
            state.shipments.push(...action.payload)
        },
        updateData: () => {
            console.log("Data was updated")
        },
        deleteData: (state, action) => {
            const index = state.shipments.findIndex(
                shipment => shipment.orderNo === action.payload
            )
            // mutable delete (immer will do everything)
            state.shipments.splice(index, 1)
        }
    }
})

const store = configureStore({
    reducer: shipmentsSlice.reducer
})

const {getData, updateData, deleteData} = shipmentsSlice.actions


export{
    store,
    updateData,
    deleteData,
    getData
}