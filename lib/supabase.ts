export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      entry: {
        Row: {
          created_at: string;
          date: string | null;
          id: string;
          text: string;
          topic_id: string;
          updated_at: string;
          user_id: string;
          vote: number;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          id?: string;
          text?: string;
          topic_id: string;
          updated_at?: string;
          user_id: string;
          vote?: number;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          id?: string;
          text?: string;
          topic_id?: string;
          updated_at?: string;
          user_id?: string;
          vote?: number;
        };
        Relationships: [
          {
            foreignKeyName: "entry_topic_id_fkey";
            columns: ["topic_id"];
            referencedRelation: "topics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "entry_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      favorites: {
        Row: {
          created_at: string;
          entryId: string | null;
          id: string;
          userId: string | null;
        };
        Insert: {
          created_at?: string;
          entryId?: string | null;
          id?: string;
          userId?: string | null;
        };
        Update: {
          created_at?: string;
          entryId?: string | null;
          id?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "favorites_entryId_fkey";
            columns: ["entryId"];
            referencedRelation: "entry";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorites_entryId_fkey";
            columns: ["entryId"];
            referencedRelation: "random_entries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorites_userId_fkey";
            columns: ["userId"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      topics: {
        Row: {
          created_at: string;
          id: string;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "topics_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      random_entries: {
        Row: {
          created_at: string | null;
          id: string | null;
          text: string | null;
          topic_id: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "entry_topic_id_fkey";
            columns: ["topic_id"];
            referencedRelation: "topics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "entry_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      decrement_entry_vote: {
        Args: {
          row_id: string;
        };
        Returns: undefined;
      };
      increment_entry_vote: {
        Args: {
          row_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
