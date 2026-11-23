export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      launch_notifications: {
        Row: {
          created_at: string
          email: string
          id: string
          rescue_slug: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          rescue_slug?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          rescue_slug?: string
        }
        Relationships: []
      }
      nominations: {
        Row: {
          created_at: string
          email: string
          help_needed: string
          homeowner_name: string
          id: string
          phone: string
          property_address: string
          relationship: string
          sms_consent: boolean
          sms_consent_at: string | null
          story: string
          your_name: string
        }
        Insert: {
          created_at?: string
          email: string
          help_needed: string
          homeowner_name: string
          id?: string
          phone: string
          property_address: string
          relationship: string
          sms_consent?: boolean
          sms_consent_at?: string | null
          story: string
          your_name: string
        }
        Update: {
          created_at?: string
          email?: string
          help_needed?: string
          homeowner_name?: string
          id?: string
          phone?: string
          property_address?: string
          relationship?: string
          sms_consent?: boolean
          sms_consent_at?: string | null
          story?: string
          your_name?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          admin_notes: string | null
          ai_error: string | null
          ai_estimate: Json | null
          ai_model: string | null
          ai_status: string
          created_at: string
          description: string | null
          discount: number
          email: string | null
          heavy_material: boolean
          hoarder: boolean
          id: string
          location: string
          long_carry: boolean
          name: string
          outcome: string
          phone: string
          photo_paths: string[]
          price_high: number | null
          price_low: number | null
          pricing_version: string | null
          quote_lines: Json | null
          referrer: string | null
          sms_consent: boolean
          sms_consent_at: string | null
          source_page: string | null
          stairs_flights: number
          status: string
          truck_eighths: number | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          zip: string
        }
        Insert: {
          admin_notes?: string | null
          ai_error?: string | null
          ai_estimate?: Json | null
          ai_model?: string | null
          ai_status: string
          created_at?: string
          description?: string | null
          discount?: number
          email?: string | null
          heavy_material?: boolean
          hoarder?: boolean
          id?: string
          location: string
          long_carry?: boolean
          name: string
          outcome: string
          phone: string
          photo_paths?: string[]
          price_high?: number | null
          price_low?: number | null
          pricing_version?: string | null
          quote_lines?: Json | null
          referrer?: string | null
          sms_consent?: boolean
          sms_consent_at?: string | null
          source_page?: string | null
          stairs_flights?: number
          status?: string
          truck_eighths?: number | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          zip: string
        }
        Update: {
          admin_notes?: string | null
          ai_error?: string | null
          ai_estimate?: Json | null
          ai_model?: string | null
          ai_status?: string
          created_at?: string
          description?: string | null
          discount?: number
          email?: string | null
          heavy_material?: boolean
          hoarder?: boolean
          id?: string
          location?: string
          long_carry?: boolean
          name?: string
          outcome?: string
          phone?: string
          photo_paths?: string[]
          price_high?: number | null
          price_low?: number | null
          pricing_version?: string | null
          quote_lines?: Json | null
          referrer?: string | null
          sms_consent?: boolean
          sms_consent_at?: string | null
          source_page?: string | null
          stairs_flights?: number
          status?: string
          truck_eighths?: number | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          zip?: string
        }
        Relationships: []
      }
      sell_leads: {
        Row: {
          address: string
          created_at: string
          email: string
          factors: string | null
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string
          sms_consent: boolean
          sms_consent_at: string | null
          status: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          factors?: string | null
          first_name: string
          id?: string
          last_name?: string
          notes?: string | null
          phone: string
          sms_consent?: boolean
          sms_consent_at?: string | null
          status?: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          factors?: string | null
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string
          sms_consent?: boolean
          sms_consent_at?: string | null
          status?: string
        }
        Relationships: []
      }
      service_leads: {
        Row: {
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string
          photo_paths: string[] | null
          referrer: string | null
          service_type: string
          sms_consent: boolean
          sms_consent_at: string | null
          source_page: string | null
          status: string
          thinking_of_selling: boolean | null
          timing: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          zip: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone: string
          photo_paths?: string[] | null
          referrer?: string | null
          service_type: string
          sms_consent?: boolean
          sms_consent_at?: string | null
          source_page?: string | null
          status?: string
          thinking_of_selling?: boolean | null
          timing?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          zip: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          photo_paths?: string[] | null
          referrer?: string | null
          service_type?: string
          sms_consent?: boolean
          sms_consent_at?: string | null
          source_page?: string | null
          status?: string
          thinking_of_selling?: boolean | null
          timing?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          zip?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
