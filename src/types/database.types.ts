export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    wallet_address: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    wallet_address: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    wallet_address?: string
                    created_at?: string
                }
            }
            organizations: {
                Row: {
                    id: string
                    name: string
                    email: string | null
                    owner_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    email?: string | null
                    owner_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string | null
                    owner_id?: string
                    created_at?: string
                }
            }
        }
    }
}
