export interface Permission {
  id: number;
  name: string;
  display_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
}

export interface Role {
  id: number;
  name: string;
  display_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pivot: {
    user_type: string;
    user_id: number;
    role_id: number;
  };
  permissions: Permission[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  image: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  roles: Role[];
}

export interface FetchAdminsResponse {
  data: User[];
}