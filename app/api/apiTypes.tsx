export type loginData = {
    email: string,
    password: string
}

export type registrationData = {
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    password: string
}

export type newList = {
    Fullname: string,
    date: string
}

export type editListTypes = {
    Fullname: string,
    date: string
}

export type resetPassword = {
    email: string
}


export type PaymentData = {
    product_id: number
    product_name: string,
    amount: number, 
    quantity: number
}

export type Prodcut = {
    id: number
    name: string,
    price: number
}


  export type Order = {
    id: number;  // Unique identifier for the order
    customerId: number;  // ID of the customer placing the order
    productId: number;  // ID of the product in the order
    orderId: number;  // Unique identifier for the order in the system
    date: string;  // Date of the order (ISO string format)
    status: 'pending' | 'deliver' | 'shipped';  // The current status of the order
    name: string;  // Product name
    description: string;  // Description of the product
    category_id: number;  // The category ID of the product
    price: number;  // Price of the product
    discount_percent: number;  // Discount applied on the product (in percentage)
    quantity: number;  // Number of units ordered
    is_sale: boolean;  // Whether the product is on sale or not
    image_url: string;  // URL of the product image
    customer_id: number;  // Customer ID (can be the same as `customerId` but different for certain cases)
    created_at: string;  // Date when the order was created (ISO string format)
    updated_at: string;  // Date when the order was last updated (ISO string format)
  }
  