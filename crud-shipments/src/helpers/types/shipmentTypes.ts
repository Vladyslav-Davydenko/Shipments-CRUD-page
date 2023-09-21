export type Status = "Shipped" | "In Transit" | "Delivered";

export interface Shipment {
  orderNo: string;
  date: string;
  customer: string;
  trackingNo: string;
  status: Status;
  consignee: string;
}

export interface ShipmentsState {
  shipments: Shipment[];
}