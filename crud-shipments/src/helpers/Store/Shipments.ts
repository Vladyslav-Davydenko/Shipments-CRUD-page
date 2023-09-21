import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { ShipmentsState, Shipment } from "../types/shipmentTypes";


const initialState: ShipmentsState = {
    shipments: [
        {
          orderNo: 'zz-450581-11385595-4210084',
          date: '10/16/2019',
          customer: 'NXP Semiconductors N.V.',
          trackingNo: 'TP-724057-72553473-5647860',
          status: 'In Transit',
          consignee: 'Koppers Holdings Inc.',
        },
        {
          orderNo: 'kk-275651-64476049-3346442',
          date: '8/20/2019',
          customer: 'Triumph Bancorp, Inc.',
          trackingNo: 'TP-011637-13598236-2700556',
          status: 'Delivered',
          consignee: 'Celsius Holdings, Inc.',
        },
        {
          orderNo: 'nz-906145-26850629-1813784',
          date: '7/10/2019',
          customer: 'Inter Parfums, Inc.',
          trackingNo: 'TP-065338-70937481-7664135',
          status: 'Delivered',
          consignee: 'Hovnanian Enterprises Inc',
        },
        {
          orderNo: 'wa-135797-54904524-4596563',
          date: '10/18/2019',
          customer: 'LATAM Airlines Group S.A.',
          trackingNo: 'TP-129236-97859281-4401097',
          status: 'Delivered',
          consignee: 'PowerShares FTSE RAFI US 1500 Small-Mid Portfolio',
        },
      ]
      
}

const shipmentsSlice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        getData: (state, action: PayloadAction<Shipment[]>) => {
            state.shipments.push(...action.payload)
        },
        updateData: (state, action: PayloadAction<{oldNo: string, newData: Shipment}>) => {
            const index = state.shipments.findIndex(shipment => {
                return shipment.orderNo === action.payload.oldNo
            })
            if(index !== -1){
                console.log("Data was succesfully updated")
                state.shipments[index] = action.payload.newData
            }
        },
        deleteData: (state, action) => {
            console.log(`Shipment ${action.payload} was deleted`)
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