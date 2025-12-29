export interface Content {
  count: string | null
  content: string | null
}

// Individual Product
export interface Product {
    id: number
    name: string
    sku: string
    category: string
    description: string
    price: number
    images: string[]
    notes: string[]
    content: Content[]
    updated_at: string
    feature_product?: boolean
    image_url: string
}

// Pagination metadata
export interface PaginationMeta {
    current_page: number
    per_page: number
    total: number
}

// Paginated Product Response
export interface PaginatedProducts {
    current_page: number
    per_page: number
    total: number
    data: Product[]
}



// Cart item (frontend)
export interface CartItem {
    id: number
    name: string
    price: number
    qty: number
}

// Customer info used during checkout
export interface CustomerInfo {
    name: string
    address: string
    phone: string
}

export interface BillingContactInformation {
    name: string
    address: string
    phone: string
    email: string
    city: string
    state: string
    zip: string
    country: string
}

export interface OrderLine {
    sku: string
    quantity: number
}

// Order item (backend stored)
export interface OrderItem {
    id: number
    product_id: number
    order_id?: number
    qty: number
    price: number
    product?: Product
}

// Order data
export interface Order {
    number: number
    handling_instructions: string
    billing_contact_information: BillingContactInformation
    order_items?: OrderLine[]
}

export interface Tenant {
    id: number
    name: string
    company: string
    about: string
    phone: string
    address: string
    city: string
    moto: string
    slug: string
    store_domain: string
    store_tagline: string
    store_image: string
    banner_image: string[]
    image: string
}

export interface Tag {
    id: number
    name: string
    product_count?: number
    products?: Product[]
    feature_product: Product
}

export interface Settings {
    tenant: Tenant
    tags: Tag[]
}